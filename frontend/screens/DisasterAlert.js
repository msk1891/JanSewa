import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

const DisasterAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [aiResponse, setAIResponse] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [userQuery, setUserQuery] = useState('');

  useEffect(() => {
    loadCachedAlerts();
    fetchLiveAlerts();
  }, []);

  const fetchLiveAlerts = async () => {
    const dummyAlerts = [
      { id: '1', type: 'Flood Warning', level: 'Red', location: 'Rishikesh' },
      { id: '2', type: 'Heavy Rain', level: 'Orange', location: 'Nainital' },
    ];
    setAlerts(dummyAlerts);
    await AsyncStorage.setItem('cachedAlerts', JSON.stringify(dummyAlerts));
  };

  const loadCachedAlerts = async () => {
    const cached = await AsyncStorage.getItem('cachedAlerts');
    if (cached) setAlerts(JSON.parse(cached));
  };

  const getLevelStyle = (level) => {
    switch (level) {
      case 'Red': return { color: '#E53935', label: 'High Risk' };
      case 'Orange': return { color: '#FB8C00', label: 'Moderate' };
      case 'Green': return { color: '#43A047', label: 'Safe' };
      default: return { color: '#777', label: 'Unknown' };
    }
  };

  const safetyGuides = [
    { title: 'Flood Safety Guide (PDF)', url: 'https://example.com/flood-guide.pdf' },
    { title: 'Landslide Safety Tips', url: 'https://example.com/landslide-guide.pdf' },
  ];

  const handleAIQuery = () => {
    const reply = userQuery.toLowerCase().includes('safe') ?
      "📍 Nearby shelters: Community Hall, Panchayat Bhavan, Local School." :
      "🛡 Tip: Stay informed. In case of heavy rain, avoid travel and monitor alerts.";
    setAIResponse(reply);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>🌪 Disaster Alerts & Safety</Text>

        {/* Alerts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🛑 Live Alerts</Text>
          {alerts.map(alert => {
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

        {/* Map View */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🗺 Shelter & Danger Zones</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 30.3165,
              longitude: 78.0322,
              latitudeDelta: 0.5,
              longitudeDelta: 0.5,
            }}
          >
            <Marker coordinate={{ latitude: 30.34, longitude: 78.04 }} title="Govt Shelter" pinColor="green" />
            <Marker coordinate={{ latitude: 29.39, longitude: 79.45 }} title="Danger Zone" pinColor="red" />
          </MapView>
        </View>

        {/* Guides */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📘 Safety Guides</Text>
          {safetyGuides.map((guide, index) => (
            <TouchableOpacity key={index} onPress={() => Linking.openURL(guide.url)} style={styles.pdfButton}>
              <Icon name="document-attach-outline" size={20} color="#1A73E8" />
              <Text style={styles.pdfText}>{guide.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* AI Chat Popup */}
        {chatOpen && (
          <View style={styles.chatPopup}>
            <Text style={styles.chatTitle}>🤖 Ask AI Assistant</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Nearest safe zone?"
              value={userQuery}
              onChangeText={setUserQuery}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleAIQuery}>
              <Text style={styles.sendButtonText}>Ask</Text>
            </TouchableOpacity>
            {aiResponse && <Text style={styles.aiReply}>{aiResponse}</Text>}
            <TouchableOpacity onPress={() => setChatOpen(false)} style={styles.closeButton}>
              <Text style={styles.closeText}>✖ Close</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Floating AI Chat Button */}
      {!chatOpen && (
        <TouchableOpacity style={styles.fab} onPress={() => setChatOpen(true)}>
          <Icon name="chatbubbles-outline" size={26} color="#fff" />
          <Text style={styles.fabLabel}>Ask AI</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
  scrollContent: { padding: 16, paddingBottom: 100 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A73E8',
    textAlign: 'center',
    marginBottom: 12,
  },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8, color: '#333' },

  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  alertLeft: { marginRight: 10 },
  alertBody: { flex: 1 },
  alertType: { fontSize: 16, fontWeight: '500', color: '#333' },
  alertLocation: { fontSize: 13, color: '#666' },
  alertRight: {},

  map: {
    height: 220,
    borderRadius: 10,
    marginTop: 6,
  },
  pdfButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F0FE',
    padding: 10,
    borderRadius: 6,
    marginBottom: 6,
  },
  pdfText: {
    color: '#1A73E8',
    marginLeft: 8,
    fontWeight: '500',
  },

  fab: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    backgroundColor: '#1A73E8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 50,
    elevation: 6,
  },
  fabLabel: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },

  chatPopup: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    elevation: 10,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#1A73E8',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: '#F9FAFB',
  },
  sendButton: {
    backgroundColor: '#1A73E8',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  aiReply: {
    marginTop: 10,
    backgroundColor: '#F1F8E9',
    padding: 10,
    borderRadius: 6,
    color: '#333',
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
  closeText: {
    color: '#999',
    fontSize: 14,
  },
});

export default DisasterAlerts;