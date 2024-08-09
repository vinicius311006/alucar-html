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

  $.ajax({
    url: 'http://localhost:3333/reserva',
    method: "GET",
    dataType: "json",
    success: function (data) {
      var table = $('#cadastro tbody')
      $.each(data, function (index, item) {
        table.append('<tr id=line>' +
          '<td>' + item.id_cliente + '</td>' +
          '<td id=code>' + item.id_reserva + '</td>' +
          '<td>' + item.status_reserva + '</td>' +
          '<td>' + item.valor_reserva + '</td>' +
          '<td>' + formatDateToYYYYMMDD(item.data_reserva) + '</td>' +
          '<td> <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#updateModal" data-id="' + item.id_reserva + '"id="btnEditar">Editar</button></td>' +
          '<td> <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delModal" data-id="' + item.id_reserva + '"id="btnExcluir">Excluir</button></td>')
      })
    }
  })

  $('#btnSalvar').on('click', function () {

    $('#m-form').on('click', function (event) {
      event.preventDefault()
    })

    var id_cliente = $('#m-idc').val()
    var status_reserva = $('#m-status').val()
    var valor_reserva = $('#m-valor').val()
    var data_reserva = $('#m-data').val()

    if (id_cliente != '' && status_reserva != '' && valor_reserva != '' && data_reserva != '') {

      $.ajax({
        url: 'http://localhost:3333/reserva',
        method: 'POST',
        dataType: 'json',
        data: {
          id_cliente: id_cliente,
          status_reserva: status_reserva,
          valor_reserva: valor_reserva,
          data_reserva: data_reserva
        },
        success: function () {
          alert('Reserva Cadastrado com Sucesso!')
          $('#m-form').each(function () {
            this.reset()
            $('#addModal').modal('hide')
          })
          location.reload()
        }
      })
    }
    else {
      $('#addModal').modal('hide')
      alert('Preencha corretamente os dados')
    }
  })

  // ATUALIZAR
  $(document).on('click', '#btnEditar', function () {
    var line = $(this).closest('tr')
    var id = line.find('#code').text()

    $.ajax({
      url: 'http://localhost:3333/reserva/' + id,
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        // $('#u-idc').val(data.id_cliente)
        $('#u-status').val(data.status_reserva)
        $('#u-valor').val(data.valor_reserva)
        $('#u-data').val(formatDateToYYYYMMDD(data.data_reserva))

        $('#updateModal').modal('show')
      },
      error: function (error) {
        console.log(error);
        alert('Não foi possivel recuperar os dados')
      }
    })
    $(document).on('click', '#btnAlterar', function () {
      // var novoIdc = $('#u-idc').val()
      var novoStatus = $('#u-status').val()
      var novoValor = $('#u-valor').val()
      var novaData = $('#u-data').val()

      if (/*novoIdc != '' &&*/ novoValor != '' && novoStatus != '' && novaData != '') {
        $.ajax({
          url: 'http://localhost:3333/reserva/' + id,
          method: 'PATCH',
          dataType: 'json',
          data: {
            // id_cliente: novoIdc,
            status_reserva: novoStatus,
            valor_reserva: novoValor,
            data_reserva: novaData
          },
          success: function () {
            alert('Reserva atualizado com sucesso!')
            $('#updateModal').modal('hide')
            location.reload()
          },
          error: function (error) {
            alert('Não foi possivel atualizar Reserva')
            $('#updateModal').modal('hide')
            console.log(error);
            location.reload()
          }
        })
      } else {
        alert('Falha ao atualizar o Reserva')
      }
    })
  })
  // DELETE
  $(document).on('click', '#btnExcluir', function () {
    var line = $(this).closest('tr')
    var id = line.find('#code').text()
    $('#deleteModal').modal('show')

    $(document).on('click', '#btnSim', function () {
      $.ajax({
        url: 'http://localhost:3333/reserva/' + id,
        method: "DELETE", //requisição
        success: function () {
          line.remove()
          alert('Reserva Excluido com Sucesso!')
          location.reload()
        },
        error: function (error) {
          alert('Erro ao Excluir Reserva')
          console.log(error);
        }
      })
    })
  })
})