// DataTable

$(document).ready(function () {

    $('#myTable tfoot th').each(function () {
        const title = $('#myTable thead th').eq($(this).index()).text();
        $(this).html(`<input type="text" placeholder="Search ${title}" />`);
    });

    const myTable = $('#myTable').DataTable({
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
        const that = this;
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
//                         devTable.column(index).search(searchControl.val() == "" ? "" : `^${searchControl.val()}$`, true, false).draw();
//                     })
//                 }
//             }
//         });
//     }
// });