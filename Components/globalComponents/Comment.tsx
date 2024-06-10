import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import baseStyles from '../../baseStyles';
import I18n from '../../locales';
import PropTypes from 'prop-types'; 

const Comment = (props) => {
  const incomingStyle = Array.isArray(props.style) ? props.style : [props.style];
  return ( 
    <View style={[styles.comment, ...incomingStyle]}>
      <TextInput
        editable
        multiline
        rows={10}
        maxLength={40}
        onChangeText={text => props.textUpdateHanlder(text)}
        value={props.commentText}
        style={[{padding: 10}, baseStyles.darkerBackground, baseStyles.inputForm]}
      />
    </View>
  )
};

Comment.propTypes = {
  commentText: PropTypes.string,
  textUpdateHanlder: PropTypes.func
};

const styles = StyleSheet.create({
  comment: {
    padding: 10,
    marginVertical: 10,
    width: '100%',
  },  
});

export default Comment;