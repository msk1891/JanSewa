import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

// Screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import GrievanceMapScreen from './screens/GrievanceMapScreen';
import PolicyPalScreen from './screens/PolicyPalScreen';
import SahayataAIScreen from './screens/SahayataAIScreen';
import ChatBotScreen from './screens/ChatBotScreen';
import ComplaintScreen from './screens/ComplaintScreen';
import ProfileScreen from './screens/ProfileScreen';
import PublicVoice from './screens/PublicVoice';

const Stack = createNativeStackNavigator();

// ✅ Dynamic Header Component
const Header = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const isProfile = route.name === 'Profile';

  return (
    <SafeAreaView style={styles.header}>
      <Text style={styles.headerText}>
        {isProfile ? 'Profile' : 'Uttarakhand AI Sewa'}
      </Text>

      <View style={styles.iconContainer}>
        {isProfile ? (
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="arrow-back-outline" size={28} color="#ffffff" style={styles.icon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Icon name="person-circle-outline" size={30} color="#ffffff" style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

// ✅ Wrapper for screens that should have a header
const ScreenWrapper = (Component) => (props) => (
  <View style={{ flex: 1 }}>
    <Header />
    <View style={{ flex: 1 }}>
      <Component {...props} />
    </View>
  </View>
);

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          {/* Screens without header */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />

          {/* Screens with header */}
          <Stack.Screen name="Home" component={ScreenWrapper(HomeScreen)} />
          <Stack.Screen name="GrievanceMap" component={ScreenWrapper(GrievanceMapScreen)} />
          <Stack.Screen name="PolicyPal" component={ScreenWrapper(PolicyPalScreen)} />
          <Stack.Screen name="SahayataAI" component={ScreenWrapper(SahayataAIScreen)} />
          <Stack.Screen name="ChatBotScreen" component={ScreenWrapper(ChatBotScreen)} />
          <Stack.Screen name="ComplaintForm" component={ScreenWrapper(ComplaintScreen)} />
          <Stack.Screen name="Profile" component={ScreenWrapper(ProfileScreen)} />
          <Stack.Screen name="PublicVoice" component={ScreenWrapper(PublicVoice)} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// ✅ Styles
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1D4ED8', // Blue shade
    paddingTop: 12,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#93C5FD',
    shadowColor: '#000', // Adding shadow for depth
    shadowOffset: { width: 0, height: 4 }, // Offset for shadow
    shadowOpacity: 0.1, // Soft shadow
    shadowRadius: 5, // Radius for shadow blur
    elevation: 5, // For Android
  },
  headerText: {
    fontSize: 22, // Slightly larger font for better readability
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center', // Ensures text is centered
    flex: 1, // Ensures the text occupies the available space
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Align icons to the right side
    alignItems: 'center',
  },
  icon: {
    marginLeft: 15, // Spacing between icons
  },
});