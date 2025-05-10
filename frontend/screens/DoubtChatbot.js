import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';

const subjects = ['Mathematics', 'Science', 'Social Studies', 'English', 'Computer Science'];

const sampleQuestions = {
  Mathematics: ['What is Pythagoras Theorem?', 'How to solve quadratic equations?'],
  Science: ['What is Newton’s second law?', 'Difference between mitosis and meiosis?'],
  'Social Studies': ['Explain the French Revolution.', 'What is democracy?'],
  English: ['What is a metaphor?', 'Difference between active and passive voice?'],
  'Computer Science': ['What is a variable in Python?', 'Explain the concept of loops.'],
};

const DoubtChatbot = () => {
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleStartChat = () => {
    setIsChatStarted(true);
    setMessages([{ sender: 'bot', text: `Hi! Ask me anything about ${selectedSubject}.` }]);
  };

  const handleSend = () => {
    if (userInput.trim() === '') return;
    const newMessages = [...messages, { sender: 'user', text: userInput }];
    newMessages.push({
      sender: 'bot',
      text: `You asked: "${userInput}". (Pretend I'm giving a smart AI response here 😉)`,
    });
    setMessages(newMessages);
    setUserInput('');
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const selectSubject = (subject) => {
    setSelectedSubject(subject);
    setIsDropdownVisible(false);
  };

  if (isChatStarted) {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.title}>Chat - {selectedSubject}</Text>
        <ScrollView style={styles.chatContainer}>
          {messages.map((msg, index) => (
            <Text
              key={index}
              style={[
                styles.message,
                msg.sender === 'user' ? styles.userMessage : styles.botMessage,
              ]}
            >
              {msg.sender === 'user' ? 'You: ' : 'Bot: '}
              {msg.text}
            </Text>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={userInput}
            onChangeText={setUserInput}
            placeholder="Type your question..."
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Doubt Solving Chatbot</Text>
      <Text style={styles.subtitle}>Ask academic questions and get instant AI help.</Text>

      <Text style={styles.sectionTitle}>Choose Subject:</Text>
      {/* Custom Dropdown */}
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
        <Text style={styles.dropdownButtonText}>{selectedSubject}</Text>
      </TouchableOpacity>

      {isDropdownVisible && (
        <View style={styles.dropdownList}>
          {subjects.map((subject, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dropdownItem}
              onPress={() => selectSubject(subject)}
            >
              <Text style={styles.dropdownItemText}>{subject}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Text style={styles.sectionTitle}>Sample Questions:</Text>
      {sampleQuestions[selectedSubject]?.map((q, i) => (
        <Text key={i} style={styles.questionText}>• {q}</Text>
      ))}

      <TouchableOpacity style={styles.chatButton} onPress={handleStartChat}>
        <Text style={styles.chatButtonText}>Start Chat</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fffff',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5,
  },
  dropdownButton: {
    backgroundColor: '#00796B',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  dropdownButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  dropdownList: {
    backgroundColor: '#E0F7FA',
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 15,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#00796B',
  },
  questionText: {
    fontSize: 15,
    marginLeft: 10,
    marginVertical: 2,
  },
  chatButton: {
    backgroundColor: '#00796B',
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
  },
  chatButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  chatContainer: {
    flex: 1,
    marginVertical: 10,
  },
  message: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  userMessage: {
    backgroundColor: '#D1C4E9',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#B2DFDB',
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    height: 45,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#00796B',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default DoubtChatbot;
