$('#addPerson').on('click', function () {
    let formPerson = contentPerson();

    $(formPerson).hide().prependTo('#person').fadeIn(); // Fade in effect when adding a person

    initFunction();
});

function removePerson() {
    $('.btn-delete-person').on('click', function () {
        $(this).closest('.card').fadeOut(function () {
            $(this).remove();
            countPerson();
        });
    });
}

function contentPerson() {
    let row = $('#person .card').length;

    return `<div class="card p-3 mb-5 border">
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="form-group mb-3">
                    <label class="form-label" for="nama-${row}">Nama</label>
                    <input type="text" id="nama-${row}" name="nama[]" class="form-control" />
                </div>
            </div>
            <div class="col-12 col-md-6">
                <div class="form-group mb-3">
                    <label class="form-label" for="title-${row}">Title</label>
                    <select name="title[]" id="title-${row}" class="form-control">
                        <option value="Mr.">Mr.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Tuan">Tuan</option>
                        <option value="Ny.">Ny.</option>
                        <option value="Bapak">Bapak</option>
                        <option value="Ibu">Ibu</option>
                    </select>
                </div>

                <div style="position: absolute; right: -5px; top: -5px">
                    <span class="badge bg-danger btn-delete-person">
                        <i class="fa fa-times"></i>
                    </span>
                </div>
            </div>
            <div class="col-12">
                <div class="form-group mb-3">
                    <label class="form-label" for="identitas-${row}">KTP/NIK</label>
                    <input type="text" id="identitas-${row}" name="identitas[]" class="form-control" />
                </div>
            </div>
            <div class="col-12">
                <div class="form-group mb-3">
                    <label class="form-label" for="nomorPlat-${row}">Nomor Plat</label>
                    <input type="text" id="nomorPlat-${row}" name="nomorPlat[]" class="form-control" />
                </div>
            </div>
            <div class="col-12">
                <div class="form-group mb-3">
                    <label class="form-label" for="foto-${row}">Foto</label>
                    <input type="file" class="form-control" id="foto-${row}" name="foto[]" />
                </div>
            </div>
        </div>
    </div>`;
}

function countPerson() {
    let total = $('#person .card').length;

    $(`#totalPerson`).text(total);
}

function initFunction() {
    countPerson();
    removePerson();
}

initFunction();