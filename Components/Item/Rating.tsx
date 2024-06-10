import PropTypes from 'prop-types'; 
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import baseStyles from '../../baseStyles';

const ItemRating = (props) => {
  return (
    <View style={baseStyles.whiterBackground}>
      <Text style={styles.ratingLabel}>Rating</Text>
      <View style={styles.ratingBar}/>
      <TextInput 
        style={styles.ratingInput}
        keyboardType = 'numeric'
        defaultValue={props.rate}
      />
    </View>
  );
}

ItemRating.propTypes = {
  rate: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  /* Rating bar */
  ratingBar: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
  },

  ratingLabel: {
    fontSize: 16,
    marginRight: 10,
  },

  ratingInput: {
    width: 50,
    height: 30,
    fontSize: 16,
  }
});

export default ItemRating;