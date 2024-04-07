import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const MainButton = (props) => {
  const incomingStyle = Array.isArray(props.style) ? props.style : [props.style];
  return ( 
    <View style={[styles.mainButton, ...incomingStyle]}>
      <Text> Loading... </Text>
    </View>
  )
};

const styles = StyleSheet.create({
  mainButton: {
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center'
  },  
});

export default MainButton;