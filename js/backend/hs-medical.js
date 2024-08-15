$(document).ready(function() {
  function getQueryParams(param) {
      const params = new URLSearchParams(window.location.search);
      return params.get(param);
  }

  const patientId = getQueryParams('id');
  console.log('ID patient:', patientId);

  if (patientId) {
      const apiUrl = `https://medileaf-zgwn.onrender.com/hospital/medicalhistory/info/${patientId}`;
      const token = localStorage.getItem('medileaf');

      $.ajax({
          url: apiUrl,
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          success: function(response) {
              console.log('Informations du patient:', response);
              
              const tableBody = $('table tbody');
              tableBody.empty();
              
              if (Array.isArray(response.message) && response.message.length > 0) {
                  response.message.forEach(entry => {
                      const row = $('<tr>');
                      
                      // Formatage de la date
                      const date = new Date(entry.createdAt);
                      const formattedDate = date.toLocaleString('fr-FR', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                      });

                      row.append(`<td>${formattedDate}</td>`);
                      row.append(`<td>${entry.hospital_name}</td>`);
                      row.append(`<td>${entry.treatments}</td>`);
                      row.append(`<td>${entry.userdoctor}</td>`);
                      
                      const actionCell = $('<td>');
                      const actionButton = $('<a>')
                          .addClass('btn btn-primary btn-sm')
                          .text('Détails')
                          .attr('href', `detail_hs.html?id=${entry._id}`);
                      actionCell.append(actionButton);
                      row.append(actionCell);
                      
                      tableBody.append(row);
                  });
              } else {
                  tableBody.append('<tr><td colspan="5" class="text-center">Aucun historique médical trouvé</td></tr>');
              }
          },
          error: function(jqXHR, textStatus, errorThrown) {
              console.error('Erreur lors de la récupération des informations du patient:', textStatus, errorThrown);
              $('table tbody').html('<tr><td colspan="5" class="text-center text-danger">Erreur lors de la récupération des données</td></tr>');
          }
      });
  } else {
      console.error('ID du patient non trouvé dans l\'URL');
      $('table tbody').html('<tr><td colspan="5" class="text-center text-danger">ID du patient non trouvé dans l\'URL</td></tr>');
  }
});




