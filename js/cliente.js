$(document).ready(function () {

    $.ajax({
        url: 'http://localhost:3333/cliente',
        method: "GET",
        dataType: "json",
        success: function (data) {
            var table = $('#cadastro tbody')
            $.each(data, function (index, item) {
                table.append('<tr id=line>' +
                    '<td>' + item.id_cliente + '</td>' +
                    '<td>' + item.nome + '</td>' +
                    '<td  id=code>' + item.cpf + '</td>' +
                    '<td>' + item.cnh + '</td>' +
                    '<td>' + item.endereco + '</td>' +
                    '<td>' + item.cliente_data + '</td>' +
                    '<td>' + item.telefone + '</td>' +
                    '<td>' + item.email + '</td>' +
                    '<td>' + item.senha + '</td>' +
                    '<td> <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#updateModal" data-id="' + item.num_chassi + '"id="btnEditar">Editar</button></td>' +
                    '<td> <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delModal" data-id="' + item.num_chassi + '"id="btnExcluir">Excluir</button></td>')
            })
        }
    })
    // CADASTRAR
    $('#btnSalvar').on('click', function () {

        $('#m-form').on('click', function (event) {
            event.preventDefault()
        })

        var nome = $('#m-nome').val()
        var cpf = $('#m-cpf').val()
        var cnh = $('#m-cnh').val()
        var endereco = $('#m-endereco').val()
        var cliente_data = $('#m-data').val()
        var telefone = $('#m-telefone').val()
        var email = $('#m-email').val()
        var senha = $('#m-senha').val()

        if (nome != '' && cpf != '' && cnh != '' && endereco != '' && cliente_data != '' && telefone != '' && email != '' && senha != '') {

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
                    senha: senha,
                },
                success: function () {
                    alert('Cliente Cadastrado com Sucesso!!!')
                    $('#-form').each(function () {
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
            url: 'http://localhost:3333/cliente/' + id,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                $('#u-nome').val(data.nome)
                // $('#u-cpf').val(data.cpf)
                $('#u-cnh').val(data.cnh)
                $('#u-endereco').val(data.endereco)
                $('#u-data').val(data.cliente_data)
                $('#u-telefone').val(data.telefone)
                $('#u-email').val(data.email)
                $('#u-senha').val(data.senha)

                $('#updateModal').modal('show')
            },
            error: function (error) {
                console.log(error);
                alert('Não foi possivel recuperar os dados')
            }
        })
        $(document).on('click', '#btnAlterar', function () {
            var novoNome = $('#u-nome').val()
            // var novoCpf = $('u-cpf').val()
            var novaCnh = $('#u-cnh').val()
            var novoEndereco = $('#u-endereco').val()
            var novaData = $('#u-data').val()
            var novoTelefone = $('#u-telefone').val()
            var novoEmail = $('#u-email').val()
            var novaSenha = $('#u-senha').val()

            if (novoNome != '' /*&& novoCpf != ''*/ && novaCnh != '' && novoEndereco != '' && novoEmail != '' && novaSenha != '' && novaData != '' && novoTelefone != '') {
                $.ajax({
                    url: 'http://localhost:3333/cliente/' + id,
                    method: 'PATCH',
                    dataType: 'json',
                    data: {
                        nome: novoNome,
                        // cpf: novoCpf,
                        cnh: novaCnh,
                        endereco: novoEndereco,
                        cliente_data: novaData,
                        telefone: novoTelefone,
                        email: novoEmail,
                        senha: novaSenha
                    },
                    success: function () {
                        alert('Cliente atualizado com sucesso!')
                        $('#updateModal').modal('hide')
                        location.reload()
                    },
                    error: function (error) {
                        alert('Não foi possivel atualizar cliente')
                        $('#updateModal').modal('hide')
                        console.log(error);
                        location.reload()
                    }
                })
            } else {
                alert('Falha ao atualizar o cliente')
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
                url: 'http://localhost:3333/cliente/' + id,
                method: "DELETE", //requisição
                success: function () {
                    line.remove()
                    alert('Cliente Excluido com Sucesso!')
                    location.reload()
                },
                error: function (error) {
                    alert('Erro ao Excluir cliente')
                    console.log(error);
                }
            })
        })
    })
})