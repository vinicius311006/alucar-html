$(document).ready(function () {

  $('#btnEnviar').on('click', function () {
    $('#m-form').on('click', function (event) {
      event.preventDefault()
    })

    var email = $('#email').val()
    var senha = $('#senha').val()

    if (email != '' && senha != '') {

      $.ajax({
        url: 'http://localhost:3333/login',
        method: 'POST',
        caches: false,
        dataType: 'json',
        data: {
          email: email,
          senha: senha
        },
        success: function () {
          alert('logado com Sucesso!!!')
          $('#m-form').each(function () {
            this.reset()
          })
          location.reload()
        },
      })
    }
    else {
      alert('Login Não Autorizado')
    }
  })

})