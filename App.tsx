import 'react-native-gesture-handler';
import { View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppLoading from './AppLoading';
import DrawerNavigator from './DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from './firebaseConfig';
import Login from './screens/login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import baseStyles from './baseStyles';
import { UserContext, CategoryContext } from './appContexts';
import { singleQuery } from './Utils/firestoreQuery';

const Stack = createNativeStackNavigator();

const App = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(undefined);
  const [currentCategory, setCurrentCategory] = useState('book');
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
        singleQuery('Users', user.uid).then((firestoreUser) => {
          setUser(firestoreUser);
          setLoading(false);
        });
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
          { user ? <UserContext.Provider value={user}><CategoryContext.Provider value={{currentCategory, setCurrentCategory}}><DrawerNavigator/></CategoryContext.Provider></UserContext.Provider>:
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
