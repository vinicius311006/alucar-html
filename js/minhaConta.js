$(document).ready(function () {
  $('#btnEnviar').on('click', function () {
    $('#m-form').on('click', function (event) {
      event.preventDefault()
    })
    var id = $('#email').val()
  })

  $(document).on('click', '#perfil', function () {
    $.ajax({
        url: 'http://localhost:3333/cliente/' + id,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            $('#email').val(data.email)
            $('#senha').val(data.senha)
            $('#nome').val(data.nome)
            $('#endereco').val(data.endereco)
        },
        error: function (error) {
            console.log(error);
            alert('Não foi possivel recuperar os dados')
        }
    })
    $(document).on('click', '#btnEnviar', function () {
        var novoNome = $('#nome').val()
        var novoEndereco = $('#endereco').val()
        var novoEmail = $('#email').val()
        var novaSenha = $('#senha').val()

        if (novoNome != '' && novoEndereco != '' && novoEmail != '' && novaSenha != '') {
            $.ajax({
                url: 'http://localhost:3333/cliente/' + id,
                method: 'PATCH',
                dataType: 'json',
                data: {
                    nome: novoNome,
                    endereco: novoEndereco,
                    email: novoEmail,
                    senha: novaSenha
                },
                success: function () {
                    alert('Cliente atualizado com sucesso!')
                    location.reload()
                },
                error: function (error) {
                    alert('Não foi possivel atualizar cliente')
                    console.log(error);
                    location.reload()
                }
            })
        } else {
            alert('Falha ao atualizar o cliente')
        }
    })
})
})