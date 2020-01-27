import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import TypeSelector from '../TypeSelector';
import { Type, PokemonType } from '../../types/d';

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
  function weaknessCalculate() {
    const typeMap = {}
    selected.forEach((selectedType: Type) => selectedType.weakTo.forEach((weakType: PokemonType) => {

      if (weakType in typeMap) {
        typeMap[weakType] += 1
      } else {
        typeMap[weakType] = 1
      }
    }))

    return [Object.entries(typeMap).filter(b => b[1] === 2).map(c => c[0]), Object.entries(typeMap).filter(b => b[1] === 1).map(c => c[0])]
  }
  function resistanceCalculate() {
    const typeMap = {}
    selected.forEach((selectedType: Type) => selectedType.resistantAgainst.forEach((resistantType: PokemonType) => {

      if (resistantType in typeMap) {
        typeMap[resistantType] += 1
      } else {
        typeMap[resistantType] = 1
      }
    }))

    return [Object.entries(typeMap).filter(b => b[1] === 2).map(c => c[0]), Object.entries(typeMap).filter(b => b[1] === 1).map(c => c[0])]
  }
  function immuneCalculate() {
    const types = [];
    selected.forEach((selectedType: Type) => selectedType.immuneTo.forEach((immuneType: PokemonType) => {

      if (!types.find(t => t === immuneType)) {
        types.push(immuneType)
      }
    }))
    return types;
  }

  const [superWeak, weak] = weaknessCalculate();
  const [superResistant, resistant] = resistanceCalculate();
  const immune = immuneCalculate();

  return (
    <View>
      <TypeSelector onSelect={handleSelect} selected={selected} />
      {!!selected.length && (
        <View>
          {!!superWeak.length && (
            <View style={styles.resultContainer}>
            <Text style={styles.title}>Super Weak to:</Text>
            <Text style={styles.output}>
              {superWeak.join(', ')}
            </Text>
          </View>
          )}
          {!!weak.length && (
            <View style={styles.resultContainer}>
            <Text style={styles.title}>Weak to:</Text>
            <Text style={styles.output}>
              {weak.join(', ')}
            </Text>
          </View>
          )}
          {!!immune.length && (
          <View style={styles.resultContainer}>
            <Text style={styles.title}>Immune to:</Text>
            <Text style={[styles.output]}>
              {immune.join(', ')}
            </Text>
          </View>
          )}
          {!!resistant.length && (
          <View style={styles.resultContainer}>
            <Text style={styles.title}>Resistant against:</Text>
            <Text style={styles.output}>
              {resistant.join(', ')}
            </Text>
          </View>
          )}
          {!!superResistant.length && (
          <View style={styles.resultContainer}>
            <Text style={styles.title}>Super Resistant against:</Text>
            <Text style={styles.output}>
              {superResistant.join(', ')}
            </Text>
          </View>
          )}
        </View>
      )}
    </View>
  );
};

export default Home;
