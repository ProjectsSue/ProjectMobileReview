import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import PieChart from 'react-native-pie-chart'
import baseStyles from '../../baseStyles';


const ScoreSelector = () => {
  const [score, setScore] = useState(30);

  const handleScoreChange = (newScore: string) => {
    if (Number(newScore) > 100) {
      setScore(100);
      return;
    }
    if (isNaN(Number(newScore)) || Number(newScore) < 0){
      setScore(0);
      return;
    }
    setScore(Number(newScore));
  };
  const sliceColor=['#f28500', '#DFDFDF'];

  return (
    <View style={styles.container}>
      {/* <View style={[styles.scoreThumb, {top: `${score}%`}]}>
        <View style={styles.scoreContainer}>
          <TextInput style={styles.scoreText}>{score}</TextInput>
        </View>
      </View> */}
      <PieChart
        series={[score, 100 - score]}
        sliceColor={sliceColor}
        coverRadius={0.8}
        coverFill={'#f7f7f7'} 
        widthAndHeight={100}/>
      <TextInput style={styles.scoreText}>{score}</TextInput>
    </View>
  );
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
    fontSize: 16,
  },
});

export default ScoreSelector;