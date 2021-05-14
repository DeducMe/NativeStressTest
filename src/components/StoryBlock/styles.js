import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    loader: {
        padding: 10,

        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressBar: {
        backgroundColor: "#8BED4F",
        height: 5,
        marginBottom: 10
    }
});

export default styles;
