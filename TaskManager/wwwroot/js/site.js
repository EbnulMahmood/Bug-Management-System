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
            // columns: [
            //     { data: "name", name: "Name"},
            //     { data: "status", name: "Status",
            //         render: function(data , type, row) {
            //             return `<span class="${data == 1 ? 'text-success' : 'text-danger'}">
            //                 ${data == 1 ? "Active" : "Invactive"}
            //             </span>`
            //         } 
            //     },
                // {"mRender": function ( data, type, row ) {
                //     return `<a href="Developer/Edit/${row.id}"
                //                 class="btn btn-primary mx-2">
                //                 <i class="bi bi-pencil-square"></i>
                //                     Edit
                //             </a>`;
                //     }
                // },
                // {"mRender": function ( data, type, row ) {
                //     return `<a href="Developer/Details/${row.id}"
                //                 class="btn btn-secondary mx-2">
                //                 <i class="bi bi-ticket-detailed"></i>
                //                     Details
                //             </a>`;
                //     }
                // }
            // ]
        })
});

$(document).ready(function() {
    $(".delete-dev").on('click', function() {
        console.log('Clicked!')
    })
})
 
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