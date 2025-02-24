import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from "expo-auth-session";

const clientId = "2ea9608bdac244a8b4a43be80ad25a78";
const redirectUri = AuthSession.makeRedirectUri(['exp://192.168.230.79:8081', 'http://localhost:8081']);
const scopes = [
    "user-read-email",
    "user-read-private",
    "user-library-read",
    "user-modify-playback-state",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-position",
    "user-top-read",
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-public",
];

export default function DummyLogin() {
    const navigation = useNavigation();

    const [request, response, promptAsync] = AuthSession.useAuthRequest({
        clientId: clientId,
        redirectUri: redirectUri,
        scopes: scopes,
        responseType: "token",
    });

    useEffect(() => {
        if (response?.type === "success" && response.params.access_token) {
            const token = response.params.access_token;
            // Store the token in AsyncStorage
            AsyncStorage.setItem("spotifyToken", token)
                .then(() => {
                    console.log("Token stored successfully:", token);
                    alert("Authentication successful!");
                    // Navigate to the next screen or fetch user data
                    navigation.navigate("NextScreen");
                })
                .catch((error) => {
                    console.error("Error storing token:", error);
                });
        } else if (response?.type === "error") {
            alert("Authentication failed");
        }
    }, [response]);

    return (
        <LinearGradient colors={["#4c669f", "#3b5998", "#192f6a"]} style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View>
                    <Text style={{ fontSize: 24, marginBottom: 20 }}>Join our Family</Text>
                    <Pressable style={styles.button} onPress={() => promptAsync()}>
                        <Text style={{ color: "white" }}>Sign in with Spotify</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "green",
        padding: 10,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
    },
});
