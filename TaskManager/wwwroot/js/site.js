// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
// modal

$(function () {
    const PlaceHolderElement = $('#modal-placeholder');
    $('button[data-bs-toggle="ajax-modal"]').click(function (e) {
        const url = $(this).data('url');
        console.log(this);
        const decodeUrl = decodeURIComponent(url);
        $.get(decodeUrl).done(function (data) {
            PlaceHolderElement.html(data);
            PlaceHolderElement.find('.modal').modal('show');
        })
    })

    PlaceHolderElement.on('click', '[data-bs-save="modal"]', function (e) {
        const form = $(this).parents('.modal').find('form');
        const actionUrl = form.attr('action');
        const sendData = form.serialize();
        $.post(actionUrl, sendData).done(function (data) {
            PlaceHolderElement.find('.modal').modal('hide');
            window.location.reload();
        })
    })
})

// DataTable
$(document).ready(function () {

    $('#myTable tfoot th').each(function () {
        const title = $('#myTable thead th').eq($(this).index()).text();
        $(this).html(`<input type="text" placeholder="Search ${title}" />`);
    });

    var table = $('#myTable').DataTable({
        ajax: {
            url: "Developer/GetDevList",
            type: "POST",
            dataType: "json",
        },
        paging: true,
        processing: true,
        serverSide: true,
        filter: true,
        sort: false,
        searching: true,
    });


    // table.columns().every(function () {
    //     var that = this;

    //     $('input', this.footer()).on('keyup change clear', function () {
    //         console.log('search-> ', that.search())
    //         console.log('value->', this.value)
    //         if (that.search() !== this.value) {
    //             that.search(this.value).draw();
    //         }
    //     });
    // });
});

// $(document).ready(function () {
//     $("#dev-table").DataTable({
//         "serverSide": "true",
//         "ajax": {
//             "url": "/Developer/GetDevs",
//             "type": "POST",
//             "dataType": "json"
//         },
//         "columns":[
//             {"data": "Name", "name": "Name"},
//             {"data": "Status", "name": "Status"},
//         ]
//     });
// });