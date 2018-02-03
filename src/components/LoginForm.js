import React from 'react';
import firebase from 'firebase';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';

export default class LoginForm extends React.Component {
  state={ email: '', password: '', error: '', isLoading: false };

  onButtonPress() {
    const { email, password } = this.state;
    this.setState({ error: '', isLoading: true });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFailed.bind(this));
      });
  }

  onLoginFailed() {
    this.setState({ error: 'Invalid Input', isLoading: false });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      error: '',
      isLoading: false
    });
  }

  showButtonOrSpinner() {
    if(this.state.isLoading){
      return <Spinner size='small' />;
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Sign In
      </Button>
    );
  }

  render() {
    return (
      <Card>
      <Text style={{ marginTop: 120,marginBottom:40, fontSize:25, color:'white'}}>
       WATSON BOT </Text>
        <CardSection>
          <Input
            placeholder ='E-mail'
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            placeholder='Password'
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>

        <Text style={styles.errorStyle}>{this.state.error}</Text>

        <CardSection>
          {this.showButtonOrSpinner()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'white'
  }
};
