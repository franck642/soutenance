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
            url: 'http://localhost:3004/hospital/validated',
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



function fetchAndDisplayAppointments() {
    // L'URL de votre API
    const apiUrl = 'http://localhost:3004/hospital/all_apoitment';
    const token = localStorage.getItem('medileaf');

    // Options pour la requête fetch
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    // Effectuer la requête à l'API
    fetch(apiUrl, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur réseau ou serveur');
            }
            return response.json();
        })
        .then(data => {
            // Appeler la fonction pour afficher les données dans le tableau
            displayAppointments(data);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des rendez-vous:', error);
            document.getElementById('appointmentTableBody').innerHTML = `
                <tr>
                    <td colspan="7">Erreur lors du chargement des rendez-vous. Veuillez réessayer.</td>
                </tr>
            `;
        });
}

// Fonction pour afficher les rendez-vous dans le tableau HTML
function displayAppointments(appointments) {
    const tableBody = document.getElementById('appointmentTableBody');
    tableBody.innerHTML = ''; // Vider le contenu existant

    if (appointments.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7">Aucun rendez-vous trouvé.</td>
            </tr>
        `;
        return;
    }

    appointments.forEach(appointment => {
        const row = `
            <tr>
                <td>${formatDate(appointment.date)}</td>
                <td>${appointment.usernameDoctor}</td>
                <td>${appointment.department}</td>
                <td>${appointment.phoneDoctor}</td>
                <td>${appointment.username}</td>
                <td>${appointment.phoneInput}</td>
                <td>${appointment.motif}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Fonction utilitaire pour formater la date (à adapter selon le format de date renvoyé par l'API)
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Appeler la fonction pour récupérer et afficher les rendez-vous au chargement de la page
document.addEventListener('DOMContentLoaded', fetchAndDisplayAppointments);