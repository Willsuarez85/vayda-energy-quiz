/* ============================================
   VAYDA WELLNESS QUIZ - JavaScript
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
let scores = {
    sleep: 0,
    digestion: 0,
    stress: 0
};
let answers = [];
let userData = {};

// ========== DOM ELEMENTS ==========
const progressContainer = document.getElementById('progressContainer');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const optionsContainer = document.getElementById('optionsContainer');
const questionCategory = document.getElementById('questionCategory');
const questionIcon = document.getElementById('questionIcon');
const questionText = document.getElementById('questionText');

// ========== SCREEN MANAGEMENT ==========
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// ========== START QUIZ ==========
function startQuiz() {
    currentQuestion = 0;
    scores = { sleep: 0, digestion: 0, stress: 0 };
    answers = [];
    
    progressContainer.classList.add('visible');
    showScreen('screenQuiz');
    renderQuestion();
}

// ========== RENDER QUESTION ==========
function renderQuestion() {
    const question = quizData.questions[currentQuestion];
    
    // Update progress
    const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${currentQuestion + 1} of ${quizData.questions.length}`;
    
    // Update category and icon
    questionCategory.textContent = question.category;
    questionIcon.className = `question-icon ${question.pillar}`;
    
    // Update icon SVG based on pillar
    const icons = {
        sleep: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
        digestion: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
        stress: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>'
    };
    questionIcon.innerHTML = icons[question.pillar];
    
    // Update question text
    questionText.textContent = question.text;
    
    // Render options
    optionsContainer.innerHTML = question.options.map((option, index) => `
        <div class="option" onclick="selectOption(${index}, ${option.score})">
            <div class="option-indicator"></div>
            <span class="option-text">${option.text}</span>
        </div>
    `).join('');
    
    // Animate in
    document.querySelector('.quiz-content').style.animation = 'none';
    setTimeout(() => {
        document.querySelector('.quiz-content').style.animation = 'slideIn var(--transition-normal)';
    }, 10);
}

// ========== SELECT OPTION ==========
function selectOption(index, score) {
    const question = quizData.questions[currentQuestion];
    
    // Update scores
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
    
    // Move to next question after short delay
    setTimeout(() => {
        if (currentQuestion < quizData.questions.length - 1) {
            currentQuestion++;
            renderQuestion();
        } else {
            // Quiz complete - show capture form
            progressContainer.classList.remove('visible');
            showScreen('screenCapture');
        }
    }, 300);
}

// ========== SUBMIT FORM ==========
function submitForm(event) {
    event.preventDefault();
    
    // Collect form data
    userData = {
        firstName: document.getElementById('firstName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value || null,
        scores: scores,
        answers: answers,
        dominantPillar: getDominantPillar(),
        totalScore: scores.sleep + scores.digestion + scores.stress,
        timestamp: new Date().toISOString()
    };
    
    // Send to webhook (GHL - to be configured)
    sendToWebhook(userData);
    
    // Show appropriate result
    showResult();
}

// ========== GET DOMINANT PILLAR ==========
function getDominantPillar() {
    // Tiebreaker order: Stress → Sleep → Digestion
    if (scores.stress >= scores.sleep && scores.stress >= scores.digestion) {
        return 'stress';
    } else if (scores.sleep >= scores.digestion) {
        return 'sleep';
    } else {
        return 'digestion';
    }
}

// ========== SHOW RESULT ==========
function showResult() {
    const pillar = getDominantPillar();
    
    // Map pillar to screen
    const screenMap = {
        sleep: 'screenResultSleep',
        digestion: 'screenResultDigestion',
        stress: 'screenResultStress'
    };
    
    // Update score bars with actual values
    updateScoreBars(pillar);
    
    // Show result screen
    showScreen(screenMap[pillar]);
    
    // Animate score bars
    setTimeout(() => {
        animateScoreBars();
    }, 100);
}

// ========== UPDATE SCORE BARS ==========
function updateScoreBars(pillar) {
    const pillarCapitalized = pillar.charAt(0).toUpperCase() + pillar.slice(1);
    const resultScreen = document.getElementById(`screenResult${pillarCapitalized}`);
    
    if (!resultScreen) return;
    
    // Update each pillar score using unique IDs
    const pillars = ['sleep', 'digestion', 'stress'];
    
    pillars.forEach(p => {
        const score = scores[p];
        const percentage = (score / 12) * 100;
        
        const fillId = `${p}Score${pillarCapitalized}`;
        const valueId = `${p}Value${pillarCapitalized}`;
        
        const fill = document.getElementById(fillId);
        const value = document.getElementById(valueId);
        
        if (fill && value) {
            fill.style.width = '0%';
            fill.dataset.width = `${percentage}%`;
            
            // Set color class based on score
            fill.classList.remove('score-fill--high', 'score-fill--medium', 'score-fill--low');
            if (score >= 8) {
                fill.classList.add('score-fill--high');
            } else if (score >= 5) {
                fill.classList.add('score-fill--medium');
            } else {
                fill.classList.add('score-fill--low');
            }
            
            value.textContent = `${score}/12`;
        }
    });
}

// ========== ANIMATE SCORE BARS ==========
function animateScoreBars() {
    const fills = document.querySelectorAll('.screen.active .score-fill');
    fills.forEach(fill => {
        fill.style.width = fill.dataset.width;
    });
}

// ========== SEND TO WEBHOOK ==========
async function sendToWebhook(data) {
    // GHL Webhook URL (to be configured)
    const webhookUrl = window.VAYDA_WEBHOOK_URL || null;
    
    if (!webhookUrl) {
        console.log('Webhook not configured. Data:', data);
        // Store locally for now
        localStorage.setItem('vayda_quiz_result', JSON.stringify(data));
        return;
    }
    
    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error('Webhook failed');
        }
        
        console.log('Data sent to webhook successfully');
    } catch (error) {
        console.error('Webhook error:', error);
        // Store locally as backup
        localStorage.setItem('vayda_quiz_result', JSON.stringify(data));
    }
}

// ========== STRIPE INTEGRATION ==========
// Configure Stripe payment link
const stripePaymentLink = window.VAYDA_STRIPE_LINK || 'https://buy.stripe.com/test_XXXXXXXX';

document.addEventListener('DOMContentLoaded', () => {
    // Set Stripe links on all result pages
    const stripeButtons = document.querySelectorAll('[id^="stripeBtn"]');
    stripeButtons.forEach(btn => {
        btn.href = stripePaymentLink;
        btn.target = '_blank';
    });
});

// ========== CONFIGURATION ==========
// Set these values to configure the quiz
// window.VAYDA_WEBHOOK_URL = 'https://your-ghl-webhook-url.com';
// window.VAYDA_STRIPE_LINK = 'https://buy.stripe.com/your-product-link';

console.log('Vayda Wellness Quiz loaded successfully');
