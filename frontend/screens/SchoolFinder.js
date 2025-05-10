import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';

const sampleSchools = [
  { id: '1', name: 'Doon International School', type: 'School', location: 'Dehradun' },
  { id: '2', name: 'Graphic Era University', type: 'College', location: 'Dehradun' },
  { id: '3', name: 'HNB Garhwal University', type: 'University', location: 'Srinagar' },
  { id: '4', name: 'KV Almora', type: 'School', location: 'Almora' },
  { id: '5', name: 'Govt Polytechnic Pithoragarh', type: 'College', location: 'Pithoragarh' },
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
      <Text style={styles.title}>Nearby Schools & Colleges</Text>
      <TextInput
        style={styles.input}
        placeholder="Search by name or location"
        value={query}
        onChangeText={handleSearch}
      />
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
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  details: {
    fontSize: 14,
    color: '#555',
  },
});

export default SchoolFinder;
