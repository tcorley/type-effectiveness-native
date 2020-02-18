import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PokemonType } from '../../types/d';
import { Result } from '../../data/results';
import TypeChip from '../TypeChip';

type Props = Result & {
  results: Record<string, PokemonType[]>;
};

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 24
  },
  multiplier: {
    color: 'plum',
    fontSize: 16,
    paddingRight: 8
  },
  output: {
    color: 'white',
    fontSize: 20
  },
  resultContainer: {
    paddingBottom: 8
  },
  typeContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 12
  }
});

const ResultPlatter = ({ title, path, multiplier, results }: Props) => (
  <View style={styles.resultContainer}>
    <Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.multiplier}>{`(x${multiplier})`}</Text>
    </Text>
    <View style={styles.typeContainer}>
      {results[path].map((pokemonType: PokemonType) => (
        <TypeChip name={pokemonType} key={pokemonType} />
      ))}
    </View>
  </View>
);

export default ResultPlatter;
