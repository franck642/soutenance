const form = document.getElementById('medical-form');
const steps = document.getElementsByClassName('step');
let currentStep = 0;

// Fonction pour récupérer le token depuis le stockage local
function getToken() {
    return localStorage.getItem('token');
}

function showStep(n) {
    steps[currentStep].classList.remove('active');
    steps[n].classList.add('active');
    currentStep = n;

    document.getElementById('prevBtn').style.display = (currentStep === 0) ? 'none' : 'inline';
    document.getElementById('nextBtn').innerHTML = (currentStep === steps.length - 1) ? 'Enregistrer' : 'Suivant';

    updateProgressBar();
}

function updateProgressBar() {
    const progress = ((currentStep + 1) / steps.length) * 100;
    document.querySelector('.progress-bar').style.width = progress + '%';
    document.querySelector('.progress-bar').setAttribute('aria-valuenow', progress);
}

function nextPrev(n) {
    if (n === 1 && !validateForm()) return false;
    
    if (currentStep + n >= steps.length) {
        submitForm();
        return false;
    }
    
    showStep(currentStep + n);
}

function validateForm() {
    const inputs = steps[currentStep].getElementsByTagName('input');
    for (let input of inputs) {
        if (input.hasAttribute('required') && input.value === "") {
            input.classList.add('is-invalid');
            return false;
        } else {
            input.classList.remove('is-invalid');
        }
    }
    return true;
}

async function submitForm() {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    const apiEndpoint = 'http://localhost:3004/hospital/create/patient';

    const token = getToken();
    if (!token) {
        console.error('Token non trouvé. Veuillez vous reconnecter.');
        // Gérer l'absence de token (redirection vers la page de connexion, par exemple)
        return;
    }

    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            if (response.status === 401) {
                console.error('Session expirée. Veuillez vous reconnecter.');
                // Rediriger vers la page de connexion ou rafraîchir le token
                return;
            }
            throw new Error('Erreur serveur');
        }

        const result = await response.json();
        console.log('Formulaire envoyé avec succès:', result);
        alert('Formulaire soumis avec succès !');
        // Redirection ou autre action après la soumission complète
    } catch (error) {
        console.error('Erreur lors de la soumission du formulaire:', error);
        alert('Une erreur est survenue lors de la soumission du formulaire. Veuillez réessayer.');
    }
}

showStep(currentStep);