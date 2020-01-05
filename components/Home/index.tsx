import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import TypeSelector from '../TypeSelector';
import { Type } from '../../types/d';

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 40
  },
  output: {
    color: 'white',
    fontSize: 20
  },
  resultContainer: {
    paddingBottom: 20
  }
});

const Home = () => {
  const [selected, setSelected] = useState([]);
  function handleSelect(type: Type) {
    if (
      selected.filter(selectedType => selectedType.name === type.name)
        .length === 1
    ) {
      setSelected(
        selected.filter(selectedType => selectedType.name !== type.name)
      );
    } else {
      if (selected.length < 2) {
        setSelected([...selected, type]);
      }
    }
  }
  return (
    <View>
      <TypeSelector onSelect={handleSelect} selected={selected} />
      {!!selected.length && (
        <View>
          <View style={styles.resultContainer}>
            <Text style={styles.title}>Weak to:</Text>
            <Text style={styles.output}>
              {selected.map(type => type.weakTo.join(',')).join(',')}
            </Text>
          </View>
          <View style={styles.resultContainer}>
            <Text style={styles.title}>Immune to:</Text>
            <Text style={[styles.output]}>
              {selected.map(type => type.immuneTo.join(',')).join(',')}
            </Text>
          </View>
          <View style={styles.resultContainer}>
            <Text style={styles.title}>Resistant against:</Text>
            <Text style={styles.output}>
              {selected.map(type => type.resistantAgainst.join(',')).join(',')}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Home;
