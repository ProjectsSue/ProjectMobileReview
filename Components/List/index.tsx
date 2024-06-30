import { FlatList, View, Dimensions, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import ItemCard from './ItemCard';
import baseStyles from '../../baseStyles';
import AddButton from '../globalComponents/AddButton';
import firestore from '@react-native-firebase/firestore';
import {Filter} from '@react-native-firebase/firestore/lib/FirestoreFilter.js'
import AppLoading from '../../AppLoading';
import { CategoryContext } from '../../appContexts';
import { collectionQueryFilterMappingSnapshot } from '../../Utils/firestoreQuery';
import { SearchBar } from '@rneui/themed';
import I18n from '../../locales';


const windowHeight = Dimensions.get('window').height;

const ItemList = ({navigation}) => {
  const currentCategory = useContext(CategoryContext).currentCategory;
  const [loading, setLoading] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  function subscriber (filter) {
    collectionQueryFilterMappingSnapshot('Items', filter, (querySnapshot) => {
      if (querySnapshot === null) {
        setLoadingSearch(false);
        setLoading(false);
        return;
      }
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
        itemList.sort((a, b) => (b['scoreAverage'] * multiplicator(0, b['commentsCount'])) - (a['scoreAverage'] * multiplicator(0, a['commentsCount'])));
        setItems(itemList);
        setLoadingSearch(false);
        setLoading(false);
      });
    });
  };

  
  const multiplicator = (base, commentsCount) => {
    if (commentsCount === 0 || commentsCount === 1) {
      return base + 1;
    } else {
      return multiplicator(base + 1/(2**(commentsCount - 1)), commentsCount - 1);
    }
  }

  useEffect(() => {
    setLoading(true);
    console.log('currentCategory', currentCategory);
    const filter = Filter('category', '==', currentCategory);
    return subscriber(filter);
  }, [currentCategory]);

  function updateSearch(text: string): void {
    setLoadingSearch(true);
    setSearch(text);
    const filter = Filter.and(Filter('category', '==', currentCategory), Filter('titleLowercase', '>=', text.toLowerCase()), Filter('titleLowercase', '<=', text.toLowerCase() + '\uf8ff'));
    subscriber(filter);
  }

  if (loading) {
    return (
      <View style={baseStyles.softBackground}>
        <AppLoading />
      </View>
    );
  } else {
    return (
      <View>
        <ScrollView style={[baseStyles.softBackground, {minHeight: windowHeight - 100 }]}>
          <SearchBar
            lightTheme
            placeholder={I18n.t('search')}
            onChangeText={updateSearch}
            value={search}
            containerStyle={[baseStyles.softBackground, {borderWidth: 0}]}
          />
          { loadingSearch ? <AppLoading/> : <ScrollView>
            <FlatList
              style={[baseStyles.softBackground]}
              data={ items }
              numColumns={2}
              renderItem={({item}) => <ItemCard {...item} navigation={navigation}></ItemCard>}
            />
          </ScrollView>
          }
        </ScrollView>
        <View style={[baseStyles.alignCenter, baseStyles.width100, {
          position: 'absolute',
          right: 20,
          top: windowHeight - 150,
          width: 60,
          height: 60}]}>
          <AddButton navigation={navigation}/>
        </View>
      </View>
    )
  }
}

export default ItemList;