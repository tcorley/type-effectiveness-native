import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import Home from './components/Home';

export default function App() {
  StatusBar.setBarStyle('light-content', true);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>Choose a Type</Text>
        <Home />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: 'indigo',
    flex: 1
  },
  container: {
    padding: 24
  },
  text: {
    color: 'white',
    fontSize: 40
  }
});
