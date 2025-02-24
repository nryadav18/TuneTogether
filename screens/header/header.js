import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import github from '../../assets/squad.jpg';
import Setting from 'react-native-vector-icons/Ionicons';
import AI from 'react-native-vector-icons/MaterialCommunityIcons';
import Arrow from 'react-native-vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Stars from '../../assets/stars2.png'
import { StatusBar } from 'expo-status-bar';

const Header = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    return (
        <View style={[styles.headerParent, { paddingTop: insets.top + 6, paddingBottom: 8 }]}>
            {navigation.canGoBack() && (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Arrow name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => navigation.navigate('TabScreen', { screen: 'Profile' })} style={{ flexDirection: 'row', gap: 20 }}>
                <Image source={github} style={styles.headerImage} />
                <View>
                    <Text style={styles.headerName}>Neduri Rajeswar Yadav</Text>
                    <Text style={styles.headerUserId}>@nryadav18</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {navigation.navigate('AI_Intro')}}>
                <Image source={Stars} style={{height : 40, width : 40}} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Setting name="settings-sharp" size={24} color="black" />
            </TouchableOpacity>
            <StatusBar style='auto' />
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    headerParent: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    headerImage: {
        height: 50,
        width: 50,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 30,
    },
    headerName: {
        fontWeight: '900',
        fontSize: 20,
    },
    headerUserId: {
        fontWeight: '900',
        fontSize: 16,
    },
});
