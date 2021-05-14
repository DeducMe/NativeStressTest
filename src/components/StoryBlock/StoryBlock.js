
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList, Animated } from 'react-native';
import StoryView from './StoryView/StoryView'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import styles from './styles'

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

function StoryBlock(props) {
    const { storiesData, goToPrevBlock, goToNextBlock, closeStory } = props
    const [storyChangeTimeoutActive, setStoryChangeTimeoutActive] = useState(true);
    const [intervalId, setIntervalId] = useState(true);
    const [storyIndex, setStoryIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    let animation = useRef(new Animated.Value(0));

    useInterval(() => {
        if (progress < 100) {
            setProgress(progress + 1);
        }
        if (progress >= 100) {
            setProgress(0);
        }
    }, 100);

    useEffect(() => {
        Animated.timing(animation.current, {
            toValue: progress,
            duration: 100,
            useNativeDriver: false
        }).start();
    }, [progress])

    const progressWidth = animation.current.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"],
        extrapolate: "clamp"
    })

    const slideRef = useRef(null)

    const timeoutTick = () => {
        setProgress(0);
        setStoryIndex((index) => index + 1);
        setStoryChangeTimeoutActive(true)
    }

    const onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
        setStoryIndex(changed[0].index);
        setProgress(0);

    }).current

    useEffect(() => {
        if (!storyChangeTimeoutActive) {
            clearInterval(intervalId)
            setStoryChangeTimeoutActive(true)

            return
        }

        const intervalIdLocal = setInterval(() => {
            timeoutTick()
        }, 10000)

        setIntervalId(intervalIdLocal)
    }, [storyChangeTimeoutActive])

    const goToNextStory = () => {
        setStoryChangeTimeoutActive(false)
        setProgress(0);

        setStoryIndex((index) => index + 1);
    }

    const goToPrevStory = () => {
        setStoryChangeTimeoutActive(false)
        setProgress(0);

        setStoryIndex((index) => index - 1);
    }

    useEffect(() => {
        return () => {
            clearInterval(intervalId)
        }
    }, [])

    useEffect(() => {
        if (storyIndex < 0) {
            setStoryIndex(0)
            goToPrevBlock()

            return
        }

        if (storiesData && storiesData.length <= storyIndex) {
            setStoryIndex(0)
            goToNextBlock()

            return
        }

        if (slideRef.current) {
            slideRef.current.scrollToIndex({ animated: false, index: storyIndex });
        }
    }, [storyIndex]);

    const closeStoryClear = () => {
        clearInterval(intervalId)
        closeStory()
    }

    return (
        <SafeAreaProvider>
            {storiesData ?
                <View>
                    <View style={{ width: '100%' }}>
                        <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
                    </View>
                    <FlatList
                        initialNumToRender={0}
                        data={storiesData}
                        renderItem={
                            ({ item }) => <StoryView data={item} goToPrevStory={goToPrevStory} goToNextStory={goToNextStory} closeStory={closeStoryClear}></StoryView>
                        }
                        onViewableItemsChanged={onViewableItemsChanged}
                        viewabilityConfig={{
                            itemVisiblePercentThreshold: 50
                        }}
                        horizontal
                        pagingEnabled
                        keyExtractor={(item) => item.id.toString()}
                        ref={slideRef}
                    >
                    </FlatList>
                </View>

                : <ActivityIndicator style={styles.loader} color="#999999" />
            }
        </SafeAreaProvider>
    );
}

export default StoryBlock
