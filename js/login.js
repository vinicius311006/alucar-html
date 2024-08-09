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
          $('#m-form').each(function () {
            this.reset()
            alert('Logado com sucesso')
            
          })
          
        },
        error: function () {
          $('#email, #senha').css({
            "border-bottom": "2px solid red",
          })
          $('#erro').css({
            "margin-bottom": "15px",
            "display": "block",
            "color": "red",
            "background-color": "#DA9494",
            "padding": "10px",
            "border-radius": "5px"
          })
        }
      })
    }
  })
})