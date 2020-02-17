import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Type } from '../../types/d';
import colorTypeMap from '../../data/colorTypeMap';

interface Props {
  type: Type;
  selected?: boolean;
  disabled?: boolean;
  onChange: (arg0: Type) => void;
}

const styles = StyleSheet.create({
  toggle: {
    padding: 16,
    margin: 4,
    borderColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    position: 'relative'
  },
  toggleText: {
    color: 'white',
    fontSize: 20
  },
  selected: {
    backgroundColor: 'purple'
  },
  disabled: {
    borderColor: 'grey'
  },
  disabledText: {
    color: 'grey'
  }
});

const TypeToggle = ({ type, selected, disabled, onChange }: Props) => {
  const classes = styles;

  function handleChange() {
    onChange(type);
  }

  return (
    <TouchableOpacity
      onPress={handleChange}
      style={[
        classes.toggle,
        selected && classes.selected,
        disabled && !selected && classes.disabled,
        selected && { backgroundColor: colorTypeMap[type.name] }
      ]}
      disabled={disabled && !selected}
    >
      <Text
        style={[
          classes.toggleText,
          disabled && !selected && classes.disabledText
        ]}
      >
        {type.name}
      </Text>
    </TouchableOpacity>
  );
};

export default TypeToggle;
