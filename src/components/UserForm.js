import React from 'react';
import { Text, View } from 'react-native';
import { Input, Button, Link, Spinner, Card, CardItem } from './common';

const style = {
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  linkContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
};

const UserForm = ({
  action,
  emailChange,
  emailValue,
  passwordChange,
  passwordValue,
  onSubmit,
  loading,
  error,
}) => (
  <Card>
    <CardItem>
      <Input
        label="Email"
        onChangeText={emailChange}
        value={emailValue}
        placeholder="email@example.com"
        autoCorrect={false}
      />
    </CardItem>
    <CardItem>
      <Input
        label="Password"
        onChangeText={passwordChange}
        value={passwordValue}
        placeholder="password"
        autoCorrect={false}
        secureTextEntry
      />
    </CardItem>
    <CardItem style={{ flexDirection: 'column'}}>
      { loading ?
        <Spinner size="small" /> :
        <Button onPress={onSubmit}>
          {action}
        </Button> }
      { error ? <Text style={style.errorText}>{error}</Text> : null}
      <View style={style.linkContainer}>
        { action === 'Login' ?
          <Link to="signup">Sign Up</Link> : <Link to="login">Login</Link>}
      </View>
    </CardItem>
  </Card>
);

export default UserForm;
