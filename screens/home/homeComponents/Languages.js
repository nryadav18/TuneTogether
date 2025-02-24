import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function Languages({ songsData }) {
    const languages = [
        { id: '1', name: 'English', image: 'https://via.placeholder.com/100' },
        { id: '2', name: 'Telugu', image: 'https://via.placeholder.com/100' },
        { id: '3', name: 'French', image: 'https://via.placeholder.com/100' },
        { id: '4', name: 'Spanish', image: 'https://via.placeholder.com/100' },
        { id: '5', name: 'German', image: 'https://via.placeholder.com/100' },
        { id: '6', name: 'Italian', image: 'https://via.placeholder.com/100' },
        { id: '7', name: 'Tamil', image: 'https://via.placeholder.com/100' },
        { id: '8', name: 'Hindi', image: 'https://via.placeholder.com/100' },
        { id: '9', name: 'Japanese', image: 'https://via.placeholder.com/100' },
        { id: '10', name: 'Arabic', image: 'https://via.placeholder.com/100' },
        { id: '11', name: 'Chinese', image: 'https://via.placeholder.com/100' },
    ];

    // Split languages into two rows
    const firstRow = languages.slice(0, Math.ceil(languages.length / 2));
    const secondRow = languages.slice(Math.ceil(languages.length / 2));

    const navigation = useNavigation();
    const OnHandlePress = (language) => {
        console.log(language);
        navigation.navigate('MoreOptions', { "songsData": songsData, "itemName": language.name });
    }

    return (
        <View style={styles.container}>


            {/* First Horizontal ScrollView */}
            <View>
                <ScrollView horizontal={true} style={styles.horizontalScroll}>
                    {firstRow.map((item) => (
                        <Pressable key={item.id} style={styles.languageCard} onPress={() => OnHandlePress(item)}>
                        {/* <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']}  style={styles.languageCard}>  */}
                            <Image source={{ uri: item.image }} style={styles.languageImage} />
                            <Text style={styles.languageText}>{item.name}</Text>
                        
                        </Pressable>
                    ))}
                </ScrollView>

                {/* Second Horizontal ScrollView */}
                <ScrollView horizontal={true} style={styles.horizontalScroll}>

                    {secondRow.map((item) => (
                        <Pressable key={item.id} style={styles.languageCard} onPress={() => OnHandlePress(item)}>

                            <Image source={{ uri: item.image }} style={styles.languageImage} />
                            <Text style={styles.languageText}>{item.name}</Text>

                            </Pressable>
                    ))}


                </ScrollView>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#000',
        padding: 10,
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    horizontalScroll: {
        marginVertical: 10,
    },
    languageCard: {
        backgroundColor: '#333',
        marginRight: 10,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
    },
    languageImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    languageText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
        marginTop: 5,
    },
});
