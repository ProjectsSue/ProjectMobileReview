import PropTypes from 'prop-types'; 
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import baseStyles from '../../baseStyles'

const ItemTitle = (props) => {
    const InfoListText = props.infoFields.map(infoField => (
    <Text key={infoField['name']} style={[baseStyles.greyColor, baseStyles.marginRight5]}>
        <View style={styles.separatingBar}/>
        {infoField['icon']} {infoField['value']} {infoField['name']}
    </Text>
  ));

  return (
    <View style={[baseStyles.whiterBackground, styles.info]}>
      <Text style={[baseStyles.greyColor, baseStyles.marginRight5, baseStyles.marginLeft5]}>
        {props.createdAt}
      </Text>
      {InfoListText}
    </View>
  );
}

ItemTitle.propTypes = {
  infoFields: PropTypes.array,
  createdAt: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  /* Main title */
  info: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    paddingBottom: 20,
  },
  separatingBar: {
    width: 1,
    height: 10,
    backgroundColor: '#afafaa',
  }
});

export default ItemTitle;