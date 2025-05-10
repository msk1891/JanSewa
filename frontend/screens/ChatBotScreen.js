import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';
import { DEEPSEEK_API_KEY, ASSEMBLYAI_API_KEY } from 'react-native-dotenv';  // Import environment variables

// You'll need to install 'expo-speech' and set up AssemblyAI integration
// npm install expo-speech

export default function ChatBotScreen() {
  const [messages, setMessages] = useState([
    { text: 'नमस्ते! मैं आपकी क्या सहायता कर सकता हूँ?', sender: 'bot' },
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [language, setLanguage] = useState('hi'); // Default language: Hindi

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage = { text: inputText.trim(), sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    const botReply = await fetchBotReply(inputText);
    setMessages((prev) => [...prev, { text: botReply, sender: 'bot' }]);

    Speech.speak(botReply, { language });
  };

  const fetchBotReply = async (message) => {
    try {
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`, // Use the DeepSeek API key from .env
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: message }],
        }),
      });

      const data = await response.json();
      return data?.choices?.[0]?.message?.content || 'कोई उत्तर नहीं मिला।';
    } catch (error) {
      console.error(error);
      return 'सर्वर से उत्तर प्राप्त नहीं हो सका।';
    }
  };

  const handleMicPress = async () => {
    setIsRecording((prev) => !prev);

    try {
      // 🔐 Use your AssemblyAI API key here
      // Use AssemblyAI's real-time transcription API to convert speech to text
      const response = await fetch('https://api.assemblyai.com/v2/upload', {
        method: 'POST',
        headers: {
          'authorization': ASSEMBLYAI_API_KEY, // Use the AssemblyAI API key from .env
        },
        body: JSON.stringify({
          // For example, sending audio to AssemblyAI for transcription
          // This is a simplified example; you'd need actual audio data in a real case
        }),
      });

      const data = await response.json();
      console.log(data); // Log response from AssemblyAI

      Alert.alert('🎤 Speech-to-text', 'AssemblyAI integration coming soon!');
    } catch (error) {
      console.error('Speech recognition error:', error);
      Alert.alert('त्रुटि', 'वॉइस इनपुट असफल रहा।');
    }
  };

  const changeLanguage = () => {
    const nextLang = language === 'hi' ? 'en' : language === 'en' ? 'pa-Guru-IN' : 'hi';
    setLanguage(nextLang);
    Alert.alert('भाषा बदली गई', `नई भाषा: ${nextLang}`);
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
