import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Type Effectiveness Native</Text>
      <Text style={styles.subtitle}>Running on Node.js 22!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'indigo',
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginBottom: 16,
  },
  subtitle: {
    color: 'white',
    fontSize: 18,
  },
});