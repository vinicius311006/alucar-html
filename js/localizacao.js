$(document).ready(function () {

  function formatDateToYYYYMMDD(dateString) {
    // Cria um objeto Date a partir da string
    const date = new Date(dateString);

    // Obtém os componentes da data
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    // Retorna a data no formato YYYY-MM-DD
    return `${year}-${month}-${day}`;
  }

  $('#btnContinuar').on('click', function () {
    var dataInicial = $('#data-inicial').val()
    var dataFinal = $('#data-final').val()
    
  })

})