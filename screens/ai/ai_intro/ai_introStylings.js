import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container : {
        padding : 0,
        flex : 1,
        justifyContent : 'space-evenly',
        alignItems : 'center',
        textAlign : 'center',
        alignContent : 'center'
    },
    textParent : {
        alignItems : 'center',
        justifyContent : 'center',
        width : '80%',
    },
    mainTitle : {
        fontSize : 36,
        fontWeight : 900,
        paddingLeft : .1,
        margin : 10,
        color : '#f32b00'
    },
    subTitle : {
        fontSize : 16,
        fontWeight : 500,
    },
    lottie: {
        width: 400,
        height: 400,
        resizeMode: 'contain',
    },
    Button : {
        width : '80%',
        height : 60,
        borderRadius : 30,
        backgroundColor : 'skyblue',
        justifyContent : 'center',
        alignItems : 'center',
        shadowColor: '#e74c3c',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    buttonTitle : {
        fontSize : 30,
        fontWeight : 900,
        paddingLeft : .1,
    }
})

export default styles;