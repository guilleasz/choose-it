import React from 'react';
import { Text, View, Modal } from 'react-native';
import { CardItem, Button } from './';

const styles = {
  cardItemStyle: {
    justifyContent: 'center',
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40,
  },
  containerStyle: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  button: {
    padding: 5,
    marginRight: 20,
    marginLeft: 20,
  },
};

const Confirm = ({ children, onAccept, onDecline, visible }) => (
  <Modal
    animationType="fade"
    onRequestClose={() => {}}
    transparent
    visible={visible}
  >
    <View style={styles.containerStyle}>
      <CardItem style={styles.cardItemStyle}>
        <Text style={styles.textStyle}>{children}</Text>
      </CardItem>
      <CardItem style={styles.buttonContainer}>
        <Button style={styles.button} onPress={onAccept}>Yes</Button>
        <Button style={styles.button} onPress={onDecline}>No</Button>
      </CardItem>
    </View>
  </Modal>
);


export default Confirm;
