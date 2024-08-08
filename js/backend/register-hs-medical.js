$(document).ready(function() {
    $('#historique-medical-form').submit(function(event) {
        event.preventDefault(); // Empêche le rechargement de la page
        
        const medicalHistoryData = {
            treatments: $('#treatments').val(),
            surgeries: $('#surgeries').val(),
            hospitalizations: $('#hospitalizations').val(),
            medications: $('#medications').val(),
            userdoctor: $('#userdoctor').val(),
            numberdoctor: $('#numberdoctor').val()
        };

        // Récupération de l'ID du patient depuis l'URL
        const urlParams = new URLSearchParams(window.location.search);
        const patientId = urlParams.get('id');
        // Afficher l'ID dans la console
        console.log('ID patient:', patientId);
        const token = localStorage.getItem('medileaf');
        const apiUrl = `https://medileaf-zgwn.onrender.com/hospital/medicalhistory/create/${patientId}`;

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

        $.ajax({
            url: apiUrl,
            method: "POST",
            timeout: 0,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            },
            data: JSON.stringify(medicalHistoryData),
            success: function(response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Succès!',
                    text: 'L\'historique médical a été enregistré avec succès.',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#006838' // Couleur verte
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = 'scan.html';
                    }
                });
                
                console.log("L\'historique médical envoyée avec succès:", response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Une erreur est survenue lors de l\'enregistrement.',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#006838' // Couleur verte
                });
                console.error("Erreur lors de l'envoi des données:", textStatus, errorThrown);
            }
        });
    });
});
