import PropTypes from 'prop-types'; 
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import baseStyles from '../../baseStyles';

const ItemDescription = (props) => {
  return (
    <View style={baseStyles.whiteBackground}>
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
    fontSize: 16,
    height: 1000,
  }
});

export default ItemDescription;