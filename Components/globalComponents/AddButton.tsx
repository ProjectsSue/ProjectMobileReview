import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import baseStyles from '../../baseStyles';

const AddButton = (props) => {
  const incomingStyle = Array.isArray(props.style) ? props.style : [props.style];
  return ( 
    <View style={[styles.comment, ...incomingStyle]}>
      <Pressable style={[styles.cornerButton]} onPress={() => props.navigation.navigate('ItemForm')}>
        <Text style={[styles.buttonText]}>+</Text>
      </Pressable>
    </View>
  )
};

const styles = StyleSheet.create({
  cornerButton: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#141619',
    borderRadius: 50,
    width: 60,
    height: 60,
  },
  buttonText: {
    color: '#F2F2F2',
    fontSize: 35,
    position: 'absolute',
    top: '8%',
    right: '34%',
    // transform: [{translateX: 50}, {translateY: -50}],
  },
});

export default AddButton;