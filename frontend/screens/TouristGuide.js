import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';

const TouristGuide = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tab, setTab] = useState('Sites');
  const [duration, setDuration] = useState('');
  const [interest, setInterest] = useState('');
  const [itinerary, setItinerary] = useState('');
  const [language, setLanguage] = useState('English');

  const handleGenerate = () => {
    setItinerary(`🗺 Based on your interest in "${interest}" for ${duration} days, visit:
1. Rishikesh Ganga Aarti
2. Chopta Valley Trek
3. Local Garhwali Cuisine trail in Mussoorie`);
  };

  const switchLanguage = () => {
    const next = language === 'English' ? 'Hindi' : language === 'Hindi' ? 'Garhwali' : 'English';
    setLanguage(next);
  };

  const culturalMarkers = [
    { lat: 30.124, lng: 78.321, label: 'Rishikesh Ghat' },
    { lat: 30.398, lng: 79.061, label: 'Chopta' },
    { lat: 30.459, lng: 78.067, label: 'Mussoorie Food Street' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🎒 Uttarakhand Tourist Guide</Text>
      <Text style={styles.subtext}>Plan your journey with AI + explore cultural treasures.</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.featureBtn}>
          <Icon name="sparkles-outline" size={24} color="#fff" />
          <Text style={styles.featureText}>AI Itinerary</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={switchLanguage} style={styles.featureBtn}>
          <Icon name="language-outline" size={24} color="#fff" />
          <Text style={styles.featureText}>Lang: {language}</Text>
        </TouchableOpacity>
      </View>

      {/* Tab View */}
      <View style={styles.tabRow}>
        {['Sites', 'Food', 'Events'].map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tabBtn, tab === t && styles.tabActive]}
            onPress={() => setTab(t)}
          >
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <View style={styles.tabContent}>
        {tab === 'Sites' && (
          <Text style={styles.tabInfo}>
            • Kedarnath Temple{'\n'}• Valley of Flowers{'\n'}• Tehri Lake & Adventure Park
          </Text>
        )}
        {tab === 'Food' && (
          <Text style={styles.tabInfo}>
            • Aloo Ke Gutke{'\n'}• Jhangora Kheer{'\n'}• Local thalis at Pauri, Almora
          </Text>
        )}
        {tab === 'Events' && (
          <Text style={styles.tabInfo}>
            • Nanda Devi Fair - Sep{'\n'}• Bikhauti Mela - April{'\n'}• Ganga Dussehra
          </Text>
        )}
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 30.3,
            longitude: 78.1,
            latitudeDelta: 1.5,
            longitudeDelta: 1.5,
          }}
        >
          {culturalMarkers.map((m, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: m.lat, longitude: m.lng }}
              title={m.label}
              pinColor="#E91E63"
            />
          ))}
        </MapView>
      </View>

      {/* Itinerary Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>🧭 Generate Your Itinerary</Text>
            <TextInput
              style={styles.input}
              placeholder="Number of days"
              keyboardType="numeric"
              value={duration}
              onChangeText={setDuration}
            />
            <TextInput
              style={styles.input}
              placeholder="Your interest (trekking, temples...)"
              value={interest}
              onChangeText={setInterest}
            />
            <TouchableOpacity style={styles.generateBtn} onPress={handleGenerate}>
              <Text style={styles.generateText}>Generate</Text>
            </TouchableOpacity>

            {itinerary ? <Text style={styles.itineraryText}>{itinerary}</Text> : null}

            <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F4F9F9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A73E8',
    textAlign: 'center',
  },
  subtext: {
    textAlign: 'center',
    color: '#555',
    marginVertical: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  featureBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A73E8',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  featureText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 6,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  tabBtn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#ddd',
  },
  tabActive: {
    backgroundColor: '#1A73E8',
  },
  tabText: {
    color: '#333',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#fff',
  },
  tabContent: {
    marginVertical: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  tabInfo: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
  },
  mapContainer: {
    height: 250,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 30,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 6,
  },
  generateBtn: {
    backgroundColor: '#388E3C',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 8,
  },
  generateText: {
    color: '#fff',
    fontWeight: '600',
  },
  itineraryText: {
    marginTop: 15,
    color: '#2E7D32',
    textAlign: 'center',
  },
  closeBtn: {
    marginTop: 20,
    backgroundColor: '#555',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  closeText: {
    color: '#fff',
  },
});

export default TouristGuide;