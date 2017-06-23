import React from 'react';
import { View } from 'react-native';

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
  },
};


const CardItem = ({ children, style }) => (
  <View style={[styles.containerStyle, style]}>
    {children}
  </View>
);

export default CardItem;
