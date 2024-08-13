$(document).ready(function () {
    // Ambil ukuran layar dari localStorage jika ada, jika tidak gunakan nilai default
    var screenWidth = localStorage.getItem('screenWidth') || screen.width;
    console.log('screenWidth:', screenWidth);

    $('#ukuranLayar').val(screenWidth);

    // Set lebar elemen #container
    $('#container').css('width', screenWidth + 'px');
});

function sesuaikanUkuran() {
    var newScreenWidth = $('#ukuranLayar').val();

    if ($('#otomatis:checked').val() == '1') {
        newScreenWidth = screen.width;
    } else {
        newScreenWidth = parseInt(newScreenWidth);
    }


    $('#container').css('width', newScreenWidth + 'px');
    localStorage.setItem('screenWidth', newScreenWidth);
    $('#ukuranLayar').val(localStorage.getItem('screenWidth'));

    location.reload();
}

function formatPay(val) {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function parseNominalToInt(val) {
    return parseInt(val.replace(/\./g, ''));
}

function parseIntToNominal(val) {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}