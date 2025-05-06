import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PublicVoice = () => {
  const [visibleModal, setVisibleModal] = useState(null);

  const openModal = (type) => setVisibleModal(type);
  const closeModal = () => setVisibleModal(null);

  const getModalContent = () => {
    switch (visibleModal) {
      case 'poll':
        return 'Vote on active local issues and help shape your community.';
      case 'summary':
        return 'AI has summarized all citizen feedback into actionable insights.';
      case 'messages':
        return 'Watch or listen to important updates from your officials.';
      case 'results':
        return 'Track live poll results and see public sentiment trends.';
      case 'voice':
        return 'Record and send your own voice message to be heard.';
      default:
        return '';
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Icon name="megaphone-outline" size={52} color="#196A73" />
      <Text style={styles.title}>Public Voice</Text>
      <Text style={styles.subtitle}>
        Connect with your Gram Sabha. Vote, express, and stay updated through AI-powered tools.
      </Text>

      <View style={styles.cardContainer}>
        <FeatureCard
          icon="bar-chart-outline"
          title="Vote on Local Issues"
          color="#196A73"
          onPress={() => openModal('poll')}
        />
        <FeatureCard
          icon="document-text-outline"
          title="AI Feedback Summary"
          color="#196A73"
          onPress={() => openModal('summary')}
        />
        <FeatureCard
          icon="chatbubbles-outline"
          title="Messages from Officials"
          color="#196A73"
          onPress={() => openModal('messages')}
        />
        <FeatureCard
          icon="stats-chart-outline"
          title="See Poll Results"
          color="#196A73"
          onPress={() => openModal('results')}
        />
        <FeatureCard
          icon="mic-circle-outline"
          title="Send Your Voice"
          color="#196A73"
          onPress={() => openModal('voice')}
        />
      </View>

      {/* Modal */}
      <Modal visible={!!visibleModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {visibleModal?.toUpperCase().replace(/_/g, ' ')}
            </Text>
            <Text style={styles.modalText}>{getModalContent()}</Text>
            <Pressable style={styles.closeBtn} onPress={closeModal}>
              <Text style={styles.closeBtnText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const FeatureCard = ({ icon, title, color, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Icon name={icon} size={30} color={color} />
    <Text style={[styles.cardText, { color }]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F1F8F9',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#196A73',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  cardContainer: {
    marginTop: 30,
    width: '100%',
    gap: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    gap: 15,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#196A73',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
  },
  closeBtn: {
    backgroundColor: '#196A73',
    paddingVertical: 10,
    paddingHorizontal: 26,
    borderRadius: 10,
  },
  closeBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PublicVoice;