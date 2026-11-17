import { useId } from "react";
import { useTheme } from "../context/ThemeContext";

export default function StarRating({value,onChange,disabled}:{value:number;onChange:(value:number)=>void;disabled:boolean}) {
    const {colors}=useTheme(); const name=useId();
    return <div role="radiogroup" aria-label="Nota da unidade" style={{display:"flex",justifyContent:"center",flexWrap:"wrap",gap:2}}>
        {[1,2,3,4,5].map(n=><label key={n} className="uau-star" style={{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",width:44,minHeight:56}}>
            <input type="radio" name={name} value={n} checked={value===n} disabled={disabled} onChange={()=>onChange(n)} aria-label={`${n} ${n===1?"estrela":"estrelas"}`}
                style={{position:"absolute",inset:0,width:"100%",height:"100%",margin:0,opacity:0,cursor:disabled?"default":"pointer"}}/>
            <span aria-hidden="true" style={{fontSize:36,color:n<=value?colors.primaryDark:colors.textSecondary,pointerEvents:"none"}}>{n<=value?"★":"☆"}</span>
        </label>)}
    </div>;
}
