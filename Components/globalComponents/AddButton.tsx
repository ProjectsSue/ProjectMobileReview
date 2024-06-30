import React from 'react';
import { StyleSheet, Text, Dimensions, Pressable } from 'react-native';
import baseStyles from '../../baseStyles';
const windowHeight = Dimensions.get('window').height;

const AddButton = (props) => {
  const incomingStyle = Array.isArray(props.style) ? props.style : [props.style];
  return ( 
    <Pressable style={[styles.cornerButton, baseStyles.alignCenter, ...incomingStyle]} onPress={() => props.navigation.navigate('ItemForm')}>
      <Text style={[styles.buttonText]}>+</Text>
    </Pressable>
  )
};

const styles = StyleSheet.create({
  cornerButton: {
    backgroundColor: '#141619',
    borderRadius: 50,
    width: 60,
    height: 60,
  },
  buttonText: {
    color: '#F2F2F2',
    fontSize: 35,
    top: '8%',
    // transform: [{translateX: 50}, {translateY: -50}],
  },
});

export default AddButton;