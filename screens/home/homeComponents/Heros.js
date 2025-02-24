import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
export default function TeluguHeroes({songsData}) {
  // Static data for Telugu heroes
  const heroes = [
    {
      id: 1,
      name: 'Chiranjeevi',
      image: require('../../../assets/Home/Heroes/Chiranjeevi.jpg'), // Use require for local assets
    },
    {
      id: 2,
      name: 'Mahesh Babu',
      image: require('../../../assets/Home/Heroes/Mahesh Babu.jpg'),
    },
    {
      id: 3,
      name: 'Pawan Kalyan',
      image: require('../../../assets/Home/Heroes/pawan Kalyan.jpg'),
    },
    {
      id: 4,
      name: 'Allu Arjun',
      image: require('../../../assets/Home/Heroes/Allu Arjun.jpg'),
    },
    {
      id: 5,
      name: 'Prabhas',
      image: require('../../../assets/Home/Heroes/prabhas.jpg'),
    },
    {
      id: 6,
      name: 'NTR Jr.',
      image: require('../../../assets/Home/Heroes/NTR.jpg'),
    },
  ];
  const navigation = useNavigation();
  const OnHandlePress = (hero) => {
    console.log(hero);
    navigation.navigate('MoreOptions', { "songsData": songsData, "itemName": hero.name });
  }

  const renderHero = (hero) => (
    <Pressable key={hero.id} style={styles.heroCard}  onPress={() => OnHandlePress(hero)}>
      <LinearGradient
        colors={['#ff8c00', '#ff6347', '#ff4500']}
        style={styles.gradient}
      >
        <Image source={hero.image} style={styles.image} />
      </LinearGradient>
      <Text style={styles.heroName}>{hero.name}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        
      >
        {heroes.map(renderHero)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  scrollContainer: {
    padding: 1,
    alignItems: 'center',
  },
  heroCard: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 75,
    width: 150,
    height: 150,
    // padding: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 60,
   
  },
  heroName: {
    color: 'gray', 
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 5,
  },
});
