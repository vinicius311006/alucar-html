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
    url: 'http://localhost:3333/locacao',
    method: "GET",
    dataType: "json",
    success: function (data) {
      var table = $('#cadastro tbody')
      $.each(data, function (index, item) {
        table.append('<tr id=line>' +
          '<td id=code>' + item.id_locacao + '</td>' +
          '<td>' + item.id_reserva + '</td>' +
          '<td>' + item.valor_total + '</td>' +
          '<td>' + item.forma_pagamento + '</td>' +
          '<td>' + item.placa + '</td>' +
          '<td>' + formatDateToYYYYMMDD(item.data_inicial) + '</td>' +
          '<td>' + formatDateToYYYYMMDD(item.data_final) + '</td>' +
          '<td> <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#updateModal" data-id="' + item.id_locacao + '"id="btnEditar">Editar</button></td>' +
          '<td> <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delModal" data-id="' + item.id_locacao + '"id="btnExcluir">Excluir</button></td>')
      })
    }
  })

  $('#btnSalvar').on('click', function () {

    $('#m-form').on('click', function (event) {
      event.preventDefault()
    })

    var id_reserva = $('#m-idr').val()
    var valor_total = $('#m-valor').val()
    var forma_pagamento = $('#m-pagamento').val()
    var placa = $('#m-placa').val()
    var data_inicial = $('#m-data-I').val()
    var data_final = $('#m-data-F').val()

    if (id_reserva != '' && valor_total != '' && forma_pagamento != '' && data_inicial != '' && data_final != '' && placa != '') {

      $.ajax({
        url: 'http://localhost:3333/locacao',
        method: 'POST',
        dataType: 'json',
        data: {
          id_reserva: id_reserva,
          valor_total: valor_total,
          forma_pagamento: forma_pagamento,
          placa: placa,
          data_inicial: data_inicial,
          data_final: data_final
        },
        success: function () {
          alert('Locação Cadastrado com Sucesso!')
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
      url: 'http://localhost:3333/locacao/' + id,
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        $('#u-valor').val(data.valor_total)
        $('#u-pagamento').val(data.forma_pagamento)
        $('#u-data-I').val(formatDateToYYYYMMDD(data.data_inicial))
        $('#u-data-F').val(formatDateToYYYYMMDD(data.data_final))

        $('#updateModal').modal('show')
      },
      error: function (error) {
        console.log(error);
        alert('Não foi possivel recuperar os dados')
      }
    })
    $(document).on('click', '#btnAlterar', function () {
      var novoValor = $('#u-valor').val()
      var novoPagamento = $('#u-pagamento').val()
      var novaDataI = $('#u-data-I').val()
      var novaDataF = $('#u-data-F').val()

      if (novoValor != '' && novoPagamento != '' && novaDataI != '' && novaDataF != '') {
        $.ajax({
          url: 'http://localhost:3333/locacao/' + id,
          method: 'PATCH',
          dataType: 'json',
          data: {
            valor_total: novoValor,
            forma_pagamento: novoPagamento,
            data_inicial: novaDataI,
            data_final: novaDataF
          },
          success: function () {
            alert('Locação atualizado com sucesso!')
            $('#updateModal').modal('hide')
            location.reload()
          },
          error: function (error) {
            alert('Não foi possivel atualizar Locação')
            $('#updateModal').modal('hide')
            console.log(error);
            location.reload()
          }
        })
      } else {
        alert('Falha ao atualizar o Locação')
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
        url: 'http://localhost:3333/locacao/' + id,
        method: "DELETE", //requisição
        success: function () {
          line.remove()
          alert('Locação Excluido com Sucesso!')
          location.reload()
        },
        error: function (error) {
          alert('Erro ao Excluir Locação')
          console.log(error);
        }
      })
    })
  })
})