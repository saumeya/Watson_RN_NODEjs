import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    FlatList,
} from 'react-native'
// import AWS from 'aws-sdk/dist/aws-sdk-react-native'
// // Initialize the Amazon Cognito credentials provider
// AWS.config.region = 'us-east-1' // Region
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: 'Your-Pool-ID-8673',
// })
// let lexRunTime = new AWS.LexRuntime()
// let lexUserId = 'mediumBot' + Date.now()
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
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        marginBottom: 0,
        borderTopRightRadius: 20,
        alignSelf: 'flex-start',
        bottom: 23,
        textAlign: 'left',
        width: '75%'
    },
userMessages: {
        backgroundColor: '#40AD4D',
        color: 'white',
        padding: 10,
        marginBottom: 10,
        marginRight: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '65%',
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
        flexDirection: 'row',
        backgroundColor: '#EEEFFA',
    },
})
export default class App extends Component {
    constructor(props) {
        super(props)
    this.state = {
            userInput: '',
            messages: [],
            inputEnabled: true,
        }
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
this.sendtoserver(inputText)

    }
sendtoserver(message){
  var text = message
  var request = new XMLHttpRequest();
  console.log('request done');
request.onreadystatechange = (e) => {
  if (request.readyState !== 4) {
    return;
  }

  if (request.status === 200) {
    console.log('success', request.responseText);
  } else {
    console.warn('error2');
  }
};
console.log(text);
request.open('POST','http://192.168.56.1:8080/send', true);
//request.open('GET', 'https://mywebsite.com/endpoint/');
 request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({text:text}));
}
// Responsible for sending message to lex
    // sendToLex(message) {
    //     let params = {
    //         botAlias: '$LATEST',
    //         botName: 'Your-Bot-Name',
    //         inputText: message,
    //         userId: lexUserId,
    //     }
    //     lexRunTime.postText(params, (err, data) => {
    //         if(err) {
    //             // TODO SHOW ERROR ON MESSAGES
    //         }
    //         if (data) {
    //             this.showResponse(data)
    //         }
    //     })
    // }
showResponse(lexResponse) {
        let lexMessage = lexResponse.message
        let oldMessages = Object.assign([], this.state.messages)
        oldMessages.push({from: 'bot', msg: lexMessage})
        this.setState({
            messages: oldMessages,
            inputEnabled: true
        })
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
        return(
            <View style={styles.container}>
                <View style={styles.messages}>
                    <FlatList
                        data={this.state.messages}
                        renderItem={({ item }) =>    this.renderTextItem(item)}
                        keyExtractor={(item, index) => index}
                        extraData={this.state.messages}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        onChangeText={(text) => this.setState({userInput: text})}
                        value={this.state.userInput}
                        style={styles.textInput}
                        editable={this.state.inputEnabled}
                        placeholder={'Type here to talk!'}
                        autoFocus={true}
                        onSubmitEditing={this.handleTextSubmit.bind(this)}
                    />
                </View>
            </View>
)
    }
}
