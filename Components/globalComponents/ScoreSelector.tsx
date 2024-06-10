import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import PieChart from 'react-native-pie-chart'
import baseStyles from '../../baseStyles';
import PropTypes from 'prop-types'; 
import { CategoryContext } from '../../appContexts';
import cssConsts from '../../cssConsts';

const ScoreSelector = (props) => {
  const currentCategory = useContext(CategoryContext).currentCategory;

  const handleScoreChange = (newScore: string) => {
    if (Number(newScore) > 100) {
      props.scoreUpdateHanlder(100);
      return;
    }
    if (isNaN(Number(newScore)) || Number(newScore) < 0){
      props.scoreUpdateHanlder(0);
      return;
    }
    props.scoreUpdateHanlder(Number(newScore));
  };
  const sliceColor=[cssConsts[currentCategory+'Color'], cssConsts.darkerColor];

  return (
    <View style={styles.container}>
      <PieChart
        series={[props.score, 100 - props.score]}
        sliceColor={sliceColor}
        coverRadius={0.8}
        coverFill={cssConsts.whiterColor} 
        widthAndHeight={100}/>
      <TextInput style={styles.scoreText}
        onChangeText={text => handleScoreChange(text)}>
        {props.score}
      </TextInput>
    </View>
  );
};

ScoreSelector.propTypes = {
  score: PropTypes.string,
  scoreUpdateHanlder: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    marginTop: 10,
    marginBottom: 100,
  },
  scoreContainer: {
    width: '80%',
    height: '80%',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  scoreThumb: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  scoreText: {
    position: 'absolute',
    top: 38,
    left: 38,
    fontSize: 16,
  },
});

export default ScoreSelector;