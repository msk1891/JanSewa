
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FarmerHelp = () => {
  const [modalVisible, setModalVisible] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState('');

  const openModal = (type) => setModalVisible(type);
  const closeModal = () => {
    setModalVisible(null);
    setChatResponse('');
    setSelectedImage(null);
  };

  const handleAskAI = () => {
    if (!chatInput) return;
    // Mock AI response
    const mockResponse = `The current mandi price for ${chatInput.toLowerCase()} is ₹2,150/quintal.`;
    setChatResponse(mockResponse);
  };

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>👨‍🌾 Farmer & Rural AI Assistant</Text>
      <Text style={styles.subheading}>Helping Uttarakhand’s farmers with AI-driven support.</Text>

      {/* Sections */}
      <TouchableOpacity style={[styles.section, { backgroundColor: '#E6F4EA' }]} onPress={() => openModal('chat')}>
        <Icon name="sprout" size={32} color="#2E7D32" />
        <View style={styles.textBox}>
          <Text style={styles.sectionTitle}>Check Crop Prices</Text>
          <Text style={styles.sectionDesc}>Ask our AI assistant your mandi price queries.</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.section, { backgroundColor: '#FFF4E5' }]} onPress={() => openModal('scheme')}>
        <Icon name="file-document-outline" size={32} color="#F57C00" />
        <View style={styles.textBox}>
          <Text style={styles.sectionTitle}>Govt. Schemes</Text>
          <Text style={styles.sectionDesc}>Get AI help on PM-Kisan and other support programs.</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.section, { backgroundColor: '#E3F2FD' }]} onPress={() => openModal('organic')}>
        <Icon name="leaf-circle-outline" size={32} color="#0288D1" />
        <View style={styles.textBox}>
          <Text style={styles.sectionTitle}>Organic Farming Tips</Text>
          <Text style={styles.sectionDesc}>Learn AI-curated chemical-free farming tips.</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.section, { backgroundColor: '#FCE4EC' }]} onPress={() => openModal('leaf')}>
        <Icon name="camera-image" size={32} color="#C2185B" />
        <View style={styles.textBox}>
          <Text style={styles.sectionTitle}>Leaf/Disease Diagnosis</Text>
          <Text style={styles.sectionDesc}>Upload a leaf photo — AI will detect problems.</Text>
        </View>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={!!modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {/* Chat UI */}
            {modalVisible === 'chat' && (
              <>
                <Text style={styles.modalHeader}>Ask about crop prices 👇</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Wheat in Rudraprayag"
                  value={chatInput}
                  onChangeText={setChatInput}
                />
                <TouchableOpacity style={styles.askBtn} onPress={handleAskAI}>
                  <Text style={styles.askText}>Ask AI</Text>
                </TouchableOpacity>
                {chatResponse ? (
                  <Text style={styles.responseBox}>{chatResponse}</Text>
                ) : null}
              </>
            )}

            {/* Image Upload UI */}
            {modalVisible === 'leaf' && (
              <>
                <Text style={styles.modalHeader}>Upload a photo of the affected leaf 🍃</Text>
                <TouchableOpacity style={styles.askBtn} onPress={handleImagePick}>
                  <Text style={styles.askText}>Pick Image</Text>
                </TouchableOpacity>
                {selectedImage && (
                  <>
                    <Image source={{ uri: selectedImage }} style={styles.previewImage} />
                    <Text style={styles.responseBox}>
                      🤖 AI says: "Possible fungal infection. Try Neem-based organic spray."
                    </Text>
                  </>
                )}
              </>
            )}

            {/* Text Modals */}
            {(modalVisible === 'scheme' || modalVisible === 'organic') && (
              <Text style={styles.modalHeader}>
                {modalVisible === 'scheme'
                  ? '🗂️ PM-Kisan, Krishi Sinchai Yojana & more — I’ll guide you based on your needs.'
                  : '🌿 Use compost, crop rotation, and Neem oil spray for better organic yield.'}
              </Text>
            )}

            <Pressable onPress={closeModal} style={styles.closeBtn}>
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FCFFFC',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20',
    textAlign: 'center',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 15,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  section: {
    flexDirection: 'row',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
  },
  textBox: {
    marginLeft: 15,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  sectionDesc: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '85%',
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  askBtn: {
    backgroundColor: '#1B5E20',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
  },
  askText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  responseBox: {
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    color: '#2E7D32',
    textAlign: 'center',
  },
  previewImage: {
    width: 180,
    height: 180,
    borderRadius: 10,
    marginTop: 10,
  },
  closeBtn: {
    marginTop: 20,
    backgroundColor: '#555',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  closeText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default FarmerHelp;
