import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import Animated, { useAnimatedRef } from 'react-native-reanimated';
import baseStyles from '../../baseStyles';
import MainButton from '../globalComponents/MainButton';
import ParallaxImage from '../globalComponents/ParallaxImage';
import I18n from '../../locales';

const ItemForm = ({navigation, route}) => {
  const [author, onChangeAuthor] = useState('');
  const [title, onChangeTitle] = useState('');
  const [image, onChangeImage] = useState('');
  const scrollRef = useAnimatedRef<Animated.ScrollView|null>();
  return (
    <View style={[baseStyles.softBackground]}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <ParallaxImage scrollRef={scrollRef} image={image}/>
        <View style={[baseStyles.softBackground]}>
          <Text style={[baseStyles.titleForm]}>{I18n.t('bookForm.title')}</Text>
          <TextInput
            editable
            onChangeText={text => onChangeAuthor(text)}
            value={author}
            placeholder={I18n.t('bookForm.titlePlaceholder')}
            style={[{padding: 10}, baseStyles.darkerBackground, baseStyles.inputForm]}
          />
          <Text style={[baseStyles.titleForm]}>{I18n.t('bookForm.creator')}</Text>
          <TextInput
            editable
            onChangeText={text => onChangeTitle(text)}
            value={title}
            placeholder={I18n.t('bookForm.creatorPlaceholder')}
            style={[{padding: 10}, baseStyles.darkerBackground, baseStyles.inputForm]}
          />
          <Text style={[baseStyles.titleForm]}>{I18n.t('bookForm.image')}</Text>
          <TextInput
            editable
            onChangeText={text => onChangeImage(text)}
            value={image}
            placeholder={I18n.t('bookForm.imagePlaceholder')}
            style={[{padding: 10}, baseStyles.darkerBackground, baseStyles.inputForm]}
          />
          <MainButton title={I18n.t('bookForm.addItem')} color='#141619' onPress={() => navigation.goBack()}/>
          </View>
      </Animated.ScrollView>
    </View>
  );
}

export default ItemForm;