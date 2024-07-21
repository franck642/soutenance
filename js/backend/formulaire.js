let currentStep = 1;
        const totalSteps = 4;

        function navigate(direction) {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const submitBtn = document.getElementById('submitBtn');
            const progressBar = document.querySelector('.progress-bar');

            currentStep += direction;
            
            document.querySelectorAll('.step').forEach((step, index) => {
                step.classList.toggle('active', index + 1 === currentStep);
            });

            prevBtn.disabled = currentStep === 1;
            
            if (currentStep === totalSteps) {
                nextBtn.style.display = 'none';
                submitBtn.style.display = 'block';
            } else {
                nextBtn.style.display = 'block';
                submitBtn.style.display = 'none';
            }

            const progress = (currentStep / totalSteps) * 100;
            progressBar.style.width = `${progress}%`;
            progressBar.setAttribute('aria-valuenow', progress);
        }

        document.getElementById('medical-form').addEventListener('submit', function(e) {
            e.preventDefault();
            // Ici, vous pouvez ajouter le code pour traiter la soumission du formulaire
            alert('Formulaire soumis avec succès!');
        });