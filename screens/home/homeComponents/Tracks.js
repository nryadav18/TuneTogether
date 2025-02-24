import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';

export default function Tracks() {
    const [heroes, setHeroes] = useState([]);
    const version = 'v3.0'; // API version
    const entity = 'tracks'; // Entity (e.g., 'albums', 'artists', 'tracks')
    const parameters = {
        client_id: '0a2b1967', // Replace with your Jamendo API client ID
        format: 'json',
        limit: 10, // Limit the number of results
        order: 'popularity_week', // Order by popularity this week
    };
    const fetchHeroes = async () => {
        const baseUrl = `https://api.jamendo.com/${version}/${entity}`;
        const url = `${baseUrl}?${new URLSearchParams(parameters).toString()}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            setHeroes(data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchHeroes();
    }, []);
    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 , padding: 10}}>
            {heroes.map((hero, index) => (
                <View key={index} style={{ alignItems: 'center' , paddingHorizontal: 5}}>   
                    <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: 'white' }}>  
                        <Image source={{ uri: hero.image }} style={{ width: 100, height: 100, borderRadius: 50 , backgroundColor:"white"}} />
                    </View>
                    <Text  numberOfLines={1} style={{ color: 'white', fontSize: 10, marginTop: 5, paddingHorizontal:5,  }}>{hero.name}</Text>
                </View>
            ))}
        </View>
        </View>
       
    );
}