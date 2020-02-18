import React from 'react';
import { StyleSheet, View, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Home from './components/Home';

export default function App() {
  StatusBar.setBarStyle('light-content', true);

  return (
    <SafeAreaView style={styles.safeContainer} forceInset={{ bottom: 'never' }}>
      <ScrollView>
        <View style={styles.container}>
          <Home />
        </View>
      </ScrollView>
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
  }
});
