import React, { useContext, useEffect, useState }from 'react';
import { ScrollView, View } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import baseStyles from '../../baseStyles';
import MainButton from '../globalComponents/MainButton';
import ScoreSelector from '../globalComponents/ScoreSelector';
import Comment from '../globalComponents/Comment';
import I18n from '../../locales';
import { createObject, updateObject } from '../../Utils/firestoreWrite';
import { CategoryContext, UserContext } from '../../appContexts';
import { singleQuery } from '../../Utils/firestoreQuery';

const CommentForm = ({navigation, route}) => {
  const [hasSpoilers, setHaspoilers] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [score, setScore] = useState('0');
  const userId = useContext(UserContext).id;
  
  function createUpdateComment() {
    if (route.params.commentId === undefined) {
      createComment();
    } else {
      updateComment();
    }
  }

  function createComment() {
    console.log('Creating comment');
    createObject('Comments', {
      anonymous: anonymous,
      hasSpoiler: hasSpoilers,
      hidden: hidden,
      score: score,
      userId: userId,
      itemId: route['params']['itemId'],
      comment: commentText,
    }).then(() => {
      navigation.goBack()
    }).catch((error) => {
      console.log('Error creating comment', error);
    });
  }

  function updateComment() {
    updateObject('Comments', route.params.commentId, {
      anonymous: anonymous,
      hasSpoiler: hasSpoilers,
      hidden: hidden,
      score: score,
      comment: commentText,
    }).then(() => {
      navigation.goBack()
    }).catch((error) => {
      console.log('Error updating comment', error);
    });
  }

  useEffect(() => {
    console.log(route.params.commentId);
    if (route.params.commentId === undefined) {
      setHaspoilers(false);
      setAnonymous(false);
      setHidden(false);
      setScore(0);
      return;
    }
    singleQuery('Comments', route.params.commentId).then(documentSnapshot => {  
      if (documentSnapshot.exists) {
        const data = documentSnapshot.data();
        setHaspoilers(data.hasSpoiler);
        setAnonymous(data.anonymous);
        setHidden(data.hidden);
        setScore(data.score);
        setCommentText(data.comment);
      }
    });
  }, [route]);

  return (
    <ScrollView style={[baseStyles.softBackground]} contentContainerStyle={[baseStyles.alignCenter]}>
      <ScoreSelector score={score} scoreUpdateHanlder={setScore}/>
      <View style={[baseStyles.flexRow, baseStyles.justifyEvenly, baseStyles.width100]}>
        <BouncyCheckbox
          onPress={ () => setHaspoilers(!hasSpoilers)}
          text={I18n.t('spoilersTag')}
          textStyle={{fontSize: 12, textDecorationLine: "none"}}
          style={{width: 80}}
          size={20}
        />
        <BouncyCheckbox
          onPress={ () => setAnonymous(!anonymous)}
          text={I18n.t('anonymousTag')}
          textStyle={{fontSize: 12, textDecorationLine: "none"}}
          style={{width: 100}}
          size={20}
        />
        <BouncyCheckbox
          onPress={ () => setHidden(!hidden)}
          text={I18n.t('hiddenTag')}
          textStyle={{fontSize: 12, textDecorationLine: "none"}}
          style={{width: 80}}
          size={20}
        />
      </View>
      <Comment commentText={commentText} textUpdateHanlder={setCommentText}/>
      <MainButton title={route.params?.commentId !== undefined ? I18n.t('updateReview') : I18n.t('addReview')} color='#141619' onPress={() => createUpdateComment() }/>
    </ScrollView>
  );
}

export default CommentForm;