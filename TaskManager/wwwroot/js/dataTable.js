// DataTable

$(document).ready(function() {
    const myTable = $('#myTable').DataTable({ 
        processing: true,
        bServerSide: true,      
        serverSide: true,
        sort: false,
        searching: false,
        dom: '<"top"l>rt<"bottom"ip><"clear">',
        ajax: {
            url: "Developer/GetDevList",
            type: "POST",
            dataType: "json",
            data: function(data) {
                return $.extend({}, data, {
                    "filter_keywords": $("#search-input").val().toLowerCase(),
                    "filter_option": $("#sort-by").val().toLowerCase(),
                })
            }
        },
    });

    myTable.draw();
    $("#search-input, #sort-by").bind("keyup, change", () => myTable.draw());
});

// $(document).ready(function () {
//     var devTable = $('#myTable').DataTable({
//         ajax: {
//             url: "/Developer/LoadDevList",
//             type: "GET",
//             dataType: "json",
//         },
//         processing: true,
//         // serverSide: true,
//         sort: false,
//         columns: [
//             {data: 'name', name: 'Name'},
//             {data: 'status', name: 'Status'},
//             // {data: 'action', name: 'Action'},
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
//                         if ($.inArray(element.status, status) === -1) {
//                             console.log(element)
//                             status.push(element.status);
//                             statusDropdown.append($('<option/>').attr('value', element.status).text(element.status))
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