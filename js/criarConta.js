$(document).ready(function () {
  $('#btnEnviar').on('click', function () {

    $('#m-form').on('click', function (event) {
      event.preventDefault()
    })

    var nome = $('#nome').val()
    var cpf = $('#cpf').val()
    var cnh = $('#cnh').val()
    var endereco = $('#endereco').val()
    var telefone = $('#telefone').val()
    var email = $('#email').val()
    var senha = $('#senha').val()

    if (nome != '' && cpf != '' && cnh != '' && endereco != '' && email != '' && senha != '' && telefone != '') {
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
          telefone: telefone,
          email: email,
          senha: senha
        },
        success: function () {
          alert('Cadastro Feito com Sucesso')
          $('#m-form').each(function () {
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