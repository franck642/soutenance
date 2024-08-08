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

        fetch('https://medileaf-zgwn.onrender.com/hospital/create/patient', {
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
            Swal.close(); // Fermer le spinner de SweetAlert2
            if (response.message === "user create successfully ") { // Notez l'espace à la fin
                window.location.href = `http://localhost:5500/qr.html?id=${response.patientId}`;
                console.log("Réponse du serveur:", response);
            } else {               
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: "Une erreur s'est produite lors de la création du patient. Veuillez réessayer.",
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#006838' // Couleur verte
                });
            }
        })
        .catch(error => {
            console.error('Erreur lors de la soumission du formulaire :', error);
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: "Une erreur s'est produite lors de la création du patient. Veuillez réessayer.",
                confirmButtonText: 'OK',
                confirmButtonColor: '#006838' // Couleur verte
            });
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

});

