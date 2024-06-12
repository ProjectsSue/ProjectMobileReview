import React from 'react';
import { Dimensions, View , Image} from 'react-native';
import baseStyles from './baseStyles';

const windowWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;

const AppLoading = (props) => {
  const images = [require('./assets/loading_p_1.jpeg'), require('./assets/loading_p_2.jpeg')]
  const numberPicked = Math.floor(Math.random() * images.length + 1)
  const incomingStyle = Array.isArray(props.style) ? props.style : [props.style];
  
  return ( 
    <View style={[baseStyles.softBackground, ...incomingStyle]}>
      <Image style={{width: windowWidth, height: imageHeight}}
          source={images[numberPicked]}/>
    </View>
  )
};

export default AppLoading;