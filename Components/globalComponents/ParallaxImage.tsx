import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';

const windowWidth = Dimensions.get('window').width;
const imageHeight = 500;

// This component needs to be used alongside a ScrollView component to work properly
// The scrollRef prop is the reference to the ScrollView component
const ParallaxImage = (props) => {
  const scrollOffset = useScrollViewOffset(props['scrollRef']);
  const imageAnimatedStyle = useAnimatedStyle(() => {
  return {
    transform: 
    [
      { 
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
      }
    ]}
  }); 

  if (props['image'] === undefined || props['image'] === '') {
    return 
  }
  return (
    <Animated.Image 
          style={[styles.parallax, imageAnimatedStyle]}
          source={{uri: props['image']}}/>
  );
};

const styles = StyleSheet.create({
  parallax: {
    width: windowWidth,
    height: imageHeight,
    zIndex: -1,
    marginBottom: 10,
  },
});

export default ParallaxImage;