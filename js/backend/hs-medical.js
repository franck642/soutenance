$(document).ready(function() {
    // Fonction pour récupérer les paramètres de l'URL
    function getQueryParams(param) {
        const params = new URLSearchParams(window.location.search);
        return params.get(param);
    }

    // Récupérer l'ID depuis les paramètres
    const patientId = getQueryParams('id');

    // Afficher l'ID dans la console
    console.log('ID patient:', patientId);

    // Vérifier si un ID de patient a été trouvé
    if (patientId) {
        // URL de l'API avec l'ID du patient
        const apiUrl = `https://medileaf-zgwn.onrender.com/hospital/medicalhistory/info/${patientId}`;
        const token = localStorage.getItem('medileaf');

        // Configuration de la requête AJAX
        $.ajax({
            url: apiUrl,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            success: function(response) {
                // Afficher les informations dans la console
                console.log('Informations du patient:', response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Erreur lors de la récupération des informations du patient:', textStatus, errorThrown);
            }
        });
    } else {
        console.error('ID du patient non trouvé dans l\'URL');
    }
});
