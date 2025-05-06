import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, FlatList, Linking, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { Marker } from 'react-native-maps';

const EmergencySupport = () => {
  const [aiModalVisible, setAIModalVisible] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [aiResponse, setAIResponse] = useState('');

  const hospitals = [
    { id: '1', name: 'Uttarakhand Govt Hospital', lat: 30.33, lng: 78.04 },
    { id: '2', name: 'City Clinic', lat: 30.34, lng: 78.06 },
  ];

  const handleAIQuery = () => {
    // Placeholder AI response
    setAIResponse('Apply pressure to the wound and seek medical attention if bleeding persists.');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>🚨 Emergency & Health Support</Text>

      {/* First Aid Bot */}
      <TouchableOpacity style={styles.card} onPress={() => setAIModalVisible(true)}>
        <Icon name="medkit-outline" size={30} color="#196795" />
        <Text style={styles.cardText}>First Aid AI Bot</Text>
      </TouchableOpacity>

      {/* Live Hospital Availability */}
      <Text style={styles.sectionTitle}>🏥 Live Hospital Beds (Mock)</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 30.33,
          longitude: 78.04,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {hospitals.map(h => (
          <Marker
            key={h.id}
            coordinate={{ latitude: h.lat, longitude: h.lng }}
            title={h.name}
            description="Beds available"
          />
        ))}
      </MapView>

      <FlatList
        data={hospitals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.hospitalCard}>
            <Icon name="business-outline" size={24} color="#196795" />
            <Text style={styles.hospitalText}>{item.name}</Text>
          </View>
        )}
      />

      {/* Emergency Helplines */}
      <Text style={styles.sectionTitle}>📞 Emergency Helplines</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.helplineButton} onPress={() => Linking.openURL('tel:108')}>
          <Icon name="call-outline" size={20} color="#fff" />
          <Text style={styles.helplineText}>Call Ambulance (108)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.helplineButton} onPress={() => Linking.openURL('tel:112')}>
          <Icon name="call-outline" size={20} color="#fff" />
          <Text style={styles.helplineText}>Call Emergency (112)</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Access */}
      <Text style={styles.sectionTitle}>⚡ Quick Actions</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.quickButton} onPress={() => Linking.openURL('tel:108')}>
          <Icon name="medical-outline" size={24} color="#196795" />
          <Text style={styles.quickText}>Call Ambulance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickButton}>
          <Icon name="medkit-outline" size={24} color="#196795" />
          <Text style={styles.quickText}>Nearest Pharmacy</Text>
        </TouchableOpacity>
      </View>

      {/* AI Modal */}
      <Modal visible={aiModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>🧠 First Aid AI Chat</Text>
            <TextInput
              placeholder="Ask about symptoms or first-aid..."
              style={styles.input}
              value={userQuery}
              onChangeText={setUserQuery}
              multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleAIQuery}>
              <Text style={styles.sendText}>Ask AI</Text>
            </TouchableOpacity>
            {aiResponse ? <Text style={styles.response}>AI: {aiResponse}</Text> : null}
            <TouchableOpacity onPress={() => setAIModalVisible(false)}>
              <Text style={styles.close}>Close</Text>
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
    backgroundColor: '#f8fafc',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#196795',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#e6f0fa',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  cardText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#196795',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#196795',
    marginVertical: 10,
  },
  map: {
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  hospitalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 6,
  },
  hospitalText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  helplineButton: {
    backgroundColor: '#196795',
    padding: 12,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  helplineText: {
    color: '#fff',
    fontSize: 14,
  },
  quickButton: {
    backgroundColor: '#e2e8f0',
    padding: 12,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  quickText: {
    fontSize: 13,
    color: '#196795',
    marginTop: 5,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#196795',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 10,
    height: 80,
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#196795',
    padding: 12,
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  response: {
    marginTop: 10,
    fontSize: 15,
    color: '#333',
  },
  close: {
    marginTop: 20,
    textAlign: 'center',
    color: '#196795',
    fontWeight: 'bold',
  },
});

export default EmergencySupport;