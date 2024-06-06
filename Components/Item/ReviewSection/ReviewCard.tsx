import PropTypes from 'prop-types'; 
import React, { useState } from 'react';
import { StyleSheet, Image, LayoutChangeEvent, View, Text } from 'react-native';
import baseStyles from '../../../baseStyles';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import I18n from '../../../locales';

const ReviewCard = (props) => {
  const [expandedHeight, setExpandedHeight] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const animatedHeight = useSharedValue(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const onLayoutHeight = event.nativeEvent.layout.height;

    if (onLayoutHeight > 0 && expandedHeight !== onLayoutHeight) {
      setExpandedHeight(onLayoutHeight);
    }
  };

  const collapsableStyle = useAnimatedStyle(() => {
    animatedHeight.value = expanded ? withTiming(expandedHeight) : withTiming(38);

    return {
      height: animatedHeight.value,
    };
  }, [expanded, expandedHeight]);
  
const ExpandIcon = () => {
    if (expandedHeight > 35) {
      return (
        <View style={[styles.icon]}>
          <Ionicons name={expanded ? "chevron-up-outline" : "chevron-down-outline" }
                    onPress={() => setExpanded(!expanded)}
                    size={16}
                    color="grey"
                    style={[baseStyles.marginRight10]}/>
        </View>
      )
    }
  }
  return (
    <Animated.View style={[baseStyles.whiterBackground, baseStyles.card, styles.cardList, { overflow: "hidden" }]}>
      <View style={[baseStyles.flexRow, baseStyles.alignCenter]}>
        <Image style={styles.authorPicture} source={{uri: props.review.authorPicture}}/>
        <View style={[baseStyles.flexColumn, baseStyles.justifyCenter]}>
          <Text style={[baseStyles.minorTitle]}>
            {props.review.author}
          </Text>
          <Text style={[baseStyles.minorSubtitle, baseStyles.greyColor]}>
            {I18n.t('score')} {props.review.score}
          </Text>
        </View>
        <ExpandIcon/>
      </View>
      <Animated.View style={[collapsableStyle, styles.overflow]}>
        <Text style={[baseStyles.marginLeft15, baseStyles.marginRight15, baseStyles.paddingBottom10, baseStyles.absolute]} onLayout={onLayout}>
          {props.review.comment}
        </Text>
      </Animated.View>
    </Animated.View>
  );
}

ReviewCard.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number,
    authorName: PropTypes.string,
    authorPicture: PropTypes.string,
    score: PropTypes.number,
    comment: PropTypes.string,
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
