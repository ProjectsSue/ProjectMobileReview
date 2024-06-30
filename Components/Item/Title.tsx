import PropTypes from 'prop-types'; 
import React from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import baseStyles from '../../baseStyles'

const windowWidth = Dimensions.get('window').width;

const ItemTitle = (props) => {
  return (
    <View style={[baseStyles.softBackground]}>
      <Text style={[styles.mainTitle]}>
        {props.title}
      </Text>
      <Text style={[styles.author, baseStyles.greyColor]}>
        {props.author}
      </Text>
      <View style={[baseStyles.marginLeft25, baseStyles.marginRight25, styles.separatingBarLong]}/>
    </View>
  );
}

ItemTitle.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  /* Main title */
  mainTitle: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  },
  separatingBarLong: {
    width: windowWidth - 50,
    height: 1,
    backgroundColor: '#afafaa',
    marginBottom: 20,
    marginLeft: 25,
  }
});

export default ItemTitle;
