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
});