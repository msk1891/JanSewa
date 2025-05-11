import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';

// Assuming you have set up the OpenAI API key somewhere
const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY';

const CareerAdvisor = () => {
  const [interest, setInterest] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRecommendation = async () => {
    if (!interest.trim()) {
      Alert.alert('Error', 'Please enter your interest.', [{ text: 'OK' }]);
      return;
    }

    setIsLoading(true); // Start loading

    try {
      // Make an API request to OpenAI's GPT-3 to get career suggestions
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'text-davinci-003', // GPT-3 model
          prompt: `Based on the user's input, suggest a list of careers. User input: "${interest}"`,
          max_tokens: 100,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      const aiResponse = data.choices[0].text.trim();

      // Set the recommendation to the AI-generated response
      setRecommendation(aiResponse);
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.', [{ text: 'OK' }]);
    } finally {
      setIsLoading(false); // Stop loading
    }
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
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleRecommendation} 
          disabled={isLoading} // Disable button when loading
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Loading...' : 'Get Recommendations'}
          </Text>
        </TouchableOpacity>

        {isLoading && <ActivityIndicator size="large" color="#219EBC" style={styles.loader} />}
        
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
    width: '100%',
    maxWidth: 400, // Ensure it doesn't stretch too wide
    alignSelf: 'center',
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
    width: '100%',
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
  loader: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CareerAdvisor;
