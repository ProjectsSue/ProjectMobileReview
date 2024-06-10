import { FlatList } from 'react-native';
import React from 'react';
import ItemCard from './ItemCard';
import baseStyles from '../../baseStyles';


const ItemList = ({navigation}) => {
  const dataMock = [
    {
      title: 'El Príncipe',
      image: 'https://m.media-amazon.com/images/I/51d3RdYrfTL.jpg',
      commentsCount: 40,
      scoreAverage: 9,
      author: 'Nicolas Maquiavelo'
    }, 
    {
      title: 'El Príncipe',
      image: 'https://m.media-amazon.com/images/I/51d3RdYrfTL.jpg',
      commentsCount: 40,
      scoreAverage: 9,
      author: 'Nicolas Maquiavelo'
    }, 
    {
      title: 'El Príncipe',
      image: 'https://m.media-amazon.com/images/I/51d3RdYrfTL.jpg',
      commentsCount: 50,
      scoreAverage: 5,
      author: 'Nicolas Maquiavelo'
    }, 
    {
      title: 'El Príncipe',
      image: 'https://m.media-amazon.com/images/I/51d3RdYrfTL.jpg',
      commentsCount: 100,
      scoreAverage: 9,
      author: 'Nicolas Maquiavelo'
    },
    {
      title: 'El Príncipe',
      image: 'https://m.media-amazon.com/images/I/51d3RdYrfTL.jpg',
      commentsCount: 40,
      scoreAverage: 4,
      author: 'Nicolas Maquiavelo'
    }, 
    {
      title: 'El Príncipe',
      image: 'https://m.media-amazon.com/images/I/51d3RdYrfTL.jpg',
      commentsCount: 40,
      scoreAverage: 9,
      author: 'Nicolas Maquiavelo'
    }, 
    {
      title: 'El Príncipe',
      image: 'https://m.media-amazon.com/images/I/51d3RdYrfTL.jpg',
      commentsCount: 20,
      scoreAverage: 3,
      author: 'Nicolas Maquiavelo'
    }, 
    {
      title: 'El Príncipe',
      image: 'https://m.media-amazon.com/images/I/51d3RdYrfTL.jpg',
      commentsCount: 40,
      scoreAverage: 8,
      author: 'Nicolas Maquiavelo'
    }]
    console.log('ItemList')
    console.log(navigation)
  return (
    <FlatList
      style={baseStyles.softBackground}
      data={ dataMock }
      numColumns={2}
      renderItem={({item}) => <ItemCard {...item} navigation={navigation}></ItemCard>}
    />
  )
}

export default ItemList;