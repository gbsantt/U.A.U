import { useCallback, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Text } from "./Typography";
import { ScreenLayout, Button, ErrorNotice, Field, useUI } from "./ScreenLayout";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { appIsActive } from "../utils/activity";
import { buscarSuporte, buscarSuporteAdmin, criarSuporte, listarMensagensSuporte, enviarMensagemSuporte, atualizarStatusSuporte } from "../service/api";
import { MensagemSuporte, SolicitacaoSuporte, StatusSuporte, statusSuporte } from "../types/Suporte";

export default function SupportChat({navigation,id,admin=false}:{navigation:any;id?:number;admin?:boolean}) {
    const ui=useUI();const {colors}=useTheme();const {usuario}=useAuth();
    const [data,setData]=useState<SolicitacaoSuporte>();
    const [owner,setOwner]=useState("");const [mensagens,setMensagens]=useState<MensagemSuporte[]>([]);
    const [texto,setTexto]=useState(""),[error,setError]=useState(""),[syncError,setSyncError]=useState("");
    const [busy,setBusy]=useState(false),[loading,setLoading]=useState(!!id),[retry,setRetry]=useState(0);
    const scroll=useRef<ScrollView>(null);
    const allowed=!!usuario&&(!admin||usuario.tipo==="ADMIN");
    useFocusEffect(useCallback(()=>{
        if(!allowed||!usuario||!id)return;
        const c=new AbortController();let timer:ReturnType<typeof setTimeout>;let after=0;
        setMensagens([]);setData(undefined);setLoading(true);setSyncError("");
        async function load(){
            try {
                if(!appIsActive())return;
                const detail=admin?await buscarSuporteAdmin(id!,usuario!.token,c.signal):null;
                const s=detail?.solicitacao??await buscarSuporte(id!,usuario!.token,c.signal);
                const next=await listarMensagensSuporte(id!,usuario!.token,admin,after,c.signal);
                if(c.signal.aborted)return;
                setData(s);if(detail)setOwner(`${detail.usuarioNome} · ${detail.usuarioEmail}`);
                if(next.length){after=next[next.length-1].id;setMensagens(current=>[...current,...next.filter(m=>!current.some(x=>x.id===m.id))].sort((a,b)=>a.id-b.id));}
                setSyncError("");
            } catch(e){if(!c.signal.aborted)setSyncError(e instanceof Error?e.message:"Não foi possível atualizar a conversa.");}
            finally{if(!c.signal.aborted){setLoading(false);timer=setTimeout(load,5000);}}
        }
        void load();return ()=>{c.abort();clearTimeout(timer);};
    },[id,usuario?.token,allowed,admin,retry]));
    async function enviar(){
        if(!usuario||!allowed||busy||!texto.trim())return;
        setBusy(true);setError("");
        try {
            if(!id){
                const s=await criarSuporte({assunto:texto.trim().slice(0,150),categoria:"OUTRO",descricao:texto.trim()},usuario.token);
                navigation.replace("DetalheSuporte",{id:s.id});
            }else{
                const m=await enviarMensagemSuporte(id,texto.trim(),usuario.token,admin);
                setMensagens(current=>current.some(x=>x.id===m.id)?current:[...current,m].sort((a,b)=>a.id-b.id));
            }
            setTexto("");
        }catch(e){setError(e instanceof Error?e.message:"Não foi possível enviar a mensagem.");}
        finally{setBusy(false);}
    }
    async function atualizar(status:StatusSuporte){
        if(!usuario||!data||!id)return;setBusy(true);setError("");
        try{const d=await atualizarStatusSuporte(id,status,data.version,usuario.token);setData(d.solicitacao);}
        catch(e){setError(e instanceof Error?e.message:"Não foi possível atualizar o status. Atualize a conversa e tente novamente.");}
        finally{setBusy(false);}
    }
    function bubble(key:string,text:string,equipe:boolean,date?:string){
        const own=admin?equipe:!equipe;
        return <View key={key} style={{alignSelf:own?"flex-end":"flex-start",maxWidth:"90%",padding:16,borderRadius:20,backgroundColor:own?colors.primaryLight:colors.surface,gap:6}}>
            <Text style={ui.label}>{equipe?"Equipe UAU":admin?"Solicitante":"Você"}</Text>
            <Text selectable style={ui.text}>{text}</Text>
            {date&&<Text style={ui.muted}>{new Date(date).toLocaleString("pt-BR")}</Text>}
        </View>;
    }
    return <ScreenLayout title="Chat de suporte" onBack={()=>navigation.canGoBack()?navigation.goBack():navigation.navigate("Home")}>
        <Text style={ui.muted}>Converse com a equipe UAU. As respostas aparecerão aqui quando a equipe atender.</Text>
        {!allowed?<View style={ui.card}>
            <Text style={ui.text}>{admin?"Acesso restrito à equipe autorizada.":"Entre na sua conta para conversar com o suporte e acompanhar suas mensagens."}</Text>
            <Button title="Entrar" onPress={()=>navigation.navigate("Login")}/>
            {!admin&&<Button title="Criar conta" secondary onPress={()=>navigation.navigate("Register")}/>}
        </View>:<>
            {data&&<Text style={ui.muted}>Conversa #{data.id} · {data.status.replaceAll("_"," ")}</Text>}
            {admin&&owner&&<Text style={ui.muted}>{owner}</Text>}
            <ErrorNotice message={syncError}/>{syncError&&<Button title="Atualizar conversa" secondary onPress={()=>setRetry(n=>n+1)}/>}
            <ScrollView ref={scroll} style={{height:360,flexGrow:0}} contentContainerStyle={{gap:12,paddingVertical:8}} onContentSizeChange={()=>scroll.current?.scrollToEnd({animated:true})}>
                {bubble("welcome","Olá! Como podemos ajudar? Envie sua dúvida ou conte o que aconteceu.",true)}
                {loading&&<Text style={ui.muted}>Carregando conversa…</Text>}
                {data&&bubble("first",data.descricao,false,data.createdAt)}
                {mensagens.map(m=>bubble(String(m.id),m.texto,m.equipe,m.createdAt))}
            </ScrollView>
            <Field label="Sua mensagem" placeholder="Escreva para a equipe UAU…" value={texto} onChangeText={setTexto} editable={!busy} multiline maxLength={5000}/>
            <Text style={ui.muted}>Não envie senhas, códigos de acesso ou dados clínicos.</Text>
            <ErrorNotice message={error}/>
            <Button title="Enviar mensagem" busy={busy} disabled={!texto.trim()||!!id&&!data} onPress={()=>void enviar()}/>
            {admin&&data&&<View style={ui.row}>{statusSuporte.map(s=><Button key={s} title={s.replaceAll("_"," ")} secondary={data.status!==s} disabled={busy||data.status===s} onPress={()=>void atualizar(s)}/>)}</View>}
            {!admin&&id&&<Button title="Nova conversa" secondary onPress={()=>navigation.navigate("NovaSolicitacaoSuporte")}/>}
        </>}
    </ScreenLayout>;
}
