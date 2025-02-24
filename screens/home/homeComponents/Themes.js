import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground } from 'expo-image';
import { useNavigation } from '@react-navigation/native';

export default function Themes({songsData}) {
    const themes = [
        { id: '1', name: 'Sad', image: require('../../../assets/Home/Themes/sad.jpg') },
        { id: '2', name: 'Love', image: require('../../../assets/Home/Themes/love.jpg') },
        { id: '3', name: 'Angry', image: require('../../../assets/Home/Themes/Angry.jpg') },
        { id: '4', name: 'Moody', image: require('../../../assets/Home/Themes/Moody.jpg') },
        { id: '5', name: 'Pleasure', image: require('../../../assets/Home/Themes/Pleasure.jpg') },
        { id: '6', name: 'Sleepy', image: require('../../../assets/Home/Themes/Sleepy.jpg') },
        { id: '7', name: 'Excited', image: require('../../../assets/Home/Themes/Excited.jpg') },
        { id: '8', name: 'Relaxed', image: require('../../../assets/Home/Themes/Relaxed.jpg') },
        { id: '9', name: 'Hopeful', image: require('../../../assets/Home/Themes/Hopeful.jpg') },
        { id: '10', name: 'Surprised', image: require('../../../assets/Home/Themes/Surprised.jpg') },
        // Adding the new themes with updated images for better relevance
        { id: '11', name: 'Celebration', image: require('../../../assets/Home/Themes/Excited.jpg') }, // Celebration goes well with Excited
        { id: '12', name: 'Action', image: require('../../../assets/Home/Themes/Angry.jpg') }, // Action fits with Angry
        { id: '13', name: 'Romantic', image: require('../../../assets/Home/Themes/love.jpg') }, // Romantic fits with Love
        { id: '14', name: 'Philosophical', image: require('../../../assets/Home/Themes/Moody.jpg') }, // Philosophical fits with Moody
        { id: '15', name: 'Background Score', image: require('../../../assets/Home/Themes/Relaxed.jpg') }, // Background Score fits with Relaxed
        { id: '16', name: 'Folk', image: require('../../../assets/Home/Themes/Surprised.jpg') }, // Folk fits with Surprised
        { id: '17', name: 'Melody', image: require('../../../assets/Home/Themes/Pleasure.jpg') }, // Melody fits with Pleasure
        { id: '18', name: 'Pop', image: require('../../../assets/Home/Themes/Excited.jpg') }, // Pop fits with Excited
        { id: '19', name: 'Emotional', image: require('../../../assets/Home/Themes/sad.jpg') }, // Emotional fits with Sad
        { id: '20', name: 'Seizing Opportunity', image: require('../../../assets/Home/Themes/Hopeful.jpg') }, // Seizing Opportunity fits with Hopeful
        { id: '21', name: 'Resilience, Strength', image: require('../../../assets/Home/Themes/Angry.jpg') }, // Resilience fits with Angry
        { id: '22', name: 'Hope, Persistence', image: require('../../../assets/Home/Themes/Relaxed.jpg') }, // Hope fits with Relaxed
        { id: '23', name: 'Power, Confidence', image: require('../../../assets/Home/Themes/Surprised.jpg') }, // Power fits with Surprised
        { id: '24', name: 'Achieving Greatness', image: require('../../../assets/Home/Themes/Excited.jpg') }, // Greatness fits with Excited
        { id: '25', name: 'Perseverance, Hope', image: require('../../../assets/Home/Themes/Hopeful.jpg') }, // Perseverance fits with Hopeful
        { id: '26', name: 'Strength, Self-Belief', image: require('../../../assets/Home/Themes/Moody.jpg') }, // Self-Belief fits with Moody
        { id: '27', name: 'Empowerment, Courage', image: require('../../../assets/Home/Themes/Surprised.jpg') }, // Empowerment fits with Surprised
        { id: '28', name: 'Inspiration', image: require('../../../assets/Home/Themes/Excited.jpg') }, // Inspiration fits with Excited
        { id: '29', name: 'Love Failure', image: require('../../../assets/Home/Themes/sad.jpg') }, // Love Failure fits with Sad
        { id: '30', name: 'Peppy', image: require('../../../assets/Home/Themes/Excited.jpg') }, // Peppy fits with Excited
        { id: '31', name: 'Party', image: require('../../../assets/Home/Themes/Surprised.jpg') }, // Party fits with Surprised
        { id: '32', name: 'Feel-Good', image: require('../../../assets/Home/Themes/Relaxed.jpg') }, // Feel-Good fits with Relaxed
        { id: '33', name: 'Heartbreak', image: require('../../../assets/Home/Themes/sad.jpg') }, // Heartbreak fits with Sad
    ];
    
    const navigation = useNavigation();
        const OnHandlePress = (item) => { 
            console.log(item)
            navigation.navigate('MoreOptions', {'songsData':songsData, 'itemName':item});
            
        }
    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} style={styles.scrollView}>
                {themes.map((item) => (
                    <Pressable key={item.id} style={styles.themeCard} onPress={() => OnHandlePress(item)}>
                        <ImageBackground source={item.image} style={styles.themeImage}>
                            <LinearGradient
                                colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.7)']}
                                style={styles.gradientOverlay}
                            >
                                <Text style={styles.themeText}>{item.name}</Text>
                            </LinearGradient>
                        </ImageBackground>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 1,
        
    },
    scrollView: {
        marginVertical: 10,
        
    },
    themeCard: {
        marginHorizontal:8,
        borderRadius: 10,
        overflow: 'hidden',
        width: 100,
        elevation: 5, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    themeImage: {
        width: 100,
        height: 100,
        justifyContent: 'flex-end',
    },
    gradientOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 5,
    },
    themeText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
});
