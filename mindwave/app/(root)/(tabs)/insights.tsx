import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';

const InsightsScreen = () => {
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
            <Text style={styles.headerTitle}>Personalized AI Engine</Text>
            <View style={styles.headerSpacer} />
          </View>

          {/* Your Cognitive Profile */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Cognitive Profile</Text>
            <Text style={styles.sectionSubtitle}>
              The AI has identified your unique physiological and behavioral patterns associated with mental fatigue.
            </Text>
            
            <View style={styles.cognitiveGrid}>
              <View style={styles.cognitiveCard}>
                <View style={styles.cognitiveHeader}>
                  <Text style={styles.cognitiveTitle}>Baseline Calibration</Text>
                  <Text style={styles.cognitiveValue}>98% Complete</Text>
                </View>
              </View>
              
              <View style={styles.cognitiveCard}>
                <View style={styles.cognitiveHeader}>
                  <Text style={styles.cognitiveTitle}>Intervention Effectiveness</Text>
                  <Text style={styles.cognitiveValue}>87% Accuracy</Text>
                </View>
              </View>
              
              <View style={styles.cognitiveCard}>
                <View style={styles.cognitiveHeader}>
                  <Text style={styles.cognitiveTitle}>Prediction Accuracy</Text>
                  <Text style={styles.cognitiveValue}>92% Precision</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Contextual Intelligence */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contextual Intelligence</Text>
            <Text style={styles.sectionSubtitle}>
              The AI engine integrates environmental and behavioral factors to provide personalized insights.
            </Text>
            
            <View style={styles.contextGrid}>
              <View style={styles.contextItem}>
                <Ionicons name="time" size={20} color="#6366f1" />
                <View style={styles.contextContent}>
                  <Text style={styles.contextTitle}>Time of Day</Text>
                  <Text style={styles.contextDescription}>Your cognitive peak is typically between 9-11 AM</Text>
                </View>
              </View>
              
              <View style={styles.contextItem}>
                <FontAwesome5 name="cloud-sun" size={20} color="#6366f1" />
                <View style={styles.contextContent}>
                  <Text style={styles.contextTitle}>Environment</Text>
                  <Text style={styles.contextDescription}>Open office settings increase your MFI by 18%</Text>
                </View>
              </View>
              
              <View style={styles.contextItem}>
                <MaterialIcons name="psychology" size={20} color="#6366f1" />
                <View style={styles.contextContent}>
                  <Text style={styles.contextTitle}>Nutrition</Text>
                  <Text style={styles.contextDescription}>Caffeine after 2PM increases your evening MFI</Text>
                </View>
              </View>
              
              <View style={styles.contextItem}>
                <FontAwesome5 name="bed" size={20} color="#6366f1" />
                <View style={styles.contextContent}>
                  <Text style={styles.contextTitle}>Sleep</Text>
                  <Text style={styles.contextDescription}>Each hour below 7h increases your MFI by 12%</Text>
                </View>
              </View>
            </View>
          </View>

          {/* AI Insights */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>N-of-1 Insights</Text>
            <Text style={styles.sectionSubtitle}>
              Personalized recommendations based on your unique cognition patterns.
            </Text>
            
            <View style={styles.insightsCard}>
              <View style={styles.insightItem}>
                <View style={styles.insightNumber}>
                  <Text style={styles.insightNumberText}>1</Text>
                </View>
                <Text style={styles.insightText}>
                  Your optimal work blocks are 52 minutes followed by 17-minute breaks based on your cognitive patterns vs. the standard pomodoro technique.
                </Text>
              </View>
              
              <View style={styles.insightItem}>
                <View style={styles.insightNumber}>
                  <Text style={styles.insightNumberText}>2</Text>
                </View>
                <Text style={styles.insightText}>
                  Brief nature expsosure 5mins reduces your MFI by 23% - more effective than caffeine.
                </Text>
              </View>
              
              <View style={styles.insightItem}>
                <View style={styles.insightNumber}>
                  <Text style={styles.insightNumberText}>3</Text>
                </View>
                <Text style={styles.insightText}>
                  Your cognitive recovery is 31% faster with active breaks vs. passive breaks.
                </Text>
              </View>
            </View>
          </View>

          {/* Adaptive Algorithm Tuning */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Adaptive Algorithm Tuning</Text>
            <Text style={styles.sectionSubtitle}>
              Help improve your personalized recommendations and feedback.
            </Text>
            
            <View style={styles.tuningCard}>
              <View style={styles.tuningItem}>
                <FontAwesome5 name="brain" size={20} color="#6366f1" />
                <View style={styles.tuningContent}>
                  <Text style={styles.tuningTitle}>Guided Breathing</Text>
                  <Text style={styles.tuningSubtitle}>Mindfulness 3:15 PM</Text>
                  <Text style={styles.tuningDescription}>
                    Your mental fatigue resistance training: PM breathing exercise feedback.
                  </Text>
                </View>
                <TouchableOpacity style={styles.tuningButton}>
                  <Text style={styles.tuningButtonText}>Try</Text>
                  <Text style={styles.tuningButtonText}>This</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <TouchableOpacity style={styles.feedbackButton}>
              <Text style={styles.feedbackButtonText}>View More Feedback Requests</Text>
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSpacer: {
    width: 40,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 20,
    marginBottom: 20,
  },
  cognitiveGrid: {
    gap: 12,
  },
  cognitiveCard: {
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
  },
  cognitiveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cognitiveTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  cognitiveValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366f1',
  },
  contextGrid: {
    gap: 16,
  },
  contextItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  contextContent: {
    flex: 1,
    marginLeft: 12,
  },
  contextTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  contextDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 18,
  },
  insightsCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    gap: 20,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  insightNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  insightNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  insightText: {
    fontSize: 15,
    color: '#fff',
    lineHeight: 22,
    flex: 1,
  },
  tuningCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 16,
  },
  tuningItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tuningContent: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
  tuningTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  tuningSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6366f1',
    marginBottom: 8,
  },
  tuningDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 18,
  },
  tuningButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  tuningButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  feedbackButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  feedbackButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default InsightsScreen;