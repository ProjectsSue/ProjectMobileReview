import { Dimensions, StyleSheet, View } from 'react-native';
import ItemTitle from './Title';
import React from 'react';
import PropTypes from 'prop-types';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import Info from '../globalComponents/Info';
import ReviewSection from './ReviewSection';
import MainButton from '../globalComponents/MainButton';

const windowWidth = Dimensions.get('window').width;
const imageHeight = 500;

const Item = (props) => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ 
        translateY: interpolate(
          scrollOffset.value, 
          [-imageHeight, 0, imageHeight], 
          [-imageHeight / 2, 0, imageHeight * 0.75]
        ),
      },
    {
      scale: interpolate(
        scrollOffset.value,
          [-imageHeight, 0, imageHeight],
          [2, 1, 1]
        ),
      }]
    }
  }); 
  
  return ( 
    <View style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.Image 
          style={[styles.parallax, imageAnimatedStyle]}
          source={{uri: props.imageSource}}
        />
        <Info createdAt='October 25, 2022' infoFields={[{name: 'views', value: 10 }]}/>
        <ItemTitle title='El Principe' author='Nicolas Maquiavelo'/>
        <ReviewSection reviews={[{id: 1, authorName: 'Manuel j', authorPicture: 'https://media.licdn.com/dms/image/C5603AQFbSDxrJfdN_A/profile-displayphoto-shrink_400_400/0/1527881412699?e=1717027200&v=beta&t=ciS9vq6_-2nTTlw-HwHGdlqdsWd5qo4LuvhZCNioxgk', rating: 87, review: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.'}, 
                    {id: 2, authorName: 'Manuel j', authorPicture: 'https://media.licdn.com/dms/image/C5603AQFbSDxrJfdN_A/profile-displayphoto-shrink_400_400/0/1527881412699?e=1717027200&v=beta&t=ciS9vq6_-2nTTlw-HwHGdlqdsWd5qo4LuvhZCNioxgk', rating: 97, review: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.'},
                    {id: 3, authorName: 'Manuel j', authorPicture: 'https://media.licdn.com/dms/image/C5603AQFbSDxrJfdN_A/profile-displayphoto-shrink_400_400/0/1527881412699?e=1717027200&v=beta&t=ciS9vq6_-2nTTlw-HwHGdlqdsWd5qo4LuvhZCNioxgk', rating: 37, review: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.'}]}
        />
        <MainButton title='Write your Review' color='#141619' onPress={() => props.navigation.goBack()}/>
      </Animated.ScrollView>
    </View>
  );
}

Item.propTypes = {
    imageSource: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    parallax: {
        width: windowWidth,
        height: imageHeight,
        zIndex: -1,
        marginBottom: 10,
    },

});

export default Item;