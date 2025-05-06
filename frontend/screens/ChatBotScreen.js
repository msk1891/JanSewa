import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';

export default function ChatBotScreen() {
  const [messages, setMessages] = useState([
    { text: 'नमस्ते! मैं आपकी क्या सहायता कर सकता हूँ?', sender: 'bot' },
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [language, setLanguage] = useState('hi'); // Default to Hindi

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage = { text: inputText.trim(), sender: 'user' };
    const botReply = await fetchBotReply(inputText);

    setMessages((prev) => [...prev, userMessage, { text: botReply, sender: 'bot' }]);
    setInputText('');

    Speech.speak(botReply, { language });
  };

  const fetchBotReply = async (message) => {
    try {
      // Simulate API call to OpenAI or local model
      return `आपने पूछा: "${message}". यह जवाब डेमो के लिए है।`;
    } catch (err) {
      return 'सर्वर से उत्तर प्राप्त नहीं हो सका।';
    }
  };

  const handleMicPress = async () => {
    setIsRecording((prev) => !prev);
    // You can use speech-to-text integration here
    alert('🎤 Voice input coming soon!');
  };

  const changeLanguage = () => {
    const nextLang = language === 'hi' ? 'en' : language === 'en' ? 'pa-Guru-IN' : 'hi';
    setLanguage(nextLang);
    alert(`Language switched to: ${nextLang}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="chatbubbles" size={28} color="#22c55e" />
          <Text style={styles.headerTitle}>AI Sahayak</Text>
        </View>
        <TouchableOpacity onPress={changeLanguage}>
          <Ionicons name="globe-outline" size={24} color="#64748b" />
        </TouchableOpacity>
      </View>

      {/* Chat Window */}
      <ScrollView style={styles.chatWindow} showsVerticalScrollIndicator={false}>
        {messages.map((msg, idx) => (
          <View
            key={idx}
            style={[
              styles.messageBubble,
              msg.sender === 'user' ? styles.userBubble : styles.botBubble,
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type your message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={handleSend}>
          <Ionicons name="send" size={24} color="#3b82f6" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleMicPress} style={styles.micButton}>
          <Ionicons
            name={isRecording ? 'mic-off' : 'mic'}
            size={24}
            color={isRecording ? 'red' : '#16a34a'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#1f2937',
  },
  chatWindow: {
    flex: 1,
    marginBottom: 8,
  },
  messageBubble: {
    padding: 8,
    marginVertical: 4,
    maxWidth: '75%',
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: '#dbeafe',
    alignSelf: 'flex-end',
  },
  botBubble: {
    backgroundColor: '#bbf7d0',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#1f2937',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
    backgroundColor: '#f9fafb',
  },
  micButton: {
    marginLeft: 8,
  },
});
