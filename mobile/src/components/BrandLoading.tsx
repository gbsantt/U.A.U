import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { Text } from "./Typography";
import { brand } from "../theme/brand";

export default function BrandLoading({ message = "Preparando seu mapa…" }: { message?: string }) {
    return <View style={styles.page}>
        <Image source={brand.logo} resizeMode="contain" style={styles.logo}
            accessibilityLabel="U.A.U — Unidades de Atendimento de Urgência. Marcador de localização verde com uma cruz de saúde." />
        <View style={styles.status} accessibilityRole="progressbar" accessibilityLabel={message}>
            <ActivityIndicator color={brand.green} />
            <Text style={styles.message}>{message}</Text>
        </View>
    </View>;
}

const styles = StyleSheet.create({
    page: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: brand.background, padding: 24 },
    logo: { width: "100%", maxWidth: 480, aspectRatio: brand.aspectRatio },
    status: { flexDirection: "row", gap: 12, alignItems: "center", padding: 16 },
    message: { color: brand.foreground, fontSize: 15, flexShrink: 1 },
});
