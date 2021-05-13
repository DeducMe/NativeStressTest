
import React, {useEffect, useState, setState, useRef} from 'react';
import { StyleSheet, View, Text, ActivityIndicator, FlatList, Animated } from 'react-native';
import StoryView from './StoryView'
import { SafeAreaProvider } from 'react-native-safe-area-context';

function StoryBlock(props) {
  const {storiesData, goToPrevBlock, goToNextBlock, closeStory} = props
  const [storyChangeTimeoutActive, setStoryChangeTimeoutActive] = useState(true);
  const [intervalId, setIntervalId] = useState(true);

  const [storyIndex, setStoryIndex] = useState(0);

  const slideRef = useRef(null)
  const scrollX = useRef(new Animated.Value(0)).current

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
      timeoutTick()
    },10000)
    setIntervalId(intervalIdLocal)
  },[storyChangeTimeoutActive])

  const goToNextStory = () => {
    clearStoryChangeTimeout()

    setStoryIndex((index) => index + 1);
  }

  const goToPrevStory = () => {
    clearStoryChangeTimeout()

    setStoryIndex((index) => index - 1);
  }

  useEffect(() => {
    console.log('story ind', storyIndex)

    
    return () => {
      setStoryIndex(0)

      clearStoryChangeTimeout()
    }
  }, [])

  useEffect(() => {
    console.log('story ind', storyIndex)

    if (storyIndex < 0){
      setStoryIndex(0)

      goToPrevBlock()

      return
    }

    console.log(storiesData == undefined)
    if (storiesData && storiesData.length <= storyIndex ) {
      setStoryIndex(0)
      console.log('nextBlock')
      goToNextBlock()

      return
    }

    if(slideRef.current){
      slideRef.current.scrollToIndex({ animated: false, index: storyIndex });
    }
 }, [storyIndex]);

  return (
    <SafeAreaProvider>
      {storiesData ? 
      
      <View>
        <FlatList
          initialNumToRender = {0}
          data={storiesData}
          renderItem={
            ({item}) => <StoryView data={item} goToPrevStory={goToPrevStory} goToNextStory={goToNextStory} closeStory={closeStory}></StoryView>
          }
          horizontal
          pagingEnabled
          keyExtractor={(item)=>item.id.toString()}
          // onScroll={Animated.event([{nativeEvent:{contentOffset:{x:scrollX}}}],{
          //   useNativeDriver: false
          // })}
          scrollEventThrottle={32}
          ref={slideRef}
          // onScrollToIndexFailed={info => {
          //   if(slideRef.current){
          //     setTimeout(()=>{
          //       slideRef.current.scrollToIndex({ animated: true, index: storyIndex });

          //     }, 100)
          //   }
          // }}
        >
        </FlatList>
         {/* <StoryView data={storiesData[0]} goToPrevStory={goToPrevStory} goToNextStory={goToNextStory} closeStory={closeStory}></StoryView> */}
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
  
export default StoryBlock
