import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 0,
    padding: 3,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
    //marginTop:70,
    position: 'relative'
  }
};

export { CardSection };
