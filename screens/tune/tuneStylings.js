import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    ttScroll : {
        display : 'flex',
        gap : 30,
    },
    ttTitle  :{
        fontWeight : 800,
        fontSize : 30,
        color : 'black',
        textAlign : 'center',
        margin : 2,
    },
    ttSubTitle : {
        fontSize : 16,
        textAlign : 'center',
        margin : 2,
        fontWeight : 500,
    },
    ttCardParent : {
        display : 'flex',
        width : "100%",
        flexWrap : 'wrap',
        gap : 30,
        flexDirection : 'row'
    },
    ttCard: {
        height: 120,
        width: 160,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        position: 'relative',
        overflow : 'hidden'
    },
    
    ttRoomType : {
        fontWeight : 900,
        fontSize : 30,
        position : 'absolute',
        top : 2,
        left : 4,
    },
    ttRoomSize : {
        fontSize : 24,
        fontWeight : 700,
        position : 'absolute',
        left : "74%",
        bottom : 2,
    },
    ttCardImage : {
        height : 70,
        width : 70,
        position : 'absolute',
        bottom : -14,
        left : 30,
        transform : [ { rotate : '20deg'} ]
    }
})

export default styles;