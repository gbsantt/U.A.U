import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import SupportChat from "../components/SupportChat";
export function SupportDetail(props:{navigation:any;id:number;admin?:boolean}) { return <SupportChat {...props}/>; }
export default function DetalheSuporteScreen({navigation,route}:NativeStackScreenProps<RootStackParamList,"DetalheSuporte">){return <SupportChat navigation={navigation} id={route.params.id}/>;}
