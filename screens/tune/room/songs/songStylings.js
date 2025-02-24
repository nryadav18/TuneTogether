import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    SongListParent: {
        marginTop: 18,
        alignItems: 'center'
    },
    ttInputParent: {
        width: 400,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        height: 50,
        fontSize: 22,
        fontWeight: 800,
        alignContent: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    ttInput: {
        width: 340,
        paddingLeft: 10,
        height: 50,
        fontSize: 22,
        fontWeight: 800,
        alignContent: 'center',
        paddingTop: 4,
    },
    ttSearchBut: {
        height: 50,
        width: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5CB338',
        borderTopEndRadius: 10,
        borderBottomRightRadius: 10,
    },
    SongsList: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '96%',
        marginTop: 20
    },
    SongData: {
        flexDirection: 'row',
        height: 70,
        width: '100%',
        margin: 4,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderBottomColor: 'silver',
        borderBottomWidth: 1
    },
    SongImage: {
        height: 60,
        width: 60,
        borderRadius: 4,
    },
    SongTexts: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        margin : 8,
    },
    SongName: {
        fontSize: 18,
        fontWeight: 700
    },
    ArtistName: {
        fontSize: 14
    },
    lottie: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    birdLottie: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
    },
    PlayPauseButton: {
        padding: 10,
        backgroundColor: '#E6F7FF',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Dummy: {
        padding: 20,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width : '30%'
    },
    noSongText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'gray',
        marginTop: 20,
    },    
})

export default styles;