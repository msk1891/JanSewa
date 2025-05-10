import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'react-native-localize';

const resources = {
  en: {
    translation: {
      loginTitle: 'AI Seva: Uttarakhand Smart Assistant',
      emailPlaceholder: 'Email',
      passwordPlaceholder: 'Password',
      loginButton: 'Login',
      registerText: "Don't have an account?",
      registerLink: 'Register',
      selectLanguage: 'Select Language',
      show: 'Show',
      hide: 'Hide',
      errorEmpty: 'Email and password are required',
      errorInvalid: 'Invalid email or password',
    },
  },
  hi: {
    translation: {
      loginTitle: 'एआई सेवा: उत्तराखंड स्मार्ट सहायक',
      emailPlaceholder: 'ईमेल',
      passwordPlaceholder: 'पासवर्ड',
      loginButton: 'लॉग इन करें',
      registerText: 'कोई खाता नहीं है?',
      registerLink: 'रजिस्टर करें',
      selectLanguage: 'भाषा चुनें',
      show: 'दिखाएं',
      hide: 'छिपाएं',
      errorEmpty: 'ईमेल और पासवर्ड आवश्यक हैं',
      errorInvalid: 'अमान्य ईमेल या पासवर्ड',
    },
  },
  ga: {
    translation: {
      loginTitle: 'एआई सेवा: गढ़वाळी स्मार्ट सहायिक',
      emailPlaceholder: 'ईमेल',
      passwordPlaceholder: 'पासवर्ड',
      loginButton: 'लॉग इन',
      registerText: 'खाता नि छै?',
      registerLink: 'रजिस्टरी कर',
      selectLanguage: 'भाषा चुनो',
      show: 'देखा',
      hide: 'छुपा',
      errorEmpty: 'ईमेल अर पासवर्ड जरूरी छन',
      errorInvalid: 'गलत ईमेल या पासवर्ड',
    },
  },
  ku: {
    translation: {
      loginTitle: 'एआई सेवा: कुमाऊंनी स्मार्ट सहायिक',
      emailPlaceholder: 'ईमेल',
      passwordPlaceholder: 'पासवर्ड',
      loginButton: 'लॉग इन करौ',
      registerText: 'खाता न छै?',
      registerLink: 'रजिस्टरी करौ',
      selectLanguage: 'भाषा चुन्न',
      show: 'देखौं',
      hide: 'छुपौ',
      errorEmpty: 'ईमेल आ पासवर्ड जरूरी छ',
      errorInvalid: 'गलत ईमेल या पासवर्ड',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng: Localization.getLocales()[0].languageCode || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
