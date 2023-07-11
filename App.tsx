import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import ItemTitle from './Item/Title';
import ItemImage from './Item/Image';
import ItemRating from './Item/Rating';
import ItemDescription from './Item/Description';
import React from 'react';

export default function App() {
  return (
    <View style={styles.container}>
      <ItemTitle name='Item Name'/>
      <ItemImage imageSource='https://d33wubrfki0l68.cloudfront.net/554c3b0e09cf167f0281fda839a5433f2040b349/ecfc9/img/header_logo.svg'/>
      <ItemRating rate='50'/>
      <ItemDescription description='This is a description'/>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});