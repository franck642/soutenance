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
