import { View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppLoading from './AppLoading';
import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { User, onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from './firebaseConfig';
import Login from './screens/login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseStyles from './baseStyles';
const Stack = createNativeStackNavigator();

const App = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(undefined);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
        const rawValue = {uid: user.uid};
        await AsyncStorage.setItem('@user', JSON.stringify(rawValue));
        setUser(user);
      });
      return unsubscribe;
    }, []);
  if (loading) {
    return (
      <NavigationContainer>
        <View style={baseStyles.softBackground}>
          <AppLoading />
        </View>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        { user ? <StackNavigator/> :
          <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Login' component={Login}/>
          </Stack.Navigator>
        }
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  }
});

export default App;