
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './tuneStylings';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

const RoomArray = [
    { type: 'Duo', bgColor: 'black', size: '2', color: 'white', image: require('../../assets/duo.jpg') },
    { type: 'Trio', bgColor: 'lightgreen', size: '3', color: 'black', image: require('../../assets/trio.jpg') },
    { type: 'Squad', bgColor: 'yellow', size: '4', color: 'black', image: require('../../assets/squad.jpg') },
    { type: 'Party', bgColor: 'red', size: '6', color: 'white', image: require('../../assets/party.jpg') },
    { type: 'Astra', bgColor: 'skyblue', size: '8', color: 'black', image: require('../../assets/astra.jpg') },
    { type: 'Deca', bgColor: 'violet', size: '10', color: 'black', image: require('../../assets/deca.jpg') },
]

const TuneTogther = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='auto' />
            <ScrollView contentContainerStyle={styles.ttScroll} showsVerticalScrollIndicator = {false}>
                <View>
                    <Text style={styles.ttTitle}>Choose Your Space</Text>
                    <Text style={styles.ttSubTitle}>Note: A Space once created, can be on live upto 120 min..</Text>
                </View>
                <View style={styles.ttCardParent}>
                    {
                        RoomArray && RoomArray.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} style={[styles.ttCard, { backgroundColor: item.bgColor }]}
                                    onPress={() => navigation.navigate('SelectRoom', {"size" : item.size})}
                                >
                                    <Text style={[styles.ttRoomType, { color: item.color }]}>{item.type}</Text>
                                    <Text style={[styles.ttRoomSize, { color: item.color }]}>({item.size})</Text>
                                    <Image source={item.image} style={styles.ttCardImage} />
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default TuneTogther