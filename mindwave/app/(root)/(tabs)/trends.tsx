import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Dimensions, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import Svg, { Circle, Path, Defs, LinearGradient as SvgLinearGradient, Stop, Line, Text as SvgText, } from 'react-native-svg';

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
              
              <View style={styles.insightDivider} />
              
              <InsightCard
                title="Your mental fatigue increases significantly after lunch meetings."
                description="Consider scheduling important work before lunch."
              />
            </View>
          </View>

          {/* Heart Rate Variability */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Heart Rate Variability</Text>
            <View style={styles.hrvCard}>
              <Text style={styles.hrvStatus}>Current HRV: 42 ms (Moderate ANS stress detected)</Text>
              
              {/* HRV Chart Placeholder */}
              <View style={styles.hrvChartContainer}>
                <Svg width="100%" height={80} viewBox="0 0 280 80">
                  <Path 
                    d="M10,40 L30,35 L50,45 L70,30 L90,50 L110,25 L130,45 L150,35 L170,40 L190,30 L210,45 L230,35 L250,40 L270,35" 
                    fill="none" 
                    stroke="#ec4899" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                  />
                </Svg>
              </View>
              
              <View style={styles.hrvAnalysis}>
                <View style={styles.hrvAnalysisHeader}>
                  <FontAwesome5 name="heartbeat" size={16} color="#ec4899" />
                  <Text style={styles.hrvAnalysisTitle}>HRV Analysis</Text>
                </View>
                <Text style={styles.hrvAnalysisText}>
                  Your HRV decreased by 15% during your last meeting, indicating increased autonomic nervous system stress. This pattern typically precedes MFI increases by 30-45 minutes.
                </Text>
              </View>
            </View>
          </View>

          {/* Electrodermal Activity */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Electrodermal Activity</Text>
            <View style={styles.edaCard}>
              <Text style={styles.edaStatus}>Current EDA: 8.7 μS (Elevated sympathetic arousal)</Text>
              
              {/* EDA Chart */}
              <View style={styles.edaChartContainer}>
                <Svg width="100%" height={100} viewBox="0 0 280 100">
                  <Defs>
                    <SvgLinearGradient id="edaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <Stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                      <Stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                    </SvgLinearGradient>
                  </Defs>
                  
                  {/* EDA area fill */}
                  <Path 
                    d="M10,70 L30,65 L60,55 L90,40 L120,35 L150,30 L180,25 L210,30 L240,35 L270,40 L270,90 L10,90 Z" 
                    fill="url(#edaGradient)" 
                  />
                  
                  {/* EDA line */}
                  <Path 
                    d="M10,70 L30,65 L60,55 L90,40 L120,35 L150,30 L180,25 L210,30 L240,35 L270,40" 
                    fill="none" 
                    stroke="#8b5cf6" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                  />
                </Svg>
              </View>
              
              <View style={styles.edaAnalysis}>
                <View style={styles.edaAnalysisHeader}>
                  <MaterialIcons name="sensors" size={16} color="#8b5cf6" />
                  <Text style={styles.edaAnalysisTitle}>EDA Analysis</Text>
                </View>
                <Text style={styles.edaAnalysisText}>
                  Your EDA has been steadily increasing over the past 2 hours, indicating elevated sympathetic nervous system arousal. This pattern is consistent with your personal signature of approaching cognitive fatigue.
                </Text>
              </View>
            </View>
          </View>

          {/* Motion Patterns */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Motion Patterns</Text>
            <View style={styles.motionCard}>
              <Text style={styles.motionStatus}>Current Status: Moderate (Increased micro-movements)</Text>
              
              {/* Motion Chart */}
              <View style={styles.motionChartContainer}>
                <Svg width="100%" height={80} viewBox="0 0 280 80">
                  <Defs>
                    <SvgLinearGradient id="motionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <Stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                      <Stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </SvgLinearGradient>
                  </Defs>
                  
                  {/* Motion area fill */}
                  <Path 
                    d="M10,50 L30,45 L60,35 L90,55 L120,40 L150,30 L180,45 L210,35 L240,50 L270,40 L270,70 L10,70 Z" 
                    fill="url(#motionGradient)" 
                  />
                  
                  {/* Motion line with more variation to show micro-movements */}
                  <Path 
                    d="M10,50 L20,48 L30,45 L45,42 L60,35 L75,38 L90,55 L105,52 L120,40 L135,37 L150,30 L165,33 L180,45 L195,42 L210,35 L225,38 L240,50 L255,47 L270,40" 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                  />
                </Svg>
              </View>
              
              <View style={styles.motionAnalysis}>
                <View style={styles.motionAnalysisHeader}>
                  <MaterialIcons name="timeline" size={16} color="#10b981" />
                  <Text style={styles.motionAnalysisTitle}>Motion Analysis</Text>
                </View>
                <Text style={styles.motionAnalysisText}>
                  Your micro-movement patterns have increased by 35% in the last 30 minutes. For you specifically, this behavioral signature often correlates with rising cognitive load and precedes fatigue by approximately 45-60 minutes.
                </Text>
              </View>
            </View>
          </View>

          {/* Skin Temperature */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skin Temperature</Text>
            <View style={styles.temperatureCard}>
              <Text style={styles.temperatureStatus}>Current Temperature: 33.2°C (Slight elevation detected)</Text>
              
              {/* Temperature Chart */}
              <View style={styles.temperatureChartContainer}>
                <Svg width="100%" height={80} viewBox="0 0 280 80">
                  <Defs>
                    <SvgLinearGradient id="temperatureGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <Stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                      <Stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                    </SvgLinearGradient>
                  </Defs>
                  
                  {/* Temperature area fill */}
                  <Path 
                    d="M10,60 L40,55 L70,50 L100,45 L130,40 L160,35 L190,30 L220,25 L250,20 L280,15 L280,70 L10,70 Z" 
                    fill="url(#temperatureGradient)" 
                  />
                  
                  {/* Temperature line - gradual upward trend */}
                  <Path 
                    d="M10,60 L40,55 L70,50 L100,45 L130,40 L160,35 L190,30 L220,25 L250,20 L280,15" 
                    fill="none" 
                    stroke="#f59e0b" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                  />
                </Svg>
              </View>
              
              <View style={styles.temperatureAnalysis}>
                <View style={styles.temperatureAnalysisHeader}>
                  <FontAwesome5 name="thermometer-half" size={16} color="#f59e0b" />
                  <Text style={styles.temperatureAnalysisTitle}>Temperature Analysis</Text>
                </View>
                <Text style={styles.temperatureAnalysisText}>
                  Your skin temperature has been gradually increasing, which for your physiological profile is associated with rising stress levels. This is one of the earliest indicators in your personal fatigue signature.
                </Text>
              </View>
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
              <TouchableOpacity
                style={styles.recommendationButton}
                onPress={() => {
                  // Get current time and add 10 minutes
                  const now = new Date();
                  const alarmTime = new Date(now.getTime() + 10 * 60 * 1000); // Add 10 minutes

                  // Format the time for display
                  const timeString = alarmTime.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  });

                  alert(`Alarm set for ${timeString} (10 minutes from now)`);

                  // Set a timer for 10 minutes
                  setTimeout(() => {
                    alert('Time for your break! Take a 10-minute break to maintain optimal mental performance.');
                  }, 10 * 60 * 1000); // 600,000 milliseconds = 10 minutes
                }}
              >
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
    paddingBottom: 100,
    paddingTop: 30,
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
  // HRV Section Styles
  hrvCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(236, 72, 153, 0.3)',
  },
  hrvStatus: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ec4899',
    marginBottom: 16,
  },
  hrvChartContainer: {
    height: 80,
    marginBottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    padding: 8,
  },
  hrvAnalysis: {
    backgroundColor: 'rgba(236, 72, 153, 0.1)',
    borderRadius: 12,
    padding: 16,
  },
  hrvAnalysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  hrvAnalysisTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ec4899',
    marginLeft: 8,
  },
  hrvAnalysisText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 18,
  },
  // EDA Section Styles
  edaCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  edaStatus: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8b5cf6',
    marginBottom: 16,
  },
  edaChartContainer: {
    height: 100,
    marginBottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    padding: 8,
  },
  edaAnalysis: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 12,
    padding: 16,
  },
  edaAnalysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  edaAnalysisTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8b5cf6',
    marginLeft: 8,
  },
  edaAnalysisText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 18,
  },
  // Motion Patterns Section Styles
  motionCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  motionStatus: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10b981',
    marginBottom: 16,
  },
  motionChartContainer: {
    height: 80,
    marginBottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    padding: 8,
  },
  motionAnalysis: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 12,
    padding: 16,
  },
  motionAnalysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  motionAnalysisTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10b981',
    marginLeft: 8,
  },
  motionAnalysisText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 18,
  },
  // Skin Temperature Section Styles
  temperatureCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  temperatureStatus: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f59e0b',
    marginBottom: 16,
  },
  temperatureChartContainer: {
    height: 80,
    marginBottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    padding: 8,
  },
  temperatureAnalysis: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: 12,
    padding: 16,
  },
  temperatureAnalysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  temperatureAnalysisTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f59e0b',
    marginLeft: 8,
  },
  temperatureAnalysisText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 18,
  },
});

export default TrendsScreen;