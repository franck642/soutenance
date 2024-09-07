// Fonction pour définir un cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/; Secure; SameSite=Strict";
}

// Fonction pour récupérer un cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

// Fonction pour supprimer un cookie
function deleteCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Secure; SameSite=Strict';
}

// Fonction pour mettre à jour l'affichage des boutons d'authentification et des informations utilisateur
function updateAuthDisplay() {
    const token = localStorage.getItem('medileaf_token');
    const loginRegisterButtons = document.getElementById('loginRegisterButtons');
    const logoutButtonContainer = document.getElementById('logoutButtonContainer');
    const userNameElement = document.getElementById('userName');
    const userEmailElement = document.getElementById('userEmail');
    
    if (loginRegisterButtons) loginRegisterButtons.style.display = token ? 'none' : 'block';
    if (logoutButtonContainer) logoutButtonContainer.style.display = token ? 'block' : 'none';
    
    if (token) {
        const name = localStorage.getItem('medileaf_username');
        const email = localStorage.getItem('medileaf_email');
        if (userNameElement) userNameElement.textContent = name || '';
        if (userEmailElement) userEmailElement.textContent = email || '';
    } else {
        if (userNameElement) userNameElement.textContent = '';
        if (userEmailElement) userEmailElement.textContent = '';
    }
}

// Fonction pour gérer la connexion
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    fetch('https://medileaf-zgwn.onrender.com/hospital/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "login successfully") {
            localStorage.setItem('medileaf_token', data.token);
            localStorage.setItem('medileaf_username', data.userconnected.name);
            localStorage.setItem('medileaf_email', data.userconnected.email);
            setCookie('medileaf_auth', 'true', 7);
            updateAuthDisplay();
            setTimeout(() => window.location.href = 'index.html', 100);
        } else {
            throw new Error('Connexion échouée');
        }
    })
    .catch(error => {
        console.error('Erreur lors de la connexion :', error);
        alert('Mot de passe incorrect ou utilisateur n\'existe pas');
    });
}

// Fonction pour gérer la déconnexion
function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem('medileaf_token');
    localStorage.removeItem('medileaf_username');
    localStorage.removeItem('medileaf_email');
    deleteCookie('medileaf_auth');
    updateAuthDisplay();
    window.location.href = 'index.html';
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    updateAuthDisplay();

    const loginForm = document.getElementById('MyloginForm');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);

    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) logoutButton.addEventListener('click', handleLogout);
});