import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const features = [
  { title: 'Smart Career Advisor', screen: 'CareerAdvisor' },
  { title: 'Nearby Schools & Colleges', screen: 'SchoolFinder' },
  { title: 'Academic Resources', screen: 'AcademicResources' }, // merged
  { title: 'Skill Development', screen: 'SkillCorner', comingSoon: true },
  { title: 'Doubt Solving Chatbot', screen: 'DoubtChatbot' },
];

const Education = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Education Dashboard</Text>
      {features.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => {
            if (item.comingSoon) {
              alert("This feature is coming soon!");
            } else {
              navigation.navigate(item.screen);
            }
          }}
        >
                <View style={styles.cardContent}>
            <Text style={styles.cardText}>{item.title}</Text>
            {item.comingSoon && <Text style={styles.comingSoonText}>Coming Soon</Text>}
          </View>

        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F0F0F0',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    elevation: 3,
  },
  cardContent:{
   flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
  },
  comingSoonText: {
    fontSize: 14,
    color: '#FF5722',
    fontStyle: 'italic',
    marginTop: 5,
  },
});

export default Education;
