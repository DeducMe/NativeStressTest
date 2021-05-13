
import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, useWindowDimensions, TouchableHighlight} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
function StoriesScreen(props) {
    const {data, goToPrevStory, goToNextStory, closeStory} = props
    const {width} = useWindowDimensions()
    
    return (
        <SafeAreaView style={[styles.container, {width}]}>
            <TouchableHighlight onPress={closeStory} style={styles.closeBtn}>
                <Ionicons name={"close-outline"} size={30} color="#fff"/>
            </TouchableHighlight>

            <View style={[styles.userView, {width}]}>
                <Image style={styles.avatarImage} source={{uri:data.user_image}}></Image>
                <Text style={styles.userName}>{data.user_name}</Text>
            </View>
            <Image style={[styles.storyImage, {width, resizeMode:"contain"}]} source={{uri:data.image}}></Image>
            <View style={[styles.buttonContainer, {width}]}>
                <TouchableOpacity style={{flex: 1}} onPress={() => goToPrevStory()} />
                <TouchableOpacity style={{flex: 1}} onPress={() => goToNextStory()} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    },
    storyImage: {
        height:'100%',
    },
    buttonContainer: {
        height: '100%',
        position: 'absolute',
        top: 0,
        flexDirection: 'row'
    },
    avatarImage:{
        width:50,
        height:50,
        borderRadius:50,
        borderWidth:1
    },
    userView:{
        alignItems:'center',
        padding:5,
        flexDirection:'row',
        zIndex:1,
        position: 'absolute',
        top: 0,
        left:0,
        backgroundColor: 'rgba(52, 52, 52, 0.2)',
    },
    userName:{
        marginLeft:10,
        color:'#fff',
        fontWeight:'bold'
    },
    closeBtn:{
        alignItems:'center',
        justifyContent:'center',
        right:15,
        position: 'absolute',
        zIndex:2,
        top:15,
        width:40,
        height:40
    }
});
  
export default StoriesScreen
