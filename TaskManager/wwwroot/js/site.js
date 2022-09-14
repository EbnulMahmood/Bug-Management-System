// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// qa modal
$(function () {
    const PlaceHolderElement = $('#modal-placeholder');
    $('button[data-bs-toggle="ajax-modal"]').click(function (e) {
        const url = $(this).attr('data-url');
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

// dev modal
$(function () {
    const PlaceHolderElement = $('#modal-placeholder-dev');
    $(document).on("click", ".btn-delete", function() {
        const id = $(this).attr('data-dev-id');
        const url = `Developer/Delete/${id}`;
        const decodeUrl = decodeURIComponent(url);
        $.get(decodeUrl).done(function (data) {
            PlaceHolderElement.html(data);
            PlaceHolderElement.find('.modal').modal('show');
        })
    });

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

    var myTable = $('#myTable').DataTable({
        ajax: {
            url: "Developer/GetDevList",
            type: "POST",
            dataType: "json",
        },
        processing: true,
        serverSide: true,
        sort: false,
        searching: true,
    });

    myTable.columns().every(function () {
        var that = this;
        $('input', this.footer()).on('keyup change clear', function () {
            console.log('search-> ', that.search())
            console.log('value->', this.value)
            if (that.search() !== this.value) {
                that.search(this.value).draw();
            }
        });
    });
});

// $(document).ready(function () {
//     var devTable = $('#myTable').DataTable({
//         ajax: {
//             url: "Developer/GetDevList",
//             type: "POST",
//             dataType: "json",
//         },
//         processing: true,
//         serverSide: true,
//         searching: true,
//         sort: false,
//         columns: [
//             {data: 'name'},
//             {data: 'status'},
//             {data: 'action'},
//         ],
//         dom: '<"top"l>rt<"bottom"ip><"clear">',
//         fnInitComplete: function(oSettings, json) {
//             addSearchControl(json);
//         },
//     });

//     var addSearchControl = (json) => {
//         $('#myTable thead').append($('#myTable thead tr:first').clone());
//         $('#myTable thead tr:eq(1) th').each(function(index) {
//             if ($(this).html() !== 'Action') {
//                 if (index !== 1) {
//                     $(this).replaceWith(`<th><input type="text" placeholder="Search ${$(this).html()}" /></th>`);
//                     var searchControl = $(`#myTable thead tr:eq(1) th:eq(${index}) input`);
//                     searchControl.on('keyup', function() {
//                         devTable.column(index).search(searchControl.val()).draw();
//                     })
//                 } else {
//                     var statusDropdown = $('<select/>');
//                     statusDropdown.append($('<option/>').attr('value', '').text('Select Status'));
//                     var status = [];
//                     $(json.data).each(function(index, element) {
//                         if ($.inArray(element.CustomStatus, status) === -1) {
//                             console.log(element.CustomStatus)
//                             status.push(element.CustomStatus);
//                             statusDropdown.append($('<option/>').attr('value', element.CustomStatus).text(element.CustomStatus))
//                         }
//                     });
//                     $(this).replaceWith(`<th> ${$(statusDropdown).prop('outerHTML')}</th>`);
//                     var searchControl = $(`#myTable thead tr:eq(1) th:eq(${index}) select`);
//                     searchControl.on('change', function() {
//                         devTable.column(index).search(searchControl.val() == "" ? "" : `^${searchControl.val()}$`).draw();
//                     })
//                 }
//             }
//         });
//     }
// });