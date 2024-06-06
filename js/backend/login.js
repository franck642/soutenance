/*--
        CONNEXION
    -----------------------------------*/  
    // Sélectionner le formulaire
    const loginForm = document.getElementById('MyloginForm');
    
    // Ajouter un écouteur d'événement sur la soumission du formulaire
    loginForm.addEventListener('submit', function(event) {
      // Empêcher le rechargement de la page par défaut
      event.preventDefault();
    
      // Récupérer les valeurs des champs du formulaire
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
    
      // Créer un objet contenant les données du formulaire
      const data = {
        email,
        password
      };

      $.ajax({
        type: 'POST',
        url: 'http://localhost:3004/hospital/login',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function(response) {
          // Affiche un message de succès avec SweetAlert 
              if (response.message == "login successfully") {
                  // Redirige l'utilisateur vers la page de connexion en cas de succès
                  localStorage.setItem("midleaf", response.token);
                  window.location.href = 'index.html';
              }
        },
        error: function(error) {
            // Gérez les erreurs de l'API (par exemple, affichez un message d'erreur)
            console.error('Erreur lors de l\'inscription :', error);
        }
    });
}); 