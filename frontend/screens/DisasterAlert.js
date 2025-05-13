import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Image from "../assets/image.png";
import { useNavigation } from '@react-navigation/native'; // for navigation to SafePlace.js

const ALERT_API = 'https://run.mocky.io/v3/23e9c624-e965-4140-b407-496704bbd1f3';
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast?latitude=30.3165&longitude=78.0322&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto';

const DisasterAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Red');
  const navigation = useNavigation(); // Use navigation hook

  useEffect(() => {
    loadCachedAlerts();
    fetchLiveAlerts();
    fetchWeatherForecast();
  }, []);

  const fetchLiveAlerts = async () => {
    try {
      const res = await axios.get(ALERT_API);
      setAlerts(res.data);
      setFilteredAlerts(res.data.filter(alert => alert.level === selectedFilter));
      await AsyncStorage.setItem('cachedAlerts', JSON.stringify(res.data));
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Alert fetch error', err);
    }
  };

  const fetchWeatherForecast = async () => {
    try {
      const res = await axios.get(WEATHER_API);
      const daily = res.data.daily;
      const parsed = daily.time.map((day, i) => ({
        day,
        tempMin: daily.temperature_2m_min[i],
        tempMax: daily.temperature_2m_max[i],
        rain: daily.precipitation_sum[i]
      }));
      setWeatherData(parsed);
    } catch (err) {
      console.error('Weather fetch error', err);
    }
  };

  const loadCachedAlerts = async () => {
    const cached = await AsyncStorage.getItem('cachedAlerts');
    if (cached) {
      setAlerts(JSON.parse(cached));
      setFilteredAlerts(JSON.parse(cached).filter(alert => alert.level === selectedFilter));
    }
  };

  const getLevelStyle = (level) => {
    switch (level) {
      case 'Red': return { color: '#E53935', label: 'High Risk' };
      case 'Orange': return { color: '#FB8C00', label: 'Moderate' };
      case 'Green': return { color: '#43A047', label: 'Safe' };
      default: return { color: '#777', label: 'Unknown' };
    }
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setFilteredAlerts(alerts.filter(alert => alert.level === filter));
  };

  const navigateToSafePlace = () => {
    navigation.navigate('SafePlace'); // Navigate to SafePlace.js
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>🌪 Disaster Alerts & Safety</Text>

        <View style={styles.filterButtons}>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'Red' && styles.selectedButton]}
            onPress={() => handleFilterChange('Red')}
          >
            <Text style={styles.filterButtonText}>🔴 Red</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'Orange' && styles.selectedButton]}
            onPress={() => handleFilterChange('Orange')}
          >
            <Text style={styles.filterButtonText}>🟠 Orange</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'Green' && styles.selectedButton]}
            onPress={() => handleFilterChange('Green')}
          >
            <Text style={styles.filterButtonText}>🟢 Green</Text>
          </TouchableOpacity>
        </View>

        {lastUpdated && <Text style={styles.updatedAt}>Last updated: {lastUpdated}</Text>}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🛑 Live Alerts</Text>
          {filteredAlerts.map(alert => {
            const { color, label } = getLevelStyle(alert.level);
            return (
              <View key={alert.id} style={styles.alertCard}>
                <View style={styles.alertLeft}>
                  <Icon name="alert-circle-outline" size={28} color={color} />
                </View>
                <View style={styles.alertBody}>
                  <Text style={styles.alertType}>{alert.type}</Text>
                  <Text style={styles.alertLocation}>{alert.location}</Text>
                </View>
                <View style={styles.alertRight}>
                  <Text style={{ color, fontWeight: 'bold' }}>{label}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⛅ 10-Day Weather</Text>
          
          {/* Horizontal Scroll View for Cards */}
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {weatherData.length > 0 ? weatherData.map((day, index) => (
              <View key={index} style={styles.weatherCardContainer}>
                {/* Background Image with 30% opacity on each card */}
                <ImageBackground source={Image} style={styles.weatherCard} imageStyle={styles.imageStyle}>
                  <Text style={styles.weatherTemp}>{day.tempMax}°C / {day.tempMin}°C</Text>
                  <Text style={styles.weatherDate}>{day.day}</Text>
                  <Text style={styles.weatherDetail}>
                    {day.rain > 0 ? 'Rain ☔' : 'Clear ☀️'}
                  </Text>
                </ImageBackground>
              </View>
            )) : <Text style={styles.loadingText}>Loading weather...</Text>}
          </ScrollView>
        </View>


        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🛡 Safety Guides</Text>
          <TouchableOpacity
            style={styles.guideButton}
            onPress={() => Linking.openURL('https://example.com/flood-guide.pdf')}
          >
            <Text style={styles.guideButtonText}>Flood Safety Guide (PDF)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.guideButton}
            onPress={() => Linking.openURL('https://example.com/landslide-guide.pdf')}
          >
            <Text style={styles.guideButtonText}>Landslide Safety Tips</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Floating Action Button for Nearest Safe Place */}
      
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={navigateToSafePlace}
      >
        <Icon name="location-sharp" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default DisasterAlerts;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8' },
  scrollContent: { padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  refreshButton: { backgroundColor: '#1976D2', padding: 10, borderRadius: 10, alignItems: 'center', marginBottom: 5 },
  refreshText: { color: '#fff' },
  updatedAt: { textAlign: 'center', color: '#888', fontSize: 12, marginBottom: 10 },
  filterButtons: { flexDirection: 'row', justifyContent: 'center', marginBottom: 10 },
  filterButton: { backgroundColor: '#f0f0f0', padding: 10, marginHorizontal: 5, borderRadius: 8 },
  filterButtonText: { color: '#000', fontWeight: 'bold' },
  selectedButton: { backgroundColor: '#1976D2' },
  section: { marginVertical: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  alertCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 10, marginVertical: 6, borderRadius: 10, elevation: 2 },
  alertLeft: { width: 40 },
  alertBody: { flex: 1 },
  alertType: { fontSize: 16, fontWeight: '600' },
  alertLocation: { fontSize: 14, color: '#666' },
  alertRight: { minWidth: 80, alignItems: 'flex-end' },
section: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#388e3c',
    marginBottom: 15,
    textAlign: 'center',
    marginTop: 10,
  },
  weatherCardContainer: {
    marginRight: 15,
  },
  weatherCard: {
    width: 250,
    height: 200,
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#66bb6a',
  },
  imageStyle: {
    opacity: 0.3, // 30% opacity for the background image
  },
  weatherTemp: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#388e3c', // White text for contrast against background
    marginBottom: 8,
  },
  weatherDate: {
    fontSize: 16,
    color: '#388e3c', // White text for contrast
    marginBottom: 5,
    fontWeight: '500',
  },
  weatherDetail: {
    fontSize: 18,
    color: '#388e3c', // White text for contrast
    fontStyle: 'italic',
  },
  loadingText: {
    fontSize: 18,
    color: '#66bb6a',
    textAlign: 'center',
    fontStyle: 'italic',
  },

  guideButton: { backgroundColor: '#2196F3', padding: 12, borderRadius: 8, marginBottom: 10 },
  guideButtonText: { color: '#fff', fontWeight: '600' },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#1976D2',
    borderRadius: 50,
    padding: 15,
    elevation: 5,
  },
});
