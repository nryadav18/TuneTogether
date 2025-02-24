import { StyleSheet, Text, View, ImageBackground, Dimensions, Animated, TouchableOpacity } from 'react-native';
import React, { useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
const { width, height } = Dimensions.get("window");
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const Welcome = ({ navigation }) => {
    const slider = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(1)).current;
    const swiperRef = useRef(null);
    const [backgroundindex, setbackgroundindex] = useState(0);
    const [currentindex, setcurrentindex] = useState(0);

    const backgrounds = [require('../../assets/welcome-back.jpg'), require('../../assets/welcome-back1.jpg')]

    useEffect(() => {
        Animated.timing(slider, {
            toValue: 300,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, []);

    useEffect(() => {
        if (!backgrounds || backgrounds == []) return; // Prevent issues with undefined or empty array

        let isMounted = true;
        const interval = setInterval(() => {
            if (!isMounted) return;

            setbackgroundindex((prevIndex) => (backgrounds.length > 0 ? (prevIndex + 1) % backgrounds.length : 0));

            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]).start();
        }, 2000);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [backgrounds?.length]); // Use optional chaining



    const data = [
        {
            title: "Sync Your Favorite Tunes, Share Positive Vibes, and Create a Unified Experience of Sound and Emotion with Friends and Music Lovers",
        },
        {
            title: "Let the Music Flow, Share the Vibe, and Connect with the Rhythm of Life.",
        },
    ];

    const handlePressHandler = () => {
        if (currentindex < data.length - 1) {
            setcurrentindex((prev) => prev + 1);
            swiperRef.current.scrollToIndex({ index: currentindex + 1 });
        } else {
            navigation.navigate('Login')
            console.log("Get Started pressed");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={[styles.background, opacity]}>
                <ImageBackground
                    source={backgrounds[backgroundindex]}
                    style={[styles.background]}
                    resizeMode="cover"
                >

                    <TouchableOpacity style={styles.startbtn} onPress={handlePressHandler}>
                        <Text style={{ fontWeight: 'bold', fontSize: 24, textAlign: "center" }}>
                            {currentindex === data.length - 1 ? "Get Started" : "Next"}
                        </Text>
                    </TouchableOpacity>

                    <Animated.View style={[styles.slider, { height: slider }]}>
                        <SwiperFlatList
                            ref={swiperRef}
                            data={data}
                            renderItem={({ item }) => (
                                <View style={styles.slide}>
                                    <Text style={styles.slideText}>{item.title}</Text>
                                </View>
                            )}
                            horizontal
                            showPagination
                            paginationStyle={{
                                position: 'absolute',
                                top: '65%',
                                left: 0,
                                right: 0,
                                zIndex: 100,
                            }}
                            onChangeIndex={({ index }) => { setcurrentindex(index) }}
                        />
                    </Animated.View>
                </ImageBackground>
            </Animated.View>
        </SafeAreaView>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    background: {
        flex: 1,
        position: 'relative',
    },
    startbtn: {
        position: 'absolute',
        bottom: '3%',
        width: width - 60,
        display: 'flex',
        justifyContent: 'center',
        alignSelf: "center",
        paddingVertical: 8,
        paddingHorizontal: 80,
        backgroundColor: '#fff',
        borderRadius: 50,
        zIndex: 30,
    },
    slider: {
        position: 'absolute',
        bottom: 0,
        width: width,
        zIndex: 10,
        backgroundColor: 'black',
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
    },
    slide: {
        flex: 1,
        marginTop: 30,
        paddingHorizontal: 10,
        marginBottom: 150,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        width: width - 50,
        margin: 'auto',
        margin: 30,
    },
    slideText: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        lineHeight: 30,
        color: 'hsl(194, 100.00%, 50.00%)',
    },
});
