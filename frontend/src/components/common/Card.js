import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    // borderWidth: 1,
    // borderRadius: 2,
    // borderColor: '#ddd',
    // borderBottomWidth: 0,
    // shadowColor: '#fff',
    // shadowOffset: { width: 0, height: 2 },
    //flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    top:0,
    bottom:0,
    backgroundColor: '#067c87',
    alignItems: 'center',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    paddingTop:10,


  }
};

export { Card };
