import {
    StyleSheet,
    Text,
    View,
    Image,
    Animated,
    Dimensions,
} from "react-native";
import React, { useRef } from "react";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Lottie from "lottie-react-native";
const { width, height } = Dimensions.get("window");
import { LinearGradient } from "expo-linear-gradient";

const Launch = () => {
    const imgfadeinout = useRef(new Animated.Value(0)).current;
    const imgscale = useRef(new Animated.Value(0)).current;

    useEffect(() => {

        Animated.sequence([
            Animated.timing(imgfadeinout, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.timing(imgfadeinout, {
                toValue: 1,
                duration: 0,
                useNativeDriver: true,
            }),
        ]).start();

        Animated.sequence([
            Animated.timing(imgscale, {
                toValue: 1.02,
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.timing(imgscale, {
                toValue: 1,
                duration: 0,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={[
                    'black',
                    // '#4CB4BB',
                    // '#FFC600',
                    // '#8B6AE6',
                    'black',
                ]}
                style={styles.launch}
            >
                <View>
                    <Lottie
                        source={require("../../assets/animation.json")}
                        autoPlay
                        loop
                        style={{ height: 350, width: 350, borderWidth : 2, borderColor : 'red' }}
                    />
                </View>
                <View style={styles.logoParent}>
                    <Animated.Image
                        source={require("../../assets/mainLogo.png")}
                        resizeMode="contain"
                        style={[
                            styles.launchinglogo,
                            { opacity: imgfadeinout, transform: [{ scale: imgscale }] },
                        ]}
                    ></Animated.Image>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default Launch;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    launch: {
        backgroundColor: "black",
        flex: 1,
        position: 'relative'
    },
    logoParent :  {
        width : width,
        justifyContent : 'center',
        alignItems : 'center',
    },
    launchinglogo: {
        height: 180,
        width: 180,
    },
});
