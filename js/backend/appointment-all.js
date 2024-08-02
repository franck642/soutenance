
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





function fetchDayAppointments(event) {
    event.preventDefault(); // Empêche la navigation vers list_appointment_day.html

    const token = localStorage.getItem('medileaf'); // Remplacez par votre token JWT
    const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

    fetch('https://medileaf-zgwn.onrender.com/hospital/all_day_apoitment', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const todayAppointments = data.message.filter(appointment => {
            return new Date(appointment.date).toISOString().split('T')[0] === today;
        });
        displayDayAppointments(todayAppointments);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des rendez-vous:', error);
    });
}

function displayDayAppointments(appointments) {
    const tableBody = document.getElementById('appointmentDayTableBody');
    tableBody.innerHTML = ''; // Efface le contenu existant

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



document.addEventListener('DOMContentLoaded', function() {
    fetchDayAppointments();
});

function fetchDayAppointments() {
    const token = localStorage.getItem('medileaf'); // Remplacez par votre token JWT
    const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

    fetch('https://medileaf-zgwn.onrender.com/hospital/all_day_apoitment', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const todayAppointments = data.message.filter(appointment => {
            return new Date(appointment.date).toISOString().split('T')[0] === today;
        });
        displayDayAppointments(todayAppointments);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des rendez-vous:', error);
    });
}

function displayDayAppointments(appointments) {
    const tableBody = document.getElementById('appointmentDayTableBody');
    tableBody.innerHTML = ''; // Efface le contenu existant

    if (appointments.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="7">Aucun rendez-vous pour aujourd\'hui</td>';
        tableBody.appendChild(row);
    } else {
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
}

function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}