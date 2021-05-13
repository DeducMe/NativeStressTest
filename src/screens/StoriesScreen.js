
import React, {useEffect, useState, setState, useRef} from 'react';
import { StyleSheet, View, Text, ActivityIndicator, FlatList, Animated } from 'react-native';
import StoryView from '../components/StoryView/StoryView'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import storiesServerData from '../jsonFiles/storiesList.json'
import {useNavigation} from '@react-navigation/native';
import { useStateWithCallbackLazy } from 'use-state-with-callback';

function StoriesScreen({route}) {
  const userId = route.params

  const [isLoading, setLoading] = useState(true);
  const [storiesData, setStoriesData] = useStateWithCallbackLazy([]);
  const [storyIndex, setStoryIndex] = useState(-1);
  const [storyChangeTimeoutActive, setStoryChangeTimeoutActive] = useState(true);
  const [intervalId, setIntervalId] = useState(true);

  

  const slideRef = useRef(null)
  const scrollX = useRef(new Animated.Value(0)).current
  useEffect(() => {
    // Cнизу показан пример работы с сервером, сервера нет, поэтому симулирую в SetTimeout
    // Скорее всего запрос на истории происходил бы по id пользователя, присылая все доступные для просмотра истории

    // fetch('https://placekitten.com/200/300')
    // .then((response) => response.json())
    // .then((json) => setStoriesData(json.data))
    // .catch((error) => console.error(error))
    // .finally(() => setLoading(false));

    setTimeout(()=>{
      setStoriesData(storiesServerData, (stories) => {
        setLoading(false)
        setStoryIndex(stories.find((item) => item.user_id === userId).id - 1)
      })
      
    }, 1000)
  },[])

  const navigation = useNavigation()

  const viewableItemsChanged = useRef(({viewableItems})=>{
    setStoryIndex((index)=>{
      console.log(index, viewableItems[0].index)
      if (viewableItems[0].index > index) goToNextStory()
      if (viewableItems[0].index < index) goToPrevStory()
      return index
    })
  }).current

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

  const clearStoryChangeTimeout = () =>{
    setStoryChangeTimeoutActive(false)
  }

  const timeoutTick = () =>{
    setStoryIndex((index) => index + 1);
    setStoryChangeTimeoutActive(true)
  }

  useEffect(()=>{
    if(!storyChangeTimeoutActive){
      clearInterval(intervalId)
      setStoryChangeTimeoutActive(true)

      return
    }

    const intervalIdLocal = setInterval(()=>{
      console.log(storyChangeTimeoutActive)
      timeoutTick()
      
    },10000)
    setIntervalId(intervalIdLocal)
  },[storyChangeTimeoutActive])

  const closeStory = () =>{
    clearInterval(intervalId)

    navigation.navigate('Home')
  }

  const goToNextStory = () => {
    clearStoryChangeTimeout()

    setStoryIndex((index) => index + 1);
  }

  const goToPrevStory = () => {
    clearStoryChangeTimeout()

    setStoryIndex((index) => index - 1);
  }

  useEffect(() => {
    console.log('storyIndex change', storyIndex)

    if (storyIndex <= 0){
      setStoryIndex(0)
      return
    }

    if (storiesData.length !== 0 && storiesData.length - 1 <= storyIndex ) {
      setStoryIndex(0)
      closeStory()

      return
    }


    if(slideRef.current){
      slideRef.current.scrollToIndex({ animated: true, index: storyIndex });
    }
 }, [storyIndex]);

  return (
    <SafeAreaProvider>
      {!isLoading && storiesData ? 
      <View>
        <FlatList
          data={storiesData}
          renderItem={
            ({item}) => <StoryView data={item} goToPrevStory={goToPrevStory} goToNextStory={goToNextStory} closeStory={closeStory}></StoryView>
          }
          horizontal
          pagingEnabled
          keyExtractor={(item)=>item.id.toString()}
          onScroll={Animated.event([{nativeEvent:{contentOffset:{x:scrollX}}}],{
            useNativeDriver: false
          })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slideRef}
          onScrollToIndexFailed={info => {
            if(slideRef.current){
              setTimeout(()=>{
                slideRef.current.scrollToIndex({ animated: true, index: storyIndex });

              }, 10)
            }
          }}
        >
        </FlatList>
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
});
  
export default StoriesScreen
