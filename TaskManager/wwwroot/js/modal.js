
const showModal = (url, PlaceHolderElement) => {
    const decodeUrl = decodeURIComponent(url);
    $.get(decodeUrl).done(function (data) {
        PlaceHolderElement.html(data);
        PlaceHolderElement.find('.modal').modal('show');
    })
}

const modalAction = (PlaceHolderElement, that) => {
    const form = that.parents('.modal').find('form');
    const actionUrl = form.attr('action');
    const sendData = form.serialize();
    $.post(actionUrl, sendData).done(function (data) {
        PlaceHolderElement.find('.modal').modal('hide');
        window.location.reload();
    })
}

// qa modal
$(function () {
    const PlaceHolderElementQa = $('#modal-placeholder-qa');
    $('button[data-bs-toggle="ajax-modal"]').click(function (e) {
        const url = $(this).attr('data-url');
        showModal(url, PlaceHolderElementQa);
    })
    PlaceHolderElementQa.on('click', '[data-bs-save="modal"]', function (e) {
        modalAction(PlaceHolderElementQa, $(this));
    })
});

// dev modal
$(function () {
    const PlaceHolderElementDev = $('#modal-placeholder-dev');
    $(document).on("click", ".btn-delete", function() {
        const id = $(this).attr('data-dev-id');
        const url = `Developer/Delete/${id}`;
        showModal(url, PlaceHolderElementDev);
    });

    PlaceHolderElementDev.on('click', '[data-bs-save="modal"]', function (e) {
        modalAction(PlaceHolderElementDev, $(this))
    })
})