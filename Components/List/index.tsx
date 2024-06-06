import { FlatList, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';
import baseStyles from '../../baseStyles';
import AddButton from '../globalComponents/AddButton';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from '../../AppLoading';




const ItemList = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  // AsyncStorage.getItem('@user').then((response) => {
  //   const sessionUser =  response != null ? JSON.parse(response) : null;
  //   setLoading(false);
  // });

  useEffect(() => {
    const subscriber = firestore()
      .collection('Items')
      .onSnapshot(querySnapshot => {
        const itemList = [];
        const itemIds = [];
  
        querySnapshot.forEach(documentSnapshot => {
          itemIds.push(documentSnapshot.id);
          itemList.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
            commentsCount: 0,
            scoreAverage: 0,
            author: 'Nicolas Maquiavelo'
          });
        });
        firestore().collection('Comments').get().then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            itemList.map(item => {
              if (item['id'] === documentSnapshot.data()['itemId']) {
                item['commentsCount'] += 1;
                item['scoreAverage'] += documentSnapshot.data()['score'];
              }
              return item
            });
          });
        }).finally(() => {
          itemList.map(item => {
            item['scoreAverage'] = item['scoreAverage'] / item['commentsCount'];
            return item
          });
          setItems(itemList);
          setLoading(false);
        });
      });
  
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);


  if (loading) {
    return (
      <View style={baseStyles.softBackground}>
        <AppLoading />
      </View>
    );
  } else {
    return (
      <View style={baseStyles.softBackground}>
        <FlatList
          style={baseStyles.softBackground}
          data={ items }
          numColumns={2}
          renderItem={({item}) => <ItemCard {...item} navigation={navigation}></ItemCard>}
        />
        <AddButton navigation={navigation}/>
      </View>
    )
  }
}

export default ItemList;