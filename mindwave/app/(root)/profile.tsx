import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Switch, Alert, Modal, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useAuth } from '../../context/AuthContext';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const [dataSharingEnabled, setDataSharingEnabled] = useState(true);
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactRole, setNewContactRole] = useState('');
  const [newContactNumber, setNewContactNumber] = useState('');
  const [contacts, setContacts] = useState([
    {
      id: 1,
      icon: "DR",
      name: "Dr. Rebecca Chen",
      role: "Primary Physician",
      iconBg: "#6366f1"
    },
    {
      id: 2,
      icon: "MS",
      name: "Mary Smith",
      role: "Emergency Contact",
      iconBg: "#6366f1"
    }
  ]);

  const handleSignOut = () => {
    // Handle any sign out logic here 
    router.replace('/sign-in');
  };

  const handleAddContact = () => {
    setShowAddContactModal(true);
  };

  const handleSaveContact = () => {
    if (newContactName.trim() && newContactRole.trim()) {
      const newContact = {
        id: contacts.length + 1,
        icon: newContactName.trim().split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
        name: newContactName.trim(),
        role: newContactRole.trim(),
        iconBg: "#6366f1"
      };
      setContacts([...contacts, newContact]);
      setNewContactName('');
      setNewContactRole('');
      setShowAddContactModal(false);
      Alert.alert("Success", `${newContactName.trim()} has been added to your contacts.`);
    } else {
      Alert.alert("Error", "Please fill in both name and role fields.");
    }
  };

  const handleCancelAddContact = () => {
    setNewContactName('');
    setNewContactRole('');
    setShowAddContactModal(false);
  };

  const ContactCard = ({ icon, name, role, iconBg }: {
    icon: string;
    name: string;
    role: string;
    iconBg: string;
  }) => (
    <TouchableOpacity style={styles.contactCard}>
      <View style={[styles.contactIcon, { backgroundColor: iconBg }]}>
        <Text style={styles.contactIconText}>{icon}</Text>
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{name}</Text>
        <Text style={styles.contactRole}>{role}</Text>
      </View>
      <TouchableOpacity style={styles.callButton}>
        <Ionicons name="call" size={20} color="#6366f1" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const SettingItem = ({
    title,
    subtitle,
    value,
    onValueChange
  }: {
    title: string;
    subtitle: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
  }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingSubtitle}>{subtitle}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#374151', true: '#6366f1' }}
        thumbColor={value ? '#ffffff' : '#9ca3af'}
        ios_backgroundColor="#374151"
      />
    </View>
  );

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
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
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profile</Text>
            <View style={styles.headerSpacer} />
          </View>

          {/* User Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileCard}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {user?.name ? user.name.substring(0, 2).toUpperCase() : 'U'}
                </Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{user?.name || 'User'}</Text>
                <Text style={styles.profileEmail}>{user?.email || 'user@example.com'}</Text>
              </View>
            </View>
          </View>

          {/* Health Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Health Information</Text>
            <View style={styles.card}>
              <InfoRow label="Age" value="34" />
              <InfoRow label="Height" value="5ft 11in" />
              <InfoRow label="Weight" value="175 lbs" />
            </View>
          </View>

          {/* Care Contacts */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Care Contacts</Text>
            <View style={styles.card}>
              {contacts.map((contact, index) => (
                <React.Fragment key={contact.id}>
                  <ContactCard
                    icon={contact.icon}
                    name={contact.name}
                    role={contact.role}
                    iconBg={contact.iconBg}
                  />
                  {index < contacts.length - 1 && <View style={styles.contactDivider} />}
                </React.Fragment>
              ))}
              
              <View style={styles.contactDivider} />
              <TouchableOpacity style={styles.addContactButton} onPress={handleAddContact}>
                <Ionicons name="add" size={20} color="#6366f1" />
                <Text style={styles.addContactText}>Add Contact</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* App Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>App Settings</Text>
            <View style={styles.card}>
              <SettingItem
                title="Notifications"
                subtitle="Fatigue alerts and reminders"
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
              />
              <View style={styles.settingDivider} />
              <SettingItem
                title="Dark Mode"
                subtitle="Use dark theme"
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
              />
              <View style={styles.settingDivider} />
              <SettingItem
                title="Data Sharing"
                subtitle="Share anonymized data"
                value={dataSharingEnabled}
                onValueChange={setDataSharingEnabled}
              />
            </View>
          </View>

          {/* Additional Options */}
          <View style={styles.section}>
            <View style={styles.card}>
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <FontAwesome5 name="shield-alt" size={18} color="#6366f1" />
                  <Text style={styles.menuItemText}>Privacy Policy</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </TouchableOpacity>

              <View style={styles.settingDivider} />

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <FontAwesome5 name="question-circle" size={18} color="#6366f1" />
                  <Text style={styles.menuItemText}>Help & Support</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </TouchableOpacity>

              <View style={styles.settingDivider} />
              
              <TouchableOpacity style={styles.menuItem} onPress={handleSignOut}>
                <View style={styles.menuItemLeft}>
                  <FontAwesome5 name="sign-out-alt" size={18} color="#ef4444" />
                  <Text style={[styles.menuItemText, { color: '#ef4444' }]}>Sign Out</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>

      {/* Add Contact Modal */}
      <Modal
        visible={showAddContactModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCancelAddContact}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Contact</Text>
            
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.textInput}
              value={newContactName}
              onChangeText={setNewContactName}
              placeholder="Enter contact name"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
            />
            
            <Text style={styles.inputLabel}>Contact Number</Text>
            <TextInput
              style={styles.textInput}
              value={newContactNumber}
              onChangeText={setNewContactNumber}
              placeholder="+63 XXXXXXXXXX"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
            />

            <Text style={styles.inputLabel}>Role/Relationship</Text>
            <TextInput
              style={styles.textInput}
              value={newContactRole}
              onChangeText={setNewContactRole}
              placeholder="e.g., Doctor, Emergency Contact"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalCancelButton} onPress={handleCancelAddContact}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalSaveButton} onPress={handleSaveContact}>
                <Text style={styles.modalSaveText}>Add Contact</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    paddingBottom: 100,
    paddingTop: 30
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
  profileSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
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
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactIconText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  contactRole: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  callButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 8,
  },
  addContactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginTop: 8,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
  },
  addContactText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366f1',
    marginLeft: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingContent: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  settingDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    marginLeft: 12,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'rgba(30, 41, 59, 0.95)',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
    marginTop: 16,
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  modalSaveButton: {
    flex: 1,
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  modalSaveText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default ProfileScreen;