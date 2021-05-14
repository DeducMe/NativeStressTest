import React from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles'

function Story(props) {
    const user = props.item

    const navigation = useNavigation()

    const storyOnPress = () => {
        console.log('pressed')
        navigation.navigate('Stories', user.id)
    }

    return (
        <TouchableWithoutFeedback onPress={storyOnPress}>
            <View style={styles.story}>
                <Image style={styles.avatarImage} source={{ uri: user.image }}></Image>
                <Text style={styles.userName}>{user.name}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default Story
