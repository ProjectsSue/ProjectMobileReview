import PropTypes from 'prop-types'; 
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const ItemDescription = (props) => {
  return (
    <View>
      <TextInput style={styles.description} defaultValue={props.description}/>
    </View>
  );
};

ItemDescription.propTypes = {
  description: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  /* Description */
  description: {
    marginBottom: 20,
    border: 1,
    padding: 5,
    fontSize: 16,
  }
});

export default ItemDescription;