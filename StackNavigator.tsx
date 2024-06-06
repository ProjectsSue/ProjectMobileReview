import { StyleSheet } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ItemList from './Components/List';
import Item from './Components/Item';
import CommentForm from './Components/CommentForm';
import ItemForm from './Components/ItemForm';
const Stack = createNativeStackNavigator();

const StackNavegator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="Home" component={ItemList}/>
        <Stack.Screen name="Item" component={Item}/>
        <Stack.Screen name="CommentForm" component={CommentForm}/>
        <Stack.Screen name="ItemForm" component={ItemForm}/>
      </Stack.Group>  
    </Stack.Navigator>
  )
}

export default StackNavegator;