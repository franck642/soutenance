$(document).ready(function() {
    let html5QrCode = null; // Déclarez la variable html5QrCode ici
    let qrCodeTimer = null; // Variable pour stocker le timer

    $('#qrCodeModal').on('shown.bs.modal', function (e) {
        html5QrCode = new Html5Qrcode("reader"); // Initialisez l'instance Html5Qrcode ici
        html5QrCode.start({ facingMode: "environment" }, {
            fps: 10,
            qrbox: {
                width: 250,
                height: 250,
            }
        }, function(decodedText, decodedResult) {
            console.log("QR Code scanned successfully:", decodedText);
            // Extraire l'ID du patient du lien
            const url = new URL(decodedText);
            const patientId = url.pathname.split('/').pop();
            
            console.log("ID du patient:", patientId);
            var apiUrl = `https://medileaf-zgwn.onrender.com/hospital/patient/${patientId}`;
            var token = localStorage.getItem('medileaf');

            // Vérifier si le jeton est disponible
            if (!token) {
                console.error('No token found in localStorage');
                clearInterval(qrCodeTimer);
                html5QrCode.stop();
                html5QrCode = null;
                $('#qrCodeModal').modal('hide');
                return;
            }

            // Paramètres de la requête AJAX
            var settings = {
                "url": apiUrl,
                "method": "GET",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            };

            // Effectuer la requête AJAX
            $.ajax(settings)
                .done(function(response) {
                clearInterval(qrCodeTimer);
                html5QrCode.stop();
                html5QrCode = null;
                $('#qrCodeModal').modal('hide');
                    console.log("Données du patient:", response);
                    // Ici, vous pouvez traiter les données du patient comme vous le souhaitez
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    console.error("Erreur lors de la récupération des données du patient:", textStatus, errorThrown);
                })
                
            .finally(() => {
                // Nettoyage et fermeture du modal
                clearInterval(qrCodeTimer);
                html5QrCode.stop();
                html5QrCode = null;
                $('#qrCodeModal').modal('hide');
            });
        });

        // Configurer un timer pour vérifier si aucun lien n'est récupéré dans un délai donné
        qrCodeTimer = setTimeout(function() {
            // Si aucun lien n'est récupéré, afficher un message
            let messageElement = document.createElement('div');
            messageElement.classList.add('alert', 'alert-warning', 'mt-3');
            messageElement.textContent = "Ce patient n'a été enrégistré. Veuillez réessayer.";
            document.getElementById('qrCodeModal').appendChild(messageElement);
        }, 10000); // 10000 millisecondes = 10 secondes
    });

    $('#qrCodeModal').on('hidden.bs.modal', function (e) {
        if (html5QrCode) {
            html5QrCode.stop(); // Arrêtez le scanner lorsque le modal est fermé
            html5QrCode = null; // Réinitialisez la variable html5QrCode
            clearInterval(qrCodeTimer); // Arrête le timer si le modal est fermé avant que le lien soit récupéré
        }
    });
});