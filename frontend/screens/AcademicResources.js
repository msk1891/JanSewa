import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const AcademicResources = () => {
const handleExamAlerts = () => {
Alert.alert('Exam Alerts', 'You have a Math exam on 10th May. Scholarship deadline: 20th May.');
};

const handleEPathshala = () => {
Alert.alert('E-Pathshala', 'Redirecting to curated digital learning materials...');
};

return (
<View style={styles.container}>
<Text style={styles.header}>Academic Resources</Text>
  <TouchableOpacity style={styles.button} onPress={handleExamAlerts}>
    <Text style={styles.buttonText}>📢 Exam & Scholarship Alerts</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.button} onPress={handleEPathshala}>
    <Text style={styles.buttonText}>📚 Access E-Pathshala</Text>
  </TouchableOpacity>
</View>
);
};

const styles = StyleSheet.create({
container: {
padding: 20,
backgroundColor: '#F5F7FA',
flex: 1,
},
header: {
fontSize: 22,
fontWeight: '700',
marginBottom: 20,
textAlign: 'center',
},
button: {
backgroundColor: '#0077B6',
padding: 16,
borderRadius: 10,
marginVertical: 10,
},
buttonText: {
color: '#fff',
fontSize: 16,
fontWeight: '500',
textAlign: 'center',
},
});

export default AcademicResources;