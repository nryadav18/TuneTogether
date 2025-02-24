import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Friends = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{color : 'black'}}>Friends</Text>
        </SafeAreaView>
    )
}

export default Friends

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
})