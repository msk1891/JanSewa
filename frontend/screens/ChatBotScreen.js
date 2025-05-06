import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView, Platform
} from 'react-native';

const ChatBotScreen = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I assist you today?', isBot: true },
  ]);
  const [userInput, setUserInput] = useState('');
  const scrollViewRef = useRef();

  const handleSendMessage = () => {
    if (userInput.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      text: userInput,
      isBot: false
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate a smart bot response
    setTimeout(() => {
      const responseText = generateBotReply(userInput);
      const botResponse = {
        id: messages.length + 2,
        text: responseText,
        isBot: true
      };
      setMessages(prev => [...prev, botResponse]);
    }, 800);

    setUserInput('');
  };

  const generateBotReply = (input) => {
    if (input.toLowerCase().includes('help')) return 'Sure! I can assist with your queries.';
    if (input.toLowerCase().includes('thanks')) return 'You’re welcome!';
    return 'I’m here to assist further!';
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
      keyboardVerticalOffset={80}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>ChatBot Assistant</Text>
      </View>

      <ScrollView
        style={styles.messagesWrapper}
        contentContainerStyle={styles.messageContainer}
        ref={scrollViewRef}
      >
        {messages.map(message => (
          <View
            key={message.id}
            style={[
              styles.message,
              message.isBot ? styles.botMessage : styles.userMessage
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor="#888"
          value={userInput}
          onChangeText={setUserInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  header: {
    backgroundColor: '#1B5E20',
    paddingVertical: 20,
    paddingHorizontal: 15,
    elevation: 5,
  },
  headerText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  messagesWrapper: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageContainer: {
    paddingVertical: 10,
  },
  message: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  botMessage: {
    backgroundColor: '#2563EB',
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: '#34D399',
    alignSelf: 'flex-end',
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 45,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#1B5E20',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});

export default ChatBotScreen;
