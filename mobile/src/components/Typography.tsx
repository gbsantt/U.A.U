import { forwardRef } from "react";
import { isLoaded } from "expo-font";
import {
    Platform, StyleSheet, Text as NativeText, TextInput as NativeTextInput,
    TextProps, TextInputProps, TextStyle, StyleProp,
} from "react-native";

// Each weight has its own bundled face, so Android, iOS and web use the same type.
function fontStyle(style: StyleProp<TextStyle>): TextStyle {
    const flat = StyleSheet.flatten(style);
    if (flat?.fontFamily) return {};
    const weight = flat?.fontWeight;
    const numeric = weight === "bold" ? 700 : Number(weight ?? 400);
    const family = numeric >= 800 ? "Roboto-Black" : numeric >= 600 ? "Roboto-Bold" : numeric >= 500 ? "Roboto-Medium" : "Roboto-Regular";
    return isLoaded(family)
        ? { fontFamily: family, fontWeight: "normal" }
        : { fontFamily: Platform.OS === "android" ? "sans-serif" : undefined };
}

export const Text = forwardRef<NativeText, TextProps>(function Text({ style, ...props }, ref) {
    return <NativeText {...props} ref={ref} style={[style, fontStyle(style)]} />;
});

export const TextInput = forwardRef<NativeTextInput, TextInputProps>(function TextInput({ style, ...props }, ref) {
    return <NativeTextInput {...props} ref={ref} style={[style, fontStyle(style)]} />;
});
