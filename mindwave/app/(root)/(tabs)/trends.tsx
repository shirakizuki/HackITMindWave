import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Dimensions,} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import Svg, {  Circle,Path,Defs, LinearGradient as SvgLinearGradient, Stop, Line, Text as SvgText,} from 'react-native-svg';

const { width } = Dimensions.get('window');

const TrendsScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Daily');

  const periods = ['Daily', 'Weekly', 'Monthly'];

  const TrendChart = () => {
    return (
      <View style={styles.chartContainer}>
        <Svg width="100%" height={200} viewBox="0 0 320 200">
          <Defs>
            <SvgLinearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#ec4899" stopOpacity="0.3" />
              <Stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
            </SvgLinearGradient>
          </Defs>
          
          {/* Y-axis labels */}
          <SvgText x="25" y="25" fontSize="10" fill="rgba(255, 255, 255, 0.5)" textAnchor="end">100</SvgText>
          <SvgText x="25" y="60" fontSize="10" fill="rgba(255, 255, 255, 0.5)" textAnchor="end">75</SvgText>
          <SvgText x="25" y="95" fontSize="10" fill="rgba(255, 255, 255, 0.5)" textAnchor="end">50</SvgText>
          <SvgText x="25" y="130" fontSize="10" fill="rgba(255, 255, 255, 0.5)" textAnchor="end">25</SvgText>
          <SvgText x="25" y="165" fontSize="10" fill="rgba(255, 255, 255, 0.5)" textAnchor="end">0</SvgText>
          
          {/* X-axis labels */}
          <SvgText x="50" y="185" fontSize="10" fill="rgba(255, 255, 255, 0.5)" textAnchor="middle">6AM</SvgText>
          <SvgText x="90" y="185" fontSize="10" fill="rgba(255, 255, 255, 0.5)" textAnchor="middle">9AM</SvgText>
          <SvgText x="130" y="185" fontSize="10" fill="rgba(255, 255, 255, 0.5)" textAnchor="middle">12PM</SvgText>
          <SvgText x="170" y="185" fontSize="10" fill="rgba(255, 255, 255, 0.5)" textAnchor="middle">3PM</SvgText>
          <SvgText x="210" y="185" fontSize="10" fill="rgba(255, 255, 255, 0.5)" textAnchor="middle">6PM</SvgText>
          <SvgText x="250" y="185" fontSize="10" fill="rgba(255, 255, 255, 0.5)" textAnchor="middle">9PM</SvgText>
          <SvgText x="290" y="185" fontSize="10" fill="rgba(255, 255, 255, 0.5)" textAnchor="middle">12AM</SvgText>
          
          {/* Grid lines */}
          <Line x1="30" y1="25" x2="300" y2="25" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
          <Line x1="30" y1="60" x2="300" y2="60" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
          <Line x1="30" y1="95" x2="300" y2="95" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
          <Line x1="30" y1="130" x2="300" y2="130" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
          <Line x1="30" y1="165" x2="300" y2="165" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
          
          {/* Chart area fill */}
          <Path 
            d="M50,150 L90,130 L130,110 L170,70 L210,85 L250,95 L290,120 L290,165 L50,165 Z" 
            fill="url(#chartGradient)" 
          />
          
          {/* Chart line */}
          <Path 
            d="M50,150 L90,130 L130,110 L170,70 L210,85 L250,95 L290,120" 
            fill="none" 
            stroke="#ec4899" 
            strokeWidth="3" 
            strokeLinecap="round" 
          />
          
          {/* Data points */}
          <Circle cx="50" cy="150" r="4" fill="#ec4899" />
          <Circle cx="90" cy="130" r="4" fill="#ec4899" />
          <Circle cx="130" cy="110" r="4" fill="#ec4899" />
          <Circle cx="170" cy="70" r="6" fill="#ec4899" stroke="#fff" strokeWidth="2" />
          <Circle cx="210" cy="85" r="4" fill="#ec4899" />
          <Circle cx="250" cy="95" r="4" fill="#ec4899" />
          <Circle cx="290" cy="120" r="4" fill="#ec4899" />

          {/* Peak indicator */}
          <SvgText x="170" y="60" fontSize="12" fill="#ec4899" textAnchor="middle" fontWeight="bold">Peak MFI</SvgText>
        </Svg>
      </View>
    );
  };

  const InsightCard = ({ title, description }: { title: string; description: string }) => (
    <View style={styles.insightCard}>
      <View style={styles.insightBullet} />
      <View style={styles.insightContent}>
        <Text style={styles.insightTitle}>{title}</Text>
        <Text style={styles.insightDescription}>{description}</Text>
      </View>
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
            <Text style={styles.headerTitle}>Fatigue Trends</Text>
            <View style={styles.headerSpacer} />
          </View>

          {/* Period Selector */}
          <View style={styles.periodSelector}>
            {periods.map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.periodTab,
                  selectedPeriod === period && styles.activePeriodTab,
                ]}
                onPress={() => setSelectedPeriod(period)}
              >
                <Text style={[
                  styles.periodText,
                  selectedPeriod === period && styles.activePeriodText,
                ]}>
                  {period}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Today's Insights */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today's Insights</Text>
            <View style={styles.card}>
              <Text style={styles.insightSummary}>
                Your mental fatigue peaked at 2:30 PM (85 MFI). Consider scheduling important tasks earlier in the day.
              </Text>
            </View>
          </View>

          {/* Chart Section */}
          <View style={styles.section}>
            <View style={styles.chartCard}>
              <TrendChart />
            </View>
          </View>

          {/* AI Insights */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>AI Insights</Text>
            <View style={styles.card}>
              <InsightCard
                title="Your mental fatigue increases significantly after lunch meetings."
                description="Consider scheduling important work before lunch."
              />
              
              <View style={styles.insightDivider} />
              
              <InsightCard
                title="Taking short 5-minute breaks every hour has shown to reduce your afternoon fatigue by 23%."
                description=""
              />
            </View>
          </View>

          {/* Recommendations */}
          <View style={styles.section}>
            <View style={styles.recommendationCard}>
              <View style={styles.recommendationHeader}>
                <FontAwesome5 name="lightbulb" size={20} color="#f59e0b" />
                <Text style={styles.recommendationTitle}>Recommendations</Text>
              </View>
              <Text style={styles.recommendationText}>
                Based on your patterns, we recommend taking a 10-minute break around 1:30 PM to maintain optimal mental performance.
              </Text>
              <TouchableOpacity style={styles.recommendationButton}>
                <Text style={styles.recommendationButtonText}>Set Reminder</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats Summary */}
          <View style={styles.section}>
            <View style={styles.card}>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>72</Text>
                  <Text style={styles.statLabel}>Avg MFI</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>85</Text>
                  <Text style={styles.statLabel}>Peak MFI</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>2:30 PM</Text>
                  <Text style={styles.statLabel}>Peak Time</Text>
                </View>
              </View>
            </View>
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
  periodSelector: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderRadius: 16,
    padding: 4,
  },
  periodTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  activePeriodTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  activePeriodText: {
    color: '#fff',
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
  insightSummary: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
  },
  chartCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  chartContainer: {
    height: 200,
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  insightBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6366f1',
    marginRight: 12,
    marginTop: 8,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
    lineHeight: 20,
  },
  insightDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: 18,
  },
  insightDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 16,
  },
  recommendationCard: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f59e0b',
    marginLeft: 8,
  },
  recommendationText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
    marginBottom: 16,
  },
  recommendationButton: {
    backgroundColor: '#f59e0b',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  recommendationButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 16,
  },
});

export default TrendsScreen;