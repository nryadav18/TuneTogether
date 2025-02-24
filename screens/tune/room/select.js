import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import createImg from '../../../assets/creating.jpg'
import joinImg from '../../../assets/joining.jpg'
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

const SelectRoom = ({ route }) => {

    const navigation = useNavigation();

    const SelectArr = [
        { title: 'Create a Room', bgImage: require('../../../assets/creating.jpg'), bgColor: 'skyblue', route: 'Create' },
        { title: 'Join a Room', bgImage: require('../../../assets/joining.jpg'), bgColor: 'lightgreen', route: 'Join' }
    ]

    const { size } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='auto' />
            <View>
                <Text style={styles.ttTitle}>Pick your Choice!</Text>
                <Text style={styles.ttSubTitle}>Create a Room or Join in a Room with {size} Persons</Text>
            </View>
            <View style={styles.ttRoomParent}>
                {
                    SelectArr && SelectArr.map((item, index) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate(`${item.route}`, { "size": size })} key={index} style={[styles.ttRooms, { backgroundColor: item.bgColor }]}>
                                <Text style={[styles.ttCardTitle, { marginTop: 12 }]}>{item.title} for</Text>
                                <Text style={[styles.ttCardTitle, { marginTop: 12 }]}>{size} People</Text>
                                <Image source={item.bgImage} style={styles.ttCardImage} />
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </SafeAreaView>
    )
}

export default SelectRoom;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    ttTitle: {
        fontWeight: 800,
        fontSize: 30,
        color: 'black',
        textAlign: 'center',
        margin: 2,
    },
    ttCardTitle: {
        fontWeight: 800,
        fontSize: 30,
        color: 'black',
        textAlign: 'center',
        margin: 2,
        lineHeight: 30,
    },
    ttSubTitle: {
        fontSize: 16,
        textAlign: 'center',
        margin: 2,
        fontWeight: 500,
    },
    ttRoomParent: {
        marginTop: 30,
        gap: 30,
        overflow: 'hidden',
        display: 'flex',
    },
    ttRooms: {
        height: 250,
        width: 250,
        marginTop: 30,
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 3,
        overflow: 'hidden',
        display: 'flex',
    },
    ttRoomBg: {
        height: 250,
        width: 250,
        borderRadius: 30,
    },
    ttCardImage: {
        height: 180,
        width: 180,
        position: 'absolute',
        bottom: -44,
        left: 30,
        transform: [{ rotate: '25deg' }],
        borderRadius: 4,
    }
})