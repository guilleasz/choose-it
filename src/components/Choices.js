import React from 'react';
import { View } from 'react-native';
import SingleChoice from './SingleChoice';

const Choices = ({ choices, disable }) => (
  disable ?
    null :
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {Object.keys(choices).map(key =>
        <SingleChoice key={key} uid={key} choice={choices[key]} />)}
    </View>
);
export default Choices;
