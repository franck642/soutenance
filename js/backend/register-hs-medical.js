// Fonction pour récupérer les paramètres de l'URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return params;
}

// Récupérer l'ID depuis les paramètres
const params = getQueryParams();
const patientId = params.get('id');

// Fonction pour envoyer les données du formulaire à l'API
async function sendFormData(event) {
    event.preventDefault(); // Empêcher le comportement par défaut du formulaire

    Swal.fire({
        title: 'Enregistrement en cours...',
        allowOutsideClick: false,
        customClass: {
            popup: 'custom-swal-spinner'
        },
        didOpen: () => {
            Swal.showLoading();
        }
    });
    // Récupérer les données du formulaire
    const treatments = document.getElementById('treatments').value;
    const surgeries = document.getElementById('surgeries').value;
    const hospitalizations = document.getElementById('hospitalizations').value;
    const medications = document.getElementById('medications').value;
    const userdoctor = document.getElementById('userdoctor').value;
    const numberdoctor = document.getElementById('numberdoctor').value;

    // Créer un objet avec les données du formulaire
    const formData = {
        treatments,
        surgeries,
        hospitalizations,
        medications,
        userdoctor,
        numberdoctor
    };
    console(formData)
    const token = localStorage.getItem('medileaf');

    try {
        // Envoyer les données à l'API
        const response = await fetch(`https://medileaf-zgwn.onrender.com/medicalhistory/create/${patientId}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(formData)
        });

        // Vérifier la réponse de l'API
        if (response.ok) {
            const result = await response.json();
            console.log('Réponse de l\'API:', result);
            Swal.fire({
                title: 'Succès',
                text: 'Historique médical soumis avec succès.',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#006838' // Couleur verte
            });
        } else {
            console.error('Erreur:', response.statusText);
            Swal.fire({
                title: 'Erreur',
                text: 'Erreur lors de la soumission.',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#006838' // Couleur verte
            });
        }
    } catch (error) {
        console.error('Erreur:', error);
        Swal.fire({
            title: 'Erreur',
            text: 'Erreur lors de la soumission.',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#006838' // Couleur verte
        });
    }
}

// Ajouter un gestionnaire d'événement au formulaire
document.getElementById('historique-medical-form').addEventListener('submit', sendFormData);