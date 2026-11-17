import { Pressable, View } from "react-native";
import { Text } from "./Typography";
import { useTheme } from "../context/ThemeContext";

export default function StarRating({value,onChange,disabled}:{value:number;onChange:(value:number)=>void;disabled:boolean}) {
    const {colors}=useTheme();
    return <View style={{flexDirection:"row",justifyContent:"center",flexWrap:"wrap",gap:2}}>
        {[1,2,3,4,5].map(n=><Pressable key={n} accessibilityRole="radio" accessibilityLabel={`${n} ${n===1?"estrela":"estrelas"}`}
            accessibilityState={{checked:value===n,disabled}} disabled={disabled} onPress={()=>onChange(n)}
            style={{minWidth:44,minHeight:56,alignItems:"center",justifyContent:"center"}}>
            <Text style={{fontSize:36,color:n<=value?colors.primaryDark:colors.textSecondary}}>{n<=value?"★":"☆"}</Text>
        </Pressable>)}
    </View>;
}
