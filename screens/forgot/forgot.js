import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Forgot = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{color : 'black'}}>Forgot</Text>
        </SafeAreaView>
    )
}

export default Forgot

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
})