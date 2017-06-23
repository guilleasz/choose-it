import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Input, Button, Card, CardItem, Spinner } from './common';

const styles = {
  addButtonText: {
    fontSize: 20,
  },
  addButton: {
    borderWidth: 0,
  },
  listText: {
    fontSize: 18,
    paddingLeft: 20,
    paddingTop: 5,
    flex: 11,
  },
  deleteButtonText: {
    color: 'red',
  },
  deleteButton: {
    borderWidth: 0,
    flex: 1,
  },
  userSelectorText: {
    padding: 10,
    fontSize: 18,
  },
};

const PlanForm = ({
  planValue,
  planChange,
  choices,
  choiceChange,
  choiceValue,
  addChoice,
  removeChoice,
  users,
  userChange,
  addUser,
  removeUser,
  userValue,
  onSubmit,
  action,
  loading,
  error,
  selectUser,
  filteredUser,
  selectedUser,
}) => (
  <KeyboardAwareScrollView
    resetScrollToCoords={{ x: 0, y: 0 }}
    scrollEnabled={true}
  >
    <Card>
      <CardItem>
        <Input
          label="Plan"
          onChangeText={planChange}
          placeholder="Where are we eating this Friday Night?"
          value={planValue}
        />
      </CardItem>
      {choices.map(choice => (
        <CardItem key={choice}>
          <Text style={styles.listText}>{choice}</Text>
          <Button
            style={styles.deleteButton}
            textStyle={styles.deleteButtonText}
            onPress={() => removeChoice(choice)}
          >X</Button>
        </CardItem>
      ))}
      <CardItem>
        <Input
          label="Add Choice"
          onChangeText={choiceChange}
          value={choiceValue}
          placeholder="Pizza Night!"
        />
        <Button
          style={styles.addButton}
          onPress={addChoice}
          textStyle={styles.addButtonText}
        >
          +</Button>
      </CardItem>
      {users.map((user, idx) => (
        <CardItem key={user.uid}>
          <Text style={styles.listText}>{user.email}</Text>
          <Button
            style={styles.deleteButton}
            textStyle={styles.deleteButtonText}
            onPress={() => removeUser(idx)}
          >
            X</Button>
        </CardItem>
      ))}
      <CardItem>
        <Input
          label="Add Participant"
          onChangeText={userChange}
          value={userValue}
          placeholder="email@example.com"
          autoCorrect={false}
        />
        {selectedUser ?
          <Button
            style={styles.addButton}
            onPress={addUser}
            textStyle={styles.addButtonText}
          >
            +</Button>
            : null
        }
      </CardItem>
      <CardItem style={{ flexDirection: 'column' }} >
        {filteredUser.map(user => (
          <TouchableOpacity key={user.uid} onPress={() => selectUser(user)}>
            <Text style={styles.userSelectorText}>{user.email}</Text>
          </TouchableOpacity>
        ))}
      </CardItem>
      <CardItem style={{ flexDirection: 'column' }}>
        {!loading ?
          <Button onPress={onSubmit}>{action}</Button>
          : <Spinner />
        }
        {error ?
          <Text style={{ color: 'red' }}>There have been an error...</Text>
          : null
        }
      </CardItem>
    </Card>
  </KeyboardAwareScrollView>

);


export default PlanForm;
