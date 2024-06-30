import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import Animated, { useAnimatedRef } from 'react-native-reanimated';
import baseStyles from '../../baseStyles';
import MainButton from '../globalComponents/MainButton';
import ParallaxImage from '../globalComponents/ParallaxImage';
import I18n from '../../locales';
import { createObject, updateObject } from '../../Utils/firestoreWrite';
import { CategoryContext } from '../../appContexts';
import { singleQuery } from '../../Utils/firestoreQuery';
import AppLoading from '../../AppLoading';

const ItemForm = ({navigation, route}) => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const currentCategory = useContext(CategoryContext).currentCategory;
  const scrollRef = useAnimatedRef<Animated.ScrollView|null>();
  
  function createUpdateItem() {
    if (route.params?.itemId === '') {
      createItem();
    } else {
      updateItem();
    }
  }
  
  function createItem() {
    createObject('Items', {
      author: author,
      title: title,
      image: image,
      category: currentCategory,
    }).then(() => {
      navigation.goBack()
    }).catch((error) => {
      console.log('Error creating item', error);
    });
  }

  function updateItem() {
    updateObject('Items', route.params.itemId, {
      author: author,
      title: title,
      image: image,
    }).then(() => {
      navigation.goBack()
    }).catch((error) => {
      console.log('Error updating item', error);
    });
  }

  
  useEffect(() => {
    if (route.params?.itemId === '') {
      return resetObject();
    }
    setLoading(true);
    singleQuery('Items', route.params?.itemId).then(documentSnapshot => {  
      if (documentSnapshot.exists) {
        const data = documentSnapshot.data();
        setAuthor(data.creator);
        setTitle(data.title);
        setImage(data.image);
      }
      setLoading(false);
    });
  }, [route]);

  function resetObject() {
    setAuthor('');
    setTitle('');
    setImage('');
  }

  if (loading) {
    return (
      <View style={baseStyles.softBackground}>
        <AppLoading />
      </View>
    );
  } else {
    return (
      <View style={[baseStyles.softBackground]}>
        <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
          <ParallaxImage scrollRef={scrollRef} image={image}/>
          <View style={[baseStyles.softBackground]}>
            <Text style={[baseStyles.titleForm]}>{I18n.t(currentCategory+'.form.title')}</Text>
            <TextInput
              editable
              onChangeText={text => setTitle(text)}
              value={title}
              placeholder={I18n.t(currentCategory+'.form.titlePlaceholder')}
              style={[{padding: 10}, baseStyles.darkerBackground, baseStyles.inputForm]}
            />
            <Text style={[baseStyles.titleForm]}>{I18n.t(currentCategory+'.form.creator')}</Text>
            <TextInput
              editable
              onChangeText={text => setAuthor(text)}
              value={author}
              placeholder={I18n.t(currentCategory+'.form.creatorPlaceholder')}
              style={[{padding: 10}, baseStyles.darkerBackground, baseStyles.inputForm]}
            />
            <Text style={[baseStyles.titleForm]}>{I18n.t(currentCategory+'.form.image')}</Text>
            <TextInput
              editable
              onChangeText={text => setImage(text)}
              value={image}
              placeholder={I18n.t(currentCategory+'.form.imagePlaceholder')}
              style={[{padding: 10}, baseStyles.darkerBackground, baseStyles.inputForm]}
            />
            <MainButton title={route.params?.itemId !== undefined ? I18n.t(currentCategory+'.form.updateItem') : I18n.t(currentCategory+'.form.addItem')} color='#141619' onPress={() => createUpdateItem() }/>
            </View>
        </Animated.ScrollView>
      </View>
    );
  }
}

export default ItemForm;