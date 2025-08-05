import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useContext, createContext } from 'react';
import Heroes from './homeComponents/Heros';
import TopArtists from './homeComponents/topArtists';
import Themes from './homeComponents/Themes';
import Languages from './homeComponents/Languages';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import AntDesign from '@expo/vector-icons/AntDesign';
import LottieView from 'lottie-react-native';

export const UserContext = createContext();
const Home = ({ navigation }) => {

    const [loader, setLoader] = useState(true)

    const DataUrl = 'https://184d-2409-40f0-104d-89ed-b44c-185c-8a72-d231.ngrok-free.app/get-data';
    const MainDataUrl = 'https://184d-2409-40f0-104d-89ed-b44c-185c-8a72-d231.ngrok-free.app/';
    const [fetchedData, setFeatchedData] = useState(null);

    const fetchTracks = async () => {
        setLoader(true)
        try {
            const response = await axios.get(DataUrl);
            const fetchedData1 = response.data;
            setFeatchedData(fetchedData1);
            console.log("fetchedData1");
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoader(false)
        }
    };



    useEffect(() => {
        fetchTracks();
    }, []);

    const onSearchPress = () => {
        console.log('Search Pressed');
        navigation.navigate('Search', { 'songsData': fetchedData });
    };
    return (
        <UserContext.Provider value={fetchedData || []}>
            {
                loader ? (
                    <View style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
                        <LottieView
                            source={require('../../assets/Music_Loader.json')}
                            autoPlay
                            loop
                            speed={1.5}
                            style={styles.lottie}
                        />
                    </View>
                ) : (<LinearGradient colors={['white', 'white', 'white']} style={styles.gradient}>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <View style={styles.header}>

                            <LinearGradient colors={['black', 'black']} style={styles.searchButton} >
                                <TouchableOpacity mode='contained' onPress={onSearchPress} style={{ flexDirection: "row", gap: 15, width: "100%", justifyContent: "center" }} >
                                    <AntDesign name="search1" size={20} color="white" />
                                    <Text style={{ fontSize: 20, color: "white" }}>Search</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                            {/* <NeonButton title="Search" icon="search" onPress={onSearchPress} style={styles.searchButton} /> */}
                        </View>

                        {/* Top Artists Section */}
                        <View style={styles.section}>
                            <Text style={styles.title}>Top Artists List</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <TopArtists songsData={fetchedData} />
                            </ScrollView>
                        </View>

                        {/* Themes Section */}
                        <View style={styles.section}  >
                            <Text style={styles.title}>Explore Themes</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <Themes songsData={fetchedData} />
                            </ScrollView>
                        </View>

                        {/* Languages Section */}
                        <View style={styles.section}>
                            <Text style={styles.title}>Explore Languages</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <Languages songsData={fetchedData} />
                            </ScrollView>
                        </View>

                        {/* Heroes Section */}
                        <View style={styles.section}>
                            <Text style={styles.title}>Top Heroes</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <Heroes songsData={fetchedData} />
                            </ScrollView>
                        </View>
                    </ScrollView>

                </LinearGradient>)
            }
        </UserContext.Provider>
    );
};

export default Home;

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        padding: 10,
    },
    header: {
        paddingLeft: 10,

    },
    searchButton: {
        borderRadius: 20,
        gap: 15,
        paddingVertical: 10,
        display: 'flex',
        fontSize: 34,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: 'transparent',
    },
    lottie: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
    },
    greeting: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    section: {
        marginVertical: 10,
    },
    title: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});
