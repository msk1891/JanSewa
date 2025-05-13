import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Speech from 'expo-speech';

const SafePlace = () => {
  const [location] = useState({
    latitude: 30.3165,
    longitude: 78.0322,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [markers, setMarkers] = useState([]);
  const [language, setLanguage] = useState('en');
  const [response, setResponse] = useState('');
  const getShelterColor = (index) => {
    const colors = ['#81c784', '#4caf50', '#388e3c', '#66bb6a', '#2e7d32']; // Different greens
    return colors[index % colors.length];
    };

  const fetchSafeShelters = async () => {
    try {
      const res = await fetch('https://run.mocky.io/v3/a6e0b50f-e463-42ef-ad57-07481070cf79');
      const data = await res.json();
      if (data.shelters) {
        const shelters = data.shelters.map(s => ({
          latitude: s.latitude,
          longitude: s.longitude,
          title: s.name,
        }));
        setMarkers(shelters);
        const msg = language === 'en' ? 'Found safe shelters nearby!' : 'पास के सुरक्षित शेल्टर मिले!';
        setResponse(msg);
        Speech.speak(msg, { language: language === 'en' ? 'en' : 'hi' });
      } else {
        const msg = language === 'en' ? 'No shelters found.' : 'कोई शेल्टर नहीं मिला।';
        setResponse(msg);
        Speech.speak(msg);
      }
    } catch (e) {
      const msg = language === 'en' ? 'Error fetching shelters.' : 'शेल्टर लाने में त्रुटि।';
      setResponse(msg);
      Speech.speak(msg);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{language === 'en' ? 'Safe Places Near You' : 'आपके पास सुरक्षित स्थान'}</Text>

      {/* Language Switch */}
      <TouchableOpacity style={styles.languageToggle} onPress={() => setLanguage(l => (l === 'en' ? 'hi' : 'en'))}>
        <Text style={styles.langText}>{language === 'en' ? 'Switch to Hindi 🇮🇳' : 'Switch to English 🇬🇧'}</Text>
      </TouchableOpacity>

      {/* Action Box */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>
          {language === 'en' ? 'Tap below to find nearby safe shelters:' : 'पास के सुरक्षित शेल्टर खोजने के लिए टैप करें:'}
        </Text>
        <TouchableOpacity style={styles.button} onPress={fetchSafeShelters}>
          <Text style={styles.buttonText}>{language === 'en' ? '🔍 Find Safe Shelters' : '🔍 सुरक्षित शेल्टर खोजें'}</Text>
        </TouchableOpacity>
        <Text style={styles.responseText}>{response}</Text>
      </View>

      {/* Map Display */}
      <View style={styles.mapContainer}>
        <MapView style={styles.map} initialRegion={location} showsUserLocation={true}>
          {markers.map((m, i) => (
            <Marker key={i} coordinate={m} title={m.title} />
          ))}
        </MapView>
      </View>
      {/* Shelter List */}
        {markers.length > 0 && (
        <View style={styles.shelterList}>
            <Text style={styles.listTitle}>
            {language === 'en' ? 'Nearby Safe Shelters:' : 'नजदीकी सुरक्षित शेल्टर:'}
            </Text>
            {markers.map((m, i) => (
            <TouchableOpacity key={i} style={styles.shelterCard}>
                <View style={styles.cardContent}>
                <Text style={styles.shelterName}>{m.title}</Text>
                <Text style={styles.shelterLocation}>{`Latitude: ${m.latitude.toFixed(4)} | Longitude: ${m.longitude.toFixed(4)}`}</Text>
                </View>
            </TouchableOpacity>
            ))}
        </View>
        )}



    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: '#f1f8e9',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginVertical: 10,
  },
  languageToggle: {
    backgroundColor: '#66bb6a',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  langText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#ffffff',
    width: '100%',
    borderRadius: 12,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 20,
  },
  cardLabel: {
    fontSize: 16,
    marginBottom: 12,
    color: '#388e3c',
  },
  button: {
    backgroundColor: '#43a047',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  responseText: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#2e7d32',
    textAlign: 'center',
  },
  mapContainer: {
    width: '100%',
    height: 350,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 6,
  },
  map: {
    flex: 1,
  },
  shelterList: {
  width: '100%',
  marginTop: 20,
  paddingHorizontal: 16,
},
listTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 15,
  color: '#2e7d32',
},
shelterCard: {
  backgroundColor: '#e8f5e9',
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 12,
  marginBottom: 12,
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowRadius: 8,
  elevation: 6,
  transform: [{ scale: 1 }],
  transition: 'transform 0.3s ease-in-out',
},
shelterCardHovered: {
  transform: [{ scale: 1.05 }],
},
shelterName: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#33691e',
},

});

export default SafePlace;
