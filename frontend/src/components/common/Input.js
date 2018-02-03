import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry  }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        style={inputStyle}
      />
    </View>
  );
}

const styles = {
  inputStyle: {
    borderBottomWidth: null,
    color: '#fff',
    paddingRight: 5,

    marginLeft: 15,
    paddingLeft: 5,
    fontSize: 18,

    lineHeight: 23,
    flex: 2
  },
  // labelStyle: {
  //   fontSize: 18,
  //   paddingLeft: 16,
  //  flex:1,
  // },
  containerStyle: {
    height: 60,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { Input };
