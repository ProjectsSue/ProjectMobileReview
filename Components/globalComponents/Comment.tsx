import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import baseStyles from '../../baseStyles';

const Comment = (props) => {
  const [value, onChangeText] = React.useState('Useless Multiline Placeholder');
  const incomingStyle = Array.isArray(props.style) ? props.style : [props.style];
  return ( 
    <View style={[styles.comment, ...incomingStyle]}>
      <TextInput
        editable
        multiline
        numberOfLines={4}
        maxLength={40}
        onChangeText={text => onChangeText(text)}
        value={value}
        style={[{padding: 10}, baseStyles.whiterBackground]}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  comment: {
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center'
  },  
});

export default Comment;