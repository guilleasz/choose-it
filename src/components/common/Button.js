import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonStyle: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5,
  },
};

const Button = ({ onPress, children, style, textStyle }) => (
  <TouchableOpacity onPress={onPress} style={[styles.buttonStyle, style]}>
    <Text style={[styles.textStyle, textStyle]}>{children}</Text>
  </TouchableOpacity>
);

export default Button;
