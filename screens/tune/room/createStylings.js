import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    RoomContainer : {
        alignItems : 'center',
    },
    RoomCode: {
        height: 70,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    RoomCodeText: {
        fontWeight: '900',
        fontSize: 22,
        width: 70,
        wordWrap: 'wrap',
    },
    RoomCodeBoxParent: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    RoomCodeBoxes: {
        height: 40,
        width: 40,
        margin: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        alignContent: 'center',
    },
    RoomCodeNumber: {
        fontSize: 30,
        fontWeight: '900',
        paddingLeft: 1,
    },
    CodeBar: {
        height: 3,
        width: 30,
        backgroundColor: 'silver',
        borderRadius: 10,
    },
    RoomCodeCopy: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
    },
    toastContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2ecc71',
        borderRadius: 12,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 10,
        maxWidth: '80%',
        alignSelf: 'center',
        position : 'relative',
        zIndex: 1,
    },
    toastIcon: {
        marginRight: 15,
    },
    toastContent: {
        flex: 1,
    },
    toastTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        marginBottom: 5,
    },
    toastMessage: {
        fontSize: 14,
        color: 'white',
    },
    SongImageParent: {
        height: 420,
        width : '96%',
        justifyContent : 'space-evenly',
        alignItems : 'center'
    },
    NowPlaying : {
        fontWeight : 600,
        fontSize : 24
    },
    SongImage: {
        height : 320,
        width : 320,
        borderRadius : 20,
    }, 
    ThreeLayout : {
        width : "96%"
    },
    ThreeOptions : {
        justifyContent : 'space-evenly',
        alignItems : 'center',
        flexDirection : 'row'
    },
    ThreeBox : {
        height : 40,
        width : 120,
        justifyContent : 'center',
        alignItems : 'center',
        paddingLeft : .1,
        margin : 4,
        borderBottomWidth : 2,
        borderBottomColor : 'silver',
    },
    ThreeText : {
        fontWeight : 900,
        fontSize : 18,
        
    }
});

export default styles;