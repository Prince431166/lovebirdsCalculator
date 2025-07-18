const quotes = [
    {
        text_en: "Love is composed of a single soul inhabiting two bodies.",
        text_hi: "प्यार एक आत्मा है जो दो जिस्मों में बसती है।",
        author: "Aristotle / अरस्तू"
    },
    {
        text_en: "The best thing to hold onto in life is each other.",
        text_hi: "ज़िंदगी में सबसे अच्छी चीज़ एक-दूसरे का साथ होता है।",
        author: "Audrey Hepburn / ऑड्री हेपबर्न"
    },
    {
        text_en: "We are most alive when we're in love.",
        text_hi: "हम तब सबसे ज़्यादा जिंदा महसूस करते हैं जब हम प्यार में होते हैं।",
        author: "John Updike / जॉन अपडाइक"
    },
    {
        text_en: "True love stories never have endings.",
        text_hi: "सच्ची प्रेम कहानियों का कभी अंत नहीं होता।",
        author: "Richard Bach / रिचर्ड बाख"
    },
    {
        text_en: "Love doesn't make the world go round. Love is what makes the ride worthwhile.",
        text_hi: "प्यार दुनिया को नहीं घुमाता, लेकिन प्यार ही सफ़र को खास बनाता है।",
        author: "Franklin P. Jones / फ्रैंकलिन पी. जोन्स"
    },
    {
        text_en: "If I know what love is, it is because of you.",
        text_hi: "अगर मुझे प्यार का मतलब पता है, तो वो तुम्हारी वजह से है।",
        author: "Hermann Hesse / हर्मन हेस्से"
    },
    {
        text_en: "Love is when the other person's happiness is more important than your own.",
        text_hi: "प्यार तब होता है जब सामने वाले की खुशी आपकी खुशी से ज़्यादा मायने रखती है।",
        author: "H. Jackson Brown Jr. / एच. जैक्सन ब्राउन जूनियर"
    },
    {
        text_en: "The giving of love is an education in itself.",
        text_hi: "प्यार देना अपने आप में एक शिक्षा है।",
        author: "Eleanor Roosevelt / एलेनॉर रूज़वेल्ट"
    }
];

// Messages based on percentage
const messages = {
    0: "There might be some challenges ahead...",
    10: "A spark is there, but it needs nurturing.",
    20: "Friendship potential is strong!",
    30: "You enjoy each other's company.",
    40: "There's definite chemistry here!",
    50: "A balanced connection - work on it together.",
    60: "Strong feelings are developing!",
    70: "This is a deep and meaningful connection.",
    80: "Wow! You two are truly compatible!",
    90: "An almost perfect match - cherish it!",
    100: "Soulmates! This is true love!"
};

// DOM elements
const calculateBtn = document.getElementById('calculateBtn');
const resultSection = document.getElementById('resultSection');
const namesDisplay = document.getElementById('namesDisplay');
const percentageDisplay = document.getElementById('percentageDisplay');
const messageDisplay = document.getElementById('messageDisplay');
const heartsContainer = document.getElementById('heartsContainer');
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');

// Initialize with a random quote
showRandomQuote();

// Function to show a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteText.textContent = `"${quotes[randomIndex].text}"`;
    quoteAuthor.textContent = `- ${quotes[randomIndex].author}`;
}

// 🛠 New: Consistent Love Percentage Function
function getLovePercentage(name1, name2) {
    const combined = (name1 + name2).toLowerCase().replace(/\s/g, '');
    let sum = 0;
    for (let char of combined) {
        sum += char.charCodeAt(0);
    }
    return (sum % 91) + 10; // Always between 10 and 100
}

// Calculate love percentage on click
calculateBtn.addEventListener('click', function () {
    const name1 = document.getElementById('name1').value.trim();
    const name2 = document.getElementById('name2').value.trim();

    if (!name1 || !name2) {
        alert('Please enter both names!');
        return;
    }

    const percentage = getLovePercentage(name1, name2);

    namesDisplay.innerHTML = `<h3>${name1} <i class="fas fa-heart" style="color:#ff006e;"></i> ${name2}</h3>`;
    animatePercentage(percentage);

    let messageKey = Math.floor(percentage / 10) * 10;
    messageDisplay.textContent = messages[messageKey];

    resultSection.style.display = 'block';
    createHearts();
    showRandomQuote();
});

// Animate percentage counter
function animatePercentage(finalPercentage) {
    let current = 0;
    const increment = finalPercentage > 50 ? 2 : 1;

    const timer = setInterval(() => {
        current += increment;
        if (current >= finalPercentage) {
            current = finalPercentage;
            clearInterval(timer);
        }
        percentageDisplay.textContent = `${current}%`;
    }, 30);
}

// Create floating hearts
function createHearts() {
    heartsContainer.innerHTML = '';
    const heartCount = 50;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${10 + Math.random() * 20}s`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heart.style.fontSize = `${10 + Math.random() * 20}px`;
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heartsContainer.appendChild(heart);
    }
}

// 🌙 Dark Mode toggle
const darkModeIcon = document.getElementById('darkModeIcon');
darkModeIcon?.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
}
