console.log("rendez-vous");

/*--
        RENDEZ-VOUS
-----------------------------------*/

document.addEventListener('DOMContentLoaded', function() {
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
        console.log('Données du formulaire :', formData);

        // Vous pouvez ajouter d'autres traitements ici, comme l'envoi des données à un serveur via AJAX, etc.
    });
});
