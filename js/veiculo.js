$(document).ready(function () {

    $.ajax({
        url: 'http://localhost:3333/veiculo',
        method: "GET",
        dataType: "json",
        success: function (data) {
            var table = $('#cadastro tbody')
            $.each(data, function (index, item) {
                table.append('<tr id=line>' +
                    '<td id=code>' + item.num_chassi + '</td>' +
                    '<td>' + item.ano + '</td>' +
                    '<td>' + item.marca + '</td>' +
                    '<td>' + item.cor + '</td>' +
                    '<td>' + item.modelo + '</td>' +
                    '<td>' + item.placa + '</td>' +
                    '<td>' + item.diaria + '</td>' +
                    '<td>' + item.imagem + '</td>' +
                    '<td>' + item.descricao + '</td>' +
                    '<td> <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#updateModal" data-id="' + item.num_chassi + '"id="btnEditar">Editar</button></td>' +
                    '<td> <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delModal" data-id="' + item.num_chassi + '"id="btnExcluir">Excluir</button></td>')
            })
        }
    })
})