// Big Five Personality Traits Questions
const questions = [
    // Openness (O) - 6 questions
    { text: "I enjoy trying new and unfamiliar things", trait: "openness", reverse: false },
    { text: "I prefer routine and familiar experiences", trait: "openness", reverse: true },
    { text: "I am curious about many different things", trait: "openness", reverse: false },
    { text: "I have a vivid imagination", trait: "openness", reverse: false },
    { text: "I enjoy abstract or philosophical discussions", trait: "openness", reverse: false },
    { text: "I prefer practical over theoretical ideas", trait: "openness", reverse: true },
    
    // Conscientiousness (C) - 6 questions
    { text: "I am always prepared and organized", trait: "conscientiousness", reverse: false },
    { text: "I often leave things until the last minute", trait: "conscientiousness", reverse: true },
    { text: "I pay attention to details", trait: "conscientiousness", reverse: false },
    { text: "I make plans and stick to them", trait: "conscientiousness", reverse: false },
    { text: "I often forget to put things back in their proper place", trait: "conscientiousness", reverse: true },
    { text: "I get tasks done right away", trait: "conscientiousness", reverse: false },
    
    // Extraversion (E) - 6 questions
    { text: "I feel comfortable around people", trait: "extraversion", reverse: false },
    { text: "I prefer to keep to myself", trait: "extraversion", reverse: true },
    { text: "I am the life of the party", trait: "extraversion", reverse: false },
    { text: "I start conversations with strangers easily", trait: "extraversion", reverse: false },
    { text: "I find it difficult to approach others", trait: "extraversion", reverse: true },
    { text: "I feel energized when I'm around other people", trait: "extraversion", reverse: false },
    
    // Agreeableness (A) - 6 questions
    { text: "I am interested in other people's problems", trait: "agreeableness", reverse: false },
    { text: "I tend to be critical of others", trait: "agreeableness", reverse: true },
    { text: "I make people feel at ease", trait: "agreeableness", reverse: false },
    { text: "I trust others easily", trait: "agreeableness", reverse: false },
    { text: "I believe people have good intentions", trait: "agreeableness", reverse: false },
    { text: "I can be cold and indifferent to others", trait: "agreeableness", reverse: true },
    
    // Neuroticism (N) - 6 questions
    { text: "I often feel stressed or worried", trait: "neuroticism", reverse: false },
    { text: "I remain calm in stressful situations", trait: "neuroticism", reverse: true },
    { text: "I get upset easily", trait: "neuroticism", reverse: false },
    { text: "I worry about things that might go wrong", trait: "neuroticism", reverse: false },
    { text: "My mood changes frequently", trait: "neuroticism", reverse: false },
    { text: "I rarely feel anxious or fearful", trait: "neuroticism", reverse: true }
];

let currentQuestion = 0;
let answers = [];

function startAssessment() {
    currentQuestion = 0;
    answers = [];
    showScreen('questions-screen');
    displayQuestion();
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function displayQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('question-number').textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    document.getElementById('question-text').textContent = question.text;
    
    const progress = ((currentQuestion) / questions.length) * 100;
    document.getElementById('progress').style.width = progress + '%';
}

function selectAnswer(score) {
    const question = questions[currentQuestion];
    const finalScore = question.reverse ? (6 - score) : score;
    
    answers.push({
        trait: question.trait,
        score: finalScore
    });
    
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        calculateResults();
    }
}

function calculateResults() {
    const traits = {
        openness: { scores: [], name: "Openness to Experience" },
        conscientiousness: { scores: [], name: "Conscientiousness" },
        extraversion: { scores: [], name: "Extraversion" },
        agreeableness: { scores: [], name: "Agreeableness" },
        neuroticism: { scores: [], name: "Emotional Stability" }
    };
    
    answers.forEach(answer => {
        traits[answer.trait].scores.push(answer.score);
    });
    
    const results = {};
    for (let trait in traits) {
        const scores = traits[trait].scores;
        const average = scores.reduce((a, b) => a + b, 0) / scores.length;
        const percentage = ((average - 1) / 4) * 100;
        
        results[trait] = {
            name: traits[trait].name,
            score: Math.round(percentage),
            level: percentage >= 66 ? 'high' : percentage >= 34 ? 'medium' : 'low'
        };
    }
    
    displayResults(results);
}

function displayResults(results) {
    const container = document.getElementById('results-container');
    container.innerHTML = '';
    
    const traitInfo = {
        openness: {
            high: {
                desc: "You are imaginative, curious, and open to new experiences. You enjoy exploring ideas and appreciate art and beauty.",
                improvements: [
                    "Balance creativity with practical execution",
                    "Set concrete goals to channel your ideas",
                    "Practice completing projects before starting new ones",
                    "Create a system to evaluate which ideas to pursue",
                    "Schedule time for both exploration and implementation",
                    "Partner with detail-oriented people to ground your vision"
                ]
            },
            medium: {
                desc: "You balance traditional and novel approaches. You're open to new ideas but also value proven methods.",
                improvements: [
                    "Challenge yourself to try one new experience weekly",
                    "Explore creative hobbies or artistic pursuits",
                    "Read diverse perspectives on familiar topics",
                    "Attend workshops or classes outside your comfort zone",
                    "Keep a journal to explore your thoughts and ideas",
                    "Visit museums, galleries, or cultural events regularly"
                ]
            },
            low: {
                desc: "You prefer familiar routines and practical approaches. You value tradition and concrete facts.",
                improvements: [
                    "Gradually introduce small changes to your routine",
                    "Try one new activity or hobby each month",
                    "Practice brainstorming without judging ideas initially",
                    "Read fiction or watch films from different cultures",
                    "Ask 'what if' questions to stretch your thinking",
                    "Travel to new places, even locally",
                    "Learn about topics outside your usual interests"
                ]
            }
        },
        conscientiousness: {
            high: {
                desc: "You are organized, reliable, and goal-oriented. You plan ahead and follow through on commitments.",
                improvements: [
                    "Allow flexibility for spontaneity and relaxation",
                    "Practice self-compassion when things don't go as planned",
                    "Delegate tasks to avoid burnout",
                    "Schedule 'unstructured time' for creativity",
                    "Recognize when perfectionism becomes counterproductive",
                    "Learn to prioritize 'good enough' over perfect",
                    "Take breaks without feeling guilty"
                ]
            },
            medium: {
                desc: "You balance structure with flexibility. You can be organized when needed but also adapt to circumstances.",
                improvements: [
                    "Develop consistent daily routines for important tasks",
                    "Use planning tools to track goals and deadlines",
                    "Break large projects into smaller, manageable steps",
                    "Implement the two-minute rule for quick tasks",
                    "Review and adjust your systems regularly",
                    "Set specific times for planning and organizing"
                ]
            },
            low: {
                desc: "You are spontaneous and flexible. You prefer to go with the flow rather than strict planning.",
                improvements: [
                    "Start with small organizational habits (e.g., daily to-do list)",
                    "Set reminders for important deadlines",
                    "Create simple systems to track responsibilities",
                    "Use apps or tools to automate organization",
                    "Prepare the night before for the next day",
                    "Find an accountability partner for important goals",
                    "Start with organizing just one area of your life",
                    "Reward yourself for completing planned tasks"
                ]
            }
        },
        extraversion: {
            high: {
                desc: "You are outgoing, energetic, and enjoy social interactions. You thrive in group settings and seek excitement.",
                improvements: [
                    "Schedule regular alone time for reflection",
                    "Practice active listening in conversations",
                    "Develop skills that require focused solo work",
                    "Learn to be comfortable with silence",
                    "Practice mindfulness or meditation",
                    "Balance talking with listening in conversations",
                    "Develop deeper one-on-one relationships"
                ]
            },
            medium: {
                desc: "You balance social interaction with alone time. You're comfortable in groups but also value solitude.",
                improvements: [
                    "Expand your social network gradually",
                    "Practice public speaking or group facilitation",
                    "Honor both your social and solitary needs",
                    "Experiment with different social settings",
                    "Develop networking skills for professional growth",
                    "Learn when to energize and when to recharge"
                ]
            },
            low: {
                desc: "You are reserved and prefer smaller groups or one-on-one interactions. You recharge through solitude.",
                improvements: [
                    "Practice small talk in low-pressure situations",
                    "Join groups aligned with your interests",
                    "Set manageable social goals (e.g., one event per week)",
                    "Prepare conversation topics before social events",
                    "Use online communities to ease into socializing",
                    "Focus on quality over quantity in relationships",
                    "Recognize your social strengths (depth, listening)",
                    "Take breaks during social events when needed"
                ]
            }
        },
        agreeableness: {
            high: {
                desc: "You are compassionate, cooperative, and value harmony. You're considerate of others' feelings and needs.",
                improvements: [
                    "Practice assertiveness and setting boundaries",
                    "Learn to say no without guilt",
                    "Balance others' needs with your own priorities",
                    "Recognize when people take advantage of your kindness",
                    "Express your needs and opinions more directly",
                    "Practice healthy conflict when necessary",
                    "Develop self-care routines to avoid burnout"
                ]
            },
            medium: {
                desc: "You balance cooperation with self-advocacy. You're considerate but also stand up for yourself when needed.",
                improvements: [
                    "Develop conflict resolution skills",
                    "Practice empathy while maintaining boundaries",
                    "Seek win-win solutions in disagreements",
                    "Continue refining your communication style",
                    "Learn negotiation techniques",
                    "Build trust through consistent behavior"
                ]
            },
            low: {
                desc: "You are direct and competitive. You prioritize truth and efficiency over social harmony.",
                improvements: [
                    "Practice perspective-taking exercises",
                    "Consider emotional impact before giving feedback",
                    "Develop collaborative rather than competitive approaches",
                    "Use 'I' statements to soften communication",
                    "Ask questions to understand others' viewpoints",
                    "Practice gratitude and appreciation for others",
                    "Delay responses when feeling critical",
                    "Focus on building trust before giving feedback"
                ]
            }
        },
        neuroticism: {
            high: {
                desc: "You experience emotions intensely and may be sensitive to stress. You're aware of potential problems.",
                improvements: [
                    "Practice mindfulness and stress-reduction techniques",
                    "Develop cognitive reframing skills",
                    "Build a support network and consider therapy",
                    "Establish regular exercise and sleep routines",
                    "Learn breathing exercises for anxiety management",
                    "Challenge negative thought patterns with evidence",
                    "Keep a mood journal to identify triggers",
                    "Limit caffeine and practice good sleep hygiene",
                    "Try progressive muscle relaxation",
                    "Set realistic expectations for yourself"
                ]
            },
            medium: {
                desc: "You experience normal emotional ups and downs. You handle most stress reasonably well.",
                improvements: [
                    "Continue building emotional resilience",
                    "Develop healthy coping strategies for stress",
                    "Practice self-awareness of emotional triggers",
                    "Maintain work-life balance",
                    "Build a toolkit of stress management techniques",
                    "Stay connected with supportive relationships"
                ]
            },
            low: {
                desc: "You are emotionally stable and resilient. You remain calm under pressure and recover quickly from setbacks.",
                improvements: [
                    "Stay attuned to your emotions to avoid suppression",
                    "Practice empathy for others experiencing stress",
                    "Share your coping strategies with others",
                    "Recognize when others need emotional support",
                    "Don't dismiss your own emotional needs",
                    "Use your stability to help others in crisis"
                ]
            }
        }
    };
    
    for (let trait in results) {
        const result = results[trait];
        const info = traitInfo[trait][result.level];
        
        const card = document.createElement('div');
        card.className = 'trait-card';
        card.innerHTML = `
            <div class="trait-header">
                <div class="trait-name">${result.name}</div>
                <div class="trait-score">${result.score}%</div>
            </div>
            <span class="trait-level ${result.level}">${result.level.toUpperCase()}</span>
            <p class="trait-description">${info.desc}</p>
            <div class="improvements">
                <h4>Areas for Growth:</h4>
                <ul>
                    ${info.improvements.map(imp => `<li>${imp}</li>`).join('')}
                </ul>
            </div>
        `;
        container.appendChild(card);
    }
    
    document.getElementById('progress').style.width = '100%';
    showScreen('results-screen');
}

function restartAssessment() {
    showScreen('welcome-screen');
}
