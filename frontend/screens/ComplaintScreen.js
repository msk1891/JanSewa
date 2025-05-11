import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
  ScrollView, KeyboardAvoidingView, Platform, Image
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';

// Language Texts
const localizedText = {
  English: {
    complaintForm: '📢 Complaint Form',
    titlePlaceholder: 'Title (e.g., Water Leakage)',
    descriptionPlaceholder: 'Describe your complaint...',
    uploadImage: 'Upload Image ',
    changeImage: 'Change Image',
    submitComplaint: 'Submit Complaint',
    selectDepartment: 'Select Department',
    selectLanguage: 'Select Language',
    alertMissingFields: 'Please fill in title, description, and select a department.',
    alertSubmitted: 'Your complaint has been submitted successfully.',
    alertTitle: {
      missingFields: 'Missing Fields',
      submitted: '✅ Submitted',
      permissionDenied: 'Permission Denied',
      photoAccess: 'We need permission to access your photos.',
    },
  },
  Hindi: {
    complaintForm: '📢 शिकायत फ़ॉर्म',
    titlePlaceholder: 'शीर्षक (जैसे, पानी रिसाव)',
    descriptionPlaceholder: 'अपनी शिकायत का विवरण दें...',
    uploadImage: 'छवि अपलोड करें ',
    changeImage: 'छवि बदलें',
    submitComplaint: 'शिकायत सबमिट करें',
    selectDepartment: 'विभाग चुनें',
    selectLanguage: 'भाषा चुनें',
    alertMissingFields: 'कृपया शीर्षक, विवरण भरें और विभाग चुनें।',
    alertSubmitted: 'आपकी शिकायत सफलतापूर्वक सबमिट की गई है।',
    alertTitle: {
      missingFields: 'रिक्त फ़ील्ड',
      submitted: '✅ सबमिट किया गया',
      permissionDenied: 'अनुमति अस्वीकृत',
      photoAccess: 'हमें आपकी तस्वीरों तक पहुँचने की अनुमति चाहिए।',
    },
  },
  Garhwali: {
    complaintForm: '📢 शिकायत फॉरम (गढ़वाळी)',
    titlePlaceholder: 'सिरो (जैसे, पाणी रिसाव)',
    descriptionPlaceholder: 'अपणी शिकायत बताओ...',
    uploadImage: 'फोटो जोड़ो ',
    changeImage: 'फोटो बदलो',
    submitComplaint: 'शिकायत भेजो',
    selectDepartment: 'विभाग चुन्ना',
    selectLanguage: 'भाषा चुनो',
    alertMissingFields: 'कृपया सिरो, विवरण भरि और विभाग चुनो।',
    alertSubmitted: 'आपणी शिकायत सफ़लता से भेजी गी।',
    alertTitle: {
      missingFields: 'रिक्त फ़ील्ड',
      submitted: '✅ भेजी गी',
      permissionDenied: 'अनुमति मना',
      photoAccess: 'फोटो तक पहुँचने की अनुमति देनी पड़ी।',
    },
  },
  Kumaoni: {
    complaintForm: '📢 शिकायत फॉर्म (कुमाऊंनी)',
    titlePlaceholder: 'सिरो (जइसे, पाणी रिसाव)',
    descriptionPlaceholder: 'अपणी शिकायत लिखो...',
    uploadImage: 'फोटो जोड़ो ',
    changeImage: 'फोटो बदला',
    submitComplaint: 'शिकायत पठाओ',
    selectDepartment: 'विभाग छांटो',
    selectLanguage: 'भाषा चुनो',
    alertMissingFields: 'कृपया सिरो, विवरण और विभाग भरि लेव।',
    alertSubmitted: 'तुमरी शिकायत सफलतापूर्वक पठाई गे।',
    alertTitle: {
      missingFields: 'खाली ठउ',
      submitted: '✅ पठाई गे',
      permissionDenied: 'अनुमति मना',
      photoAccess: 'फोटो तक पहुँच जरूरी छ।',
    },
  },
};

const languageOptions = [
  { label: 'English', value: 'English' },
  { label: 'Hindi / हिंदी', value: 'Hindi' },
  { label: 'Garhwali / गढ़वाली', value: 'Garhwali' },
  { label: 'Kumaoni / कुमाऊंनी', value: 'Kumaoni' },
];

const departments = [
  { label: 'Water / पानी', value: 'water' },
  { label: 'Electricity / बिजली', value: 'electricity' },
  { label: 'Roads / सड़कें', value: 'roads' },
  { label: 'Health / स्वास्थ्य', value: 'health' },
  { label: 'Sanitation / स्वच्छता', value: 'sanitation' },
  { label: 'Other / अन्य', value: 'other' },
];

const ComplaintScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const [language, setLanguage] = useState('English');
  const t = localizedText[language];

  const [openLang, setOpenLang] = useState(false);
  const [langItems, setLangItems] = useState(languageOptions);

  const [openDept, setOpenDept] = useState(false);
  const [selectedDept, setSelectedDept] = useState(null);
  const [itemsDept, setItemsDept] = useState(departments);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(t.alertTitle.permissionDenied, t.alertTitle.photoAccess);
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.7, base64: true });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!title || !description || !selectedDept) {
      Alert.alert(t.alertTitle.missingFields, t.alertMissingFields);
      return;
    }

    console.log({
      title,
      description,
      department: selectedDept,
      image,
      submittedAt: new Date().toISOString(),
    });

    Alert.alert(t.alertTitle.submitted, t.alertSubmitted);
    setTitle('');
    setDescription('');
    setSelectedDept(null);
    setImage(null);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{t.complaintForm}</Text>

        <DropDownPicker
          open={openLang}
          value={language}
          items={langItems}
          setOpen={setOpenLang}
          setValue={setLanguage}
          setItems={setLangItems}
          placeholder={t.selectLanguage}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />

        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Text style={styles.imageButtonText}>{image ? t.changeImage : t.uploadImage}</Text>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={styles.previewImage} />}

        <TextInput
          style={styles.input}
          placeholder={t.titlePlaceholder}
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
          placeholder={t.selectDepartment}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder={t.descriptionPlaceholder}
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={5}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>{t.submitComplaint}</Text>
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
