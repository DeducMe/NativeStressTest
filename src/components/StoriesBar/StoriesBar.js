import React, { useEffect, useState } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import userStories from '../../jsonFiles/usersList.json'
import Story from './Story'
import styles from './styles'

function StoriesBar() {
    const [isLoading, setLoading] = useState(true);
    const [storiesData, setStoriesData] = useState(null);

    //Симулирую работу с сервером
    useEffect(() => {
        setTimeout(() => {
            setStoriesData(userStories)
            setLoading(false)
        }, 1000)
    }, [])

    return (
        storiesData && !isLoading ?
            <SafeAreaView>
                <ScrollView style={styles.container} horizontal>
                    {storiesData.map((item, index) =>
                        <Story item={item} key={index}></Story>
                    )}
                </ScrollView>
            </SafeAreaView>

            : <ActivityIndicator style={styles.loader} color="#999999" />
    );
}

export default StoriesBar
