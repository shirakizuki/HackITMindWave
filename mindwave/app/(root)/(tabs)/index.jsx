import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import { Feather, FontAwesome5 } from '@expo/vector-icons';
import FatigueMeter from '../../../components/home/FatigueMeter';
import TrendChart from '../../../components/home/TrendChart';
import VitalCard from '../../../components/home/VitalCard';
import WatchPreview from '../../../components/home/WatchPreview';
import styles from '../../../styles/mindWatchStyles';
import { simulateWearableData } from '../../../utils/dataSimulator';
import { predictMFI } from '../../../utils/mfiPrediction';



const MindWatchApp = () => {
    const baseUrl = 'http://192.168.8.11:8000';
    const [mfiValue, setMfiValue] = useState(0);
    const [averages, setAverages] = useState({});
    const [data, setData] = useState([]);
    const [currentTime, setCurrentTime] = useState('2:45 PM');
    const [watchMFI, setWatchMFI] = useState(32);
    const [hasPredicted, setHasPredicted] = useState(false);

    useFocusEffect(
        useCallback(() => {
            if (data.length == 0) {
                const { data, averages } = simulateWearableData();
                setAverages(averages);
                setData(data)
            }
            return () => {
                setAverages({});
                setMfiValue(0);
                setData([]);
                setHasPredicted(false);
            };
        }, [])
    );

    useEffect(() => {
        if (hasPredicted == false && data.length != 0) {
            console.log("Predicting");

            predict(data)
            setHasPredicted(true)
        }
    }, [data])

    const predict = async (simulatedData) => {
        if (!simulatedData || simulatedData.length !== 4) return;
        const result = await predictMFI(simulatedData, baseUrl);
        setMfiValue(result.fatigue_score?.toFixed(1));
    };
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
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.headerTitle}>MindWatch</Text>
                            <Text style={styles.headerSubtitle}>Your mental wellness companion</Text>
                        </View>
                        <View style={styles.headerActions}>
                            <TouchableOpacity style={styles.actionButton}>
                                <Text style={styles.actionIcon}>🔔</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionButton}>
                                <Text style={styles.profileIcon}>JS</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.meterContainer}>
                            <FatigueMeter mfiValue={mfiValue} />
                        </View>
                    </View>
                    <View style={styles.vitalsGrid}>
                        <VitalCard
                            icon={<FontAwesome5 name="wave-square" size={24} color="#ec4899" />}
                            value={`${averages.accX?.toFixed(2) ?? '--'}, ${averages.accY?.toFixed(2) ?? '--'}, ${averages.accZ?.toFixed(2) ?? '--'}`}
                            label="Accelometer (X, Y, Z)"
                            color="#ec4899"
                        />
                        <VitalCard
                            icon={<FontAwesome5 name="heartbeat" size={24} color="#8b5cf6" />}
                            value={`${averages.bvp?.toFixed(2) ?? '--'}`}
                            label="BVP"
                            color="#8b5cf6"
                        />
                        <VitalCard
                            icon={<FontAwesome5 name="tint" size={24} color="#6366f1" />}
                            value={`${averages.eda?.toFixed(2) ?? '--'} μS`}
                            label="EDA"
                            color="#6366f1"
                        />
                        <VitalCard
                            icon={<FontAwesome5 name="thermometer-half" size={24} color="#10b981" />}
                            value={`${averages.temp?.toFixed(2) ?? '--'} °C`}
                            label="Skin Temp"
                            color="#10b981"
                        />
                    </View>
                    <View style={styles.aiCard}>
                        <View style={styles.aiHeader}>
                            <View style={styles.aiIconContainer}>
                                <Feather name="activity" size={16} color="#c084fc" />
                            </View>
                            <Text style={styles.aiTitle}>Personalized AI Insight</Text>
                        </View>
                        <Text style={styles.aiDescription}>
                            Your cognitive load increases by <Text style={{ fontWeight: 'bold' }}>27%</Text> during video meetings compared to phone calls. Consider scheduling important tasks before your <Text style={{ fontWeight: 'bold' }}>2:00 PM</Text> meeting.
                        </Text>
                    </View>
                    <View style={styles.fatigueCard}>
                        <View style={styles.fatigueHeader}>
                            <View style={styles.fatigueIconContainer}>
                                <Feather name="alert-circle" size={16} color="#f87171" />
                            </View>
                            <Text style={styles.fatigueTitle}>Fatigue Forecast</Text>
                        </View>
                        <Text style={styles.fatigueDescription}>
                            Predicted cognitive overload in <Text style={{ color: '#f87171', fontWeight: 'bold' }}>45 minutes</Text> based on current trends and upcoming calendar events.
                        </Text>
                        <View style={styles.fatigueButtons}>
                            <TouchableOpacity style={styles.dismissButton}>
                                <Text style={styles.dismissText}>Dismiss</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.interveneButton}>
                                <Text style={styles.interveneText}>View Interventions</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View style={styles.cardHeaderLeft}>
                                <FontAwesome5 name="chart-line" size={24} color="#6366f1" style={styles.cardIcon} />
                                <Text style={styles.cardTitle}>Today's Trend</Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={styles.viewDetails}>View Details</Text>
                            </TouchableOpacity>
                        </View>
                        <TrendChart />
                    </View>
                    <View style={styles.card}>
                      <WatchPreview
                        currentTime={currentTime}
                        watchMFI={watchMFI}
                      />
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>

    )
}

export default MindWatchApp
