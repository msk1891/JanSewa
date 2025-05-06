import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
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
    { name: 'AI Assistant (Chatbot)', screen: 'ChatBotScreen', icon: 'chatbubble-ellipses-outline' },
    { name: 'Complaint System', screen: 'ComplaintForm', icon: 'alert-circle-outline' },
    { name: 'Emergency & Health', screen: 'Emergency', icon: 'medkit-outline' },
    { name: 'Disaster Alert System', screen: 'DisasterAlert', icon: 'warning-outline' },
    { name: 'Tourist Guide', screen: 'TouristGuide', icon: 'map-outline' },
    { name: 'Farmer Support', screen: 'FarmerHelp', icon: 'leaf-outline' },
    { name: 'Public Voice', screen: 'PublicVoice', icon: 'megaphone-outline' },
    { name: 'Admin Dashboard', screen: 'AdminDashboard', icon: 'bar-chart-outline' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.subtitle}>Your AI-powered assistant for public services</Text>

      {modules.map((mod, index) => (
        <TouchableOpacity
          key={index}
          style={styles.moduleButton}
          onPress={() => {
            animateButton();
            navigation.navigate(mod.screen);
          }}
        >
          <Animated.View style={[{ transform: [{ scale }] }, styles.animatedBtn]}>
            <Icon name={mod.icon} size={24} color="#ffffff" style={{ marginRight: 10 }} />
            <Text style={styles.buttonText}>{mod.name}</Text>
          </Animated.View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
    backgroundColor: '#F7F8F3', // Off-white neutral
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#023047', // Midnight Blue
    fontFamily: 'sans-serif', // Default system font
    marginBottom: 30,
    textAlign: 'center',
  },
  moduleButton: {
    backgroundColor: '#2D6A4F', // Primary Color
    width: '100%',
    paddingVertical: 14,
    marginBottom: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'sans-serif', // Default system font
  },
  animatedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HomeScreen;
