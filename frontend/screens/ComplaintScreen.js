import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
  ScrollView, KeyboardAvoidingView, Platform, Image
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';

const departments = [
  { label: 'Water', value: 'water' },
  { label: 'Electricity', value: 'electricity' },
  { label: 'Roads', value: 'roads' },
  { label: 'Health', value: 'health' },
  { label: 'Sanitation', value: 'sanitation' },
  { label: 'Other', value: 'other' },
];

const ComplaintScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [language, setLanguage] = useState('English');

  const [openDept, setOpenDept] = useState(false);
  const [selectedDept, setSelectedDept] = useState(null);
  const [itemsDept, setItemsDept] = useState(departments);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission denied', 'We need permission to access your photos.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.7, base64: true });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!title || !description || !selectedDept) {
      Alert.alert('Missing Fields', 'Please fill in title, description, and select a department.');
      return;
    }

    console.log({
      title,
      description,
      department: selectedDept,
      image,
      submittedAt: new Date().toISOString(),
    });

    Alert.alert('✅ Submitted', 'Your complaint has been submitted successfully.');

    setTitle('');
    setDescription('');
    setSelectedDept(null);
    setImage(null);
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'English' ? 'Hindi' : 'English'));
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Language Switch Button */}
        <View style={styles.languageSwitchContainer}>
          <TouchableOpacity onPress={toggleLanguage}>
            <Text style={styles.languageSwitchText}>{language === 'English' ? 'Switch to Hindi' : 'Switch to English'}</Text>
          </TouchableOpacity>
        </View>

        

        {/* Title */}
        <Text style={styles.title}>📢 Complaint Form</Text>
        
           {/* Upload Image and Preview */}
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Text style={styles.imageButtonText}>{image ? 'Change Image' : 'Upload Image (Optional)'}</Text>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={styles.previewImage} />}
        <TextInput
          style={styles.input}
          placeholder="Title (e.g., Water Leakage)"
          value={title}
          onChangeText={setTitle}
        />

        <DropDownPicker
          open={openDept}
          value={selectedDept}
          items={itemsDept}
          setOpen={setOpenDept}
          setValue={setSelectedDept}
          setItems={setItemsDept}
          placeholder="Select Department"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe your complaint..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={5}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Complaint</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F8FAFC',
    flexGrow: 1,
  },
  languageSwitchContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  languageSwitchText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    marginBottom: 15,
    fontSize: 16,
    color: '#111827',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
    paddingTop: 15,
  },
  dropdown: {
    marginBottom: 15,
    borderColor: '#CBD5E1',
  },
  dropdownContainer: {
    borderColor: '#CBD5E1',
  },
  imageButton: {
    backgroundColor: '#3B82F6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#1B5E20',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ComplaintScreen;
