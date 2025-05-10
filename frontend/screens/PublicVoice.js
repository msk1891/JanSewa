import Voice from '@react-native-voice/voice';
import { Platform, PermissionsAndroid, View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';


const dummyJobs = [
  {
    id: 1,
    title: 'Farm Laborer',
    employer: 'Green Fields Co-op',
    location: 'Pauri',
    wage: '₹350/day',
    distance: '2 km',
  },
  {
    id: 2,
    title: 'Retail Helper',
    employer: 'Local Kirana Store',
    location: 'Tehri',
    wage: '₹8000/month',
    distance: '5 km',
  },
  {
    id: 3,
    title: 'Construction Worker',
    employer: 'BuildCo',
    location: 'Almora',
    wage: '₹500/day',
    distance: '3 km',
  },
  {
    id: 4,
    title: 'Warehouse Assistant',
    employer: 'FastMove Logistics',
    location: 'Tehri',
    wage: '₹10,000/month',
    distance: '4.5 km',
  },
  {
    id: 5,
    title: 'Delivery Person',
    employer: 'QuickDrop Services',
    location: 'Pauri',
    wage: '₹400/day + fuel',
    distance: '6 km',
  },
  {
    id: 6,
    title: 'Electrician Helper',
    employer: 'Spark Electricals',
    location: 'Almora',
    wage: '₹450/day',
    distance: '1.5 km',
  },
  {
    id: 7,
    title: 'Road Construction Labor',
    employer: 'Uttarakhand Infra Ltd.',
    location: 'Tehri',
    wage: '₹480/day',
    distance: '7 km',
  },
  {
    id: 8,
    title: 'Gardening Assistant',
    employer: 'City Garden Services',
    location: 'Pauri',
    wage: '₹300/day',
    distance: '2.2 km',
  },
  {
    id: 9,
    title: 'Hospital Cleaner',
    employer: 'Almora District Hospital',
    location: 'Almora',
    wage: '₹9,500/month',
    distance: '3.8 km',
  },
  {
    id: 10,
    title: 'Security Guard',
    employer: 'SafeZone Pvt. Ltd.',
    location: 'Tehri',
    wage: '₹12,000/month',
    distance: '5.5 km',
  },
  {
    id: 11,
    title: 'Daily Wage Mason',
    employer: 'Rural BuildWorks',
    location: 'Pauri',
    wage: '₹600/day',
    distance: '1.8 km',
  },
  {
    id: 12,
    title: 'Retail Stocker',
    employer: 'FreshMart Superstore',
    location: 'Almora',
    wage: '₹9,000/month',
    distance: '4 km',
  },
  {
    id: 13,
    title: 'Milk Delivery Helper',
    employer: 'Uttarakhand Dairy Co-op',
    location: 'Tehri',
    wage: '₹350/day',
    distance: '2.7 km',
  },
  {
    id: 14,
    title: 'Cleaner – Guesthouse',
    employer: 'Hilltop Retreat',
    location: 'Pauri',
    wage: '₹8,000/month',
    distance: '3.3 km',
  },
  {
    id: 15,
    title: 'Water Tanker Assistant',
    employer: 'City Utility Services',
    location: 'Almora',
    wage: '₹450/day',
    distance: '5 km',
  },
];
export default function JobPage() {
  const [bookmarked, setBookmarked] = useState([]);
  const [filters, setFilters] = useState({ location: '' });
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const uttarakhandDistricts = [
    'Almora', 'Bageshwar', 'Chamoli', 'Champawat', 'Dehradun',
    'Haridwar', 'Nainital', 'Pauri', 'Pithoragarh', 'Rudraprayag',
    'Tehri', 'Udham Singh Nagar', 'Uttarkashi'
  ];

  const requestMicrophonePermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'This app needs access to your microphone to search by voice.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const startListening = async () => {
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) return;

    try {
      await Voice.start('en-US');
      setIsListening(true);
    } catch (error) {
      console.error('Voice start error:', error);
    }
  };

  const stopListening = () => {
    Voice.stop();
    setIsListening(false);
  };

  const onSpeechResults = (e) => {
    const result = e.value[0];
    setTranscript(result);

    const words = result.toLowerCase().split(' ');
    const matchedLocation = uttarakhandDistricts.find((loc) =>
      words.includes(loc.toLowerCase())
    );

    setFilters({ location: matchedLocation?.toLowerCase() || '' });
    stopListening();
  };

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechEnd = stopListening;
    Voice.onSpeechError = (e) => {
      console.error('Voice error:', e);
      stopListening();
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const handleBookmark = (id) => {
    setBookmarked((prev) =>
      prev.includes(id) ? prev.filter((jobId) => jobId !== id) : [...prev, id]
    );
  };

  const filteredJobs = dummyJobs.filter((job) => {
    const jobLocation = job.location?.toLowerCase().trim() || '';
    const inputLocation = filters.location.toLowerCase().trim();
    return inputLocation === '' || jobLocation.includes(inputLocation);
  });

  const renderJobCard = (job) => (
    <View key={job.id} style={styles.card}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.title}>{job.title}</Text>
        <TouchableOpacity onPress={() => handleBookmark(job.id)}>
          <Icon
            name={bookmarked.includes(job.id) ? 'heart' : 'heart-o'}
            size={24}
            color={bookmarked.includes(job.id) ? '#E74C3C' : '#BDC3C7'}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.subText}>🏢 {job.employer}</Text>
      <Text style={styles.subText}>📍 {job.location} • 📏 {job.distance}</Text>
      <Text style={{ color: '#2ECC71', fontWeight: '600', marginTop: 8 }}>💰 {job.wage}</Text>
      <TouchableOpacity
        onPress={() => Alert.alert(`Applying to ${job.title}`)}
        style={styles.applyButton}
      >
        <Text style={styles.applyText}>Apply Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={{ backgroundColor: '#f9f9f9' }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 16, color: '#2C3E50' }}>
          Local Jobs in My Area
        </Text>
  
        {/* Saved Jobs (Top, Horizontal Scroll) */}
        {bookmarked.length > 0 && (
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2C3E50', marginBottom: 8 }}>Saved Jobs</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {dummyJobs
                .filter((job) => bookmarked.includes(job.id))
                .map((job) => (
                  <View key={job.id} style={[styles.card, { width: 260, marginRight: 12 }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={styles.title}>{job.title}</Text>
                      <TouchableOpacity onPress={() => handleBookmark(job.id)}>
                        <Icon
                          name='heart'
                          size={22}
                          color='#E74C3C'
                        />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.subText}>🏢 {job.employer}</Text>
                    <Text style={styles.subText}>📍 {job.location} • 📏 {job.distance}</Text>
                    <Text style={{ color: '#2ECC71', fontWeight: '600', marginTop: 8 }}>💰 {job.wage}</Text>
                    <TouchableOpacity
                      onPress={() => Alert.alert(`Applying to ${job.title}`)}
                      style={styles.applyButton}
                    >
                      <Text style={styles.applyText}>Apply Now</Text>
                    </TouchableOpacity>
                  </View>
                ))}
            </ScrollView>
          </View>
        )}
  
        {/* Location Dropdown */}
        <TouchableOpacity
          style={[styles.input, { justifyContent: 'center' }]}
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <Text style={{ color: filters.location ? '#000' : '#aaa' }}>
            {filters.location ? filters.location.charAt(0).toUpperCase() + filters.location.slice(1) : 'Select Location'}
          </Text>
        </TouchableOpacity>
        {dropdownVisible && (
          <View style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}>
            {uttarakhandDistricts.map((district) => (
              <TouchableOpacity
                key={district}
                style={{ padding: 10 }}
                onPress={() => {
                  setFilters({ location: district.toLowerCase() });
                  setDropdownVisible(false);
                }}
              >
                <Text>{district}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
  
        {/* Voice Search */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
          <TouchableOpacity
            onPress={startListening}
            style={[styles.voiceButton, isListening && { backgroundColor: '#7FB3D5' }]}
            disabled={isListening}
          >
            <Text style={styles.voiceButtonText}>{isListening ? 'Listening...' : '🎤 Voice Search'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setTranscript('');
              setFilters({ location: '' });
            }}
            style={{ marginLeft: 12 }}
          >
            <Text style={{ fontSize: 16, color: '#7F8C8D' }}>🔄 Reset</Text>
          </TouchableOpacity>
        </View>
        {transcript && (
          <Text style={{ marginTop: 8, color: '#7F8C8D' }}>Heard: "{transcript}"</Text>
        )}
  
        {/* Job Listings */}
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#2C3E50' }}>Job Listings</Text>
          {filteredJobs.length === 0 ? (
            <Text style={{ fontSize: 16, color: '#E74C3C', marginTop: 12 }}>
              No jobs found matching your criteria.
            </Text>
          ) : (
            filteredJobs.map(renderJobCard)
          )}
        </View>
      </View>
    </ScrollView>
  );
}  
const styles = {
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495E',
  },
  
  subText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 4,
  },
  
  applyButton: {
    marginTop: 12,
    backgroundColor: '#3498DB',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  
  applyText: {
    color: '#fff',
    fontWeight: '600',
  },
  
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    marginTop: 8,
  },
  
  voiceButton: {
    backgroundColor: '#2980B9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  
  voiceButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  
};
