import React from 'react';
import { View, Text } from 'react-native';
import { Spinner } from './common';

const style = {
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'red',
    paddingTop: 200,
  },
  title: {
    fontSize: 70,
    color: 'white',
    fontStyle: 'italic',
    textAlign: 'center',
  },
};

const Cover = () => (
  <View style={style.container}>
    <Text style={style.title}>choose.it</Text>
    <Spinner color="white" />
  </View>
);

export default Cover;
