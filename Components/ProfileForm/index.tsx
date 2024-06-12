import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import baseStyles from '../../baseStyles';
import MainButton from '../globalComponents/MainButton';
import I18n from '../../locales';
import { updateObject } from '../../Utils/firestoreWrite';
import { UserContext } from '../../appContexts';

const ProfileForm = ({navigation, route}) => {
  const user = useContext(UserContext);
  const [name, onChangeName] = useState(user.data().name);
  const [profilePicture, onChangeProfielPicture] = useState(user.data().profilePicture);
  
  const updateUser = () => {
    updateObject('Users', user.id, {
      name: name,
      profilePicture: profilePicture
    }).then(() => {
      navigation.goBack()
    })
  }
  return (
    <View style={[baseStyles.softBackground]}>
      <View style={[baseStyles.flexRow, baseStyles.justifyCenter]}>
        <Image style={[baseStyles.marginTop25, baseStyles.marginBottom10, { height: 100, width: 100, borderRadius: 50}]}
               source={{uri: profilePicture}}/>
      </View>
      <View style={[baseStyles.softBackground]}>
        <Text style={[baseStyles.titleForm]}>{I18n.t('profileForm.name')}</Text>
        <TextInput
          editable
          onChangeText={text => onChangeName(text)}
          value={name}
          style={[{padding: 10}, baseStyles.darkerBackground, baseStyles.inputForm]}
        />
        <Text style={[baseStyles.titleForm]}>{I18n.t('profileForm.profilePicture')}</Text>
        <TextInput
          editable
          onChangeText={text => onChangeProfielPicture(text)}
          value={profilePicture}
          style={[{padding: 10}, baseStyles.darkerBackground, baseStyles.inputForm]}
        />
        <MainButton title={I18n.t('profileForm.update')} color='#141619' onPress={() => updateUser() }/>
      </View>
    </View>
  );
}

export default ProfileForm;