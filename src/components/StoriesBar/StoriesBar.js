import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import stories from '../../jsonFiles/usersList.json'
import Story from './Story'

function StoriesBar() {
  return (
    <SafeAreaView>
        <ScrollView style={styles.container} horizontal>
            {stories.map((item, index) =>
              <Story item={item} key={index}></Story>
            )}
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding:20,
  }
});

export default StoriesBar
