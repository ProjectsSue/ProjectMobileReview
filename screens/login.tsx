import React, { useState } from 'react';
import { Pressable, View, Text, TextInput, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { firebaseAuth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
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
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSignUp = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log('Usuario creado');
        console.log('response', response);
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
    <View>
      <KeyboardAvoidingView behavior='padding'>
        <TextInput
          placeholder="email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {loading ? <ActivityIndicator size='large' color='#0000ff'/> :
        <View>
          <Pressable onPress={handleLogin}>
            <Text>Iniciar sesión</Text>
          </Pressable>
          {/* <SignInGoogle /> */}
          <Pressable onPress={handleSignUp}>
            <Text>Registrarse</Text>
          </Pressable>
        </View>
        }
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;