import React, { useContext, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import Animated, { useAnimatedRef } from 'react-native-reanimated';
import baseStyles from '../../baseStyles';
import MainButton from '../globalComponents/MainButton';
import ParallaxImage from '../globalComponents/ParallaxImage';
import I18n from '../../locales';
import { createObject } from '../../Utils/firestoreWrite';
import { CategoryContext } from '../../appContexts';

const ItemForm = ({navigation, route}) => {
  const [author, onChangeAuthor] = useState('');
  const [title, onChangeTitle] = useState('');
  const [image, onChangeImage] = useState('');
  const currentCategory = useContext(CategoryContext).currentCategory;
  const scrollRef = useAnimatedRef<Animated.ScrollView|null>();

  const createItem = () => {
    console.log('Creating item');
    createObject('Items', {
      author: author,
      title: title,
      image: image,
      category: currentCategory+'',
    }).then(() => {
      console.log('Item created');
      navigation.goBack()
    }).catch((error) => {
      console.log('Error creating item', error);
    });
  }

  return (
    <View style={[baseStyles.softBackground]}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <ParallaxImage scrollRef={scrollRef} image={image}/>
        <View style={[baseStyles.softBackground]}>
          <Text style={[baseStyles.titleForm]}>{I18n.t(currentCategory+'.form.title')}</Text>
          <TextInput
            editable
            onChangeText={text => onChangeTitle(text)}
            value={title}
            placeholder={I18n.t(currentCategory+'.form.titlePlaceholder')}
            style={[{padding: 10}, baseStyles.darkerBackground, baseStyles.inputForm]}
          />
          <Text style={[baseStyles.titleForm]}>{I18n.t(currentCategory+'.form.creator')}</Text>
          <TextInput
            editable
            onChangeText={text => onChangeAuthor(text)}
            value={author}
            placeholder={I18n.t(currentCategory+'.form.creatorPlaceholder')}
            style={[{padding: 10}, baseStyles.darkerBackground, baseStyles.inputForm]}
          />
          <Text style={[baseStyles.titleForm]}>{I18n.t(currentCategory+'.form.image')}</Text>
          <TextInput
            editable
            onChangeText={text => onChangeImage(text)}
            value={image}
            placeholder={I18n.t(currentCategory+'.form.imagePlaceholder')}
            style={[{padding: 10}, baseStyles.darkerBackground, baseStyles.inputForm]}
          />
          <MainButton title={I18n.t(currentCategory+'.form.addItem')} color='#141619' onPress={() => createItem() }/>
          </View>
      </Animated.ScrollView>
    </View>
  );
}

export default ItemForm;