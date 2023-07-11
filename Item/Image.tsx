import PropTypes from 'prop-types'; 
import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

const ItemImage = (props) => {
  return (
    <View style={styles.imageContainer}>
      <Image style={styles.image}
        source={props.image}/>
    </View>
  );
}

ItemImage.propTypes = {
  imageSource: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  /* Image */
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
  },

  image: {
    width: 40,
    height: 'auto',
    maxHeight: 30,
    objectFit: 'cover',
  }
});

export default ItemImage;