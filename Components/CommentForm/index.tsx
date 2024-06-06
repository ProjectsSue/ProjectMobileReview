import PropTypes from 'prop-types'; 
import React, { useState }from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import baseStyles from '../../baseStyles';
import MainButton from '../globalComponents/MainButton';
import ScoreSelector from '../globalComponents/ScoreSelector';
import Comment from '../globalComponents/Comment';
import I18n from '../../locales';

const CommentForm = ({navigation, route}) => {
  const [hasSpoilers, setHaspoilers] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [hidden, setHidden] = useState(false);
  return (
    <View style={[baseStyles.softBackground, baseStyles.alignCenter]}>
      <ScoreSelector/>
      <View style={[baseStyles.flexRow, baseStyles.justifyEvenly, baseStyles.width100]}>
        <BouncyCheckbox
          onPress={ () => setHaspoilers(!hasSpoilers)}
          text={I18n.t('spoilersTag')}
          textStyle={{fontSize: 12}}
          style={{width: 80}}
          size={20}
        />
        <BouncyCheckbox
          onPress={ () => setAnonymous(!anonymous)}
          text={I18n.t('anonymousTag')}
          textStyle={{fontSize: 12}}
          style={{width: 100}}
          size={20}
        />
        <BouncyCheckbox
          onPress={ () => setHidden(!hidden)}
          text={I18n.t('hiddenTag')}
          textStyle={{fontSize: 12}}
          style={{width: 80}}
          size={20}
        />
      </View>
      <Comment/>
      <MainButton title={I18n.t('addReview')} color='#141619' onPress={() => navigation.goBack()}/>
    </View>
  );
}
const styles = StyleSheet.create({
});

export default CommentForm;