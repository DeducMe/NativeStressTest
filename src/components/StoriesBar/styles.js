import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    story: {
        width: 70,
        marginRight: 20,
        alignItems: 'center'
    },
    avatarImage: {
        width: 70,
        height: 70,
        borderRadius: 50,
        borderColor: '#000',
        borderWidth: 1
    },
    userName: {
        textAlign: 'center',
        fontSize: 12,
        textTransform: 'lowercase',
        marginTop: 5
    },
    container: {
        padding: 20,
    },
    loader: {
        padding: 45,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default styles;
