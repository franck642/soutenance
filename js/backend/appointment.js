console.log("rendez-vous");

/*--
        RENDEZ-VOUS
-----------------------------------*/

document.addEventListener('DOMContentLoaded', function(e) {
    e.preventDefault();
    // Sélection du formulaire
    var form = document.querySelector('form');

    // Ajout d'un écouteur d'événement pour le soumission du formulaire
    form.addEventListener('submit', function(event) {
        // Empêcher le comportement par défaut du formulaire qui est de recharger la page
        event.preventDefault();

        // Récupération des valeurs des champs
        var formData = {
            usernameDoctor: document.getElementById('usernameDoctor').value,
            Department: document.getElementById('Department').value,
            phoneDoctor: document.getElementById('phoneDoctor').value,
            username: document.getElementById('username').value,
            phoneInput: document.getElementById('phoneInput').value,
            email: document.getElementById('email').value,
            motif: document.getElementById('motif').value,
            date: document.getElementById('datetime').value
        };

        token = localStorage.getItem('medileaf');
        //console.log(token)

        $.ajax({
            type: 'POST',
            url: 'http://localhost:3004/hospital/validated',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            },
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function(response) {
              // Affiche un message de succès avec SweetAlert 
                  if (response == "success") {
                      // Redirige l'utilisateur vers la page de connexion en cas de succès
                      console.log("ok")
                  }
            },
            error: function(error) {
                // Gérez les erreurs de l'API (par exemple, affichez un message d'erreur)
                console.error('Erreur lors de l\'inscription :', error);
            }
        });
    });
});
