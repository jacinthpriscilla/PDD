"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PERIODONTAL_QUESTIONS = void 0;
exports.PERIODONTAL_QUESTIONS = [
    {
        id: 'ageGroup',
        step: 1,
        category: 'history',
        question: 'What is your current age group?',
        options: [
            { label: 'Under 30 years old', value: 0, description: 'Lower baseline physiological risk.' },
            { label: '30 – 45 years old', value: 1, description: 'Mild baseline increase in cumulative periodontal susceptibility.' },
            { label: '46 – 60 years old', value: 2, description: 'Moderate increase in prevalence of attachment loss.' },
            { label: 'Over 60 years old', value: 3, description: 'Higher age-associated risk for bone resorption.' }
        ]
    },
    {
        id: 'smokingHabits',
        step: 2,
        category: 'lifestyle',
        question: 'What are your current tobacco / smoking habits?',
        options: [
            { label: 'Never smoked', value: 0, description: 'No tobacco-related periodontal compromise.' },
            { label: 'Former smoker (Quit >1 yr ago)', value: 1, description: 'Minimal residual vascular restriction.' },
            { label: 'Light smoker (<10 cigarettes/day or vape)', value: 2, description: 'Impaired gingival blood flow & altered immune response.' },
            { label: 'Heavy smoker (10+ cigarettes/day)', value: 3, description: 'Major driver of severe destructive periodontitis.' }
        ]
    },
    {
        id: 'bleedingGums',
        step: 3,
        category: 'symptoms',
        question: 'How frequently do your gums bleed when brushing or flossing?',
        options: [
            { label: 'Never bleed', value: 0, description: 'Healthy gingival sulcus tissue integrity.' },
            { label: 'Rarely (e.g. once a month)', value: 1, description: 'Localized mild gingival inflammation.' },
            { label: 'Often (several times a week)', value: 2, description: 'Active gingivitis / early periodontitis sign.' },
            { label: 'Always / Spontaneously', value: 3, description: 'Significant active periodontal pocket inflammation.' }
        ]
    },
    {
        id: 'pocketDepthProxy',
        step: 4,
        category: 'symptoms',
        question: 'Do you experience food getting stuck between teeth or notice deep pockets/receding gums?',
        options: [
            { label: 'No pockets or food trapping', value: 0, description: 'Normal interdental papilla retention.' },
            { label: 'Slight gum recession in isolated areas', value: 1, description: 'Mild clinical attachment loss.' },
            { label: 'Frequent food impaction between teeth', value: 2, description: 'Moderate pocket formation / bone loss indication.' },
            { label: 'Noticeably long teeth / visible deep spaces', value: 3, description: 'Advanced periodontitis attachment loss.' }
        ]
    },
    {
        id: 'systemicHealth',
        step: 5,
        category: 'history',
        question: 'Do you have any systemic health conditions (e.g., Diabetes, Cardiovascular Disease)?',
        options: [
            { label: 'No systemic conditions', value: 0, description: 'Normal host inflammatory response.' },
            { label: 'Controlled Type 2 Diabetes or Hypertension', value: 1, description: 'Slightly elevated systemic inflammation risk.' },
            { label: 'Uncontrolled Diabetes (HbA1c > 7.5%)', value: 2, description: 'Strong bi-directional hyper-inflammatory link to periodontitis.' },
            { label: 'Autoimmune disease / Heart condition', value: 3, description: 'High host susceptibility to rapid bone destruction.' }
        ]
    },
    {
        id: 'brushingFrequency',
        step: 6,
        category: 'hygiene',
        question: 'How many times per day do you brush your teeth?',
        options: [
            { label: '2 or more times daily', value: 0, description: 'Optimal bio-film disruptor routine.' },
            { label: 'Once daily', value: 1, description: 'Sub-optimal biofilm maturation rate.' },
            { label: 'Irregularly / Less than once a day', value: 2, description: 'High risk of dental plaque accumulation and calculus formation.' }
        ]
    },
    {
        id: 'flossingFrequency',
        step: 7,
        category: 'hygiene',
        question: 'How often do you clean interdentally (flossing or interdental brushes)?',
        options: [
            { label: 'Daily', value: 0, description: 'Thorough interproximal plaque control.' },
            { label: '2 – 3 times per week', value: 1, description: 'Partial protection against interdental inflammation.' },
            { label: 'Rarely (1-2 times per month)', value: 2, description: 'High probability of interproximal subgingival plaque.' },
            { label: 'Never', value: 3, description: 'Severe risk of interdental bone loss.' }
        ]
    },
    {
        id: 'looseTeeth',
        step: 8,
        category: 'symptoms',
        question: 'Do you feel any tooth mobility (loose teeth) or changes in your bite?',
        options: [
            { label: 'No mobility; bite feels firm', value: 0, description: 'Stable periodontal ligament support.' },
            { label: 'Slight mobility in a single tooth', value: 1, description: 'Early ligament breakdown or occlusal trauma.' },
            { label: 'Multiple teeth feel loose or shifted', value: 2, description: 'Severe clinical attachment & alveolar bone loss.' }
        ]
    },
    {
        id: 'familyHistory',
        step: 9,
        category: 'history',
        question: 'Is there a family history of early tooth loss or severe gum disease?',
        options: [
            { label: 'No family history', value: 0, description: 'Low genetic predisposition.' },
            { label: 'Yes, parent or sibling has gum disease', value: 1, description: 'Moderate genetic risk contribution.' },
            { label: 'Yes, early tooth loss before age 50', value: 2, description: 'High genetic / hyper-inflammatory trait risk.' }
        ]
    },
    {
        id: 'lastDentalVisit',
        step: 10,
        category: 'lifestyle',
        question: 'When was your last professional dental checkup / scaling & root planing?',
        options: [
            { label: 'Within the last 6 months', value: 0, description: 'Proactive calculus removal & monitoring.' },
            { label: '6 – 12 months ago', value: 1, description: 'Acceptable maintenance schedule.' },
            { label: '1 – 2 years ago', value: 2, description: 'Calculus buildup likelihood elevated.' },
            { label: 'More than 2 years ago', value: 3, description: 'Unmonitored subgingival pathogen accumulation.' }
        ]
    }
];
