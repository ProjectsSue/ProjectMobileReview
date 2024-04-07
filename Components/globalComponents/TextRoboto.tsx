import React from 'react';
import { Text } from 'react-native';

const TextRoboto = (props) => {
  const defaultStyle = { fontFamily: 'roboto', color: '#14181c' };
  const incomingStyle = Array.isArray(props.style) ? props.style : [props.style];
  return <Text {...props} style={[defaultStyle, ...incomingStyle]} />;
};

export default TextRoboto;