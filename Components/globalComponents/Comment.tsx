import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import baseStyles from '../../baseStyles';
import I18n from '../../locales';

const Comment = (props) => {
  const [value, onChangeText] = React.useState(I18n.t('bookReviewForm.reviewPlaceholder'));
  const incomingStyle = Array.isArray(props.style) ? props.style : [props.style];
  return ( 
    <View style={[styles.comment, ...incomingStyle]}>
      <TextInput
        editable
        multiline
        rows={10}
        maxLength={40}
        onChangeText={text => onChangeText(text)}
        value={value}
        style={[{padding: 10}, baseStyles.darkerBackground, baseStyles.inputForm]}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  comment: {
    padding: 10,
    marginVertical: 10,
    width: '100%',
  },  
});

export default Comment;