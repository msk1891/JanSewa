import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const route = useRoute();
  const navigation = useNavigation(); // Hook for navigation
  
  const userName = route.params?.name || 'Guest';
  const userRole = route.params?.role || 'Seva Seeker'; // Either Seva Provider or Seva Seeker
  const userLocation = route.params?.location || 'Dehradun, Uttarakhand';

  // Handle Log Out
  const handleLogout = () => {
    console.log("Logging out...");
    // Perform any necessary cleanup (e.g., clear session, tokens, etc.)
    // Example: AsyncStorage.clear() if using AsyncStorage to store session data
    // Navigate to the login page after logout
    navigation.navigate('Login'); // Replace 'Login' with your login screen's name
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <View style={styles.profileBlockNoImage}>
          <View style={styles.profileDetails}>
            <Text style={styles.name}>{userName}</Text>
            <Text style={styles.email}>user@example.com</Text>
            <Text style={styles.location}>{userLocation}</Text>
          </View>
          <View style={styles.roleTag}>
            <Text style={styles.roleText}>{userRole}</Text>
          </View>
        </View>
      </View>

      {/* Stats Section */}
      <View style={styles.statsRow}>
        {renderStat('Services Provided', '0', 'Activate', 'gray')}
        {renderStat('Active Requests', '0 ', 'Explore', 'gray')}
        {renderStat('Balance', '₹0', 'Earn.', 'gray')}
      </View>

      {/* Menu Section */}
      <View style={styles.menu}>
        {renderMenuItem('My Services', 'business-outline')}
        {renderMenuItem('Notifications', 'notifications-outline')}
        {renderMenuItem('Government Schemes', 'flag-outline')}
        {renderMenuItem('Settings', 'settings-outline')}
        {renderMenuItem('Help Center', 'help-circle-outline')}
        
        {/* Log out button */}
        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <Icon name="log-out-outline" size={22} color="#333" />
          <Text style={styles.menuText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Reusable stat component
const renderStat = (label, value, change, changeColor) => (
  <View style={styles.statCard} key={label}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={[styles.statChange, { color: changeColor }]}>{change}</Text>
  </View>
);

// Reusable menu item
const renderMenuItem = (title, icon) => (
  <TouchableOpacity style={styles.menuItem} key={title}>
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
  headerWrapper: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  profileBlockNoImage: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileDetails: {
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
  roleTag: {
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
  statChange: {
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
