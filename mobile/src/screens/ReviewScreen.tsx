import { Text } from "../components/Typography";
import { useEffect,useState } from "react";
import { Pressable, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { ScreenLayout,Field,Button,ErrorNotice,useUI } from "../components/ScreenLayout";
import { useAuth } from "../context/AuthContext";
import { buscarMinhasAvaliacoes,buscarSituacaoUnidade,atualizarAvaliacao,criarAvaliacao } from "../service/api";
import { Alert } from "../utils/alert";
export default function ReviewScreen({navigation,route}:NativeStackScreenProps<RootStackParamList,"Review">){
    const ui=useUI();
    const {colors}=useTheme();

    const {usuario}=useAuth();const params=route.params??{};
    const avaliacaoId=params.avaliacaoId??params.avaliacao?.id;
    const [unidadeId,setUnidadeId]=useState(params.unidadeId??params.unidade?.unidadeId??params.avaliacao?.unidadeId);
    const [nome,setNome]=useState("Unidade"),[nota,setNota]=useState(0),[comentario,setComentario]=useState(""),[error,setError]=useState(""),[busy,setBusy]=useState(false),[loading,setLoading]=useState(true);
    useEffect(()=>{const c=new AbortController();
        async function load(){try{
            if(avaliacaoId){if(!usuario)return;const list=await buscarMinhasAvaliacoes(usuario.token,c.signal);const a=list.find(x=>x.id===avaliacaoId);
                if(!a)throw new Error("Avaliação não encontrada.");if(!c.signal.aborted){setNota(a.nota);setComentario(a.comentario??"");setNome(a.unidadeNome);setUnidadeId(a.unidadeId);}}
            else if(unidadeId){const u=await buscarSituacaoUnidade(unidadeId,c.signal);if(!c.signal.aborted)setNome(u.nome);}
            else throw new Error("Selecione uma unidade para avaliar.");
        }catch(e){if(!c.signal.aborted)setError(e instanceof Error?e.message:"Não foi possível carregar.");}finally{if(!c.signal.aborted)setLoading(false);}}
        void load();return ()=>c.abort();
    },[avaliacaoId,unidadeId,usuario?.token]);
    async function save(){if(!usuario||!unidadeId)return;if(nota<1){setError("Selecione uma nota.");return;}setBusy(true);setError("");
        try{if(avaliacaoId)await atualizarAvaliacao(avaliacaoId,{nota,comentario:comentario.trim()},usuario.token);
            else await criarAvaliacao(unidadeId,{nota,comentario:comentario.trim()},usuario.token);
            Alert.alert("Avaliação salva","Sua avaliação foi registrada.");navigation.goBack();}
        catch(e){setError(e instanceof Error?e.message:"Não foi possível salvar.");}finally{setBusy(false);}}
    return <ScreenLayout title={avaliacaoId?"Editar avaliação":"Avaliar"} onBack={()=>navigation.goBack()}>
        <Text style={ui.muted}>{nome}</Text><ErrorNotice message={error}/>
        {!usuario?<Button title="Entrar para avaliar" onPress={()=>navigation.navigate("Login")}/>:<>
            <View style={ui.card}>
                <Text style={ui.label}>Como foi sua experiência?</Text>
                <Text style={ui.muted}>Toque nas estrelas para dar uma nota à unidade.</Text>
                <View style={[ui.row,{justifyContent:"center",gap:4}]}>{[1,2,3,4,5].map(n=><Pressable key={n}
                    accessibilityRole="radio" accessibilityLabel={`${n} ${n===1?"estrela":"estrelas"}`} accessibilityState={{checked:nota===n,disabled:busy||loading}}
                    disabled={busy||loading} onPress={()=>setNota(n)} style={{minWidth:48,minHeight:56,alignItems:"center",justifyContent:"center"}}>
                    <Text style={{fontSize:36,color:n<=nota?colors.primary:colors.disabled}}>★</Text>
                </Pressable>)}</View>
            </View>
            <View style={ui.card}>
                <Field label="Comentário (opcional)" placeholder="Escreva sua avaliação…" value={comentario} onChangeText={setComentario} multiline maxLength={500}/>
                <Text style={[ui.muted,{alignSelf:"flex-end"}]}>{comentario.length}/500</Text>
            </View>
            <Button title={avaliacaoId?"Salvar alterações":"Enviar avaliação"} busy={busy} disabled={loading||!unidadeId||nota<1} onPress={()=>void save()}/>
        </>}
    </ScreenLayout>;
}
