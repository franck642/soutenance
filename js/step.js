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
            form.submit();
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

    document.getElementById('prevBtn').addEventListener('click', () => nextPrev(-1));
    document.getElementById('nextBtn').addEventListener('click', () => nextPrev(1));
    form.addEventListener('submit', (e) => {
        if (!validateForm()) {
            e.preventDefault();
        }
    });

    showStep(currentStep);
});
