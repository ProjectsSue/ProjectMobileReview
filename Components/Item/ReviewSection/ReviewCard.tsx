import PropTypes from 'prop-types'; 
import React, { useContext, useState } from 'react';
import { StyleSheet, Image, LayoutChangeEvent, View, Text, Alert } from 'react-native';
import baseStyles from '../../../baseStyles';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import I18n from '../../../locales';
import { UserContext } from '../../../appContexts';
import { deleteObject } from '../../../Utils/firestoreWrite';

const ReviewCard = (props) => {
  const user = useContext(UserContext);
  const [expandedHeight, setExpandedHeight] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const animatedHeight = useSharedValue(0);
  const reviewPicture = props.review.anonymous ? require('../../../assets/profile_picture_default.jpeg') : {uri: props.review.authorPicture};
  const reviewAuthor = props.review.anonymous ? I18n.t('anonymousTag') : props.review.authorName;
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
        <Ionicons name={expanded ? "chevron-up-outline" : "chevron-down-outline" }
                  onPress={() => setExpanded(!expanded)}
                  size={16}
                  color="grey"
                  style={[baseStyles.marginRight10]}/>
      )
    }
  }

  const EditIcon = () => {
    if (props.review.userId === user.id) {
      return (
        <Ionicons name={"create-outline" }
                    onPress={() => props.navigation.navigate('CommentForm', {commentId: props.review.id})}
                    size={16}
                    style={[baseStyles.marginRight10]}
                    color="grey"/>
      )
    }
  }

  const DeleteIcon = () => {
    if (props.review.userId === user.id) {
      return (
        <Ionicons name={"trash-outline" }
                    onPress={() => createDeleteAlert()}
                    size={16}
                    style={[baseStyles.marginRight10]}
                    color="red"/>
      )
    }
  }
      
  const ReviewIcons = () => {
    return (
      <View style={[styles.icon, baseStyles.flexRow]}>
        <EditIcon/>
        <DeleteIcon/>
        <ExpandIcon/>
      </View>
    )
  }

  const createDeleteAlert = () => {
    Alert.alert('Delete Review', 'Are you sure you want to delete this review?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'Delete', onPress: () => deleteReview(props.review.id)},
    ]);
  }

  function deleteReview(reviewId) {
    deleteObject('Comments', reviewId).then(() => {
      console.log('Review deleted', reviewId);
    }).catch((error) => {
      console.log('Error deleting review', error);
    });
  }

  return (
    <Animated.View style={[baseStyles.whiterBackground, baseStyles.card, styles.cardList, { overflow: "hidden" }]}>
      <View style={[baseStyles.flexRow, baseStyles.alignCenter]}>
        <Image style={styles.authorPicture} source={reviewPicture}/>
        <View style={[baseStyles.flexColumn, baseStyles.justifyCenter]}>
          <Text style={[baseStyles.minorTitle]}>
            {reviewAuthor}
          </Text>
          <Text style={[baseStyles.minorSubtitle, baseStyles.greyColor]}>
            {I18n.t('score')} {props.review.score}
          </Text>
        </View>
        <ReviewIcons/>
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
    anonymous: PropTypes.bool,
    score: PropTypes.number,
    comment: PropTypes.string
  }),
  navigation: PropTypes.object
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