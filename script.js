// Quotes database
const quotes = [
    {
        text: "Love is composed of a single soul inhabiting two bodies.",
        author: "Aristotle"
    },
    {
        text: "The best thing to hold onto in life is each other.",
        author: "Audrey Hepburn"
    },
    {
        text: "We are most alive when we're in love.",
        author: "John Updike"
    },
    {
        text: "True love stories never have endings.",
        author: "Richard Bach"
    },
    {
        text: "Love doesn't make the world go round. Love is what makes the ride worthwhile.",
        author: "Franklin P. Jones"
    },
    {
        text: "If I know what love is, it is because of you.",
        author: "Hermann Hesse"
    },
    {
        text: "Love is when the other person's happiness is more important than your own.",
        author: "H. Jackson Brown, Jr."
    },
    {
        text: "The giving of love is an education in itself.",
        author: "Eleanor Roosevelt"
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

// Calculate love percentage
calculateBtn.addEventListener('click', function() {
    const name1 = document.getElementById('name1').value.trim();
    const name2 = document.getElementById('name2').value.trim();
    
    if (!name1 || !name2) {
        alert('Please enter both names!');
        return;
    }
    
    // Calculate "love percentage" (fun algorithm)
    const combinedNames = (name1 + name2).toLowerCase().replace(/\s/g, '');
    let percentage = 0;
    
    for (let char of combinedNames) {
        percentage = (percentage + char.charCodeAt(0)) % 100;
    }
    
    // Make sure percentage is at least 10 and not too low for fun
    percentage = Math.max(10, Math.min(100, percentage + Math.floor(Math.random() * 30)));
    
    // Display results
    namesDisplay.innerHTML = `<h3>${name1} <i class="fas fa-heart" style="color:#ff006e;"></i> ${name2}</h3>`;
    animatePercentage(percentage);
    
    // Show message based on percentage
    let messageKey = Math.floor(percentage / 10) * 10;
    if (messageKey === 100) messageKey = 100;
    messageDisplay.textContent = messages[messageKey];
    
    // Show result section with animation
    resultSection.style.display = 'block';
    
    // Create hearts
    createHearts();
    
    // Change quote every time
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
        
        // Random position and animation
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${10 + Math.random() * 20}s`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heart.style.fontSize = `${10 + Math.random() * 20}px`;
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        
        heartsContainer.appendChild(heart);
    }
}

// Dark Mode toggle
const darkToggle = document.getElementById('darkModeToggle');

darkToggle.addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
});

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
    darkToggle.checked = true;
}