import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang); // update language

  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError('errorEmpty');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://192.168.43.141:5000/api/auth/login', {
        email,
        password,
      });
      await AsyncStorage.setItem('token', response.data.token);
      navigation.replace('Home');
    } catch (error) {
      console.error('Login error:', error);
      setError('errorInvalid');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/uttarakhand.jpg')}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.inner}>
          <Text style={styles.title}>{t('loginTitle')}</Text>

          {error ? <Text style={styles.errorText}>{t(error)}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder={t('emailPlaceholder')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder={t('passwordPlaceholder')}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.showPassword}>{showPassword ? t('hide') : t('show')}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{t('loginButton')}</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>{t('registerText')} <Text style={styles.linkText}>{t('registerLink')}</Text></Text>
          </TouchableOpacity>

          <View style={styles.languageRoleContainer}>
            <Text style={styles.languageRoleText}>{t('selectLanguage')}</Text>
            <View style={styles.languageButtons}>
              {['en', 'hi', 'ga', 'ku'].map((lang) => (
                <TouchableOpacity
                  key={lang}
                  style={[styles.languageButton, selectedLanguage === lang && styles.selectedLanguageButton]}
                  onPress={() => handleLanguageChange(lang)}
                >
                  <Text style={styles.languageButtonText}>
                    {lang === 'en' ? 'English' : lang === 'hi' ? 'Hindi' : lang === 'ga' ? 'Garhwali' : 'Kumaoni'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inner: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 40,
    textAlign: 'center',
    color: '#ffffff',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  input: {
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    marginBottom: 18,
    color: '#333',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    paddingRight: 10,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
  },
  showPassword: {
    color: '#007BFF',
    fontWeight: '600',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 25,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  link: {
    textAlign: 'center',
    fontSize: 15,
    color: '#aaa',
  },
  linkText: {
    color: '#007BFF',
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
  languageRoleContainer: {
    marginTop: 35,
    marginBottom: 20,
  },
  languageRoleText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 12,
    fontWeight: '600',
  },
  languageButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  languageButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    margin: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  selectedLanguageButton: {
    backgroundColor: '#007BFF',
    shadowOpacity: 0.3,
  },
});

export default LoginScreen;
