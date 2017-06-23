import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

const style = {
  link: {
    color: '#0645AD',
    textDecorationLine: 'underline',
  },
};

const Link = ({ children, to }) => (
  <TouchableOpacity onPress={() => Actions[to]({ type: 'reset' })}>
    <Text style={style.link}>{children}</Text>
  </TouchableOpacity>
);

export default Link;
