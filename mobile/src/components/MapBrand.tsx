import { Image, StyleSheet, View, useWindowDimensions } from "react-native";
import { brand } from "../theme/brand";


export default function MapBrand() {
    const {width}=useWindowDimensions();
    return (
        <View style={[styles.brand,width<400&&{width:128}]}>
            <Image source={brand.logo} resizeMode="contain" style={styles.logo} accessibilityRole="image" accessibilityLabel="U.A.U — Unidades de Atendimento de Urgência" />
        </View>
    );
}

const styles = StyleSheet.create({
    brand: { width: 180, aspectRatio: brand.aspectRatio, borderRadius: 10, backgroundColor: brand.background, overflow: "hidden" },
    logo: { width: "100%", height: "100%" },
});
