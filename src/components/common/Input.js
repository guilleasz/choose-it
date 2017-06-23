import React from 'react';
import { TextInput, View, Text } from 'react-native';

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1,
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
};

const Input = ({
  label,
  onChangeText,
  value,
  placeholder = '',
  autoCorrect = true,
  secureTextEntry,
}) => (
  <View style={styles.containerStyle}>
    <Text style={styles.labelStyle}>{label}</Text>
    <TextInput
      placeholder={placeholder}
      autoCorrect={autoCorrect}
      value={value}
      onChangeText={onChangeText}
      style={styles.inputStyle}
      secureTextEntry={secureTextEntry}
    />
  </View>
);

export default Input;
