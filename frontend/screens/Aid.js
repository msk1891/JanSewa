import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { aidData } from '../screens/aidData';

const AidChat = () => {
  const [language, setLanguage] = useState('en');
  const [messages, setMessages] = useState([
    { type: 'bot', text: aidData.start.message[language] }
  ]);
  const [currentOptions, setCurrentOptions] = useState(aidData.start.options);

  const handleOptionPress = (option) => {
    const data = aidData[option];
    const reply = typeof data.answer === 'object' ? data.answer[language] : data.answer;

    setMessages((prev) => [
      ...prev,
      { type: 'user', text: option },
      { type: 'bot', text: reply, image: data.image }
    ]);

    // Load next options if nested
    if (data.options) {
      setCurrentOptions(data.options);
    } else {
      setCurrentOptions([]);
    }
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setMessages([{ type: 'bot', text: aidData.start.message[lang] }]);
    setCurrentOptions(aidData.start.options);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Language Switcher */}
      <View style={styles.langSelector}>
        {['en', 'hi', 'gwl', 'kmn'].map((lang) => (
          <TouchableOpacity key={lang} onPress={() => changeLanguage(lang)} style={styles.langBtn}>
            <Text style={styles.langText}>{lang.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Chat Messages */}
      {messages.map((msg, idx) => (
        <View key={idx} style={msg.type === 'user' ? styles.userMsg : styles.botMsg}>
          <Text style={msg.type === 'user' ? styles.userText : styles.botText}>{msg.text}</Text>
          {msg.image && <Image source={msg.image} style={styles.image} />}
        </View>
      ))}

      {/* Option Buttons */}
      <View style={styles.options}>
        {currentOptions.map((opt) => (
          <TouchableOpacity key={opt} onPress={() => handleOptionPress(opt)} style={styles.optionBtn}>
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default AidChat;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff'
  },
  langSelector: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-around'
  },
  langBtn: {
    padding: 8,
    backgroundColor: '#196795',
    borderRadius: 5
  },
  langText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  },
  botMsg: {
    backgroundColor: '#e6f3fa',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8
  },
  userMsg: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1ffd6',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8
  },
  botText: {
    fontSize: 18,
    color: '#196795'
  },
  userText: {
    fontSize: 18,
    color: '#006400'  // Green color for user messages
  },
  image: {
    width: 250,
    height: 150,
    marginTop: 8,
    borderRadius: 8
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10
  },
  optionBtn: {
    padding: 12,
    backgroundColor: '#196795',
    borderRadius: 6,
    margin: 5
  },
  optionText: {
    color: '#fff',
    fontSize: 16
  }
});
