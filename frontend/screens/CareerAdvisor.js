import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

const careerMap = {
  ai: ['AI Researcher', 'Machine Learning Engineer', 'Data Scientist'],
  design: ['UI/UX Designer', 'Graphic Designer', 'Product Designer'],
  coding: ['Software Developer', 'Full-Stack Engineer', 'Backend Developer'],
  writing: ['Content Writer', 'Technical Writer', 'Copywriter'],
  business: ['Product Manager', 'Business Analyst', 'Marketing Strategist'],
};

const CareerAdvisor = () => {
  const [interest, setInterest] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const handleRecommendation = () => {
    if (!interest.trim()) {
      setRecommendation('Please enter your interest.');
      return;
    }

    const key = interest.toLowerCase().trim();
    const careers = careerMap[key] || ['Entrepreneur', 'Freelancer', 'Consultant'];
    setRecommendation(`Based on your interest in "${interest}", you could explore: ${careers.join(', ')}.`);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.card}>
        <Text style={styles.header}>Career Advisor</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your interest (e.g., AI, Design, Coding)"
          value={interest}
          onChangeText={setInterest}
        />
        <TouchableOpacity style={styles.button} onPress={handleRecommendation}>
          <Text style={styles.buttonText}>Get Recommendations</Text>
        </TouchableOpacity>
        {recommendation ? <Text style={styles.recommendation}>{recommendation}</Text> : null}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F0F2',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#023047',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#A8A8A8',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#219EBC',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  recommendation: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
});

export default CareerAdvisor;
