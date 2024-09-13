$(document).ready(function() {
    let html5QrCode = null;
    let qrCodeTimer = null;

    $('#qrCodeModal').on('shown.bs.modal', function (e) {
        html5QrCode = new Html5Qrcode("reader");

        html5QrCode.start({ facingMode: "environment" }, {
            fps: 10,
            qrbox: {
                width: 250,
                height: 250,
            }
        }, function(decodedText, decodedResult) {
            console.log("QR Code scanned successfully:", decodedText);
            // Extraire l'ID de l'URL scannée
            let url = new URL(decodedText);
            let id = url.pathname.split('/').pop();
            // Rediriger vers la nouvelle URL avec l'ID
            window.location.href = `https://master--biomedicale.netlify.app/qrcode.html?id=${id}`;

            // Arrêtez le scanner et fermez le modal
            clearInterval(qrCodeTimer);
            html5QrCode.stop();
            html5QrCode = null;
            $('#qrCodeModal').modal('hide');
        }).catch(err => {
            console.error("QR Code scanning failed:", err);
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
            html5QrCode.stop();
            html5QrCode = null;
            clearInterval(qrCodeTimer);
        }

        // Supprimez les messages d'alerte s'ils existent
        document.querySelectorAll('#qrCodeModal .alert').forEach(function(alert) {
            alert.remove();
        });
    });
});


// Fonction pour récupérer la valeur d'un paramètre de l'URL
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Récupérer l'ID de l'URL actuelle
let id = getParameterByName('id');

if (id) {
    // URL de l'API et jeton d'authentification
    var url = `https://medileaf-zgwn.onrender.com/hospital/patient/${id}`;
    var token = localStorage.getItem('medileaf');



    // Paramètres de la requête AJAX
    var settings = {
        "url": url,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + token
        }
    };

    // Effectuer la requête AJAX
    $.ajax(settings).done(function(response) {
        console.log("Données du patient :", response);

        $('#username').val(response.username);
        $('#birthdate').val(response.birthdate);
        $('#gender').val(response.gender);
        $('#address').val(response.address);
        $('#phone').val(response.phone);
        $('#email').val(response.email);
        $('#userurgence').val(response.userurgence);
        $('#numberurgence').val(response.numberurgence);
        $('#patientId').val(response.patientId);
        $('#weight').val(response.weight);
        $('#height').val(response.height);
        $('#allergies').val(response.allergies);
        $('#conditions').val(response.conditions);
        $('#blood').val(response.blood);

        // Mettre à jour les liens des boutons avec l'ID du patient
        $('#viewHistoryBtn').attr('href', `register_patient_hs.html?id=${id}`);
        $('#createHistoryBtn').attr('href', `list_patient_hs.html?id=${id}`);

    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Erreur lors de la récupération des données du patient :", textStatus, errorThrown);
    });
} else {
    console.log("Aucun ID trouvé dans l'URL.");
}
