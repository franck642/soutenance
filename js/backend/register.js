
console.log("bienvenue");
/*--
        INSCRIPTION
    -----------------------------------*/


function enregistrerDonnees(event) {
  // Empêcher la soumission automatique du formulaire
  event.preventDefault();

  // Sélectionner le formulaire par son ID
  var form = document.getElementById("registerForm");

  // Créer un objet pour stocker les données
  var data = {
      name: form.elements["name"].value,
      address: form.elements["address"].value,
      phone: form.elements["phone"].value,
      email: form.elements["email"].value,
      firstContactName: form.elements["first_contact_name"].value,
      specialisation: form.elements["specialisation"].value,
      autorisation: form.elements["autorisation"].value,
      phoneFirstContactName: form.elements["phone_first_contact_name"].value,
      identificationNumber: form.elements["identification_number"].value,
      password: form.elements["password"].value
  };

  // Afficher les données dans la console
  console.log("Données du formulaire:", data);
  // Effectuez une requête POST vers votre API
      $.ajax({
          type: 'POST',
          url: 'http://192.168.0.162/hospital/create',
          data: JSON.stringify(data),
          contentType: 'application/json',
          success: function(response) {
            console.log('Inscription réussie :', response);
            // Affiche un message de succès avec SweetAlert
            Swal.fire({
                icon: 'success',
                title: 'Inscription réussie',
                text: 'Votre inscription est maintenant terminée. Après 24 heures de vérification des dossiers, vous serez prêt(e) à explorer toutes les fonctionnalités passionnantes que notre site a à offrir.',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                confirmButtonClass: 'btn btn-success'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Redirige l'utilisateur vers la page de connexion en cas de succès
                    window.location.href = 'login.html';
                }
            });
          },
          error: function(error) {
              // Gérez les erreurs de l'API (par exemple, affichez un message d'erreur)
              console.error('Erreur lors de l\'inscription :', error);
              Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Erreur lors de l\'inscription. Veuillez réessayer.',
            });
          }
      });
}

// Attacher la fonction à l'événement 'submit' du formulaire
document.getElementById("registerForm").addEventListener("submit", enregistrerDonnees);
