import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import RadialGradient from 'react-native-radial-gradient';


const ScoreSelector = () => {
  const [score, setScore] = useState(50);

  const handleScoreChange = (newScore: string) => {
    setScore(Number(newScore));
  };

  return (
    <View style={styles.container}>
      <RadialGradient colors={['#000000', '#ffffff']}>
        <TextInput
          style={[styles.scoreThumb, styles.scoreText]}
          onChangeText={handleScoreChange}
          value={score.toString()}
          keyboardType="numeric"/>
      </RadialGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  scoreContainer: {
    width: '120%',
    height: '120%',
    backgroundColor: 'blue',
    position: 'relative',
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreThumb: {
    width: 40,
    height: 40,
    backgroundColor: '#f7f7f7',
    borderRadius: 20,
    // borderColor: 'blue',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 16,
  },
});

export default ScoreSelector;