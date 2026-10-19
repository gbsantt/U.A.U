import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import SupportChat from "../components/SupportChat";
export default function NovaSolicitacaoSuporteScreen({navigation}:NativeStackScreenProps<RootStackParamList,"NovaSolicitacaoSuporte">){return <SupportChat navigation={navigation}/>;}
