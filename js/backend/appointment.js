console.log("rendez vous");
 
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appointmentForm');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = {
            usernameDoctor: document.getElementById('usernameDoctor').value,
            Department: document.getElementById('Department').value,
            phoneDoctor: document.getElementById('phoneDoctor').value,
            username: document.getElementById('username').value,
            phoneInput: document.getElementById('phoneInput').value,
            email: document.getElementById('email').value,
            motif: document.getElementById('motif').value,
            date: document.getElementById('datetime').value
        };

        // Validation simple
        for (let key in formData) {
            if (formData[key].trim() === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Champ manquant',
                    text: `Le champ ${key} ne peut pas être vide.`
                });
                return;
            }
        }

        const token = localStorage.getItem('medileaf');

        try {
            // Afficher une alerte de chargement
            Swal.fire({
                title: 'Enregistrement en cours...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const response = await fetch('https://medileaf-zgwn.onrender.com/hospital/validated', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const data = await response.json();

            if (data === "success") {
                console.log("Rendez-vous enregistré avec succès");
                Swal.fire({
                    icon: 'success',
                    title: 'Succès!',
                    text: 'Votre rendez-vous a été enregistré avec succès.',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Actualiser la page
                        window.location.reload();
                    }
                });
            } else {
                throw new Error('Réponse inattendue du serveur');
            }
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire :', error);
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: `Une erreur est survenue : ${error.message}`,
                confirmButtonText: 'OK'
            });
        }
    });
});t 




// document.addEventListener('DOMContentLoaded', function() {
//     // Sélection du formulaire
//    var form = document.getElementById('appointmentForm');
//    form.addEventListener('submit', function(event) {
//    event.preventDefault();

//    var formData = {
//        usernameDoctor: document.getElementById('usernameDoctor').value,
//        Department: document.getElementById('Department').value,
//        phoneDoctor: document.getElementById('phoneDoctor').value,
//        username: document.getElementById('username').value,
//        phoneInput: document.getElementById('phoneInput').value,
//        email: document.getElementById('email').value,
//        motif: document.getElementById('motif').value,
//        date: document.getElementById('datetime').value
//    };

//         var token = localStorage.getItem('medileaf');

//         $.ajax({
//            type: 'POST',
//            url: 'https://medileaf-zgwn.onrender.com/hospital/validated',
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "application/json",
//                 "Authorization": "Bearer " + token
//             },
//             data: JSON.stringify(formData),
//             success: function(response) {
//                 if (response === "success") {
//                     console.log("ok");
//                     // Ici, vous pouvez ajouter le code pour rediriger l'utilisateur ou afficher un message de succès
//                 }
//             },
//             error: function(error) {
//                 console.error('Erreur lors de la soumission du formulaire :', error);
//                 // Ici, vous pouvez ajouter le code pour afficher un message d'erreur à l'utilisateur
//             }
//         });
//     });

// });





document.addEventListener('DOMContentLoaded', function() {
    fetchAppointments();
});

function fetchAppointments() {
    const token = localStorage.getItem('medileaf'); // Remplacez par votre token JWT
    
    fetch('https://medileaf-zgwn.onrender.com/hospital/all_apoitment', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        displayAppointments(data.message);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des rendez-vous:', error);
    });
}

function displayAppointments(appointments) {
    const tableBody = document.getElementById('appointmentTableBody');
    tableBody.innerHTML = ''; // Efface le contenu existant

    appointments.forEach(appointment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDate(appointment.date)}</td>
            <td>${appointment.usernameDoctor}</td>
            <td>${appointment.Department}</td>
            <td>${appointment.phoneDoctor}</td>
            <td>${appointment.username}</td>
            <td>${appointment.phoneInput}</td>
            <td>${appointment.motif}</td>
        `;
        tableBody.appendChild(row);
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
    });
}
