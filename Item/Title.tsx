import PropTypes from 'prop-types'; 
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';


const ItemTitle = (props) => {
  return (
    <View>
      <TextInput style={styles.mainTitle} defaultValue={props.name}/>
    </View>
  );
}

ItemTitle.propTypes = {
  name: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  /* Main title */
  mainTitle: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  }
});

export default ItemTitle;