$(document).ready(function () {
    $("body").addClass("fade-in active");

    $("a").on("click", function (e) {
        e.preventDefault();
        var newLocation = this.href;

        $("body").removeClass("fade-in active").addClass("fade-out active");

        setTimeout(function () {
            window.location = newLocation;
        }, 100); 
    });
});