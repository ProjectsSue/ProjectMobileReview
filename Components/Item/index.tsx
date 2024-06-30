import { ActivityIndicator, Dimensions, View } from 'react-native';
import ItemTitle from './Title';
import React, { useContext, useEffect, useState } from 'react';
import Animated, { useAnimatedRef } from 'react-native-reanimated';
import Info from '../globalComponents/Info';
import ReviewSection from './ReviewSection';
import MainButton from '../globalComponents/MainButton';
import firestore  from '@react-native-firebase/firestore';
import {Filter} from '@react-native-firebase/firestore/lib/FirestoreFilter.js'
import AppLoading from '../../AppLoading';
import ParallaxImage from '../globalComponents/ParallaxImage';
import I18n from '../../locales';
import { CategoryContext, UserContext } from '../../appContexts';
import BouncyCheckbox from 'react-native-bouncy-checkbox/build/dist/BouncyCheckbox';
import baseStyles from '../../baseStyles';
import { collectionQueryFilterMapping, collectionQueryFilterMappingSnapshot, singleQuery } from '../../Utils/firestoreQuery';
import cssConsts from '../../cssConsts';

const windowWidth = Dimensions.get('window').width;

const Item = ({navigation, route}) => {
  const user = useContext(UserContext);
  const [loadingItem, setLoadingItem] = useState(true);
  const [spoilers, setSpoilers] = useState(false);
  const [itemId, setItemId] = useState('');
  const [loadingComments, setLoadingComments] = useState(true);
  const [comments, setComments] = useState([]);
  const [item, setItem] = useState({});
  const scrollRef = useAnimatedRef<Animated.ScrollView|null>();
  const currentCategory = useContext(CategoryContext).currentCategory;
  if (route.params.itemId !== itemId) {
    setLoadingItem(true); 
    setItemId(route.params.itemId);
  }

  function subscriber(filter) {
    collectionQueryFilterMappingSnapshot('Comments', filter, (querySnapshot) => {
      let commentList = [];
      setComments(commentList);
      const userIds = [];

      querySnapshot.forEach(documentSnapshot => {
        userIds.push(documentSnapshot.data()['userId']);
        commentList.push({
          ...documentSnapshot.data(),
          id: documentSnapshot.id,
        });
        firestore().collection('Users').where(firestore.FieldPath.documentId(), 'in', userIds).get().then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            commentList = commentList.map(comment => {
              if (comment['userId'] === documentSnapshot.id) {
                comment['authorName'] = documentSnapshot.data()['name'];
                comment['authorPicture'] = documentSnapshot.data()['profilePicture'];
              }
              return comment
            });
          });
          setComments(commentList);
        });
      }); 
      setLoadingComments(false);
      console.log(commentList)
    });
  };

  useEffect(() => {
    setLoadingItem(true);
    singleQuery('Items', itemId).then(documentSnapshot => {  
      setItem(documentSnapshot.data());
      setLoadingItem(false);
    });
    updateCommentsSpoilers(true)
  }, [itemId]);

  function updateCommentsSpoilers(value) {
    setSpoilers(value);

    setLoadingComments(true);
    
    let filter = Filter.and(
                     Filter.or(
                       Filter('hidden', '==', false),
                       Filter('userId', '==', user.id)),
                     Filter('itemId', '==', itemId))
    if (value) {
      filter = Filter.and(filter, Filter('hasSpoiler', '==', false));
    }
    
    return subscriber(filter);
  }

  if (loadingItem) {
    return (
      <View>
        <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
          <AppLoading/>
        </Animated.ScrollView>
      </View>
    );
  } else {
  return ( 
  <View style={[baseStyles.softBackground, baseStyles.flexColumn]}>
    <Animated.ScrollView style={[baseStyles.softBackground]} ref={scrollRef} scrollEventThrottle={16}>
      <ParallaxImage scrollRef={scrollRef} image={item['image']}/>
      <Info createdAt='October 25, 2022' infoFields={[{name: I18n.t('review'), value: comments.length }]}/>
      <ItemTitle title={item['title']} author='Nicolas Maquiavelo'/>
      <View style={[baseStyles.flexRow, baseStyles.justifyCenter, baseStyles.softBackground, {width: windowWidth}]}>
        <BouncyCheckbox
          isChecked={!spoilers}
          onPress={ () => updateCommentsSpoilers(!spoilers)}
          text={I18n.t('spoilersFilter')}
          textStyle={[{fontSize: 12, textDecorationLine: "none"}]}
          style={[{width: 100}, baseStyles.marginBottom10]}
          size={20}
        />
      </View>
      {loadingComments ?  <ActivityIndicator size="large" color={cssConsts[currentCategory+'Color']}/> : <ReviewSection reviews={comments} navigation={navigation}/> }
      <MainButton title={I18n.t('bookAddReviewButton')} color='#141619' onPress={() => navigation.navigate('CommentForm', {itemId: itemId})}/>
    </Animated.ScrollView>
  </View>
  )};
}

export default Item;
