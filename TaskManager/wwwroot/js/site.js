// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// modal
$(function () {
    const PlaceHolderElement = $('#modal-placeholder');
    $('button[data-bs-toggle="ajax-modal"]').click(function (e) {
        const url = $(this).data('url');
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

// datatable
// $(document).ready(function () {
//     $('#dev-table').DataTable({
//         initComplete: function () {
//             this.api()
//                 .columns()
//                 .every(function () {
//                     var column = this;
//                     var select = $('<select><option value=""></option></select>')
//                         .appendTo($(column.footer()).empty())
//                         .on('change', function () {
//                             var val = $.fn.dataTable.util.escapeRegex($(this).val());

//                             column.search(val ? '^' + val + '$' : '', true, false).draw();
//                         });

//                     column
//                         .data()
//                         .unique()
//                         .sort()
//                         .each(function (d, j) {
//                             select.append('<option value="' + d + '">' + d + '</option>');
//                         });
//                 });
//         },
//     });
// });

$(document).ready(function () {
    $('#myTable').DataTable(
        {
            ajax: {
                url: "Developer/GetDevList",
                type: "POST",
            },
            processing: true,
            serverSide: true,
            filter: true,
            columns: [
                { data: "name", name: "Name"},
                { data: "status", name: "Status",
                    render: function(data , type, row) {
                        return `<span class="${data == 1 ? 'text-success' : 'text-danger'}">${data == 1 ? "Active" : "Invactive"}</span>`
                    } 
                },
            //    { data: "createdAt", name: "CreatedAt" },
            //    { data: "createdById", name: "CreatedById" },
            //    { data: "createdBy", name: "CreatedBy" },
            //    { data: "modifiedAt", name: "ModifiedAt" },
            //    { data: "modifiedId", name: "ModifiedId" },
            ]
        })
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