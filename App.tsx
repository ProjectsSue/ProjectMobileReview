import { View, StyleSheet } from 'react-native';
import Item from './Components/Item/index';
import React, { Component } from 'react';
import * as Font from 'expo-font';
import AppLoading from './AppLoading';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('./resources/fonts/Roboto-Regular.ttf'),
      Roboto_medium: require('./resources/fonts/Roboto-Medium.ttf'),
    }),
    this.setState({ loading: false });
  }
  render () {
    if (this.state['loading']) {
      return (
        <View>
          <AppLoading />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Item imageSource={'https://m.media-amazon.com/images/I/51d3RdYrfTL.jpg'}/>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  }
});