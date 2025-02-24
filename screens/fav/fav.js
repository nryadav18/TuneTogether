import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Favourites = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{color : 'black'}}>Favourites</Text>
        </SafeAreaView>
    )
}

export default Favourites

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
})