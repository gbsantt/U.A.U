import { Image, StyleSheet, View } from "react-native";
import { brand } from "../theme/brand";


export default function MapBrand() {
    return (
        <View style={styles.brand} accessible accessibilityLabel="UAU — Unidade de Atendimento de Urgência">
            <Image source={brand.logo} style={styles.logo} accessible={false} />
        </View>
    );
}

const styles = StyleSheet.create({
    brand: { width: 146, height: 88, borderRadius: 14, backgroundColor: brand.beige, overflow: "hidden" },
    // Trim only the image's empty margins in this viewport, preserving the complete logo.
    logo: { position: "absolute", width: 146, height: 146, top: -40 },
});
