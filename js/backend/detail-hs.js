function getQueryParams(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
}

const hsId = getQueryParams('id');
console.log('ID historique:', hsId);

// URL de l'API avec l'ID de l'historique
const url = `https://medileaf-zgwn.onrender.com/hospital/medicalhistory/${hsId}`;
const token = localStorage.getItem('medileaf');

// Options de la requête, incluant l'en-tête d'autorisation
const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    },
};

// Fonction pour récupérer les données
async function fetchMedicalHistory() {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        }
        const data = await response.json();
        console.log('Données de l\'historique médical:', data.message);

         // Insérer les données dans les éléments HTML
         document.getElementById('date').textContent = new Date(data.message.createdAt).toLocaleString('fr-FR');
         document.getElementById('hospital_name').textContent = data.message.hospital_name;
         document.getElementById('treatments').textContent = data.message.treatments;
         document.getElementById('surgeries').textContent = data.message.surgeries;
         document.getElementById('hospitalizations').textContent = data.message.hospitalizations;
         document.getElementById('userdoctor').textContent = data.message.userdoctor;
         document.getElementById('medications').textContent = data.message.medications.replace(/(?:\r\n|\r|\n)/g, '<br>');
         document.getElementById('numberdoctor').textContent = data.message.numberdoctor;
         
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}

// Appel de la fonction pour récupérer et afficher les données
fetchMedicalHistory();
