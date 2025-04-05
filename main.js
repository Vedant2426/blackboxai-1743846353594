// Enhanced language switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const languageSelector = document.getElementById('language-selector');
    
    // Load saved language preference or default to English
    const currentLang = localStorage.getItem('language') || 'en';
    languageSelector.value = currentLang;
    updateAllText(currentLang);

    // Add event listener for language changes
    languageSelector.addEventListener('change', function() {
        const selectedLang = this.value;
        localStorage.setItem('language', selectedLang);
        updateAllText(selectedLang);
    });

    // Function to update all text elements on the page
    function updateAllText(lang) {
        fetch(`lang/${lang}.json`)
            .then(response => response.json())
            .then(translations => {
                // Update all elements with data-lang attribute
                document.querySelectorAll('[data-lang]').forEach(element => {
                    const key = element.getAttribute('data-lang');
                    if (translations[key]) {
                        // Handle different element types
                        if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                            element.setAttribute('placeholder', translations[key]);
                        } else if (element.tagName === 'OPTION' && element.hasAttribute('selected')) {
                            element.textContent = translations[key];
                        } else {
                            element.textContent = translations[key];
                        }
                    }
                });

                // Update select options
                document.querySelectorAll('select').forEach(select => {
                    if (select.id !== 'language-selector') {
                        Array.from(select.options).forEach(option => {
                            if (option.value && translations[option.value]) {
                                option.textContent = translations[option.value];
                            }
                        });
                    }
                });

                // Update button values
                document.querySelectorAll('button[data-lang]').forEach(button => {
                    const key = button.getAttribute('data-lang');
                    if (translations[key]) {
                        button.textContent = translations[key];
                    }
                });
            })
            .catch(error => console.error('Error loading language file:', error));
    }

    // Initialize the page with the current language
    updateAllText(currentLang);
});

// Dummy data for crop recommendations (will be replaced with API calls later)
const cropData = {
    "Maharashtra": {
        "Black Soil": {
            "Summer": ["Cotton", "Soybean", "Groundnut"],
            "Winter": ["Wheat", "Chickpea", "Safflower"],
            "Monsoon": ["Rice", "Sorghum", "Pearl Millet"]
        },
        "Red Soil": {
            "Summer": ["Sunflower", "Pigeon Pea", "Green Gram"],
            "Winter": ["Wheat", "Barley", "Mustard"],
            "Monsoon": ["Maize", "Finger Millet", "Black Gram"]
        }
    },
    "Punjab": {
        "Alluvial Soil": {
            "Summer": ["Rice", "Maize", "Sugarcane"],
            "Winter": ["Wheat", "Mustard", "Potato"],
            "Monsoon": ["Rice", "Sorghum", "Pearl Millet"]
        }
    }
};

// Dummy data for pest information
const pestData = {
    "Cotton": [
        {
            name: "Bollworm",
            description: "Affects cotton bolls, causing yield loss",
            control: ["Use neem-based pesticides", "Practice crop rotation", "Release Trichogramma wasps"]
        },
        {
            name: "Aphids",
            description: "Sucks sap from leaves, causing curling",
            control: ["Spray soap solution", "Use ladybugs as natural predators"]
        }
    ],
    "Wheat": [
        {
            name: "Rust",
            description: "Fungal disease causing orange pustules",
            control: ["Use resistant varieties", "Apply fungicides early"]
        }
    ]
};

// Dummy weather data for irrigation planning
const weatherData = {
    "Maharashtra": {
        "current": {
            "temperature": 32,
            "humidity": 65,
            "rainfall": 0
        },
        "forecast": [
            {"day": 1, "temperature": 34, "rainfall": 0},
            {"day": 2, "temperature": 33, "rainfall": 5},
            {"day": 3, "temperature": 31, "rainfall": 10}
        ]
    }
};

// Dummy market price data
const marketData = {
    "Maharashtra": {
        "Wheat": {"current": 2100, "trend": "up", "prediction": 2250},
        "Cotton": {"current": 5800, "trend": "stable", "prediction": 5900}
    },
    "Punjab": {
        "Rice": {"current": 1850, "trend": "down", "prediction": 1800}
    }
};