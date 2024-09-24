
$(document).ready(function () {
    let currentIndex = 0;
    const images = $('.image-container');
    const totalImages = images.length;

    function showImage(index) {
        images.removeClass('visible').addClass('hidden');
        $(images[index]).removeClass('hidden').addClass('visible');
    }

    $('.body-content').on('touchend', function (e) {
        e.preventDefault(); // Prevent the default scroll behavior
        currentIndex = (currentIndex + 1) % totalImages;
        showImage(currentIndex);
    });
});