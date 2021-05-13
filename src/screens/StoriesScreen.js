
import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, View, ActivityIndicator} from 'react-native';
import StoryBlock from '../components/StoryView/StoryBlock'

import { SafeAreaProvider } from 'react-native-safe-area-context';
import storiesServerData from '../jsonFiles/storiesList.json'
import {useNavigation} from '@react-navigation/native';
import { useStateWithCallbackLazy } from 'use-state-with-callback';

function StoriesScreen({route}) {
  const userId = route.params

  const [isLoading, setLoading] = useState(true);
  const [storiesData, setStoriesData] = useStateWithCallbackLazy([]);
  const [blockIndex, setBlockIndex] = useStateWithCallbackLazy();

  useEffect(() => {
    // Cнизу показан пример работы с сервером, сервера нет, поэтому симулирую в SetTimeout
    // Скорее всего запрос на истории происходил бы по id пользователя, присылая все доступные для просмотра истории

    // fetch('https://placekitten.com/200/300')
    // .then((response) => response.json())
    // .then((json) => setStoriesData(json.data))
    // .catch((error) => console.error(error))
    // .finally(() => setLoading(false));

    setTimeout(()=>{
      let collapsedStories = {}
      storiesServerData.map((item, index)=>{
        const key = item.user_id
          if (!collapsedStories[key]) {
              collapsedStories[key] = [];
          }

          collapsedStories[key].push({
              "user_id":item.user_id,
              "id": item.id,
              "user_image": item.user_image,
              "user_name": item.user_name,
              "image": item.image
          });
      })
      collapsedStories = Object.keys(collapsedStories).map((key) => collapsedStories[key]);
      setStoriesData(collapsedStories, (stories) => {
          setBlockIndex(stories.findIndex((item) => item[0].user_id === userId), () => {
            setLoading(false)
          })
      })
      
    }, 1000)
  },[])

  const navigation = useNavigation()

  const closeStory = () =>{
    navigation.navigate('Home')
  }

  const goToNextBlock = () => {
    setBlockIndex((index) => index + 1);
  }

  const goToPrevBlock = () => {
    setBlockIndex((index) => index - 1);
  }

  useEffect(() => {
    console.log('blockIndex change', blockIndex)

    if (blockIndex < 0){
      setBlockIndex(0)
      return
    }

    if (storiesData.length !== 0 && storiesData.length <= blockIndex ) {
      // setBlockIndex(0)
      closeStory()

      return
    }
 }, [blockIndex]);

  return (
    <SafeAreaProvider>
      {!isLoading && storiesData ? 
      <View style={styles.container}>

        <StoryBlock
          storiesData={storiesData[blockIndex]}
          goToPrevBlock={goToPrevBlock}
          goToNextBlock={goToNextBlock}
          closeStory={closeStory}
        />
      </View>
          
        : <ActivityIndicator style={styles.loader} color="#999999" />
      }
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
    loader: {
      padding:10,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      width:'100%',
      height:'100%',
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    },
});
  
export default StoriesScreen
