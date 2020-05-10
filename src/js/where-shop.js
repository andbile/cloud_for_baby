(function () {

    // при наведении/клике показать
    var $shopsIitems = $('[data-shop-item]');
    var $shopsIitemLinks = $shopsIitems.find('a');

    // при наведении или клике покажем ссылки
    $shopsIitems.on('mouseover', function () {
        $(this).addClass('active');
        // отключаем мгновенный переход по ссылкам
        $shopsIitemLinks.on('click', disableLink);

        setTimeout(function () {
            // включаем переход по ссылкам
            $shopsIitemLinks.unbind('click');
        },100)
    });

    $shopsIitems.on('mouseout', function () {
        $(this).removeClass('active');
    });

    function disableLink(evt) {
        evt.preventDefault();
    }
})();