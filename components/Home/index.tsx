import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import TypeSelector from '../TypeSelector';
import { Type, PokemonType } from '../../types/d';
import pokemonTypes from '../../data/types';

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
  const [selected, setSelected] = useState<Type[]>([]);
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

  const {
    superWeak,
    weak,
    superResistant,
    resistant,
    immune,
    normal
  } = useMemo(() => {
    const superWeak = [];
    const weak = [];
    const superResistant = [];
    const resistant = [];
    const immune = [];
    const normal = [];

    pokemonTypes
      .map((t: Type) => t.name)
      .forEach((p: PokemonType) => {
        const type1 = selected[0];
        const type2 = selected[1];

        if (type1 && !type2) {
          if (type1.weakTo.includes(p)) weak.push(p);
          else if (type1.resistantAgainst.includes(p)) resistant.push(p);
          else if (type1.immuneTo.includes(p)) immune.push(p);
          else normal.push(p);
        } else if (type1 && type2) {
          if (type1.weakTo.includes(p) && type2.weakTo.includes(p))
            superWeak.push(p);
          else if (
            type1.resistantAgainst.includes(p) &&
            type2.resistantAgainst.includes(p)
          )
            superResistant.push(p);
          else if (
            (type1.weakTo.includes(p) && type2.resistantAgainst.includes(p)) ||
            (type1.resistantAgainst.includes(p) && type2.weakTo.includes(p))
          )
            normal.push(p);
          else if (type1.immuneTo.includes(p) || type2.immuneTo.includes(p))
            immune.push(p);
          else if (
            [...type1.weakTo, ...type2.weakTo].filter(v => v === p).length == 1
          )
            weak.push(p);
          else if (
            [...type1.resistantAgainst, ...type2.resistantAgainst].filter(
              v => v === p
            ).length == 1
          )
            resistant.push(p);
          else normal.push(p);
        }
      });

    return { superWeak, weak, superResistant, resistant, immune, normal };
  }, [selected]);

  return (
    <View>
      <TypeSelector onSelect={handleSelect} selected={selected} />
      {!!selected.length && (
        <View>
          {!!superWeak.length && (
            <View style={styles.resultContainer}>
              <Text style={styles.title}>Super Weak to:</Text>
              <Text style={styles.output}>{superWeak.join(', ')}</Text>
            </View>
          )}
          {!!weak.length && (
            <View style={styles.resultContainer}>
              <Text style={styles.title}>Weak to:</Text>
              <Text style={styles.output}>{weak.join(', ')}</Text>
            </View>
          )}
          {!!immune.length && (
            <View style={styles.resultContainer}>
              <Text style={styles.title}>Immune to:</Text>
              <Text style={[styles.output]}>{immune.join(', ')}</Text>
            </View>
          )}
          {!!resistant.length && (
            <View style={styles.resultContainer}>
              <Text style={styles.title}>Resistant against:</Text>
              <Text style={styles.output}>{resistant.join(', ')}</Text>
            </View>
          )}
          {!!superResistant.length && (
            <View style={styles.resultContainer}>
              <Text style={styles.title}>Super Resistant against:</Text>
              <Text style={styles.output}>{superResistant.join(', ')}</Text>
            </View>
          )}
          {!!normal.length && (
            <View style={styles.resultContainer}>
              <Text style={styles.title}>Damaged normally by:</Text>
              <Text style={styles.output}>{normal.join(', ')}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default Home;
