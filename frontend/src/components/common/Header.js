// Import libraries for making a component
import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'native-base';
// Make a component
const Header = (props) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}Watson
      <Icon name = 'more' style = {{fontSize: 20, color: 'white', alignSelf:'flex-end',marginLeft:40}}/>
      </Text>
    </View>
  );
};

const styles = {
  viewStyle: {

    backgroundColor: '#067c87',
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    paddingTop: 15,
      shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    fontSize: 20,
    color: '#fff',
    marginLeft:20,
    marginBottom:10,
    alignSelf:'flex-start',

  }
};

// Make the component available to other parts of the app
export { Header };
