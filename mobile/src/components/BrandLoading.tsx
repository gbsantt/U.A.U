import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { Text } from "./Typography";
import { brand } from "../theme/brand";

export default function BrandLoading({ message = "Preparando seu mapa…" }: { message?: string }) {
    return <View style={styles.page}>
        <Image source={brand.logo} resizeMode="contain" style={styles.logo}
            accessibilityLabel="UAU — Unidade de Atendimento de Urgência. Mascote de localização com um mapa." />
        <View style={styles.status} accessibilityRole="progressbar" accessibilityLabel={message}>
            <ActivityIndicator color={brand.green} />
            <Text style={styles.message}>{message}</Text>
        </View>
    </View>;
}

const styles = StyleSheet.create({
    page: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: brand.beige, padding: 24 },
    logo: { width: "100%", maxWidth: 440, aspectRatio: 1 },
    status: { flexDirection: "row", gap: 12, alignItems: "center", padding: 16 },
    message: { color: brand.ink, fontSize: 15, flexShrink: 1 },
});
