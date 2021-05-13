import React from 'react';
import { StyleSheet, Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import {useNavigation} from '@react-navigation/native';

function Story(props) {
    const user = props.item

    const navigation = useNavigation()

    const storyOnPress = () =>{
        console.log('pressed')
        navigation.navigate('Stories', user.id)
    }

    return (
        <TouchableWithoutFeedback onPress={storyOnPress}>
            <View style={styles.story}>
                <Image style={styles.avatarImage} source={{uri:user.image}}></Image>
                <Text style={styles.userName}>{user.name}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
  story:{
    width: 70,
    marginRight:20,
    alignItems:'center'
  },
  avatarImage:{
    width:70,
    height:70,
    borderRadius:50,
    borderColor: '#000',
    borderWidth:1
  },
  userName:{
    textAlign:'center',
    fontSize:12,
    textTransform:'lowercase',
    marginTop:5
  }
});

export default Story
