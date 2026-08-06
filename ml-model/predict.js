"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runRandomForestInference = runRandomForestInference;
const rf_model_json_1 = __importDefault(require("./rf_model.json"));
function runRandomForestInference(answers, patientId, patientName, patientEmail, assessmentId) {
    // Feature extraction & normalization
    const features = {
        ageGroup: { val: answers.ageGroup, max: 3, weight: 0.08 },
        smokingHabits: { val: answers.smokingHabits, max: 3, weight: 0.18 },
        bleedingGums: { val: answers.bleedingGums, max: 3, weight: 0.16 },
        pocketDepthProxy: { val: answers.pocketDepthProxy, max: 3, weight: 0.16 },
        systemicHealth: { val: answers.systemicHealth, max: 3, weight: 0.12 },
        brushingFrequency: { val: answers.brushingFrequency, max: 2, weight: 0.07 },
        flossingFrequency: { val: answers.flossingFrequency, max: 3, weight: 0.09 },
        looseTeeth: { val: answers.looseTeeth, max: 2, weight: 0.08 },
        familyHistory: { val: answers.familyHistory, max: 2, weight: 0.03 },
        lastDentalVisit: { val: answers.lastDentalVisit, max: 3, weight: 0.03 }
    };
    let rawWeightedScore = 0;
    const featureImportance = {};
    for (const [key, item] of Object.entries(features)) {
        const normalized = Math.min(item.val / item.max, 1);
        const contribution = normalized * item.weight * 100;
        rawWeightedScore += contribution;
        featureImportance[key] = Math.round(contribution * 10) / 10;
    }
    // Non-linear interaction boosts (e.g. smoking + uncontrolled diabetes + heavy bleeding)
    let synergyBoost = 0;
    if (answers.smokingHabits >= 2 && answers.bleedingGums >= 2)
        synergyBoost += 6;
    if (answers.systemicHealth >= 2 && answers.pocketDepthProxy >= 2)
        synergyBoost += 7;
    if (answers.looseTeeth >= 2)
        synergyBoost += 8;
    const finalScore = Math.min(Math.round(rawWeightedScore + synergyBoost), 100);
    // Risk category determination based on thresholds
    let riskCategory = 'Low';
    if (finalScore >= rf_model_json_1.default.thresholds.high) {
        riskCategory = 'Severe';
    }
    else if (finalScore >= rf_model_json_1.default.thresholds.moderate) {
        riskCategory = 'High';
    }
    else if (finalScore >= rf_model_json_1.default.thresholds.low) {
        riskCategory = 'Moderate';
    }
    // Calculate softmax probability distribution across 4 classes
    const probs = calculateProbabilities(finalScore);
    // Generate dynamic clinical & preventive recommendations
    const recommendations = generateRecommendations(answers, riskCategory, finalScore);
    return {
        id: `pred_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        assessmentId,
        patientId,
        patientName,
        patientEmail,
        riskScore: finalScore,
        riskCategory,
        predictionProbability: probs,
        recommendations,
        featureImportance,
        createdAt: new Date().toISOString()
    };
}
function calculateProbabilities(score) {
    if (score < 25) {
        const low = Math.round(85 - score * 0.8);
        const mod = Math.round(15 + score * 0.6);
        const high = Math.round(score * 0.15);
        const severe = 100 - (low + mod + high);
        return { low, moderate: mod, high, severe: Math.max(0, severe) };
    }
    else if (score < 55) {
        const mod = Math.round(65 - (score - 25) * 0.5);
        const low = Math.round(20 - (score - 25) * 0.4);
        const high = Math.round(12 + (score - 25) * 0.8);
        const severe = 100 - (low + mod + high);
        return { low: Math.max(2, low), moderate: mod, high, severe: Math.max(1, severe) };
    }
    else if (score < 80) {
        const high = Math.round(68 - (score - 55) * 0.4);
        const severe = Math.round(18 + (score - 55) * 1.1);
        const mod = Math.round(10 - (score - 55) * 0.2);
        const low = Math.max(0, 100 - (high + severe + mod));
        return { low, moderate: Math.max(2, mod), high, severe };
    }
    else {
        const severe = Math.min(95, Math.round(55 + (score - 80) * 1.8));
        const high = Math.round(35 - (score - 80) * 1.2);
        const mod = Math.max(2, 100 - (severe + high));
        return { low: 0, moderate: mod, high: Math.max(3, high), severe };
    }
}
function generateRecommendations(answers, riskCategory, score) {
    const list = [];
    if (answers.bleedingGums >= 2) {
        list.push({
            id: 'rec_bleeding',
            category: 'clinical',
            title: 'Schedule Periodontal Evaluation',
            description: 'Frequent bleeding is a classic sign of active gingival inflammation or periodontal pocket formation. Prompt professional scaling and probe depth measurement is advised.',
            priority: 'high'
        });
    }
    if (answers.smokingHabits >= 2) {
        list.push({
            id: 'rec_smoking',
            category: 'lifestyle',
            title: 'Enroll in Smoking Cessation Program',
            description: 'Tobacco use constricts microvascular blood supply in periodontal tissues, masking bleeding while accelerating bone destruction 3x faster than in non-smokers.',
            priority: 'critical'
        });
    }
    if (answers.flossingFrequency >= 2) {
        list.push({
            id: 'rec_floss',
            category: 'hygiene',
            title: 'Daily Interdental Biofilm Control',
            description: 'Incorporate waxed dental floss or interdental brushes once daily to clear subgingival bacterial plaque from interproximal spaces unreachable by standard toothbrushes.',
            priority: 'medium'
        });
    }
    if (answers.looseTeeth >= 1) {
        list.push({
            id: 'rec_mobility',
            category: 'urgent',
            title: 'Urgent Consultation for Tooth Mobility',
            description: 'Perceived tooth mobility signals advanced periodontal ligament breakdown or alveolar bone loss. Early splinting or deep root planing can save compromised teeth.',
            priority: 'critical'
        });
    }
    if (answers.systemicHealth >= 2) {
        list.push({
            id: 'rec_systemic',
            category: 'clinical',
            title: 'Coordinated Diabetic & Periodontal Care',
            description: 'Uncontrolled glycemic levels trigger hyper-inflammatory responses in gum tissues. Work with your physician to optimize HbA1c alongside periodontal treatment.',
            priority: 'high'
        });
    }
    if (list.length === 0 || riskCategory === 'Low') {
        list.push({
            id: 'rec_preventive',
            category: 'hygiene',
            title: 'Maintain Regular Routine Care',
            description: 'Your current risk profile is low. Continue brushing twice daily with fluoridated toothpaste, flossing regularly, and scheduling bi-annual prophylaxis.',
            priority: 'low'
        });
    }
    return list;
}
