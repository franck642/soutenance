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
        url: 'https://medileaf-zgwn.onrender.com/hospital/login', // Assurez-vous que l'URL correspond à celle de votre serveur
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function(response) {
            if (response.message == "login successfully") {
                // Stockez le token dans le localStorage ou faites autre chose avec lui
                localStorage.setItem('medileaf', response.token);
                // Redirigez l'utilisateur vers la page d'accueil ou une autre page
                window.location.href = 'index.html'; // Modifiez ceci selon votre besoin
            } 
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Erreur lors de la connexion :', textStatus, errorThrown);
            alert('mot de passe incorrect ou utilisateur n\'existe pas');
        }
    });
}); 