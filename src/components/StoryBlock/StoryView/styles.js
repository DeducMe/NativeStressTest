import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    storyImage: {
        height: '100%',
    },
    buttonContainer: {
        height: '100%',
        position: 'absolute',
        top: 0,
        flexDirection: 'row'
    },
    avatarImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 1
    },
    userView: {
        alignItems: 'center',
        padding: 5,
        flexDirection: 'row',
        zIndex: 1,
        position: 'absolute',
        top: 10,
        left: 0,
        backgroundColor: 'rgba(52, 52, 52, 0.2)',
    },
    userName: {
        marginLeft: 10,
        color: '#fff',
        fontWeight: 'bold'
    },
    closeBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        right: 15,
        position: 'absolute',
        zIndex: 2,
        top: 15,
        width: 40,
        height: 40
    }
})

export default styles;