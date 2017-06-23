import React from 'react';
import { Text, View } from 'react-native';

const style = {
  textStyle: {
    fontSize: 30,
  },
  viewStyle: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
};

const Header = ({ name }) => {
  const { textStyle, viewStyle } = style;
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{name}</Text>
    </View>
  );
};

export default Header;
