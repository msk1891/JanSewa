import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/icon.png')} // Your logo image
        style={styles.logo}
      />
      <Text style={styles.title}>Uttarakhand AI Sewa</Text>
      <Text style={styles.subtitle}>Your AI-powered assistant for public services</Text>

      {/* GrievanceMap */}
      <TouchableOpacity
        style={styles.moduleButton}
        onPress={() => navigation.navigate('GrievanceMap')}>
        <Text style={styles.buttonText}>GrievanceMap</Text>
      </TouchableOpacity>

      {/* PolicyPal */}
      <TouchableOpacity
        style={styles.moduleButton}
        onPress={() => navigation.navigate('PolicyPal')}>
        <Text style={styles.buttonText}>PolicyPal</Text>
      </TouchableOpacity>

      {/* Sahayata AI */}
      <TouchableOpacity
        style={styles.moduleButton}
        onPress={() => navigation.navigate('SahayataAI')}>
        <Text style={styles.buttonText}>Sahayata AI</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 30,
  },
  moduleButton: {
    backgroundColor: '#1E40AF',
    width: '100%',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
