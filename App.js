import React from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, Card, CardSection } from './src/components/common';
import LoginForm from './src/components/LoginForm';
import ChatUI from './src/ChatUI';

export default class App extends React.Component {
  state={ isLoggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDli82ORX2XTPzWkcygWbqvpC5oncubGLM',
      authDomain: 'react-native2611.firebaseapp.com',
      databaseURL: 'https://react-native2611.firebaseio.com',
      projectId: 'react-native2611',
      storageBucket: 'react-native2611.appspot.com',
      messagingSenderId: '1084501269739'
    });

    firebase.auth().onAuthStateChanged((user) => {
      (user)?this.setState({ isLoggedIn: true }):this.setState({ isLoggedIn: false });
    });
  }

  showButtonOrForm() {
    switch(this.state.isLoggedIn) {
      case true:
        return (
          <ChatUI />
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner />;
    }
  }
  render() {return (this.showButtonOrForm());}
}
