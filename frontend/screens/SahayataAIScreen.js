import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { DEEPSEEK_API_KEY } from '@env';

const API_KEY = DEEPSEEK_API_KEY;

const SahayataAIScreen = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Welcome to Sahayata AI! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: 'You are a helpful assistant named Sahayata AI.' },
            ...[...messages, userMessage].map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.text
            })),
          ],
        }),
      });

      const data = await response.json();
      const aiText = data.choices?.[0]?.message?.content?.trim();

      if (aiText) {
        setMessages(prev => [...prev, { sender: 'bot', text: aiText }]);
      } else {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, I couldn’t understand that.' }]);
      }
    } catch (err) {
      console.error('Error:', err);
      setMessages(prev => [...prev, { sender: 'bot', text: 'Something went wrong. Please try again later.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatBox} contentContainerStyle={styles.chatContent}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.message,
              msg.sender === 'user' ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
        />
        <Button title={loading ? '...' : 'Send'} onPress={sendMessage} disabled={loading} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: 50,
  },
  chatBox: {
    flex: 1,
    paddingHorizontal: 16,
  },
  chatContent: {
    paddingBottom: 20,
  },
  message: {
    marginVertical: 8,
    padding: 12,
    borderRadius: 10,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0E0E0',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
});

export default SahayataAIScreen;
