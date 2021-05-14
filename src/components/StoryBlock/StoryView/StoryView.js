
import React from 'react';
import { View, Image, Text, TouchableOpacity, useWindowDimensions, TouchableHighlight } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';


function StoriesScreen(props) {
    const { data, goToPrevStory, goToNextStory, closeStory } = props
    const { width } = useWindowDimensions()

    return (
        <SafeAreaView style={[styles.container, { width }]}>
            <TouchableHighlight onPress={closeStory} style={styles.closeBtn}>
                <Ionicons name={"close-outline"} size={30} color="#fff" />
            </TouchableHighlight>

            <View style={[styles.userView, { width }]}>
                <Image style={styles.avatarImage} source={{ uri: data.user_image }}></Image>
                <Text style={styles.userName}>{data.user_name}</Text>
            </View>
            <Image style={[styles.storyImage, { width, resizeMode: "contain" }]} source={{ uri: data.image }}></Image>
            <View style={[styles.buttonContainer, { width }]}>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => goToPrevStory()} />
                <TouchableOpacity style={{ flex: 1 }} onPress={() => goToNextStory()} />
            </View>
        </SafeAreaView>
    );
}

export default StoriesScreen
