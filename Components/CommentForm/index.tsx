import React, { useContext, useState }from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import baseStyles from '../../baseStyles';
import MainButton from '../globalComponents/MainButton';
import ScoreSelector from '../globalComponents/ScoreSelector';
import Comment from '../globalComponents/Comment';
import I18n from '../../locales';
import { createObject } from '../../Utils/firestoreWrite';
import { CategoryContext, UserContext } from '../../appContexts';

const CommentForm = ({navigation, route}) => {
  const [hasSpoilers, setHaspoilers] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [hidden, setHidden] = useState(false);
  const currentCategory = useContext(CategoryContext).currentCategory;
  const [commentText, onChangeCommentText] = React.useState(I18n.t(currentCategory+'.reviewForm.reviewPlaceholder'));
  const [score, setScore] = useState('70');
  
  const createComment = () => {
    createObject('Comments', {
      anonymous: anonymous,
      hasSpoiler: hasSpoilers,
      hidden: hidden,
      score: score,
      userId: useContext(UserContext).id,
      itemId: route['params']['itemId'],
      comment: commentText,
    }).then(() => {
      navigation.goBack()
    }).catch((error) => {
      console.log('Error creating comment', error);
    });
  }

  return (
    <View style={[baseStyles.softBackground, baseStyles.alignCenter]}>
      <ScoreSelector score={score} scoreUpdateHanlder={setScore}/>
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
      <Comment commentText={commentText} textUpdateHanlder={onChangeCommentText}/>
      <MainButton title={I18n.t('addReview')} color='#141619' onPress={() => createComment() }/>
    </View>
  );
}
const styles = StyleSheet.create({
});

export default CommentForm;