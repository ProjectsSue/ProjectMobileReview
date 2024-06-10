import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import Ionicons from '@expo/vector-icons/Ionicons';
import baseStyles from '../../baseStyles';


const ItemCard = (props) => {
  return ( 
    <TouchableOpacity style={[styles.container, baseStyles.softBackground]}
          onPress={() => props.navigation.navigate('Item', {itemId: props.id})}>
      <Image
        source={{uri: props.image}}
        style={styles.image}
        />
      <View style={styles.infoIconContainer}>
        <View style={styles.infoIcon}>
          <Ionicons name="chatbubble"
                  size={10}
                  color="#34435E"
                  style={[styles.infoIcon, baseStyles.marginRight2]}/>
          <Text style={[baseStyles.fontSize10]}>
            {props.commentsCount}
          </Text>
        </View>
        <View style={styles.infoIcon}>
          <Ionicons name="star"
                    size={12}
                    color="#34435E"
                    style={[styles.infoIcon, baseStyles.marginRight2]}/>
          <Text style={[baseStyles.fontSize10]}>
            {props.scoreAverage}
          </Text>
        </View>
      </View>
      <Text style={styles.mainTitle}>
        {props.title}
      </Text>
      <Text style={styles.subTitle}>
        {props.author}
      </Text>
    </TouchableOpacity>
  );
}


ItemCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  commentsCount: PropTypes.number.isRequired,
  scoreAverage: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 8,  
    marginHorizontal: 60,
  },
  image: {
    width: 120,
    height: 180,
    borderRadius: 12,
    marginBottom: 5,
    resizeMode: 'cover'
  },
  mainTitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 2,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 10,
    textAlign: 'center',},
  infoIcon: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  infoIconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
    marginBottom: 2,
  }

});
export default ItemCard;