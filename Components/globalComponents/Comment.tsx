import React, { useContext } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import baseStyles from '../../baseStyles';
import I18n from '../../locales';
import PropTypes from 'prop-types'; 
import { CategoryContext } from '../../appContexts';

const Comment = (props) => {
  const incomingStyle = Array.isArray(props.style) ? props.style : [props.style];
  const currentCategory = useContext(CategoryContext).currentCategory;
  
  return ( 
    <View style={[styles.comment, ...incomingStyle]}>
      <TextInput
        editable
        multiline
        rows={10}
        maxLength={2000}
        onChangeText={text => props.textUpdateHanlder(text)}
        value={props.commentText}
        placeholder={I18n.t(currentCategory+'.reviewForm.reviewPlaceholder')}
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