/*--
        INSCRIPTION
    -----------------------------------*/
// Sélectionner le formulaire
const form = document.getElementById('registrationForm');

// Ajouter un écouteur d'événement sur la soumission du formulaire
form.addEventListener('submit', function(event) {
  // Empêcher le rechargement de la page par défaut
  event.preventDefault();

  // Récupérer les valeurs des champs du formulaire
  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const first_contact_name = document.getElementById('first_contact_name').value;
  const phone_first_contact = document.getElementById('phone_first_contact').value;
  const identification_number = document.getElementById('identification_number').value;
  const password = document.getElementById('password').value;

  // Créer un objet contenant les données du formulaire
  const data = {
    name,
    address,
    phone,
    email,
    first_contact_name,
    phone_first_contact,
    identification_number,
    password
  };

  // Envoyer les données au serveur avec fetch()
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3004/hospital/create',
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: function(response) {
      console.log('Inscription réussie :', response);
      // Affiche un message de succès avec SweetAlert 
          if (response == "Account create successfully") {
              // Redirige l'utilisateur vers la page de connexion en cas de succès
              window.location.href = 'login.html';
          }
    },
    error: function(error) {
        // Gérez les erreurs de l'API (par exemple, affichez un message d'erreur)
        console.error('Erreur lors de l\'inscription :', error);
    }
});
});