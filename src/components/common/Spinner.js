import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const Spinner = ({ size = 'large', color }) => (
  <View style={styles.spinnerStyle}>
    <ActivityIndicator color={color} size={size} />
  </View>
);

export default Spinner;
