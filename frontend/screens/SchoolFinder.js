import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';

const sampleSchools = [
  { id: '1', name: 'Doon International School', type: 'School', location: 'Dehradun' },
  { id: '2', name: 'Graphic Era University', type: 'College', location: 'Dehradun' },
  { id: '3', name: 'HNB Garhwal University', type: 'University', location: 'Srinagar' },
  { id: '4', name: 'KV Almora', type: 'School', location: 'Almora' },
  { id: '5', name: 'Govt Polytechnic Pithoragarh', type: 'College', location: 'Pithoragarh'},
  { id: '6', name: 'Rajkiya Mahila Mahavidyalaya', type: 'College', location: 'Pithoragarh' },
   

  // Schools and Colleges from Uttarakhand cities
  { id: '6', name: 'IIT Roorkee', type: 'University', location: 'Roorkee' },
  { id: '7', name: 'Quantum University', type: 'University', location: 'Roorkee' },
  { id: '8', name: 'Roorkee College of Engineering', type: 'College', location: 'Roorkee' },
  { id: '9', name: 'St. Gabriel’s Academy', type: 'School', location: 'Roorkee' },
  { id: '10', name: 'Greenway Modern School', type: 'School', location: 'Roorkee' },

  { id: '11', name: 'Uttarakhand Technical University', type: 'University', location: 'Haldwani' },
  { id: '12', name: 'Haldwani Institute of Technology', type: 'College', location: 'Haldwani' },
  { id: '13', name: 'Pahari School', type: 'School', location: 'Haldwani' },

  { id: '14', name: 'Rishikesh Institute of Technology', type: 'College', location: 'Rishikesh' },
  { id: '15', name: 'Dev Sanskriti University', type: 'University', location: 'Haridwar' },
  { id: '16', name: 'Haridwar School of Engineering', type: 'College', location: 'Haridwar' },
  { id: '17', name: 'Shivalik College of Engineering', type: 'College', location: 'Haridwar' },

  { id: '18', name: 'Kumaon University', type: 'University', location: 'Nainital' },
  { id: '19', name: 'Nainital College of Science', type: 'College', location: 'Nainital' },
  { id: '20', name: 'St. Xavier’s School', type: 'School', location: 'Nainital' },

  { id: '21', name: 'Government Degree College', type: 'College', location: 'Tehri' },
  { id: '22', name: 'Bageshwar Institute of Technology', type: 'College', location: 'Bageshwar' },
  { id: '23', name: 'Gopeshwar School of Engineering', type: 'College', location: 'Chamoli' },

  { id: '24', name: 'Almora Engineering College', type: 'College', location: 'Almora' },
  { id: '25', name: 'Government Polytechnic Almora', type: 'College', location: 'Almora' },

  { id: '26', name: 'Doon Valley Institute of Technology', type: 'College', location: 'Dehradun' },
  { id: '27', name: 'The Doon School', type: 'School', location: 'Dehradun' },
  { id: '28', name: 'Tula’s Institute', type: 'College', location: 'Dehradun' },
  { id: '29', name: 'SelaQui International School', type: 'School', location: 'Dehradun' },
  { id: '30', name: 'Wadia Institute of Himalayan Geology', type: 'Institute', location: 'Dehradun' },

  { id: '31', name: 'Indira Gandhi Institute of Technology', type: 'College', location: 'Tehri' },
  { id: '32', name: 'Vikramshila School', type: 'School', location: 'Haridwar' },

  { id: '33', name: 'Srinagar Garhwal Institute of Technology', type: 'College', location: 'Srinagar' },
  { id: '34', name: 'DAV College', type: 'College', location: 'Dehradun' },

  { id: '35', name: 'St. Mary’s Convent School', type: 'School', location: 'Haldwani' },
  { id: '36', name: 'Boys Degree College', type: 'College', location: 'Haridwar' },
  { id: '37', name: 'Kashipur College', type: 'College', location: 'Kashipur' },

  { id: '38', name: 'Shree Guru Ram Rai University', type: 'University', location: 'Dehradun' },
  { id: '39', name: 'Sahastradhara School', type: 'School', location: 'Dehradun' },
  { id: '40', name: 'RIMT University', type: 'University', location: 'Dehradun' },
  { id: '41', name: 'School of Engineering, Rishikesh', type: 'College', location: 'Rishikesh' },
  
  { id: '42', name: 'College of Engineering, Roorkee', type: 'College', location: 'Roorkee' },
  { id: '43', name: 'Uttarakhand Open University', type: 'University', location: 'Haldwani' },
  { id: '44', name: 'Kumaon Polytechnic', type: 'College', location: 'Nainital' },

  { id: '45', name: 'Brahma Kumari College', type: 'College', location: 'Haridwar' },
  { id: '46', name: 'Roorkee International School', type: 'School', location: 'Roorkee' },

  // Additional Rishikesh Schools and Colleges
  { id: '47', name: 'Rishikesh Institute of Technology', type: 'College', location: 'Rishikesh' },
  { id: '48', name: 'Ganga Institute of Technology and Management', type: 'College', location: 'Rishikesh' },
  { id: '49', name: 'Bharat Institute of Technology', type: 'College', location: 'Rishikesh' },
  { id: '50', name: 'Rishikesh Engineering College', type: 'College', location: 'Rishikesh' },
  { id: '51', name: 'Swami Vivekanand School', type: 'School', location: 'Rishikesh' },
  { id: '52', name: 'The Rishikesh School', type: 'School', location: 'Rishikesh' },
  { id: '53', name: 'Doon Valley Institute of Engineering & Technology', type: 'College', location: 'Rishikesh' },
  { id: '54', name: 'Rishikesh International School', type: 'School', location: 'Rishikesh' },
  { id: '55', name: 'Uttarakhand Ayurved University', type: 'University', location: 'Rishikesh' },
  { id: '56', name: 'Bharati Vidyapeeth Institute of Management and Research', type: 'College', location: 'Rishikesh' },
  { id: '57', name: 'Sri Sri University (Rishikesh Campus)', type: 'University', location: 'Rishikesh' },
];

const SchoolFinder = () => {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState(sampleSchools);

  const handleSearch = (text) => {
    setQuery(text);
    const filteredData = sampleSchools.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase()) ||
      item.location.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(filteredData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Nearby Schools & Colleges in Uttarakhand</Text>
      <TextInput
        style={styles.input}
        placeholder="🔍 Search by name or location (e.g. Rishikesh)"
        value={query}
        onChangeText={handleSearch}
      />
      {filtered.length === 0 ? (
        <Text style={styles.noResult}>No results found for your search.</Text>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.details}>{item.type} - {item.location}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#E8F5E9',
    flex: 1,
},
title: {
fontSize: 22,
fontWeight: 'bold',
marginBottom: 20,
textAlign: 'center',
},
input: {
borderWidth: 1,
borderColor: '#aaa',
padding: 10,
borderRadius: 8,
marginBottom: 20,
},
card: {
backgroundColor: '#fff',
padding: 15,
borderRadius: 8,
marginVertical: 5,
shadowColor: '#aaa',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.2,
shadowRadius: 5,
},
name: {
fontSize: 18,
fontWeight: 'bold',
},
details: {
fontSize: 14,
color: '#555',
},
noResult: {
fontSize: 18,
color: '#999',
textAlign: 'center',
},
});

export default SchoolFinder;
