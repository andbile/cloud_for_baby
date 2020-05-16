(function () {

    // показываем выпадающее меню
    var $btn = $('[data-main-menu-btn-show]');
    var $btnClose = $('[data-main-menu-btn--close]');
    var $popupMenu = $('[data-main-menu]');
    var $overlay = $('#overlay--main-header');

    // показываем меню
    $btn.on('click', function () {
        $popupMenu.toggleClass('active');
        TweenMax.to($popupMenu, 0.5, {delay:0.1, right: 0, opacity: 1});
        $overlay.toggleClass('active');
    });

    // скрываем меню
    $btnClose.on('click', function () {
        closeMenu();
    });

    function closeMenu(){
        $overlay.removeClass('active');
        $overlay.addClass('active--fadeout');
        TweenMax.to($popupMenu, 0.5, {delay:0.1, right: '-500px', opacity: 0, onComplete: function () {
                $popupMenu.toggleClass('active');
                $overlay.removeClass('active--fadeout');
            }});
    }

    // нажатие на ссылки в меню
    var menuBtns = $popupMenu.find('.main-menu__list a');

    menuBtns.on('click', function (evt) {
        evt.preventDefault();
        var idAttr = $(this).attr('href');
        var element = $(idAttr);

        var destination = element.offset().top;

        // TODO желательно делать условием body иначе html - что бы срабатывала два раза функция
        $('body, html').animate({scrollTop: destination}, 500, function () {
            closeMenu();
        });

        var $sections = $('[data-anchor]');

        // удаляем все классы active
        $sections.removeClass('active');
        element.addClass('active');
    });
})();