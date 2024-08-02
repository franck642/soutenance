console.log("rendez vous");
 
 document.addEventListener('DOMContentLoaded', function() {
     // Sélection du formulaire
    var form = document.getElementById('appointmentForm');
    form.addEventListener('submit', function(event) {
    event.preventDefault();

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

         var token = localStorage.getItem('medileaf');

         $.ajax({
            type: 'POST',
            url: 'https://medileaf-zgwn.onrender.com/hospital/validated',
             headers: {
                 "Content-Type": "application/json",
                 "Accept": "application/json",
                 "Authorization": "Bearer " + token
             },
             data: JSON.stringify(formData),
             success: function(response) {
                 if (response === "success") {
                     console.log("ok");
                     // Ici, vous pouvez ajouter le code pour rediriger l'utilisateur ou afficher un message de succès
                 }
             },
             error: function(error) {
                 console.error('Erreur lors de la soumission du formulaire :', error);
                 // Ici, vous pouvez ajouter le code pour afficher un message d'erreur à l'utilisateur
             }
         });
     });
    
});




/*document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appointmentForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche l'envoi du formulaire

        // Récupération des valeurs des champs
        const doctorName = document.getElementById('usernameDoctor').value;
        const department = document.getElementById('Department').value;
        const doctorPhone = document.getElementById('phoneDoctor').value;
        const patientName = document.getElementById('username').value;
        const patientPhone = document.getElementById('phoneInput').value;
        const email = document.getElementById('email').value;
        const reason = document.getElementById('motif').value;
        const appointmentDate = document.getElementById('datetime').value;

        // Création d'un objet avec toutes les informations
        const appointmentInfo = {
            doctorName,
            department,
            doctorPhone,
            patientName,
            patientPhone,
            email,
            reason,
            appointmentDate
        };

        // Affichage de l'objet dans la console
        console.log('Informations du rendez-vous :', appointmentInfo);
        var token = localStorage.getItem('medileaf');

        $.ajax({
            type: 'POST',
            url: 'http://localhost:3004/hospital/validated',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            },
            data: JSON.stringify(appointmentInfo),
            success: function(response) {
                if (response === "success") {
                    console.log("ok");
                    // Ici, vous pouvez ajouter le code pour rediriger l'utilisateur ou afficher un message de succès
                }
            },
            error: function(error) {
                console.error('Erreur lors de la soumission du formulaire :', error);
                // Ici, vous pouvez ajouter le code pour afficher un message d'erreur à l'utilisateur
            }
        });
    });
});*/



