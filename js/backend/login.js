document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments du DOM
    const loginForm = document.getElementById('MyloginForm');
    const loginRegisterButtons = document.getElementById('loginRegisterButtons');
    const logoutButtonContainer = document.getElementById('logoutButtonContainer');
    const logoutButton = document.getElementById('logoutButton');

    // Fonction pour mettre à jour l'affichage des boutons d'authentification
    function updateAuthButtons() {
        const token = localStorage.getItem('medileaf');
        if (token) {
            if (loginRegisterButtons) loginRegisterButtons.style.display = 'none';
            if (logoutButtonContainer) logoutButtonContainer.style.display = 'block';
        } else {
            if (loginRegisterButtons) loginRegisterButtons.style.display = 'block';
            if (logoutButtonContainer) logoutButtonContainer.style.display = 'none';
        }
    }

    // Appel initial pour mettre à jour l'affichage des boutons
    updateAuthButtons();

    // Gestion de la connexion
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            const data = { email, password };

            $.ajax({
                type: 'POST',
                url: 'https://medileaf-zgwn.onrender.com/hospital/login',
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function(response) {
                    if (response.message == "login successfully") {
                        localStorage.setItem('medileaf', response.token);
                        // Mise à jour immédiate des boutons après la connexion réussie
                        updateAuthButtons();
                        // Redirection après un court délai pour permettre la mise à jour de l'affichage
                        setTimeout(() => {
                            window.location.href = 'index.html';
                        }, 100);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.error('Erreur lors de la connexion :', textStatus, errorThrown);
                    alert('Mot de passe incorrect ou utilisateur n\'existe pas');
                }
            });
        });
    }

    // Gestion de la déconnexion
    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.removeItem('medileaf');
            updateAuthButtons();
            window.location.href = 'index.html';
        });
    }
});