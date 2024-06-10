import PropTypes from 'prop-types'; 
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const ItemRating = (props) => {
  return (
    <View>
      <Text style={styles.ratingLabel}>Rating</Text>
      <View style={styles.ratingBar}/>
      <TextInput style={styles.ratingInput} keyboardType = 'numeric' defaultValue={props.rate}/>
    </View>
  );
}

ItemRating.propTypes = {
  rate: PropTypes.string.isRequired,
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
    border: 1,
    padding: 5,
    fontSize: 16,
  }
});

export default ItemRating;