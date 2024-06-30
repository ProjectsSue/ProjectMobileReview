import React, { useState } from 'react';
import { Pressable, View, Text, Image, TextInput, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { firebaseAuth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import baseStyles from '../baseStyles';
import I18n from '../locales';
import MainButton from '../Components/globalComponents/MainButton';
// import SignInGoogle from '../Components/Auth';

const Login = () => {
  const auth = firebaseAuth;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSignUp = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <View style={[baseStyles.softBackground, baseStyles.flexColumn, baseStyles.alignCenter]}>
      <Image source={require('../assets/login-penguin.png')} style={[baseStyles.imageLogo, baseStyles.marginTop10]}/>
      <KeyboardAvoidingView behavior='padding'>
        <TextInput style={[baseStyles.inputForm, baseStyles.marginTop10, {padding: 10, minWidth: 250}, baseStyles.darkerBackground,]}
          placeholder={I18n.t('email')}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput style={[baseStyles.inputForm, {padding: 10, minWidth: 250}, baseStyles.darkerBackground,]}
          placeholder={I18n.t('password')}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {loading ? <ActivityIndicator size='large' color='#0000ff'/> :
        <View style={[baseStyles.flexRow]}>
          <MainButton title={I18n.t('logIn')} color='#141619' onPress={handleLogin} style={[{width: '50%'}]}/>
          <MainButton title={I18n.t('SignUp')} color='#141619' onPress={handleSignUp} style={[{width: '50%'}]}/>
        </View>
        }
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;