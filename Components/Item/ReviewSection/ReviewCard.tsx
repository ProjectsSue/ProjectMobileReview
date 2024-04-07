import PropTypes from 'prop-types'; 
import React, { useState } from 'react';
import { StyleSheet, Image, Text, LayoutChangeEvent, View } from 'react-native';
import TextRoboto from '../../globalComponents/TextRoboto';
import baseStyles from '../../../baseStyles';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';

const ReviewCard = (props) => {
  const [height, setHeight] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const animatedHeight = useSharedValue(0);

  const onLayout = (event: LayoutChangeEvent) => {
    console.log(event.nativeEvent)
    console.log(event.nativeEvent.layout.height)
    const onLayoutHeight = event.nativeEvent.layout.height;

    if (onLayoutHeight > 0 && height !== onLayoutHeight) {
      setHeight(onLayoutHeight);
    }
  };

  const collapsableStyle = useAnimatedStyle(() => {
    animatedHeight.value = expanded ? withTiming(height) : withTiming(100);

    return {
      height: animatedHeight.value,
    };
  }, [expanded, height]);
  
const ExpandIcon = () => {
  console.log(height)
    if (height > 20) {
      return (
        <View style={[styles.icon]}>
          <Ionicons name="chevron-down-outline" onPress={() => setExpanded(!expanded)} size={16} color="grey" style={[baseStyles.marginRight10]}/>
        </View>
      )
    }
  }
  return (
    <Animated.View style={[baseStyles.whiteBackground, baseStyles.card, styles.cardList, { overflow: "hidden" }]}>
      <View style={[baseStyles.flexRow, baseStyles.alignCenter]}>
        <Image style={styles.authorPicture} source={{uri: props.review.authorPicture}}/>
        <View style={[baseStyles.flexColumn, baseStyles.justifyCenter]}>
          <TextRoboto style={[baseStyles.minorTitle]}>
            {props.review.authorName}
          </TextRoboto>
          <TextRoboto style={[baseStyles.minorSubtitle, baseStyles.greyColor]}>
            Rating: {props.review.rating}
          </TextRoboto>
        </View>
        <ExpandIcon/>
      </View>
      <Animated.View style={[collapsableStyle, styles.overflow]}>
        <TextRoboto style={[baseStyles.marginLeft25, baseStyles.marginBottom5]} onLayout={onLayout}>
          {props.review.review}
        </TextRoboto>
      </Animated.View>
    </Animated.View>
  );
}

ReviewCard.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number,
    authorName: PropTypes.string,
    authorPicture: PropTypes.string,
    rating: PropTypes.number,
    review: PropTypes.string,
  }),
};

const styles = StyleSheet.create({
  authorPicture: {
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 10,
  },
  cardList: {
    marginBottom: 10,
    width: '90%',
  },
  icon: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
    flexGrow: 1,
    alignItems: 'flex-end',
  },
  overflow: {
    overflow: 'hidden',
  },
});

export default ReviewCard;
