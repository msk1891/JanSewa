import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Linking,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Education = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  const resourceSections = [
    {
      title: '📘 Study Material',
      data: [
        {
          name: 'Digital Textbooks',
          link: 'https://ncert.nic.in/ebooks.php',
          icon: 'book-outline',
          description: 'Access free NCERT digital textbooks for all grades and subjects.',
        },
        {
          name: 'Online Courses (SWAYAM)',
          link: 'https://swayam.gov.in/',
          icon: 'school-outline',
          description: 'Join SWAYAM for government-backed online courses and certifications.',
        },
      ],
    },
    {
      title: '🎓 Opportunities',
      data: [
        {
          name: 'Scholarships (NSP)',
          link: 'https://scholarships.gov.in/',
          icon: 'ribbon-outline',
          description: 'Explore various central & state government scholarships on NSP.',
        },
        {
          name: 'Govt Educational Schemes',
          link: 'https://www.india.gov.in/education',
          icon: 'bulb-outline',
          description: 'Discover national schemes to support school & higher education.',
        },
      ],
    },
    {
      title: '🗓 Events & Updates',
      data: [
        {
          name: 'School/College Announcements',
          link: 'https://example.com/school-events',
          icon: 'calendar-outline',
          description: 'Stay updated with notices and event schedules from institutions.',
        },
        {
          name: 'Career Guidance Portal',
          link: 'https://www.ncs.gov.in/',
          icon: 'people-outline',
          description: 'Access career counseling and job guidance resources.',
        },
      ],
    },
  ];

  const handleResourceClick = (item) => {
    setSelectedResource(item);
    setModalVisible(true);
  };

  const openLink = (url) => {
    Linking.openURL(url).catch(() =>
      Alert.alert('Error', 'Unable to open link. Please try again later.')
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.subtitle}>📚 Educational Resources</Text>

      {resourceSections.map((section, i) => (
        <View key={i} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.data.map((item, j) => (
            <TouchableOpacity
              key={j}
              style={styles.resourceButton}
              onPress={() => handleResourceClick(item)}
            >
              <Icon name={item.icon} size={24} color="#ffffff" />
              <Text style={styles.buttonText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedResource?.name}</Text>
            <Text style={styles.modalDesc}>{selectedResource?.description}</Text>

            <TouchableOpacity
              style={styles.visitButton}
              onPress={() => openLink(selectedResource?.link)}
            >
              <Text style={styles.visitButtonText}>🔗 Visit Site</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: '#fff' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: '#F0F4EF',
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 24,
    color: '#023047',
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#264653',
    fontWeight: '600',
    marginBottom: 12,
  },
  resourceButton: {
    backgroundColor: '#2D6A4F',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D6A4F',
    marginBottom: 10,
  },
  modalDesc: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  visitButton: {
    backgroundColor: '#118AB2',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  visitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    backgroundColor: '#2D6A4F',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default Education;
