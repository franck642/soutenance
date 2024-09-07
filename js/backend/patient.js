document.addEventListener('DOMContentLoaded', function() {
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    var id = getUrlParameter('id');
    console.log('ID:', id);

    if (!id) {
        showError("ID du patient manquant dans l'URL.");
        return;
    }

    var token = localStorage.getItem('medileaf');
    if (!token) {
        showError("Vous n'êtes pas connecté. Redirection vers la page de connexion...");
        setTimeout(() => {
            window.location.href = 'login.html';  // Assurez-vous que c'est le bon chemin
        }, 3000);
        return;
    }

    var url = `https://medileaf-zgwn.onrender.com/hospital/patient/${id}`;
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

    $.ajax(settings)
        .done(function(response) {
            console.log('moi', response)
            if (response && response.username && response.qrcode) {
                $('#patient-name').text(response.username);
                $('#qrcode-img').attr('src', response.qrcode);
                $('#download-qr').attr('href', response.qrcode);
                $('#download-qr').attr('download', 'qrcode.png');
            } else {
                showError("Les données du patient sont incomplètes ou mal formatées.");
            }
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            showError(`Erreur lors de la récupération des données: ${textStatus}`);
            console.error('Error fetching patient data:', textStatus, errorThrown);
        });

    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.textContent = message;
        errorDiv.style.color = 'red';
        errorDiv.style.padding = '10px';
        errorDiv.style.margin = '10px 0';
        errorDiv.style.border = '1px solid red';
        document.body.prepend(errorDiv);
    }
});