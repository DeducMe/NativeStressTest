import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import StoriesBar from '../components/StoriesBar/StoriesBar'
import { SafeAreaProvider } from 'react-native-safe-area-context';

function HomeScreen() {
    return (
        <SafeAreaProvider>
            <StoriesBar />

            <View>
                <StatusBar />
            </View>
        </SafeAreaProvider>
    );
}

export default HomeScreen
