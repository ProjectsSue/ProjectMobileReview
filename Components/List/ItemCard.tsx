import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import Ionicons from '@expo/vector-icons/Ionicons';
import baseStyles from '../../baseStyles';


const ItemCard = (props) => {
  // const navigation = useNavigation();
  console.log(props);
  return ( 
    <TouchableOpacity style={[styles.container, baseStyles.softBackground]}
          onPress={() => props.navigation.navigate('Item', {imageSource: props.image})}>
      <Image
        source={{uri: props.image}}
        style={styles.image}
        resizeMode='center'
        />
      <View style={styles.infoIconContainer}>
        <Text style={styles.infoIcon}>
        <Ionicons name="chatbubble"
                  size={12}
                  color="#34435E"
                  style={baseStyles.marginRight2}/>
          {props.commentsCount}
        </Text>
        <Text style={styles.infoIcon}>
        <Ionicons name="star"
                  size={12}
                  color="#34435E"
                  style={baseStyles.marginRight2}/>
          {props.scoreAverage}
        </Text>
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
    borderRadius: 12
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
    fontSize: 10,
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