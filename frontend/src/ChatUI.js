import React, { Component } from 'react'
import firebase from 'firebase';
import axios from 'axios';
import {
    Text,
    AsyncStorage,
    ScrollView,
    KeyboardAvoidingView,
    ImageBackground,
    View,
    StyleSheet,
    TextInput,
    FlatList,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view';
import {  Spinner, Card, CardSection } from './components/common';
import { Container, Header, Left, Body, Right, Icon, Button, Title } from 'native-base';
import Menu from 'react-native-pop-menu';
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    messages: {
        flex: 1,
        marginTop: 20,
},
    botMessages: {
        color: 'black',
        backgroundColor: 'white',
        padding: 10,
        fontWeight: 'bold',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        marginBottom: 0,
        fontStyle: 'italic',
        marginLeft: 10,
        borderTopRightRadius: 20,
        alignSelf: 'flex-start',
        bottom: 15,
        textAlign: 'left',
        width: '75%'
    },
userMessages: {
        backgroundColor: '#13a7b5',
        fontWeight: 'bold',
        color: 'white',
        padding: 10,
        marginBottom: 10,
        marginRight: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '75%',
        alignSelf: 'flex-end',
        textAlign: 'left'
    },
    textInput: {
        flex: 2,
        paddingLeft: 15
    },
    responseContainer : {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 0,
    },
    inputContainer: {
        borderRadius: 100,
        bottom: 5,
        marginLeft: 5,
        marginRight: 5,
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
})
export default class ChatUI extends Component {
    constructor(props) {
        super(props)
        this.state = {
          userInput: '',
          messages: [],
          inputEnabled: true,
         menuVisible: false,
          top:0,
          right:0,
        };
    }

    componentDidMount() {
      AsyncStorage.getItem('msgs')
        .then(req => JSON.parse(req))
        .then(json => this.setState({messages:Object.assign([], json)}))
        //.then(json => console.log(json))
        .catch(error => console.log("Persistence ERROR!"));
    }

    updateStorage() {
      const msgArr = JSON.stringify(this.state.messages);
      AsyncStorage.setItem('msgs', msgArr)
        .then()
        .catch(error => console.log('State Inpersistent!'));
    }
// Sends Text to the lex runtime
    handleTextSubmit() {
        let inputText = this.state.userInput.trim()
        if (inputText !== '')
            this.showRequest(inputText)
    }
// Populates screen with user inputted message
    showRequest(inputText) {
        // Add text input to messages in state
        let oldMessages = Object.assign([], this.state.messages)
        oldMessages.push({from: 'user', msg: inputText})
        this.setState({
            messages: oldMessages,
            userInput: '',
            inputEnabled: true
        })
        this.sendtoserver(inputText);
        this.updateStorage();
    }
sendtoserver(message){
  var text = message;
  axios.post('https://chat.calloused47.hasura-app.io/send', { text:text })
    .then(response => this.showResponse(response));
  console.log('request done');

}
showResponse(lexResponse) {
        let lexMessage = lexResponse.data[0];
        let oldMessages = Object.assign([], this.state.messages)
        oldMessages.push({from: 'bot', msg: lexMessage})
        this.setState({
            messages: oldMessages,
            inputEnabled: true
        })
        this.updateStorage();
    }
renderTextItem(item) {
        let style,
            responseStyle
        if (item.from === 'bot') {
            style = styles.botMessages
            responseStyle = styles.responseContainer
        } else {
            style = styles.userMessages
            responseStyle = {}
        }
        return (
            <View style={responseStyle}>
                <Text style={style}>{item.msg}</Text>
            </View>
        )
    }
render(){
        return (
          <ImageBackground
            style={{
                backgroundColor: '#ccc',
                flex: 1,
                position: 'relative',
                width: '100%',
                height: '100%',
                justifyContent: 'center'
            }}
            source={require('./images/bg.jpg')}
          >
          <View style={styles.container}>
          <View>
          <Header style={{backgroundColor:'#067c87', elevation: 2}}>
          <Left>

                        <Icon name='contact' style = {{fontSize: 35, color: 'white'}}/>

                    </Left>
                    <Body>
                      <Title>Watson</Title>
                    </Body>
                    <Right>
                    <Button transparent
                    onPress={() => {
                           this.setState({
                             menuVisible: true,
                             top:50,
                             right:-8,
                           });
                         }}>

                      <Icon name='more' style = {{fontSize: 35, color: 'white', marginRight:5}}/>
                    </Button>

                    </Right>
        </Header>
        <Menu visible={this.state.menuVisible}
                      onVisible={(isVisible) => {
                        this.state.menuVisible = isVisible
                      }}
                      top={this.state.top}
                      right={this.state.right}
                      data={[
                        {
                          title: 'Sign Out',
                          onPress: () => {
                          firebase.auth().signOut()
                          }
                        },
                        {
                          title: 'Clear Chat',
                          onPress: () => {
                            this.setState({
                                messages: [],
                                userInput: '',
                                inputEnabled: true,
                                menuVisible:false,
                            })
                          }
                        },
                      ]} contentStyle={{backgroundColor: '#067c87'}}/>
          </View>

              <ScrollView
                ref={ref => this.scrollView = ref}
                onContentSizeChange={(contentWidth, contentHeight) => {
                    this.scrollView.scrollToEnd({animate: true});
              }}>
                <KeyboardAvoidingView style={styles.messages}>
                    <FlatList
                        data={this.state.messages}
                        renderItem={({ item }) => this.renderTextItem(item)}
                        keyExtractor={(item, index) => index}
                        extraData={this.state.messages}
                    />
                </KeyboardAvoidingView>
              </ScrollView>

              <View style={styles.inputContainer}>
                  <TextInput
                      onChangeText={(text) => this.setState({userInput: text})}
                      value={this.state.userInput}
                      underlineColorAndroid={'transparent'}
                      style={styles.textInput}
                      autoCorrect
                      editable={this.state.inputEnabled}
                      placeholder={'Type here to chat!'}
                      autoFocus={false}
                      onSubmitEditing={this.handleTextSubmit.bind(this)}
                  />
              </View>
          </View>
          </ImageBackground>
        );
    }
}
