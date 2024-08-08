// Fonction pour récupérer les paramètres de l'URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return params;
}

// Récupérer l'ID depuis les paramètres
const params = getQueryParams();
const patientId = params.get('id');

// Afficher l'ID dans la console
console.log('ID patient:', patientId);
