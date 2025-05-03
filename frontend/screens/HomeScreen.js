import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const navigation = useNavigation();
  const scale = useRef(new Animated.Value(1)).current;

  const animateButton = () => {
    Animated.sequence([
      Animated.spring(scale, { toValue: 0.95, friction: 3, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 3, useNativeDriver: true }),
    ]).start();
  };

  const modules = [
    { name: 'AI Assistant (Chatbot)', screen: 'ChatBotScreen', icon: 'chatbubble-ellipses-outline' },
    { name: 'Complaint System', screen: 'ComplaintForm', icon: 'alert-circle-outline' },
    { name: 'Emergency & Health', screen: 'EmergencyScreen', icon: 'medkit-outline' },
    { name: 'Disaster Alert System', screen: 'DisasterAlert', icon: 'warning-outline' },
    { name: 'Tourist Guide', screen: 'TouristGuide', icon: 'map-outline' },
    { name: 'Farmer Support', screen: 'FarmerHelp', icon: 'leaf-outline' },
    { name: 'Public Voice', screen: 'PublicVoice', icon: 'megaphone-outline' },
    { name: 'Admin Dashboard', screen: 'AdminDashboard', icon: 'bar-chart-outline' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/icon.png')} style={styles.logo} />
      <Text style={styles.title}>Uttarakhand AI Sewa</Text>
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
            <Icon name={mod.icon} size={24} color="#fff" style={{ marginRight: 10 }} />
            <Text style={styles.buttonText}>{mod.name}</Text>
          </Animated.View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1D4ED8',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 30,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  moduleButton: {
    backgroundColor: '#2563EB',
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
  },
  animatedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HomeScreen;
