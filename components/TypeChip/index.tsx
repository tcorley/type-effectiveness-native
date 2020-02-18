import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colorTypeMap from '../../data/colorTypeMap';

type Props = {
  name: string;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    padding: 8,
    margin: 4,
    borderColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    position: 'relative'
  },
  text: {
    color: 'white'
  }
});

const TypeChip = ({ name }: Props) => (
  <View
    style={[
      styles.container,
      {
        backgroundColor: colorTypeMap[name]
      }
    ]}
  >
    <Text style={styles.text}>{name}</Text>
  </View>
);

export default TypeChip;
