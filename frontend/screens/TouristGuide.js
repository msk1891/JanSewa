// TouristGuide.jsx
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
import Icon from 'react-native-vector-icons/Ionicons';
import locationData from '../assets/locationData.json';

const TouristGuide = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tab, setTab] = useState('Sites');
  const [duration, setDuration] = useState('');
  const [interest, setInterest] = useState('');
  const [itinerary, setItinerary] = useState('');
  const [language, setLanguage] = useState('English');
  const [selectedLocation, setSelectedLocation] = useState('Rishikesh');

  const handleGenerate = () => {
    if (!duration || !interest) return;
    setItinerary(`🗺 Based on your interest in "${interest}" for ${duration} days in ${selectedLocation}, visit:
1. ${selectedLocation} Main Attraction
2. Hidden Gem
3. Local Experience`);
  };

  const switchLanguage = () => {
    const langs = ['English', 'Hindi', 'Garhwali', 'Kumaoni'];
    const next = (langs.indexOf(language) + 1) % langs.length;
    setLanguage(langs[next]);
  };

  const current = locationData[selectedLocation];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heroTitle}>🌄 Explore Uttarakhand</Text>
      <Text style={styles.heroSubtitle}>Your AI-powered cultural companion</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.actionBtn}>
          <Icon name="sparkles-outline" size={20} color="#fff" />
          <Text style={styles.actionText}>AI Plan</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={switchLanguage} style={styles.actionBtn}>
          <Icon name="language-outline" size={20} color="#fff" />
          <Text style={styles.actionText}>Lang: {language}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>📍 Locations</Text>
      <View style={styles.chipRow}>
        {Object.keys(locationData).map((loc) => (
          <TouchableOpacity
            key={loc}
            style={[
              styles.chip,
              selectedLocation === loc && styles.chipSelected
            ]}
            onPress={() => setSelectedLocation(loc)}
          >
            <Text style={selectedLocation === loc ? styles.chipTextActive : styles.chipText}>
              {loc}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>🔍 Discover</Text>
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

      <View style={styles.card}>
        {current[tab].map((item, idx) => (
          <View key={idx} style={styles.cardItem}>
            <Icon name={item.icon || 'location-outline'} size={18} color="#196795" />
            <View>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={styles.itemDesc}>{item.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>🧭 Plan Itinerary</Text>

            <Text style={styles.modalLabel}>Days</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 3"
              keyboardType="numeric"
              value={duration}
              onChangeText={setDuration}
            />

            <Text style={styles.modalLabel}>Interest</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., temples, hiking, food"
              value={interest}
              onChangeText={setInterest}
            />

            <TouchableOpacity onPress={handleGenerate} style={styles.generateBtn}>
              <Text style={styles.generateText}>🎯 Generate</Text>
            </TouchableOpacity>

            {itinerary ? (
              <Text style={styles.itineraryText}>{itinerary}</Text>
            ) : null}

            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f9f9ff' },
  heroTitle: { fontSize: 24, fontWeight: 'bold', color: '#196795', textAlign: 'center' },
  heroSubtitle: { fontSize: 14, color: '#555', textAlign: 'center', marginBottom: 16 },

  sectionTitle: { fontSize: 18, fontWeight: '600', marginTop: 20, marginBottom: 8 },

  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 10,
    backgroundColor: '#196795',
    borderRadius: 10,
    minWidth: '40%',
    justifyContent: 'center',
  },
  actionText: { color: '#fff', fontWeight: 'bold' },

  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: '#eee',
    borderRadius: 20,
  },
  chipSelected: {
    backgroundColor: '#196795',
  },
  chipText: { color: '#333' },
  chipTextActive: { color: '#fff', fontWeight: 'bold' },

  tabRow: { flexDirection: 'row', justifyContent: 'center', gap: 10 },
  tabBtn: { padding: 10, borderRadius: 8 },
  tabActive: { backgroundColor: '#196795' },
  tabText: { fontSize: 14, fontWeight: 'bold', color: '#196795' },
  tabTextActive: { color: '#fff' },

  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
    elevation: 3,
    gap: 10,
  },
  cardItem: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  itemTitle: { fontWeight: 'bold', color: '#222' },
  itemDesc: { fontSize: 12, color: '#666' },

  modalOverlay: {
    flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.4)'
  },
  modalBox: {
    margin: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    gap: 10,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#196795', marginBottom: 10 },
  modalLabel: { fontWeight: '600', marginTop: 10 },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },

  generateBtn: {
    backgroundColor: '#196795',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  generateText: { color: '#fff', fontWeight: 'bold' },

  itineraryText: { marginTop: 10, fontSize: 14, lineHeight: 20, color: '#333' },
  closeBtn: { marginTop: 10, alignItems: 'center' },
  closeText: { color: '#e33', fontWeight: 'bold' },
});

export default TouristGuide;
