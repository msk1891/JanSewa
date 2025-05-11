import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SahayataAIScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Sahayata AI!</Text>
      {/* Add the specific functionality for Sahayata AI here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A73E8',
  },
});

export default SahayataAIScreen;