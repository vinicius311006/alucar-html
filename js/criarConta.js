$(document).ready(function () {
  $('#btnSalvar').on('click', function () {

    $('#form').on('click', function (event) {
      event.preventDefault()
    })

    var nome = $('#nome').val()
    var cpf = $('#cpf').val()
    var cnh = $('#cnh').val()
    var endereco = $('#endereco').val()
    var cliente_data = $('#data').val()
    var telefone = $('#telefone').val()
    var email = $('#email').val()
    var senha = $('#senha').val()

    if (nome != '' && cpf != '' && cnh != '' && cliente_data != '' && endereco != '' && email != '' && senha != '' && telefone != '') {
      $.ajax({
        url: 'http://localhost:3333/cliente',
        method: 'POST',
        caches: false,
        dataType: 'json',
        data: {
          nome: nome,
          cpf: cpf,
          cnh: cnh,
          endereco: endereco,
          cliente_data: cliente_data,
          telefone: telefone,
          email: email,
          senha: senha
        },
        succeses: function () {
          alert('Cadastro Feito com Sucesso')
          $('#form').each(function () {
            this.reset()
          })
          location.reload()
        }
      })
    }
    else {
      alert('Preencha todos os campos corretamente')
    }
  })
})