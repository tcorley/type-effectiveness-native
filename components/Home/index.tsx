import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import TypeSelector from '../TypeSelector';
import { Type, PokemonType } from '../../types/d';
import pokemonTypes from '../../data/types';
import results, { Result } from '../../data/results';
import ResultPlatter from '../ResultPlatter';

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 40,
  },
  description: {
    color: 'white',
    fontSize: 20,
  },
});

const Home = () => {
  const [selected, setSelected] = useState<Type[]>([]);
  function handleSelect(type: Type) {
    if (
      selected.filter((selectedType) => selectedType.name === type.name)
        .length === 1
    ) {
      setSelected(
        selected.filter((selectedType) => selectedType.name !== type.name)
      );
    } else {
      if (selected.length < 2) {
        setSelected([...selected, type]);
      }
    }
  }

  const calculatedResults: Record<string, PokemonType[]> = useMemo(() => {
    const superWeak: PokemonType[] = [];
    const weak: PokemonType[] = [];
    const superResistant: PokemonType[] = [];
    const resistant: PokemonType[] = [];
    const immune: PokemonType[] = [];
    const normal: PokemonType[] = [];

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
            [...type1.weakTo, ...type2.weakTo].filter((v) => v === p).length ==
            1
          )
            weak.push(p);
          else if (
            [...type1.resistantAgainst, ...type2.resistantAgainst].filter(
              (v) => v === p
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
      <Text style={styles.title}>Pokemon Type Effectiveness Calculator</Text>
      <Text style={styles.description}>
        Select a type or two to see the effectivness of attacks again them.
      </Text>
      <TypeSelector onSelect={handleSelect} selected={selected} />
      {results
        .filter((i) => calculatedResults[i.path].length > 0)
        .map((result: Result) => (
          <ResultPlatter
            {...result}
            results={calculatedResults}
            key={result.title}
          />
        ))}
    </View>
  );
};

export default Home;
