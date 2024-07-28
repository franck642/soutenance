document.addEventListener('DOMContentLoaded', function() {
    let currentStep = 0;
    const steps = document.getElementsByClassName('step');
    const form = document.getElementById('medical-form');
    const progressBar = document.querySelector('.progress-bar');

    function showStep(n) {
        steps[currentStep].classList.remove('active');
        steps[n].classList.add('active');
        currentStep = n;

        if (currentStep === 0) {
            document.getElementById('prevBtn').style.display = 'none';
        } else {
            document.getElementById('prevBtn').style.display = 'inline';
        }

        if (currentStep === steps.length - 1) {
            document.getElementById('nextBtn').style.display = 'none';
            document.getElementById('submitBtn').style.display = 'inline';
        } else {
            document.getElementById('nextBtn').style.display = 'inline';
            document.getElementById('submitBtn').style.display = 'none';
        }

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
        const inputs = steps[currentStep].getElementsByTagName('input');
        const selects = steps[currentStep].getElementsByTagName('select');
        let valid = true;

        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].hasAttribute('required') && inputs[i].value === "") {
                inputs[i].classList.add('is-invalid');
                valid = false;
            } else {
                inputs[i].classList.remove('is-invalid');
            }
        }

        for (let i = 0; i < selects.length; i++) {
            if (selects[i].hasAttribute('required') && selects[i].value === "") {
                selects[i].classList.add('is-invalid');
                valid = false;
            } else {
                selects[i].classList.remove('is-invalid');
            }
        }

        return valid;
    }

    function updateProgressBar() {
        const progress = ((currentStep + 1) / steps.length) * 100;
        progressBar.style.width = progress + '%';
        progressBar.setAttribute('aria-valuenow', progress);
    }

    function displayFormData() {
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        //console.log(data)
        var token = localStorage.getItem('medileaf');
        //console.log(token)

        $.ajax({
            type: 'POST',
            url: 'http://localhost:3004/hospital/create/patient',
             headers: {
                 "Content-Type": "application/json",
                 "Accept": "application/json",
                 "Authorization": "Bearer " + token
             },
             data: JSON.stringify(data),
             success: function(response) {
                 if (response === "ok") {
                     console.log("ok");
                     // Ici, vous pouvez ajouter le code pour rediriger l'utilisateur ou afficher un message de succès
                 }
             },
             error: function(error) {
                 console.error('Erreur lors de la soumission du formulaire :', error);
                 // Ici, vous pouvez ajouter le code pour afficher un message d'erreur à l'utilisateur
             }
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
