import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const DevicesScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Available');

  const ConnectionHelpItem = ({ title, checked = false }: { title: string; checked?: boolean }) => (
    <View style={styles.helpItem}>
      <View style={[styles.helpCheckbox, checked && styles.helpCheckboxChecked]}>
        {checked && <Ionicons name="checkmark" size={16} color="#fff" />}
      </View>
      <Text style={styles.helpText}>{title}</Text>
    </View>
  );

  const ConnectionIssueItem = ({ title }: { title: string }) => (
    <View style={styles.helpItem}>
      <View style={styles.helpCheckbox}>
        <View style={styles.helpDot} />
      </View>
      <Text style={styles.helpText}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#0f172a', '#1e1b4b']}
        style={styles.gradient}
      >
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Connect Device</Text>
            <View style={styles.headerSpacer} />
          </View>

          {/* Watch Display */}
          <View style={styles.watchSection}>
            <View style={styles.watchContainer}>
              <View style={styles.watchBand} />
              
              <View style={styles.watchScreen}>
                <View style={styles.watchTopRow}>
                  <Text style={styles.watchTime}>10:19</Text>
                </View>
                
                <View style={styles.watchCenter}>
                  <Ionicons name="wifi" size={32} color="#6366f1" />
                  <Text style={styles.watchStatus}>Searching...</Text>
                </View>
              </View>
              
              <View style={styles.watchBandBottom} />
            </View>
          </View>

          {/* Status Tabs */}
          <View style={styles.tabsContainer}>
            {['Available', 'Paired', 'Help'].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tab,
                  selectedTab === tab && styles.activeTab,
                  tab === 'Help' && styles.helpTab
                ]}
                onPress={() => setSelectedTab(tab)}
              >
                <Text style={[
                  styles.tabText,
                  selectedTab === tab && styles.activeTabText,
                  tab === 'Help' && styles.helpTabText
                ]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Connection Help Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Connection Help</Text>
            <View style={styles.card}>
              <Text style={styles.helpSectionTitle}>Can't find your device?</Text>
              
              <ConnectionHelpItem 
                title="Make sure your device is charged and powered on" 
                checked={true}
              />
              <ConnectionHelpItem 
                title="Enable Bluetooth on your phone and make sure it's discoverable" 
                checked={true}
              />
              <ConnectionHelpItem 
                title="Put your device in pairing mode (check device manual)" 
                checked={false}
              />
              <ConnectionHelpItem 
                title="Keep your device within 30 feet (10 meters) of your phone" 
                checked={false}
              />
            </View>
          </View>

          {/* Connection Issues Section */}
          <View style={styles.section}>
            <View style={styles.card}>
              <Text style={styles.helpSectionTitle}>Connection Issues?</Text>
              
              <ConnectionIssueItem title="Restart your device and try connecting again" />
              <ConnectionIssueItem title="Check if your device bluetooth settings are set to 'pair'" />
              <ConnectionIssueItem title="Update your device firmware to the latest version" />
            </View>
          </View>

          {/* Device Info Card */}
          <View style={styles.section}>
            <View style={styles.deviceInfoCard}>
              <View style={styles.deviceInfoHeader}>
                <FontAwesome5 name="info-circle" size={20} color="#6366f1" />
                <Text style={styles.deviceInfoTitle}>Device Information</Text>
              </View>
              <Text style={styles.deviceInfoText}>
                Looking for MindWatch devices nearby. Make sure your device is in pairing mode and within range.
              </Text>
            </View>
          </View>

          {/* Retry Button */}
          <View style={styles.section}>
            <TouchableOpacity style={styles.retryButton}>
              <Ionicons name="refresh" size={20} color="#fff" />
              <Text style={styles.retryText}>Retry Connection</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSpacer: {
    width: 40,
  },
  watchSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  watchContainer: {
    width: 160,
    height: 200,
    position: 'relative',
    alignItems: 'center',
  },
  watchBand: {
    position: 'absolute',
    top: -8,
    width: 50,
    height: 16,
    backgroundColor: '#374151',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  watchBandBottom: {
    position: 'absolute',
    bottom: -8,
    width: 50,
    height: 16,
    backgroundColor: '#374151',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  watchScreen: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000',
    borderRadius: 28,
    padding: 16,
    justifyContent: 'space-between',
    borderWidth: 4,
    borderColor: '#374151',
  },
  watchTopRow: {
    alignItems: 'center',
  },
  watchTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  watchCenter: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  watchStatus: {
    fontSize: 12,
    color: '#6366f1',
    marginTop: 8,
    fontWeight: '600',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderRadius: 16,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  helpTab: {
    // Special styling for help tab if needed
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  activeTabText: {
    color: '#fff',
  },
  helpTabText: {
    color: '#6366f1',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  helpSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  helpItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  helpCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  helpCheckboxChecked: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  helpDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  helpText: {
    flex: 1,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
  },
  deviceInfoCard: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
  },
  deviceInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  deviceInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366f1',
    marginLeft: 8,
  },
  deviceInfoText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366f1',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  retryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
});

export default DevicesScreen;