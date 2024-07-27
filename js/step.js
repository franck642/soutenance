let currentStep = 0;
        const steps = document.getElementsByClassName('step');
        const form = document.getElementById('medical-form');

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
                document.getElementById('nextBtn').innerHTML = 'Enregistrer';
            } else {
                document.getElementById('nextBtn').innerHTML = 'Suivant';
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
            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i].hasAttribute('required') && inputs[i].value === "") {
                    inputs[i].classList.add('is-invalid');
                    return false;
                } else {
                    inputs[i].classList.remove('is-invalid');
                }
            }
            return true;
        }

        function updateProgressBar() {
            const progress = ((currentStep + 1) / steps.length) * 100;
            document.querySelector('.progress-bar').style.width = progress + '%';
            document.querySelector('.progress-bar').setAttribute('aria-valuenow', progress);
        }

        showStep(currentStep);