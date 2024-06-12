import { Dimensions, StyleSheet, View } from 'react-native';
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
import { UserContext } from '../../appContexts';
import BouncyCheckbox from 'react-native-bouncy-checkbox/build/dist/BouncyCheckbox';
import baseStyles from '../../baseStyles';

const windowWidth = Dimensions.get('window').width;
const imageHeight = 500;

const Item = ({navigation, route}) => {
  const user = useContext(UserContext);
  const [loadingItem, setLoadingItem] = useState(true);
  const [spoilers, setSpoilers] = useState(false);
  const [itemId, setItemId] = useState('');
  if (route.params.itemId !== itemId) {
    setLoadingItem(true); 
    setItemId(route.params.itemId);
  }
  const [loadingComments, setLoadingComments] = useState(true);
  const [comments, setComments] = useState([]);
  const [item, setItem] = useState({});
  const scrollRef = useAnimatedRef<Animated.ScrollView|null>();

  useEffect(() => {
    setLoadingItem(true);
    firestore()
      .collection('Items')
      .doc(itemId)
      .get()
      .then(documentSnapshot => {  
        setItem(documentSnapshot.data());
        setLoadingItem(false);
      });
  }, [itemId]);

  useEffect(() => {
    setLoadingComments(true);
    const subscriber = firestore()
      .collection('Comments')
      .where(Filter.or(Filter('hidden', '==', false), Filter('userId', '==', user.id)))
      .where('hasSpoiler', '==', spoilers)
      .where('itemId', '==', itemId)
      .onSnapshot(querySnapshot => {
        const commentList = [];
        const userIds = [];
  
        querySnapshot.forEach(documentSnapshot => {
          userIds.push(documentSnapshot.data()['userId']);
          commentList.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
          firestore().collection('Users').where(firestore.FieldPath.documentId(), 'in', userIds).get().then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
              commentList.map(comment => {
                if (comment['userId'] === documentSnapshot.id) {
                  comment['author'] = documentSnapshot.data()['name'];
                  comment['authorPicture'] = documentSnapshot.data()['profilePicture'];
                }
                return comment
              });
            });
          });
        });
        setComments(commentList);
        setLoadingComments(false);
      });
    return () => subscriber();
  }, [itemId, spoilers]);
  
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
  <View style={styles.container}>
    <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
      <ParallaxImage scrollRef={scrollRef} image={item['image']}/>
      <Info createdAt='October 25, 2022' infoFields={[{name: I18n.t('review'), value: comments.length }]}/>
      <ItemTitle title={item['title']} author='Nicolas Maquiavelo'/>
      <View style={[baseStyles.flexRow, baseStyles.alignCenter, {width: windowWidth}]}>
        <BouncyCheckbox
          isChecked={spoilers}
          onPress={ () => setSpoilers(!spoilers)}
          text={I18n.t('spoilersFilter')}
          textStyle={{fontSize: 12}}
          style={{width: 100}}
          size={20}
        />
      </View>
      <ReviewSection reviews={comments}
      />
      <MainButton title={I18n.t('bookAddReviewButton')} color='#141619' onPress={() => navigation.navigate('CommentForm', {itemId: itemId})}/>
    </Animated.ScrollView>
  </View>
  )};
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    parallax: {
        width: windowWidth,
        height: imageHeight,
        zIndex: -1,
        marginBottom: 10,
    },
});

export default Item;
