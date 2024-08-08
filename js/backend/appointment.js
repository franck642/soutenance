console.log("rendez vous");

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appointmentForm');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = {
            usernameDoctor: document.getElementById('usernameDoctor').value,
            Department: document.getElementById('Department').value,
            phoneDoctor: document.getElementById('phoneDoctor').value,
            username: document.getElementById('username').value,
            phoneInput: document.getElementById('phoneInput').value,
            email: document.getElementById('email').value,
            motif: document.getElementById('motif').value,
            date: document.getElementById('datetime').value
        };

        // Validation simple
        for (let key in formData) {
            if (formData[key].trim() === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Champ manquant',
                    text: `Le champ ${key} ne peut pas être vide.`
                });
                return;
            }
        }

        const token = localStorage.getItem('medileaf');

        try {
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

            const response = await fetch('https://medileaf-zgwn.onrender.com/hospital/validated', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);

            if (data.message === "success") {
                console.log("Rendez-vous enregistré avec succès");
                Swal.fire({
                    icon: 'success',
                    title: 'Succès!',
                    text: 'Votre rendez-vous a été enregistré avec succès.',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#006838' // Couleur verte
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            } else {
                throw new Error(data.message || 'Réponse inattendue du serveur');
            }
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire :', error);
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: `Une erreur est survenue : ${error.message}`,
                confirmButtonText: 'OK',
                confirmButtonColor: '#006838'
            });
        }
    });
});



