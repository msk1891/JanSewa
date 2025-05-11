import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';

const languages = [
  { key: 'en', label: 'English' },
  { key: 'hi', label: 'हिंदी' },
  { key: 'gwh', label: 'गढ़वाली' },
  { key: 'kmn', label: 'कुमाऊंनी' },
];

const suggestions = {
  en: ['What is the weather?', 'Nearby hospitals?', 'Government schemes?'],
  hi: ['मौसम कैसा है?', 'नजदीकी अस्पताल?', 'सरकारी योजनाएं?'],
  gwh: ['आज ब्यार केछ?', 'नजदीकी हस्पताल कंछ?', 'सरकारी योजना के छन?'],
  kmn: ['आज मौसम क्यास छ?', 'नजिक हस्पताल कुन छ?', 'सरकार योजना बताओ।'],
};

const welcomeMessages = {
  en: 'Hello! How can I assist you today?',
  hi: 'नमस्ते! मैं आपकी क्या सहायता कर सकता हूँ?',
  gwh: 'नमस्कार! मैं तेर मदद कसिक कर सकूं?',
  kmn: 'नमस्कार! मैं तुय मदद कसिक करूं?',
};

export default function ChatBotScreen() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [language, setLanguage] = useState('en');
  const scrollViewRef = useRef();

  useEffect(() => {
    setMessages([{ text: welcomeMessages[language], sender: 'bot' }]);
  }, [language]);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage = { text: inputText.trim(), sender: 'user' };
    const botReply = await fetchBotReply(inputText);

    setMessages((prev) => [...prev, userMessage, { text: botReply, sender: 'bot' }]);
    setInputText('');

    // Speak reply
    let speechLang = language === 'en' ? 'en-US' : language === 'hi' ? 'hi-IN' : 'hi-IN'; // default to Hindi TTS
    Speech.speak(botReply, { language: speechLang });
  };

 
  const fetchBotReply = async (message) => {
  const lower = message.toLowerCase();

  if (language === 'en') {
    if (lower.includes('weather')) return 'The weather today is sunny with a high of 28°C.';
    if (lower.includes('hospital')) return 'The nearest hospital is City Care, 2 km away.';
    if (lower.includes('scheme')) return 'You can check PM Awas Yojana and PM Kisan Yojana.';
    return "I'm sorry, I didn't understand that. Can you ask differently?";
  }

  if (language === 'hi') {
    if (lower.includes('मौसम')) return 'आज मौसम साफ है और अधिकतम तापमान 28°C है।';
    if (lower.includes('अस्पताल')) return 'नजदीकी अस्पताल "सिटी केयर" है, जो 2 किमी दूर है।';
    if (lower.includes('योजना')) return 'आप प्रधानमंत्री आवास योजना और पीएम किसान योजना देख सकते हैं।';
    return 'माफ़ कीजिए, मैं समझ नहीं पाया। कृपया कुछ और पूछें।';
  }

  if (language === 'gwh') {
    if (lower.includes('ब्यार') || lower.includes('मौसम')) return 'आज ब्यार निक ज छै, तापमान 28°C छै।';
    if (lower.includes('हस्पताल')) return 'नजदीकी हस्पताल "सिटी केयर" छै, 2 किमी दूर।';
    if (lower.includes('योजना')) return 'प्रधानमंत्री योजना और किसान योजना देख सकन।';
    return 'माफ कर, मैं नी समझ पायो। फेर पूछ।';
  }

  if (language === 'kmn') {
    if (lower.includes('मौसम')) return 'आज मौसम साफ छ, तापमान 28°C छ।';
    if (lower.includes('हस्पताल')) return 'नजिक हस्पताल "सिटी केयर" छ, 2 किमी दूर।';
    if (lower.includes('योजना')) return 'प्रधानमंत्री योजना और किसान योजना जानकारी लें।';
    return 'माफ करना, मैं बात समझी न। दुबारा पूछ।';
  }

  return 'Sorry, unsupported language.';
};


  const switchLanguage = () => {
    const currentIndex = languages.findIndex((l) => l.key === language);
    const nextLang = languages[(currentIndex + 1) % languages.length];
    setLanguage(nextLang.key);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="chatbubbles" size={28} color="#22c55e" />
          <Text style={styles.headerTitle}>AI Sahayak</Text>
        </View>
        <TouchableOpacity onPress={switchLanguage}>
          <Text style={styles.languageText}>
            🌐 {languages.find((l) => l.key === language)?.label}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Chat Window */}
      <ScrollView style={styles.chatWindow} ref={scrollViewRef}>
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

      {/* Suggested Prompts */}
      <View style={styles.promptContainer}>
        {suggestions[language].map((prompt, index) => (
          <TouchableOpacity
            key={index}
            style={styles.promptButton}
            onPress={() => {
              setInputText(prompt);
              setTimeout(() => handleSend(), 100); // Auto send
            }}
          >
            <Text style={styles.promptText}>{prompt}</Text>
          </TouchableOpacity>
        ))}
      </View>

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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 8, color: '#1f2937' },
  languageText: { fontSize: 14, color: '#1f2937', padding: 6, backgroundColor: '#f0f0f0', borderRadius: 8 },
  chatWindow: { flex: 1, marginBottom: 8 },
  messageBubble: { padding: 8, marginVertical: 4, maxWidth: '75%', borderRadius: 16 },
  userBubble: { backgroundColor: '#dbeafe', alignSelf: 'flex-end' },
  botBubble: { backgroundColor: '#bbf7d0', alignSelf: 'flex-start' },
  messageText: { fontSize: 16, color: '#1f2937' },
  inputContainer: { flexDirection: 'row', alignItems: 'center' },
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
  promptContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    justifyContent: 'center',
  },
  promptButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  promptText: { fontSize: 14, color: '#1f2937' },
});
