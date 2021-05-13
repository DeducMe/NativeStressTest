import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import StoriesBar from '../components/StoriesBar/StoriesBar'
import { SafeAreaProvider } from 'react-native-safe-area-context';

function HomeScreen() {
  return (
    <SafeAreaProvider>
        <StoriesBar />

        <View>
          <StatusBar style="auto" />
        </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
    container: {
      padding:10,
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});
  
export default HomeScreen
