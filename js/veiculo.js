$(document).ready(function () {

    $.ajax({
        url: 'http://localhost:3333/veiculo',
        method: "GET",
        dataType: "json",
        success: function (data) {
            var table = $('#cadastro tbody')
            $.each(data, function (index, item) {
                table.append('<tr id=line>' +
                    '<td>' + item.num_chassi + '</td>' +
                    '<td>' + item.ano + '</td>' +
                    '<td>' + item.marca + '</td>' +
                    '<td>' + item.cor + '</td>' +
                    '<td>' + item.modelo + '</td>' +
                    '<td id=code>' + item.placa + '</td>' +
                    '<td>' + item.diaria + '</td>' +
                    '<td>' + item.imagem + '</td>' +
                    '<td>' + item.descricao + '</td>' +
                    '<td> <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#updateModal" data-id="' + item.num_chassi + '"id="btnEditar">Editar</button></td>' +
                    '<td> <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delModal" data-id="' + item.num_chassi + '"id="btnExcluir">Excluir</button></td>')
            })
        }
    })

    $('#btnSalvar').on('click', function () {

        //evitar o envio do form em branco
        $('#m-form').on('click', function (event) {
            event.preventDefault()
        })

        //le o conteudo do input e armazena na variavel
        var chassi = $('#m-chassi').val()
        var ano = $('#m-ano').val()
        var marca = $('#m-marca').val()
        var cor = $('#m-cor').val()
        var modelo = $('#m-modelo').val()
        var placa = $('#m-placa').val()
        var diaria = $('#m-diaria').val().replace(',', '.')
        var descricao = $('#m-descricao').val()
        var imagem = $('#m-imagem').val()
        //verificar se todos os campos estao preenchidos
        if (chassi != '' && ano != '' && marca != '' && cor != '' && imagem != '' && modelo != '' && placa != '' && diaria != '' && descricao != '') {

            //envia o POST
            $.ajax({
                url: 'http://localhost:3333/veiculo', //endereço
                method: "POST", //requisição
                caches: false,
                dataType: "json", //tipo de dados
                data: {
                    num_chassi: chassi,
                    ano: ano,
                    marca: marca,
                    cor: cor,
                    modelo: modelo,
                    placa: placa,
                    diaria: diaria,
                    descricao: descricao,
                    imagem: imagem
                },
                success: function () {
                    alert('Produto cadastrado com sucesso!')
                    $('#m-form').each(function () { //cada envio
                        this.reset() //limpa o formulario
                        $('#addModal').modal('hide') //ocuta o modal apos o envio
                    })
                    location.reload()//atualiza a pagina pos o fechamento do modal
                }
            })
        }
        else {
            $('#addModal').modal('hide') //ocuta o modal
            alert('Preencha corretamente os dados') //emite um alert
        }
    })
    $(document).on('click', '#btnEditar', function () {
        var line = $(this).closest('tr')
        var id = line.find('#code').text()

        $.ajax({
            url: 'http://localhost:3333/veiculo/' + id,
            method: "GET", //requisição
            dataType: "json", //tipo de dados
            success: function (data) {
                $('#u-chassi').val(data.num_chassi)
                $('#u-ano').val(data.ano)
                $('#u-marca').val(data.marca)
                $('#u-cor').val(data.cor)
                $('#u-modelo').val(data.modelo)
                $('#u-placa').val(data.placa)
                $('#u-diaria').val(data.diaria)
                $('#u-imagem').val(data.imagem)
                $('#u-descricao').val(data.descricao)

                $('#updateModal').modal('show') //mostra no modal
            },
            error: function (error) {
                console.log(error);
                alert('Não foi possivel recuperar os dados.');
            }
        })
        $(document).on('click', '#btnAlterar', function () {

            //ler os dados no input e armazenar nas variavel
            var novoChassi = $('#u-chassi').val()
            var novoAno = $('#u-ano').val()
            var novaMarca = $('#u-marca').val()
            var novaCor = $('#u-cor').val()
            var novoModelo = $('#u-modelo').val()
            var novaPlaca = $('#u-placa').val()
            var novaDiaria = $('#u-diaria').val().replace(',', '.')
            var novaDescricao = $('#u-descricao').val()
            var novaImagem = $('#u-imagem').val()

            if (novoChassi != '' && novoAno != '' && novaMarca != '' && novaCor != '' && novoModelo != '' && novaPlaca != '' && novaDiaria != '' && novaDescricao != '' && novaImagem != '') {
                $.ajax({
                    url: 'http://localhost:3333/veiculo/' + id,
                    method: "PATCH", //requisição
                    dataType: "json", //tipo de dados
                    data: {
                        num_chassi: novoChassi,
                        ano: novoAno,
                        marca: novaMarca,
                        cor: novaCor,
                        modelo: novoModelo,
                        placa: novaPlaca,
                        diaria: novaDiaria,
                        imagem: novaImagem,
                        descricao: novaDescricao
                    },
                    success: function () {
                        alert('Produto atualizado com sucesso!')
                        $('#updateModal').modal('hide')
                        location.reload()
                    },
                    error: function (error) {
                        alert('Não foi possivel atualizar o Produto!')
                        $('#updateModal').modal('hide')
                        console.log(error);
                        location.reload()
                    }
                })
            } else {
                alert('Falha ao atualizar o produto')
            }
        })
    })

    $(document).on('click', '#btnExcluir', function () {
        var line = $(this).closest('tr')
        var id = line.find('#code').text()
        $('#deleteModal').modal('show')

        $(document).on('click', '#btnSim', function () {
            $.ajax({
                url: 'http://localhost:3333/veiculo/' + id,
                method: "DELETE", //requisição
                success: function () {
                    line.remove()
                    alert('Veiculo Excluido com Sucesso!')
                    location.reload()
                },
                error: function (error) {
                    alert('Erro ao Excluir Veiculo')
                    console.log(error);
                }
            })
        })
    })
})