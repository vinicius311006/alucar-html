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

  $('#btnEnviar').on('click', function () {
    $('#m-form').on('click', function (event) {
      event.preventDefault()
    })
    var id = $('#email').val()
    var date = new Date()

    $.ajax({
      url: 'http://localhost:3333/clientel/' + id,
      method: 'GET',
      caches: false,
      dataType: 'json',
      success: function (data) {
        id = (data.id_cliente)
        console.log(id);
        console.log(formatDateToYYYYMMDD(date));
      },
      error: function (error) {
        alert('erro ao recuperar os dados')
        console.log(error);
      }
    })
  })


  
})