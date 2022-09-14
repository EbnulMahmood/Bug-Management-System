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

    var table = $('#myTable').DataTable({
        ajax: {
            url: "Developer/GetDevList",
            type: "POST",
            dataType: "json",
        },
        // paging: true,
        processing: true,
        serverSide: true,
        // filter: true,
        // sort: false,
        searching: true,
        // columns: [
        //     {data: 'name'},
        //     {data: 'status'},
            // {data: 'id',
            //     render: function(id) {
            //         return `
            //         <div class='w-75 btn-group' role='group'>
            //             <a href='Developer/Edit/${id}'class='btn btn-primary mx-2'><i class='bi bi-pencil-square'></i>Edit</a>
            //             <a href='Developer/Details/${id}' class='btn btn-secondary mx-2'><i class='bi bi-trash-fill'></i>Details</a>
            //             <button id='dev-del' class='btn btn-danger mx-2' onClick=${DeleteDev(`/Developer/Delete/${id}`)}>Delete</button>
            //         </div>
            //         `
            //     }
            // },
        //     {data: 'action'},
        // ]
    });

    table.columns().every(function () {
        var that = this;

        $('input', this.footer()).on('keyup change clear', function () {
            console.log('search-> ', that.search())
            console.log('value->', this.value)
            if (that.search() !== this.value) {
                that.search(this.value).draw();
            }
        });
    });

    // $(document).on("click",".btn-delete",function() {
    //     const id = $(this).attr('data-dev-id');
    //     const url = `Developer/Delete/${id}`;
    //     console.log(url);
    //     const PlaceHolderElement = $('#modal-placeholder');
    //     $('button[data-bs-toggle="ajax-modal"]').click(function (e) {
    //         const decodeUrl = decodeURIComponent(url);
    //         $.get(decodeUrl).done(function (data) {
    //             PlaceHolderElement.html(data);
    //             PlaceHolderElement.find('.modal').modal('show');
    //         })
    //     })
    //     PlaceHolderElement.on('click', '[data-bs-save="modal"]', function (e) {
    //         const form = $(this).parents('.modal').find('form');
    //         const actionUrl = form.attr('action');
    //         const sendData = form.serialize();
    //         $.post(actionUrl, sendData).done(function (data) {
    //             PlaceHolderElement.find('.modal').modal('hide');
    //             window.location.reload();
    //         })
    //     })
    // });

    // const DeleteDev = (url) => {
    //     console.log(document.getElementById('dev-del'));
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!'
    //       }).then((result) => {
    //         if (result.isConfirmed) {
    //             fetch(url, {
    //               method: 'DELETE',
    //               headers: {
    //                 'Content-Type': 'application/json',
    //               },
    //             })
    //             .then((response) => response.json())
    //             .then((data) => {
    //                 Swal.fire(
    //                     'Deleted!',
    //                     `Your file has been deleted. ${data}`,
    //                     'success'
    //                 )
    //                 table.ajax.reload();
    //                 console.log('Success:', data);
    //             })
    //             .catch((error) => {
    //                 console.error('Error:', error);
    //             });
    //         }
    //       });
    // }
});
