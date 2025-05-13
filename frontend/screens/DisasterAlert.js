import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Linking, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';

const DisasterAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [aiResponse, setAIResponse] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    loadCachedAlerts();
    fetchLiveAlerts();
  }, []);

  const fetchLiveAlerts = async () => {
  const alertOptions = [
    [
      { id: '1', type: 'Flood Warning', level: 'Red', location: 'Rishikesh' },
      { id: '2', type: 'Heavy Rainfall', level: 'Orange', location: 'Nainital' },
    ],
    [
      { id: '3', type: 'Landslide Alert', level: 'Red', location: 'Chamoli' },
      { id: '4', type: 'Earthquake Tremors', level: 'Green', location: 'Dehradun' },
    ],
    [
      { id: '5', type: 'Flash Flood Alert', level: 'Red', location: 'Pauri' },
      { id: '6', type: 'Cloudburst Warning', level: 'Orange', location: 'Tehri' },
    ],
    [
      { id: '7', type: 'Storm Warning', level: 'Orange', location: 'Haridwar' },
      { id: '8', type: 'River Overflow Risk', level: 'Red', location: 'Almora' },
    ]
  ];

  // Pick a random alert set
  const randomSet = alertOptions[Math.floor(Math.random() * alertOptions.length)];
  setAlerts(randomSet);
  await AsyncStorage.setItem('cachedAlerts', JSON.stringify(randomSet));
  setLastUpdated(new Date().toLocaleTimeString());
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

  const getCoordinates = (location) => {
    switch (location) {
      case 'Rishikesh': return { latitude: 30.117, longitude: 78.323 };
      case 'Nainital': return { latitude: 29.3919, longitude: 79.4542 };
      case 'Chamoli': return { latitude: 30.5, longitude: 79.5 };
      case 'Dehradun': return { latitude: 30.3165, longitude: 78.0322 };
      case 'Pauri': return { latitude: 30.15, longitude: 78.78 };
      case 'Tehri': return { latitude: 30.38, longitude: 78.48 };
      case 'Haridwar': return { latitude: 29.9457, longitude: 78.1642 };
      case 'Almora': return { latitude: 29.5970, longitude: 79.6591 };

      default: return { latitude: 30.3165, longitude: 78.0322 };
    }
  };

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

        {/* Refresh + Last Updated */}
        <TouchableOpacity onPress={fetchLiveAlerts} style={styles.refreshButton}>
          <Text style={styles.refreshText}>🔄 Refresh Alerts</Text>
        </TouchableOpacity>
        {lastUpdated && <Text style={styles.updatedAt}>Last updated: {lastUpdated}</Text>}

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
              latitudeDelta: 1,
              longitudeDelta: 1,
            }}
          >
            {alerts.map((alert, index) => (
              <Marker
                key={index}
                coordinate={getCoordinates(alert.location)}
                title={`${alert.type} (${alert.level})`}
                pinColor={getLevelStyle(alert.level).color}
              />
            ))}
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

export default DisasterAlerts;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8' },
  scrollContent: { padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  section: { marginTop: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  alertCard: {
    flexDirection: 'row', backgroundColor: '#fff', padding: 12, borderRadius: 10,
    marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2,
  },
  alertLeft: { justifyContent: 'center', marginRight: 10 },
  alertBody: { flex: 1 },
  alertType: { fontWeight: 'bold', fontSize: 16 },
  alertLocation: { color: '#555' },
  alertRight: { justifyContent: 'center' },
  map: { height: 250, borderRadius: 12 },
  pdfButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  pdfText: { marginLeft: 6, color: '#1A73E8', textDecorationLine: 'underline' },
  chatPopup: {
    backgroundColor: '#fff', padding: 16, borderRadius: 12, marginTop: 20,
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 6, elevation: 4,
  },
  chatTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 10,
  },
  sendButton: {
    backgroundColor: '#1A73E8', padding: 10, borderRadius: 8, alignItems: 'center',
  },
  sendButtonText: { color: '#fff', fontWeight: 'bold' },
  aiReply: { marginTop: 10, fontStyle: 'italic', color: '#444' },
  closeButton: { marginTop: 10, alignItems: 'flex-end' },
  closeText: { color: '#E53935' },
  fab: {
    position: 'absolute', bottom: 20, right: 20, backgroundColor: '#1A73E8',
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 30, flexDirection: 'row', alignItems: 'center',
  },
  fabLabel: { color: '#fff', marginLeft: 6 },
  refreshButton: {
    alignSelf: 'flex-start', backgroundColor: '#e0e0e0',
    paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, marginBottom: 6,
  },
  refreshText: { fontSize: 14 },
  updatedAt: { fontSize: 12, color: '#666' },
});