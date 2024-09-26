
function changeHeightBodyWrap() {
    let cardItems = $('.card-item').length;

    if (cardItems < 4) {
        $('.body-wrap').css('height', '100vh');
    }
}

changeHeightBodyWrap();