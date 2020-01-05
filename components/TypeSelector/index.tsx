import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import TypeToggle from '../TypeToggle';
import types from '../../data/types';
import { Type } from '../../types/d';

const styles = StyleSheet.create({
  boundary: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingTop: 24,
    paddingBottom: 24
  }
});

interface Props {
  onSelect: (arg0: Type) => void;
  selected: Type[];
}

const TypeSelector = ({ onSelect, selected }: Props) => {
  const { boundary } = styles;

  function handleSelect(type: Type) {
    onSelect(type);
  }

  return (
    <View style={boundary}>
      {types.map((type: any) => (
        <TypeToggle
          key={type.name}
          type={type}
          onChange={handleSelect}
          selected={selected.filter(i => i.name === type.name).length === 1}
          disabled={selected.length === 2}
        />
      ))}
    </View>
  );
};

export default TypeSelector;
