import { Image, StyleSheet, View } from "react-native";
import { brand } from "../theme/brand";


export default function MapBrand() {
    return (
        <View style={styles.brand} accessible accessibilityLabel="U.A.U — Unidades de Atendimento de Urgência">
            <Image source={brand.logo} resizeMode="contain" style={styles.logo} accessible={false} />
        </View>
    );
}

const styles = StyleSheet.create({
    brand: { width: 180, aspectRatio: brand.aspectRatio, borderRadius: 10, backgroundColor: brand.background, overflow: "hidden" },
    logo: { width: "100%", height: "100%" },
});
