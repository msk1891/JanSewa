import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PolicyPalScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Icon name="shield-checkmark" size={50} color="#1A73E8" />
      <Text style={styles.title}>Welcome to PolicyPal!</Text>
      <Text style={styles.subtitle}>Your one-stop hub for all government schemes and policies.</Text>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card}>
          <Icon name="document-text-outline" size={30} color="#1A73E8" />
          <Text style={styles.cardText}>View Policies</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Icon name="notifications-outline" size={30} color="#1A73E8" />
          <Text style={styles.cardText}>Reminders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Icon name="search-outline" size={30} color="#1A73E8" />
          <Text style={styles.cardText}>Eligibility Checker</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginTop: 10,
    color: '#1A73E8',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginVertical: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  cardContainer: {
    marginTop: 20,
    width: '90%',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
});

export default PolicyPalScreen;
