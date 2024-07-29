document.addEventListener('DOMContentLoaded', function() {
    let currentStep = 0;
    const steps = document.getElementsByClassName('step');
    const form = document.getElementById('medical-form');
    const progressBar = document.querySelector('.progress-bar');

    function showStep(n) {
        steps[currentStep].classList.remove('active');
        steps[n].classList.add('active');
        currentStep = n;

        document.getElementById('prevBtn').style.display = currentStep === 0 ? 'none' : 'inline';
        document.getElementById('nextBtn').style.display = currentStep === steps.length - 1 ? 'none' : 'inline';
        document.getElementById('submitBtn').style.display = currentStep === steps.length - 1 ? 'inline' : 'none';

        updateProgressBar();
    }

    function nextPrev(n) {
        if (n === 1 && !validateForm()) return false;
        if (currentStep + n >= steps.length) {
            displayFormData();
            return false;
        }
        showStep(currentStep + n);
    }

    function validateForm() {
        const inputs = steps[currentStep].querySelectorAll('input[required], select[required]');
        let valid = true;

        inputs.forEach(input => {
            if (input.value === "") {
                input.classList.add('is-invalid');
                valid = false;
            } else {
                input.classList.remove('is-invalid');
            }
        });

        return valid;
    }

    function updateProgressBar() {
        const progress = ((currentStep + 1) / steps.length) * 100;
        progressBar.style.width = progress + '%';
        progressBar.setAttribute('aria-valuenow', progress);
    }

    function displayFormData() {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        const token = localStorage.getItem('medileaf');

        fetch('http://localhost:3004/hospital/create/patient', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response => {
            if (response.message === "user create successfully") {
                const url = new URL('http://10.10.11.75:5500/qr.html');
                Object.keys(data).forEach(key => url.searchParams.append(key, data[key]));
                window.location.href = url;
            }
        })
        .catch(error => {
            console.error('Erreur lors de la soumission du formulaire :', error);
            // Afficher un message d'erreur à l'utilisateur
        });
    }

    document.getElementById('prevBtn').addEventListener('click', () => nextPrev(-1));
    document.getElementById('nextBtn').addEventListener('click', () => nextPrev(1));
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
            displayFormData();
        }
    });

    showStep(currentStep);

    // Fonction pour récupérer les paramètres de l'URL
    function getUrlParams() {
        return Object.fromEntries(new URLSearchParams(window.location.search));
    }

    // Afficher les informations du patient
    const params = getUrlParams();
    document.getElementById('patient-name').textContent = params.username || 'Patient';

    // Gestion du téléchargement du QR code
    document.getElementById('download-qr').addEventListener('click', function(e) {
        e.preventDefault();
        // Ajoutez ici la logique pour générer et télécharger le QR code
        console.log("Téléchargement du QR code demandé");
    });
});