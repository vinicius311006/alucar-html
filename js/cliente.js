$(document).ready(function () {

    $.ajax({
        url: 'http://localhost:3333/cliente',
        method: "GET",
        dataType: "json",
        success: function (data) {
            var table = $('#cadastro tbody')
            $.each(data, function (index, item) {
                table.append('<tr id=line>' +
                    '<td id=code>' + item.id_cliente + '</td>' +
                    '<td>' + item.nome + '</td>' +
                    '<td>' + item.cpf + '</td>' +
                    '<td>' + item.cnh + '</td>' +
                    '<td>' + item.endereco + '</td>' +
                    '<td>' + item.email + '</td>' +
                    '<td>' + item.senha + '</td>' +
                    '<td> <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#updateModal" data-id="' + item.num_chassi + '"id="btnEditar">Editar</button></td>' +
                    '<td> <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delModal" data-id="' + item.num_chassi + '"id="btnExcluir">Excluir</button></td>')
            })
        }
    })
})