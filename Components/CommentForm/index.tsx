import PropTypes from 'prop-types'; 
import React from 'react';
import { View } from 'react-native';
import baseStyles from '../../baseStyles';
import { IonCheckbox } from '@ionic/react';
import MainButton from '../globalComponents/MainButton';
import ScoreSelector from '../globalComponents/ScoreSelector';
import Comment from '../globalComponents/Comment';

const CommentForm = ({navigation, route}) => {
  return (
    <View style={[baseStyles.softBackground, baseStyles.alignCenter]}>
      <ScoreSelector/>
      <Comment/>
      <View style={[baseStyles.flexRow, baseStyles.alignCenter]}>
        <IonCheckbox></IonCheckbox>
        <IonCheckbox></IonCheckbox>
        <IonCheckbox></IonCheckbox>
        <IonCheckbox></IonCheckbox>
      </View>
      <MainButton title='Write your Review' color='#141619' onPress={() => navigation.goBack()}/>
    </View>
  );
}

export default CommentForm;