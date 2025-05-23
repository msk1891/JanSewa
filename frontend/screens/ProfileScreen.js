import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  
  // State to store user data
  const [user, setUser] = useState({
    name: 'Guest User',
    email: 'guest@example.com',
    location: 'Unknown Location',
    role: 'Seva Seeker',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to get the token from localStorage or AsyncStorage
  const getToken = () => {
    return localStorage.getItem('auth_token'); // Replace with your token retrieval method
  };

  // Fetch user data from the backend on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const token = getToken(); // Retrieve the token from localStorage (or AsyncStorage)

      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }

      try {
        // Make an API request to fetch user data
        const response = await axios.get('http://192.168.43.141:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        });

        // Check if the data exists before updating state
        const data = response.data;

        // If data exists, update the state with the fetched data
        if (data) {
          setUser({
            name: data.name,
            email: data.email,
            location: data.location,
            role: data.role,
          });
        } else {
          setUser({
            name: 'Guest User',
            email: 'guest@example.com',
            location: 'Unknown Location',
            role: 'Seva Seeker',
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError('Failed to fetch user data');
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  // Handle Log Out
  const handleLogout = () => {
    console.log("Logging out...");
    // Perform any necessary cleanup (e.g., clear session, tokens, etc.)
    // Navigate to the login page after logout
    navigation.navigate('Login'); // Replace 'Login' with your login screen's name
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{loading ? 'Loading...' : user.name}</Text>
            <Text style={styles.email}>{loading ? '' : user.email}</Text>
            <Text style={styles.location}>{loading ? '' : user.location}</Text>
          </View>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{loading ? '' : user.role}</Text>
          </View>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <Stat label="Services Provided" value="0" note="Activate" color="gray" />
        <Stat label="Active Requests" value="0" note="Explore" color="gray" />
        <Stat label="Balance" value="₹0" note="Earn." color="gray" />
      </View>

      {/* Menu */}
      <View style={styles.menu}>
        <MenuItem icon="business-outline" title="My Services" />
        <MenuItem icon="notifications-outline" title="Notifications" />
        <MenuItem icon="flag-outline" title="Government Schemes" />
        <MenuItem icon="settings-outline" title="Settings" />
        <MenuItem icon="help-circle-outline" title="Help Center" />
        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <Icon name="log-out-outline" size={22} color="#333" />
          <Text style={styles.menuText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Stats component
const Stat = ({ label, value, note, color }) => (
  <View style={styles.statCard}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={[styles.statNote, { color }]}>{note}</Text>
  </View>
);

// Menu item component
const MenuItem = ({ icon, title }) => (
  <TouchableOpacity style={styles.menuItem}>
    <Icon name={icon} size={22} color="#333" />
    <Text style={styles.menuText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    paddingTop: 1,
  },
  header: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileInfo: {
    flex: 1,
    marginRight: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  location: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
  },
  roleBadge: {
    backgroundColor: '#e6f0ff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  roleText: {
    fontSize: 12,
    color: '#007aff',
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 1,
    alignItems: 'center',
    marginHorizontal: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginVertical: 4,
  },
  statNote: {
    fontSize: 13,
    fontWeight: '500',
  },
  menu: {
    backgroundColor: '#fff',
    borderRadius: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});

export default ProfileScreen;
