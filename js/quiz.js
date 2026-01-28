/* ============================================
   VAYDA WELLNESS QUIZ - JavaScript
   Fixed to work with modal structure
   ============================================ */

// ========== QUIZ DATA ==========
const quizData = {
    questions: [
        // SLEEP (Q1-Q4)
        {
            id: 1,
            category: 'Sleep',
            pillar: 'sleep',
            text: 'How would you describe your sleep most nights?',
            options: [
                { text: 'I sleep soundly and wake refreshed', score: 0 },
                { text: 'I fall asleep okay but wake during the night', score: 1 },
                { text: 'I have trouble falling asleep or staying asleep', score: 2 },
                { text: 'I rarely feel rested, no matter how long I sleep', score: 3 }
            ]
        },
        {
            id: 2,
            category: 'Sleep',
            pillar: 'sleep',
            text: 'How often do you wake between 2-4am with a racing mind?',
            options: [
                { text: 'Rarely or never', score: 0 },
                { text: 'Once a week', score: 1 },
                { text: 'Several times a week', score: 2 },
                { text: 'Almost every night', score: 3 }
            ]
        },
        {
            id: 3,
            category: 'Sleep',
            pillar: 'sleep',
            text: 'In the 90 minutes before bed, what do you typically do?',
            options: [
                { text: 'Wind down with reading, stretching, or relaxation', score: 0 },
                { text: 'Watch TV or casual phone use', score: 1 },
                { text: 'Work, emails, or intense screen time', score: 2 },
                { text: "I don't have a routine—I crash when exhausted", score: 3 }
            ]
        },
        {
            id: 4,
            category: 'Sleep',
            pillar: 'sleep',
            text: 'How do you feel within 30 minutes of waking?',
            options: [
                { text: 'Alert and ready for the day', score: 0 },
                { text: 'Groggy but functional after coffee', score: 1 },
                { text: 'Sluggish—takes hours to feel normal', score: 2 },
                { text: 'Exhausted before the day even starts', score: 3 }
            ]
        },
        // DIGESTION (Q5-Q8)
        {
            id: 5,
            category: 'Digestion',
            pillar: 'digestion',
            text: 'How would you describe your digestion on a typical day?',
            options: [
                { text: 'Smooth and predictable', score: 0 },
                { text: 'Mostly fine with occasional discomfort', score: 1 },
                { text: 'Frequent bloating, gas, or irregularity', score: 2 },
                { text: 'Constant issues that affect my daily life', score: 3 }
            ]
        },
        {
            id: 6,
            category: 'Digestion',
            pillar: 'digestion',
            text: 'How do you feel after eating a meal?',
            options: [
                { text: 'Energized and satisfied', score: 0 },
                { text: 'Comfortable but sometimes heavy', score: 1 },
                { text: 'Often bloated or sluggish', score: 2 },
                { text: 'Tired, foggy, or uncomfortable most times', score: 3 }
            ]
        },
        {
            id: 7,
            category: 'Digestion',
            pillar: 'digestion',
            text: 'How fast do you typically eat?',
            options: [
                { text: 'I eat slowly and mindfully', score: 0 },
                { text: 'Moderate pace, usually seated', score: 1 },
                { text: 'Fast—often multitasking or distracted', score: 2 },
                { text: 'Very fast—meals are rarely a priority', score: 3 }
            ]
        },
        {
            id: 8,
            category: 'Digestion',
            pillar: 'digestion',
            text: 'Do you regularly experience heartburn, acid reflux, or stomach discomfort?',
            options: [
                { text: 'Rarely or never', score: 0 },
                { text: 'Occasionally (once a week)', score: 1 },
                { text: 'Frequently (several times a week)', score: 2 },
                { text: 'Daily or almost daily', score: 3 }
            ]
        },
        // STRESS (Q9-Q12)
        {
            id: 9,
            category: 'Stress',
            pillar: 'stress',
            text: 'How would you describe your overall stress level?',
            options: [
                { text: 'Manageable—I feel in control', score: 0 },
                { text: 'Moderate—busy but handling it', score: 1 },
                { text: 'High—often overwhelmed', score: 2 },
                { text: "Constant—I can't remember the last time I felt calm", score: 3 }
            ]
        },
        {
            id: 10,
            category: 'Stress',
            pillar: 'stress',
            text: 'How does your body respond to stress?',
            options: [
                { text: 'I recover quickly', score: 0 },
                { text: 'Some tension but it passes', score: 1 },
                { text: 'Physical symptoms (headaches, tight shoulders, jaw clenching)', score: 2 },
                { text: 'My body holds stress constantly', score: 3 }
            ]
        },
        {
            id: 11,
            category: 'Stress',
            pillar: 'stress',
            text: 'Do you have a daily practice to calm your nervous system?',
            options: [
                { text: 'Yes, I practice daily (meditation, breathwork, yoga, etc.)', score: 0 },
                { text: 'Sometimes, a few times a week', score: 1 },
                { text: "Rarely—I know I should but don't", score: 2 },
                { text: "Never—I don't have time or don't know how", score: 3 }
            ]
        },
        {
            id: 12,
            category: 'Stress',
            pillar: 'stress',
            text: 'Around 3pm, how do you typically feel?',
            options: [
                { text: 'Still energized and focused', score: 0 },
                { text: 'A slight dip but manageable', score: 1 },
                { text: 'Significant energy crash—need caffeine or sugar', score: 2 },
                { text: 'Completely drained—struggle to function', score: 3 }
            ]
        }
    ]
};

// ========== STATE ==========
let currentQuestion = 0;
let scores = { sleep: 0, digestion: 0, stress: 0 };
let answers = [];
let userData = {};

// ========== ICONS ==========
const pillarIcons = {
    sleep: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    digestion: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
    stress: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>'
};

// ========== RENDER QUESTION ==========
function renderQuestion() {
    const question = quizData.questions[currentQuestion];
    const totalQuestions = quizData.questions.length;
    
    // Update progress bar
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    if (progressFill && progressText) {
        const percent = ((currentQuestion + 1) / totalQuestions) * 100;
        progressFill.style.width = `${percent}%`;
        progressText.textContent = `${currentQuestion + 1} of ${totalQuestions}`;
    }
    
    // Update category badge
    const categoryEl = document.getElementById('questionCategory');
    if (categoryEl) {
        categoryEl.textContent = question.category;
    }
    
    // Update icon
    const iconEl = document.getElementById('questionIcon');
    if (iconEl) {
        iconEl.innerHTML = pillarIcons[question.pillar];
        iconEl.className = `question-icon ${question.pillar}`;
    }
    
    // Update question text
    const textEl = document.getElementById('questionText');
    if (textEl) {
        textEl.textContent = question.text;
    }
    
    // Render options
    const optionsContainer = document.getElementById('optionsContainer');
    if (optionsContainer) {
        optionsContainer.innerHTML = question.options.map((option, index) => `
            <div class="option" data-index="${index}" data-score="${option.score}">
                <div class="option-indicator"></div>
                <span class="option-text">${option.text}</span>
            </div>
        `).join('');
        
        // Add click handlers
        optionsContainer.querySelectorAll('.option').forEach(opt => {
            opt.addEventListener('click', function() {
                selectOption(
                    parseInt(this.dataset.index),
                    parseInt(this.dataset.score)
                );
            });
        });
    }
}

// ========== SELECT OPTION ==========
function selectOption(index, score) {
    const question = quizData.questions[currentQuestion];
    
    // Add score to appropriate pillar
    scores[question.pillar] += score;
    
    // Store answer
    answers.push({
        questionId: question.id,
        pillar: question.pillar,
        selectedIndex: index,
        score: score
    });
    
    // Visual feedback
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    options[index].classList.add('selected');
    
    // Move to next question or show capture form
    setTimeout(() => {
        if (currentQuestion < quizData.questions.length - 1) {
            currentQuestion++;
            renderQuestion();
        } else {
            showCaptureForm();
        }
    }, 300);
}

// ========== SHOW CAPTURE FORM ==========
function showCaptureForm() {
    const quizContent = document.getElementById('quizContent');
    const captureContent = document.getElementById('captureContent');
    
    if (quizContent) quizContent.style.display = 'none';
    if (captureContent) captureContent.style.display = 'flex';
}

// ========== SUBMIT FORM ==========
function submitForm(event) {
    event.preventDefault();
    
    // Get form data
    userData = {
        firstName: document.getElementById('firstName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value || null,
        scores: scores,
        dominantPillar: getDominantPillar(),
        totalScore: scores.sleep + scores.digestion + scores.stress,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    localStorage.setItem('vayda_quiz_result', JSON.stringify(userData));
    
    // Send to webhook if configured
    sendToWebhook(userData);
    
    // Show results screen (not redirect)
    showResults();
}

// ========== PILLAR DATA ==========
const pillarData = {
    sleep: {
        title: 'Sleep Architecture',
        icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
        description: 'Your quiz reveals that <strong>sleep quality</strong> is your primary energy drain. Even when you get enough hours, your body isn\'t reaching the deep, restorative stages where real recovery happens.',
        actions: [
            'Set a consistent bedtime (even on weekends)',
            'Stop screens 60 minutes before bed',
            'Try 5 minutes of deep breathing before sleep'
        ]
    },
    digestion: {
        title: 'Digestive Vitality',
        icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
        description: 'Your quiz reveals that <strong>digestive health</strong> is your primary energy drain. When your gut struggles, inflammation rises, brain fog sets in, and your energy plummets.',
        actions: [
            'Eat slowly and chew thoroughly',
            'Add fermented foods to your diet',
            'Avoid eating within 3 hours of bedtime'
        ]
    },
    stress: {
        title: 'Nervous System',
        icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
        description: 'Your quiz reveals that <strong>chronic stress</strong> is your primary energy drain. Your nervous system is stuck in "fight or flight," burning through energy reserves at an unsustainable rate.',
        actions: [
            'Practice 5 minutes of breathwork daily',
            'Take short breaks every 90 minutes',
            'Limit caffeine after 2pm'
        ]
    }
};

// ========== SHOW RESULTS ==========
function showResults() {
    const pillar = getDominantPillar();
    const data = pillarData[pillar];
    const firstName = userData.firstName || 'Friend';
    
    // Hide capture, show results
    const captureContent = document.getElementById('captureContent');
    const resultsContent = document.getElementById('resultsContent');
    
    if (captureContent) captureContent.style.display = 'none';
    if (resultsContent) resultsContent.style.display = 'flex';
    resultsContent.style.flexDirection = 'column';
    
    // Update results icon
    const resultsIcon = document.getElementById('resultsIcon');
    if (resultsIcon) {
        resultsIcon.innerHTML = data.icon;
        resultsIcon.className = `results-icon ${pillar}`;
    }
    
    // Update title and description
    const resultsTitle = document.getElementById('resultsTitle');
    const resultsDescription = document.getElementById('resultsDescription');
    
    if (resultsTitle) resultsTitle.textContent = data.title;
    if (resultsDescription) resultsDescription.innerHTML = data.description;
    
    // Update score bars
    updateScoreBars();
    
    // Update actions
    const actions = data.actions;
    for (let i = 0; i < 3; i++) {
        const actionEl = document.getElementById(`action${i + 1}`);
        if (actionEl && actions[i]) {
            actionEl.textContent = actions[i];
        }
    }
    
    // Update CTA pillar name
    const ctaPillar = document.getElementById('ctaPillar');
    if (ctaPillar) {
        const pillarNames = { sleep: 'Sleep', digestion: 'Digestion', stress: 'Stress' };
        ctaPillar.textContent = pillarNames[pillar];
    }
    
    // Update tripwire link with params
    const tripwireLink = document.getElementById('tripwireLink');
    if (tripwireLink) {
        const params = new URLSearchParams({
            pillar: pillar,
            name: firstName,
            sleep: scores.sleep,
            digestion: scores.digestion,
            stress: scores.stress
        });
        tripwireLink.href = `tripwire.html?${params.toString()}`;
    }
    
    // Animate score bars after a short delay
    setTimeout(animateScoreBars, 100);
}

// ========== UPDATE SCORE BARS ==========
function updateScoreBars() {
    const pillars = ['sleep', 'digestion', 'stress'];
    
    pillars.forEach(p => {
        const score = scores[p];
        const percentage = (score / 12) * 100;
        
        const fill = document.getElementById(`${p}ScoreFill`);
        const value = document.getElementById(`${p}ScoreValue`);
        
        if (fill && value) {
            fill.style.width = '0%';
            fill.dataset.width = `${percentage}%`;
            
            // Set color class based on score
            fill.classList.remove('high', 'medium', 'low');
            if (score >= 8) {
                fill.classList.add('high');
            } else if (score >= 5) {
                fill.classList.add('medium');
            } else {
                fill.classList.add('low');
            }
            
            value.textContent = `${score}/12`;
        }
    });
}

// ========== ANIMATE SCORE BARS ==========
function animateScoreBars() {
    const fills = document.querySelectorAll('.results-scores .score-fill');
    fills.forEach(fill => {
        if (fill.dataset.width) {
            fill.style.width = fill.dataset.width;
        }
    });
}

// ========== GET DOMINANT PILLAR ==========
function getDominantPillar() {
    // Tiebreaker: Stress → Sleep → Digestion
    if (scores.stress >= scores.sleep && scores.stress >= scores.digestion) {
        return 'stress';
    } else if (scores.sleep >= scores.digestion) {
        return 'sleep';
    } else {
        return 'digestion';
    }
}

// ========== SEND TO WEBHOOK ==========
async function sendToWebhook(data) {
    const webhookUrl = window.VAYDA_WEBHOOK_URL;
    if (!webhookUrl) {
        console.log('Webhook not configured. Data saved locally.');
        return;
    }
    
    try {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        console.log('Data sent to webhook');
    } catch (error) {
        console.error('Webhook error:', error);
    }
}

// ========== CLOSE QUIZ ==========
function closeQuiz() {
    // Reset state
    currentQuestion = 0;
    scores = { sleep: 0, digestion: 0, stress: 0 };
    answers = [];
    userData = {};
    
    // Reset UI
    const quizContent = document.getElementById('quizContent');
    const captureContent = document.getElementById('captureContent');
    const resultsContent = document.getElementById('resultsContent');
    const overlay = document.getElementById('quizOverlay');
    
    if (quizContent) quizContent.style.display = 'flex';
    if (captureContent) captureContent.style.display = 'none';
    if (resultsContent) resultsContent.style.display = 'none';
    if (overlay) overlay.classList.remove('active');
    
    // Reset form
    const form = document.getElementById('captureForm');
    if (form) form.reset();
    
    document.body.style.overflow = '';
}

// ========== START QUIZ ==========
function startQuiz() {
    // Reset state
    currentQuestion = 0;
    scores = { sleep: 0, digestion: 0, stress: 0 };
    answers = [];
    
    // Show overlay
    const overlay = document.getElementById('quizOverlay');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reset UI state
    const quizContent = document.getElementById('quizContent');
    const captureContent = document.getElementById('captureContent');
    if (quizContent) quizContent.style.display = 'flex';
    if (captureContent) captureContent.style.display = 'none';
    
    // Render first question
    renderQuestion();
}

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('Vayda Wellness Quiz initialized');
    
    // Pre-render first question (hidden until quiz starts)
    renderQuestion();
});
