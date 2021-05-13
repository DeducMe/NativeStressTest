
import React, {useEffect, useState, setState, useRef} from 'react';
import { StyleSheet, View, Text, ActivityIndicator, FlatList, Animated } from 'react-native';
import StoryView from '../components/StoryView/StoryView'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import storiesServerData from '../jsonFiles/storiesList.json'


function StoriesScreen({route}) {
  const user = route.params

  const [isLoading, setLoading] = useState(true);
  const [storiesData, setStoriesData] = useState([]);
  const [storyIndex, setStoryIndex] = useState(0);
  const [userId, setUserId] = useState(0);

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
      setStoriesData(storiesServerData)
      setLoading(false)
    }, 1000)
  })

  const viewableItemsChanged = useRef(({viewableItems})=>{
    setStoryIndex(viewableItems[0].index)
  }).current

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

  const goToNextStory = () => {
    if (storiesData.length - 1 <= storyIndex ) return
    
    setStoryIndex(storyIndex + 1);
    
    if(slideRef.current){
      slideRef.current.scrollToIndex({ animated: true, index: storyIndex });
    } 
  }
  const goToPrevStory = () => {
    
    if (storyIndex <= 0) return

    // if (storiesData[storyIndex].user_id !== userId) setUserId
    console.log(storyIndex)

    setStoryIndex(storyIndex - 1);
  }

  useEffect(() => {
    console.log(storyIndex)
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
            ({item}) => <StoryView data={item} goToPrevStory={goToPrevStory} goToNextStory={goToNextStory}></StoryView>
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
