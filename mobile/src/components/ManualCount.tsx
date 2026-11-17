import { useRef, useState } from "react";
import { View } from "react-native";
import { Text } from "./Typography";
import { Button, ErrorNotice, Field, useUI } from "./ScreenLayout";
import { useAuth } from "../context/AuthContext";
import { registrarConferenciaManual } from "../service/api";

export default function ManualCount({id,capacidade,onSaved}:{id:number;capacidade:number;onSaved:()=>void}) {
    const ui=useUI(); const {usuario}=useAuth();
    const [valor,setValor]=useState(""),[busy,setBusy]=useState(false),[error,setError]=useState(""),[message,setMessage]=useState("");
    const pending=useRef(false);
    if(usuario?.tipo!=="ADMIN")return null;
    async function save(){
        if(!usuario||pending.current)return;
        const numero=Number(valor);
        if(!/^\d+$/.test(valor)||!Number.isSafeInteger(numero)||numero>capacidade){setError(`Informe um número inteiro entre 0 e ${capacidade}.`);return;}
        pending.current=true;setBusy(true);setError("");setMessage("");
        try{await registrarConferenciaManual(id,numero,usuario.token);setValor("");setMessage("Conferência registrada no histórico com origem MANUAL.");onSaved();}
        catch(e){setError(e instanceof Error?e.message:"Não foi possível registrar a conferência.");}
        finally{pending.current=false;setBusy(false);}
    }
    return <View style={ui.card}>
        <Text accessibilityRole="header" style={ui.sectionTitle}>Conferência manual</Text>
        <Text style={ui.text}>Conte as pessoas na mesma área monitorada para comparar com as amostras da câmera no relatório. O próximo envio da câmera substituirá a ocupação atual. Este registro não altera o estado de conexão da câmera.</Text>
        <Field label="Pessoas observadas na área monitorada" keyboardType="number-pad" value={valor} onChangeText={v=>{setValor(v);setMessage("");}} editable={!busy} maxLength={9}/>
        <ErrorNotice message={error}/>
        {!!message&&<Text accessibilityLiveRegion="polite" style={ui.text}>{message}</Text>}
        <Button title="Registrar conferência" busy={busy} disabled={!valor.trim()} onPress={()=>void save()}/>
    </View>;
}
