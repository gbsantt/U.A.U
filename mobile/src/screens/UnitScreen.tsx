import { Text } from "../components/Typography";
import { useCallback,useState } from "react";
import { View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { ScreenLayout,Button,ErrorNotice,useUI } from "../components/ScreenLayout";
import { ApiError,Avaliacao,buscarAvaliacoes,buscarSituacaoUnidade } from "../service/api";
import { Unidade } from "../types/Unidade";
import { useFavorites } from "../context/FavoritesContext";
import { dadosAtuais, statusNoMapa } from "../utils/mapStatus";
import { useAuth } from "../context/AuthContext";
import { downloadReport } from "../service/downloadReport";
import { appIsActive } from "../utils/activity";
import { useTheme } from "../context/ThemeContext";
export default function UnitScreen({navigation,route}:NativeStackScreenProps<RootStackParamList,"Unit">){
    const ui=useUI();
    const {colors}=useTheme();

    const id=route.params.unidadeId;
    const {usuario}=useAuth();
    const [reportBusy,setReportBusy]=useState(false),[reportError,setReportError]=useState("");
    async function baixarRelatorio(){
        if(!usuario || reportBusy)return;
        setReportBusy(true);setReportError("");
        try{await downloadReport(id,usuario.token);}catch(e){setReportError(e instanceof Error?e.message:"Não foi possível baixar o relatório.");}
        finally{setReportBusy(false);}
    }
    const [unidade,setUnidade]=useState<Unidade>(),[avaliacoes,setAvaliacoes]=useState<Avaliacao[]>([]);
    const [error,setError]=useState(""),[reviewError,setReviewError]=useState(""),[missing,setMissing]=useState(false),[retry,setRetry]=useState(0);
    const {alternarFavorito,estaFavoritado}=useFavorites();
    useFocusEffect(useCallback(()=>{
        const c=new AbortController();let timer:ReturnType<typeof setTimeout>;let deleted=false;
        setMissing(false);setError("");setUnidade(undefined);setAvaliacoes([]);setReviewError("");
        async function load(){
            try{if(!appIsActive())return;const data=await buscarSituacaoUnidade(id,c.signal);if(!c.signal.aborted){setUnidade(data);setError("");}}
            catch(e){if(!c.signal.aborted){
                if(e instanceof ApiError&&e.status===404){setMissing(true);setUnidade(undefined);deleted=true;}
                else{setError("Não foi possível atualizar. A ocupação pode estar desatualizada.");setUnidade(u=>u?{...u,statusMedicao:"DESATUALIZADA"}:u);}
            }}finally{if(!c.signal.aborted&&!deleted)timer=setTimeout(load,15000);}
        }
        void load();
        buscarAvaliacoes(id,c.signal).then(d=>{if(!c.signal.aborted)setAvaliacoes(d);})
            .catch(e=>{if(!c.signal.aborted)setReviewError(e.message);});
        return ()=>{c.abort();clearTimeout(timer);};
    },[id,retry]));
    const status=unidade?statusNoMapa(unidade,colors):undefined;
    const media=avaliacoes.length?avaliacoes.reduce((sum,a)=>sum+a.nota,0)/avaliacoes.length:0;
    return <ScreenLayout title={unidade?.nome??"Unidade de atendimento"} onBack={()=>navigation.canGoBack()?navigation.goBack():navigation.navigate("Home")}>
        {missing?<Text style={ui.text}>Esta unidade não está mais disponível.</Text>:<>
        <ErrorNotice message={error}/>{error&&<Button title="Tentar novamente" onPress={()=>setRetry(n=>n+1)}/>}
        {!unidade&&!error&&<Text style={ui.text}>Carregando unidade…</Text>}
        {unidade&&<>
            <Text style={ui.muted}>Situação atual da unidade</Text>
            <View style={ui.card}>
                <Text style={[ui.sectionTitle,{fontSize:12,letterSpacing:1}]}>OCUPAÇÃO ATUAL</Text>
                <Text style={[ui.title,{fontSize:dadosAtuais(unidade)?40:24}]}>{dadosAtuais(unidade)?`${unidade.percentualOcupacao.toFixed(0)}%`:status!.text}</Text>
                <Text style={ui.muted}>Última contagem: {unidade.ocupacaoAtual} de {unidade.capacidadeAreaMonitorada} pessoas</Text>
            </View>
            <View style={{height:6,borderRadius:3,backgroundColor:colors.border,overflow:"hidden"}} accessible accessibilityLabel={status!.text}>
                <View style={{height:6,backgroundColor:status!.color,width:dadosAtuais(unidade)?`${Math.min(100,Math.max(0,unidade.percentualOcupacao))}%`:"0%"}} />
            </View>
            <Text style={ui.muted}>{dadosAtuais(unidade)?`● ${unidade.nivelOcupacao.replaceAll("_"," ")}`:"Sem dados atuais"}</Text>
            <View style={ui.card}>
                <Text style={ui.sectionTitle}>Informações</Text>
                <Text style={ui.muted}>Endereço</Text><Text style={ui.text}>{unidade.endereco}</Text>
                <View style={{height:1,backgroundColor:colors.border}} />
                <Text style={ui.muted}>Telefone</Text><Text style={ui.text}>{unidade.telefone||"Não informado"}</Text>
                <Text style={ui.muted}>{unidade.tipo.replaceAll("_"," ")}</Text>
            </View>
            <View style={ui.card}>
                <Text style={ui.sectionTitle}>Fluxo da unidade</Text>
                {unidade.statusMedicao==="ATUALIZADA" && unidade.ritmoOcupacao!=="DADOS_INSUFICIENTES" ? <><Text style={ui.text}>Média (30 min): {unidade.mediaUltimos30Minutos.toFixed(1)} pessoas</Text>
                <Text style={ui.text}>Tendência: {unidade.tendencia} · ritmo: {unidade.ritmoOcupacao.replaceAll("_"," ")}</Text></> : <Text style={ui.text}>Sem dados suficientes e atuais para estimar tendência.</Text>}
            </View>
            <View style={ui.card}>
                <Text style={ui.sectionTitle}>Monitoramento</Text>
                <Text style={ui.text}>Câmera: {unidade.statusCamera.replaceAll("_"," ")}</Text>
                <Text style={ui.text}>Medição: {unidade.statusMedicao.replaceAll("_"," ")}</Text>
                <Text style={ui.muted}>Última atualização: {unidade.ultimaAtualizacao?new Date(unidade.ultimaAtualizacao).toLocaleString("pt-BR"):"Sem atualização"}</Text>
            </View>
            <Button secondary title={estaFavoritado(id)?"Remover dos favoritos":"Adicionar aos favoritos"} onPress={()=>void alternarFavorito(unidade)}/>
            <Button title="Avaliar unidade" onPress={()=>navigation.navigate("Review",{unidadeId:id})}/>
            <Text style={ui.title}>Avaliações {avaliacoes.length? `· ${media.toFixed(1)} / 5`:""}</Text>
            <ErrorNotice message={reviewError}/>{reviewError&&<Button title="Recarregar avaliações" secondary onPress={()=>setRetry(n=>n+1)}/>}
            {avaliacoes.map(a=><View key={a.id} style={ui.card}><Text style={ui.label}>{"★".repeat(a.nota)}{"☆".repeat(5-a.nota)}</Text>
                <Text style={ui.text}>{a.usuarioNome||"Usuário"} · {new Date(a.criadoEm).toLocaleDateString("pt-BR")}</Text>
                <Text style={ui.text}>{a.comentario||"Sem comentário"}</Text></View>)}
            {!avaliacoes.length&&!reviewError&&<Text style={ui.text}>Esta unidade ainda não possui avaliações.</Text>}
            {usuario&&<View style={ui.card}>
                <Text style={ui.title}>Relatório de ocupação</Text>
                <Text style={ui.text}>Baixe os últimos 100 registros disponíveis, com datas, contagens, percentuais e origem das medições, para estudos e análises.</Text>
                <ErrorNotice message={reportError}/>
                <Button title="Baixar relatório em PDF" busy={reportBusy} onPress={()=>void baixarRelatorio()}/>
            </View>}
        </>}</>}
    </ScreenLayout>;
}
