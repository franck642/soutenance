
document.addEventListener('DOMContentLoaded', function() {
    fetchDayAppointments();
});

function fetchDayAppointments() {
    const token = localStorage.getItem('medileaf'); // Remplacez par votre token JWT
    const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

    fetch('https://medileaf-zgwn.onrender.com/hospital/all_apoitment', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Données reçues:', data); // Pour déboguer
        if (Array.isArray(data.message)) {
            const todayAppointments = data.message.filter(appointment => {
                return new Date(appointment.date).toISOString().split('T')[0] === today;
            });
            displayDayAppointments(todayAppointments);
        } else if (typeof data.message === 'object') {
            // Si message est un objet, essayons de trouver un tableau à l'intérieur
            const appointmentsArray = Object.values(data.message).find(Array.isArray);
            if (appointmentsArray) {
                const todayAppointments = appointmentsArray.filter(appointment => {
                    return new Date(appointment.date).toISOString().split('T')[0] === today;
                });
                displayDayAppointments(todayAppointments);
            } else {
                console.error('Structure de données inattendue:', data);
                displayDayAppointments([]);
            }
        } else {
            console.error('Structure de données inattendue:', data);
            displayDayAppointments([]);
        }
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des rendez-vous:', error);
        displayDayAppointments([]);
    });
}

function displayDayAppointments(appointments) {
    const tableBody = document.getElementById('appointmentDayTableBody');
    tableBody.innerHTML = ''; // Efface le contenu existant

    if (!Array.isArray(appointments) || appointments.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="7">Aucun rendez-vous pour aujourd\'hui</td>';
        tableBody.appendChild(row);
        return;
    }

    appointments.forEach(appointment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatTime(appointment.date)}</td>
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

function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}
