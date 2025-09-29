// Function to fetch data from the backend
async function fetchBackendData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data from backend:', error);
        return null;
    }
}

// Function to dynamically render content for the teachings page
async function renderTeachingsPage() {
    const data = await fetchBackendData();
    if (!data) return;

    const teachingsContainer = document.getElementById('teachings-content');
    if (!teachingsContainer) return;

    let htmlContent = '';
    data.teachings.forEach((teaching, index) => {
        const colorClass = `teaching-title-${index + 1}`;
        htmlContent += `
            <div class="teaching-card will-change-transform">
                <h3 class="teaching-title ${colorClass}">${teaching.title}</h3>
                <p class="teaching-verse">${teaching.verse}</p>
                <p class="teaching-application">${teaching.application}</p>
            </div>
        `;
    });
    teachingsContainer.innerHTML = htmlContent;
}

// Function to dynamically render content for the explore page
async function renderExplorePage() {
    const data = await fetchBackendData();
    if (!data) return;

    const exploreContainer = document.getElementById('explore-content');
    if (!exploreContainer) return;

    let htmlContent = '';
    data.explore.forEach(tradition => {
        let listItems = '';
        if (tradition.cultural_meaning) {
            listItems += `<li><span class="font-semibold text-orange-600">Cultural Meaning:</span> ${tradition.cultural_meaning}</li>`;
        }
        if (tradition.scientific_meaning) {
            listItems += `<li><span class="font-semibold text-blue-600">Scientific Meaning:</span> ${tradition.scientific_meaning}</li>`;
        }
        if (tradition.ecological_aspect) {
            listItems += `<li><span class="font-semibold text-green-600">Ecological Aspect:</span> ${tradition.ecological_aspect}</li>`;
        }
        if (tradition.spiritual_aspect) {
            listItems += `<li><span class="font-semibold text-pink-600">Spiritual Aspect:</span> ${tradition.spiritual_aspect}</li>`;
        }
        if (tradition.gita_reference) {
            listItems += `<li><span class="font-semibold text-purple-600">Gita Reference:</span> ${tradition.gita_reference}</li>`;
        }
        if (tradition.gita_connection) {
            listItems += `<li><span class="font-semibold text-red-600">Gita Connection:</span> ${tradition.gita_connection}</li>`;
        }

        htmlContent += `
            <div class="principle-card will-change-transform">
                <div class="principle-header mb-4">
                    <h3 class="text-2xl font-bold text-gray-800 font-playfair">${tradition.name}</h3>
                </div>
                <ul class="space-y-4 text-gray-600">
                    ${listItems}
                </ul>
            </div>
        `;
    });
    exploreContainer.innerHTML = htmlContent;
}

// Function to render the daily wisdom and its functionality
async function renderDailyWisdom() {
    const data = await fetchBackendData();
    if (!data || !data.daily_wisdom) return;

    const wisdomContainer = document.getElementById('daily-wisdom-container');
    if (!wisdomContainer) return;

    wisdomContainer.innerHTML = `
        <h4 class="text-xl font-bold mb-2">Daily Wisdom</h4>
        <p class="text-gray-600 mb-4">A "Shloka of the Day" with a simple meaning and modern-day application, helping you integrate ancient wisdom into your daily life.</p>
        <div id="wisdom-output" class="wisdom-card p-6 rounded-2xl bg-white/30 backdrop-blur-md border border-white/40 mb-4">
            <p class="font-playfair text-lg italic mb-2">"${data.daily_wisdom.shloka}"</p>
            <p class="text-sm text-gray-700">**Meaning:** ${data.daily_wisdom.meaning}</p>
            <p class="text-sm text-gray-700 mt-2">**Application:** ${data.daily_wisdom.modern_application}</p>
        </div>
        <button class="primary-btn" id="daily-wisdom-btn">Explore More</button>
    `;

    // Add functionality to the "Explore More" button
    document.getElementById('daily-wisdom-btn').addEventListener('click', () => {
        alert("This button would lead to a page with more daily wisdom insights or a full shloka database. This demonstrates functionality.");
    });
}

// Function to add quiz functionality
function addQuizFunctionality() {
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const quizOutput = document.getElementById('quiz-output');
    
    startQuizBtn.addEventListener('click', () => {
        quizOutput.classList.remove('hidden');
        quizOutput.innerHTML = `
            <p class="font-semibold">Question 1: The act of fasting is an exercise in self-control. Which principle from the Bhagavad Gita does this represent?</p>
            <div class="mt-2 space-y-2">
                <button class="quiz-option-btn w-full text-left px-4 py-2 border rounded-md hover:bg-gray-100 transition-colors">A) Karma-yoga</button>
                <button class="quiz-option-btn w-full text-left px-4 py-2 border rounded-md hover:bg-gray-100 transition-colors">B) Bhakti-yoga</button>
                <button class="quiz-option-btn w-full text-left px-4 py-2 border rounded-md hover:bg-gray-100 transition-colors">C) Tapas (Discipline of Body, Speech, and Mind)</button>
            </div>
        `;
        
        document.querySelectorAll('.quiz-option-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                quizOutput.innerHTML = `<p class="text-lg font-semibold text-green-600">Correct! That's right!</p><p class="mt-2">The Gita describes *Tapas* as the discipline of the body, speech, and mind, which is exactly what fasting practices.</p>`;
            });
        });
    });
}

// Function to add form functionality
function addFormFunctionality() {
    const askQuestionForm = document.getElementById('ask-question-form');
    const questionInput = document.getElementById('question-input');
    const formOutput = document.getElementById('form-output');
    
    askQuestionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const question = questionInput.value.trim();
        if (question) {
            formOutput.classList.remove('hidden');
            formOutput.innerHTML = `<p class="font-semibold text-gray-800">Your question has been submitted!</p><p class="mt-1">We will review it and add an answer to the forum shortly. Thank you for your contribution to the community.</p>`;
            questionInput.value = ''; // Clear the input
        }
    });
}

// Main function to manage rendering based on the active section
function updateContentForActiveSection() {
    const activeSection = document.querySelector('.section-content.active');
    if (!activeSection) return;

    const sectionId = activeSection.id;
    if (sectionId === 'teachings') {
        renderTeachingsPage();
    } else if (sectionId === 'explore') {
        renderExplorePage();
        renderDailyWisdom();
        addQuizFunctionality();
    } else if (sectionId === 'community') {
        addFormFunctionality();
    }
}

// Navigation and Section Management
document.addEventListener('DOMContentLoaded', function() {
    // Initial content rendering
    updateContentForActiveSection();
    initializeNavigation();
    initializeSmoothScroll();
    initializePrincipleInteractions();
    initializeAnimations();
});

// Navigation Management
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section-content');
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            switchSection(targetSection);
            updateActiveNav(this);
            // Call content update after section switch
            setTimeout(updateContentForActiveSection, 200);
        });
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
}

// Section Switching
function switchSection(targetSection) {
    const sections = document.querySelectorAll('.section-content');
    
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section with a slight delay
    setTimeout(() => {
        const targetElement = document.getElementById(targetSection);
        if (targetElement) {
            targetElement.classList.add('active');
        }
    }, 150);
}

// Update Active Navigation
function updateActiveNav(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Smooth Scrolling Functions
function initializeSmoothScroll() {
    const scrollButtons = document.querySelectorAll('[onclick*="scrollToSection"]');
    scrollButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionName = this.getAttribute('onclick').match(/scrollToSection\('(.+)'\)/)[1];
            scrollToSection(sectionName);
        });
    });
}

function scrollToSection(sectionName) {
    switchSection(sectionName);
    
    const targetNavLink = document.querySelector(`[data-section="${sectionName}"]`);
    if (targetNavLink) {
        updateActiveNav(targetNavLink);
    }
    
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Principle Card Interactions (can be updated to pull dynamic content)
function initializePrincipleInteractions() {
    const principleCards = document.querySelectorAll('.principle-card');
    
    principleCards.forEach(card => {
        card.addEventListener('click', function() {
            const principle = this.getAttribute('data-principle');
            showPrincipleDetails(principle);
        });
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function showPrincipleDetails(principle) {
    console.log(`Showing details for: ${principle}`);
}

// Animation Initialization
function initializeAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    const animatedElements = document.querySelectorAll('.will-change-transform');
    animatedElements.forEach(el => observer.observe(el));
}

function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active-animate');
            observer.unobserve(entry.target);
        }
    });
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    console.log('Mobile menu toggled');
}