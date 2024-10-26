// Object to hold translations for different languages  
const translations = {  
    en: {  
        welcome: "Welcome to Geometry Dash",  
        description: "Jump over obstacles and score high!",  
        footer: "&copy; 2023 Geometry Dash Game. All rights reserved.",  
    },  
    es: {  
        welcome: "Bienvenido a Geometry Dash",  
        description: "Salta sobre obstáculos y consigue muchos puntos!",  
        footer: "&copy; 2023 Juego de Geometry Dash. Todos los derechos reservados.",  
    },  
    fr: {  
        welcome: "Bienvenue à Geometry Dash",  
        description: "Sautez par-dessus les obstacles et marquez des points!",  
        footer: "&copy; 2023 Jeu de Geometry Dash. Tous droits réservés.",  
    }  
};  

// Function to update text based on selected language  
function updateLanguage(lang) {  
    document.getElementById('welcomeText').innerHTML = translations[lang].welcome;  
    document.getElementById('descriptionText').innerHTML = translations[lang].description;  
    document.getElementById('footerText').innerHTML = translations[lang].footer;  
}  

// Function to update the URL with the selected language  
function updateURLWithLanguage() {  
    const lang = document.getElementById('languageSelect').value;  
    localStorage.setItem('selectedLanguage', lang); // Store selected language  
    updateLanguage(lang);  

    // Update the URL without reloading the page  
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '#lang=' + lang;  
    window.history.pushState({ path: newUrl }, '', newUrl);  
}  

// Load the stored language on page load  
window.onload = function() {  
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Default to English  
    document.getElementById('languageSelect').value = savedLanguage; // Set the dropdown to the saved language  
    updateLanguage(savedLanguage); // Update text based on saved language  

    // Check for URL hash and update language if it exists  
    const urlParams = new URLSearchParams(window.location.hash.substring(1));  
    if (urlParams.has('lang')) {  
        const lang = urlParams.get('lang');  
        if (translations[lang]) {  
            updateLanguage(lang);  
            document.getElementById('languageSelect').value = lang; // Update dropdown  
        }  
    }  
};