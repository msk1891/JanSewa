import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import GrievanceMapScreen from './screens/GrievanceMapScreen';
import PolicyPalScreen from './screens/PolicyPalScreen';
import SahayataAIScreen from './screens/SahayataAIScreen';
import ChatBotScreen from './screens/ChatBotScreen';
import ComplaintScreen from './screens/ComplaintScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="GrievanceMap" component={GrievanceMapScreen} />
        <Stack.Screen name="PolicyPal" component={PolicyPalScreen} />
        <Stack.Screen name="SahayataAI" component={SahayataAIScreen} />
        <Stack.Screen name="ChatBotScreen" component={ChatBotScreen} />
        <Stack.Screen name="ComplaintForm" component={ComplaintScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );

}