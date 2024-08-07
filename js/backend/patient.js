document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour récupérer les paramètres de l'URL
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Récupérer l'ID à partir de l'URL
    var id = getUrlParameter('id');

    // Afficher l'ID dans la console
    console.log('ID:', id);

    // Vérifier si l'ID est présent dans l'URL
    if (id) {
        // URL de l'API et jeton d'authentification
        var url = `https://medileaf-zgwn.onrender.com/hospital/patient/${id}`;
        var token = localStorage.getItem('medileaf');

        // Vérifier si le jeton est disponible
        if (!token) {
            console.error('No token found in localStorage');
            return;
        }

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
            console.log(response);

            // Mettre à jour les éléments HTML avec les données du patient
            $('#patient-name').text(response.username);
            
            // Afficher le QR code
            var qrcodeBase64 = response.qrcode;
            $('#qrcode-img').attr('src', qrcodeBase64);
            $('#download-qr').attr('href', qrcodeBase64);
            $('#download-qr').attr('download', 'qrcode.png');
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.error('Error fetching patient data:', textStatus, errorThrown);
        });
    } else {
        console.log("ID non trouvé dans l'URL");
    }
});