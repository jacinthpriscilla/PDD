import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, TextInput, StatusBar, Image } from 'react-native';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'assessment' | 'result' | 'appointments'>('home');
  const [riskScore, setRiskScore] = useState<number>(68);
  const [riskCategory, setRiskCategory] = useState<string>('High');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#090d16" />
      
      {/* Native App Header */}
      <View style={styles.header}>
        <Image
          source={require('./assets/logo.png')}
          style={{ width: 140, height: 36, resizeMode: 'contain' }}
        />
      </View>

      {/* Screen Views */}
      <ScrollView contentContainerStyle={styles.content}>
        
        {currentScreen === 'home' && (
          <View style={styles.cardGroup}>
            <View style={styles.card}>
              <Text style={styles.cardTag}>PATIENT PORTAL</Text>
              <Text style={styles.cardTitle}>Welcome, Sarah Jenkins</Text>
              <Text style={styles.cardText}>Track your periodontal disease risk score powered by AI.</Text>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={() => setCurrentScreen('assessment')}>
              <Text style={styles.primaryButtonText}>Start 10-Step AI Risk Assessment</Text>
            </TouchableOpacity>

            <View style={styles.statsCard}>
              <Text style={styles.statLabel}>Latest AI Risk Score</Text>
              <Text style={styles.statValue}>68 / 100</Text>
              <View style={styles.badgeHigh}>
                <Text style={styles.badgeText}>HIGH RISK LEVEL</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.secondaryButton} onPress={() => setCurrentScreen('appointments')}>
              <Text style={styles.secondaryButtonText}>View Appointments (1 Upcoming)</Text>
            </TouchableOpacity>
          </View>
        )}

        {currentScreen === 'assessment' && (
          <View style={styles.cardGroup}>
            <Text style={styles.sectionHeader}>10-Step Periodontal Risk Form</Text>
            
            <View style={styles.questionCard}>
              <Text style={styles.questionStep}>QUESTION 1 OF 10</Text>
              <Text style={styles.questionText}>What is your current age group?</Text>
              
              <TouchableOpacity style={styles.optionSelected}>
                <Text style={styles.optionTextSelected}>30 – 45 years old</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionUnselected}>
                <Text style={styles.optionText}>46 – 60 years old</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => {
                setRiskScore(68);
                setRiskCategory('High');
                setCurrentScreen('result');
              }}
            >
              <Text style={styles.primaryButtonText}>Calculate AI Score</Text>
            </TouchableOpacity>
          </View>
        )}

        {currentScreen === 'result' && (
          <View style={styles.cardGroup}>
            <View style={styles.resultCard}>
              <Text style={styles.resultTag}>RANDOM FOREST INFERENCE</Text>
              <Text style={styles.resultScore}>{riskScore}</Text>
              <Text style={styles.resultMax}>Out of 100</Text>
              <Text style={styles.resultCategory}>{riskCategory} Risk Level</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Clinical Recommendations</Text>
              <Text style={styles.cardText}>• Schedule periodontal scaling & root planing.</Text>
              <Text style={styles.cardText}>• Daily interdental flossing protocol.</Text>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={() => setCurrentScreen('home')}>
              <Text style={styles.primaryButtonText}>Back to Dashboard</Text>
            </TouchableOpacity>
          </View>
        )}

        {currentScreen === 'appointments' && (
          <View style={styles.cardGroup}>
            <Text style={styles.sectionHeader}>Your Clinical Consultations</Text>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Dr. Marcus Vance, DDS</Text>
              <Text style={styles.cardText}>Date: July 28, 2026 at 10:30 AM</Text>
              <Text style={styles.cardText}>Status: Approved</Text>
            </View>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => setCurrentScreen('home')}>
              <Text style={styles.secondaryButtonText}>Back</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('home')}>
          <Text style={[styles.navText, currentScreen === 'home' && styles.navTextActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('assessment')}>
          <Text style={[styles.navText, currentScreen === 'assessment' && styles.navTextActive]}>Assessment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('appointments')}>
          <Text style={[styles.navText, currentScreen === 'appointments' && styles.navTextActive]}>Consults</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090d16',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
    backgroundColor: '#0f172a',
  },
  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#0f766e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoBadgeText: {
    color: '#ffffff',
    fontWeight: '900',
    fontSize: 14,
  },
  brandTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
  },
  brandAccent: {
    color: '#14b8a6',
  },
  brandSub: {
    color: '#94a3b8',
    fontSize: 10,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  cardGroup: {
    gap: 16,
  },
  card: {
    backgroundColor: '#111827',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1f293d',
  },
  cardTag: {
    color: '#14b8a6',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 4,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardText: {
    color: '#94a3b8',
    fontSize: 12,
    lineHeight: 18,
  },
  primaryButton: {
    backgroundColor: '#0f766e',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  secondaryButton: {
    backgroundColor: '#1e293b',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  secondaryButtonText: {
    color: '#e2e8f0',
    fontWeight: '600',
    fontSize: 13,
  },
  statsCard: {
    backgroundColor: '#111827',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1f293d',
  },
  statLabel: {
    color: '#94a3b8',
    fontSize: 12,
  },
  statValue: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '900',
    marginVertical: 4,
  },
  badgeHigh: {
    backgroundColor: 'rgba(249, 115, 22, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(249, 115, 22, 0.4)',
  },
  badgeText: {
    color: '#f97316',
    fontSize: 10,
    fontWeight: '800',
  },
  sectionHeader: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },
  questionCard: {
    backgroundColor: '#111827',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1f293d',
    gap: 12,
  },
  questionStep: {
    color: '#14b8a6',
    fontSize: 10,
    fontWeight: '800',
  },
  questionText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  optionSelected: {
    backgroundColor: 'rgba(15, 118, 110, 0.25)',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#14b8a6',
  },
  optionTextSelected: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 13,
  },
  optionUnselected: {
    backgroundColor: '#0f172a',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  optionText: {
    color: '#cbd5e1',
    fontSize: 13,
  },
  resultCard: {
    backgroundColor: '#111827',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0f766e',
  },
  resultTag: {
    color: '#14b8a6',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  resultScore: {
    color: '#ffffff',
    fontSize: 54,
    fontWeight: '900',
    marginTop: 4,
  },
  resultMax: {
    color: '#64748b',
    fontSize: 12,
  },
  resultCategory: {
    color: '#f97316',
    fontSize: 14,
    fontWeight: '800',
    marginTop: 8,
  },
  navBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
    backgroundColor: '#0f172a',
    paddingVertical: 12,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navText: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '600',
  },
  navTextActive: {
    color: '#14b8a6',
    fontWeight: '800',
  },
});
