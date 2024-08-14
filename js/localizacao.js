$(document).ready(function () {

  $('#btnContinuar').on('click', function () {

    $('#form-r').on('click', function (event) {
      event.preventDefault()
    })

    var dataInicial = $('#data-inicial').val()
    var dataFinal = $('#data-final').val()

    var timeInical = $('#time-inical').val()
    var timeFinal = $('#time-final').val()

    if (dataInicial != '' && dataFinal != '' && timeInical != '' && timeFinal != '') {
      // Converte as strings de data para objetos Date
      var date1 = new Date(dataInicial);
      var date2 = new Date(dataFinal);

      // Normaliza as datas para o início do dia (00:00:00)
      date1.setHours(0, 0, 0, 0);
      date2.setHours(0, 0, 0, 0);

      // Calcula a diferença em milissegundos
      var ContadorHoras = Math.abs(date2 - date1);

      // Converte a diferença para dias
      var contadorDias = Math.floor(ContadorHoras / (1000 * 60 * 60 * 24));
      console.log(contadorDias);
      
      
    }
    else {
      location.reload()
      alert('Preenche todos os campos')
    }
  })

})