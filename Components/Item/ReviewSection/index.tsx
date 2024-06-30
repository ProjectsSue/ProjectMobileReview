import PropTypes from 'prop-types'; 
import React from 'react';
import { View } from 'react-native';
import baseStyles from '../../../baseStyles'
import ReviewCard from './ReviewCard';

const ReviewSection = (props) => {
    const InfoListText = props.reviews.map(review => (
      <ReviewCard key={review['id']} review={review} navigation={props.navigation}/>
  ));

  return (
    <View style={[baseStyles.whiterBackground, baseStyles.alignCenter]}>
      {InfoListText}
    </View>
  );
}

ReviewSection.propTypes = {
  reviews: PropTypes.array,
  navigation: PropTypes.object
};

export default ReviewSection;