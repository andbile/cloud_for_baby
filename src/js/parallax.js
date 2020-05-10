(function () {

    parallax();

    function parallax() {

        var $clouds = $('.index-section__bg-clouds');
        console.log($clouds);

        $(document).on('mousemove', function (evt) {
            var baseX = 50;
            var baseY = 100;

            var shiftX = baseX - evt.clientX/200;
            var shiftY = baseY + evt.clientY/25;

            var str = shiftX + '%' + ' ' + shiftY + '%';

            $clouds.css('background-position', str);
        });
    }
})();