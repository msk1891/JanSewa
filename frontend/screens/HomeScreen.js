import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const navigation = useNavigation();
  const scale = useRef(new Animated.Value(1)).current;

  // Button Animation
  const animateButton = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      friction: 3,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    });
  };

  const modules = [
    { name: 'AI Sahayak', screen: 'ChatBotScreen', icon: 'chatbubble-ellipses-outline' },
    { name: 'File Complaint', screen: 'ComplaintForm', icon: 'alert-circle-outline' },
    { name: 'Health Support', screen: 'Emergency', icon: 'medkit-outline' },
    { name: 'Disaster Alerts', screen: 'DisasterAlert', icon: 'warning-outline' },
    { name: 'Tourist Guide', screen: 'TouristGuide', icon: 'map-outline' },
    { name: 'Farmer Support', screen: 'FarmerHelp', icon: 'leaf-outline' },
    { name: 'Gram Sabha', screen: 'PublicVoice', icon: 'megaphone-outline' },
    { name: 'Education', screen: 'Education', icon: 'book-outline' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
     

      <Text style={styles.subtitle}>Your AI-powered assistant for public services</Text>

      {/* Grid Layout for Modules */}
      <View style={styles.gridContainer}>
        {modules.map((mod, index) => (
          <TouchableOpacity
            key={index}
            style={styles.moduleCard}
            onPress={() => {
              animateButton();
              navigation.navigate(mod.screen);
            }}
          >
            <Animated.View style={[{ transform: [{ scale }] }, styles.animatedBtn]}>
              <Icon name={mod.icon} size={40} color="#ffffff" />
              <Text style={styles.moduleText}>{mod.name}</Text>
            </Animated.View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
    backgroundColor: '#F7F8F3', // Off-white neutral
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#2D6A4F',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  micIcon: {
    marginLeft: 10,
    padding: 8,
    backgroundColor: '#E0F2F1', // Light green background for mic icon
    borderRadius: 50,
  },
  subtitle: {
    fontSize: 18,
    color: '#023047', // Midnight Blue
    fontFamily: 'sans-serif',
    marginBottom: 30,
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  moduleCard: {
    width: '48%', // To make cards fit in two columns
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: '#2D6A4F',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  animatedBtn: {
    alignItems: 'center',
  },
  moduleText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default HomeScreen;
