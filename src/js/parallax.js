(function () {

    parallax();

    function parallax() {
        var $clouds = $('.index-section__baby-bg-bottom-img-1');
        var $houses = $('.index-section__baby-bg-bottom-img-2');
        console.log();
        // базовый background-position у элемента, %
        var baseX = 50;
        var baseY = 100;

        $(document).on('mousemove', function (evt) {
            var shiftX = baseX - evt.clientX/200;
            var shiftY = baseY + evt.clientY/25;

            var str = shiftX + '%' + ' ' + shiftY + '%';

            $clouds.css('background-position', str);
            $houses.css('background-position', str);
        });
    }
})();