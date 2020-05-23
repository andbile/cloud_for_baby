(function () {


    // проверяем - открывается ли модальное окно в документе который скролится
    var isScrollBlock;
    if( $('[data-is-scroll-block]').length === 0){
        isScrollBlock = false;

        // если основное меню находится не на странице со скролингом
        $('.main-header').css('position', 'relative');


    } else isScrollBlock = true;


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

    if(isScrollBlock){
        menuBtns.on('click', scrollToSection);
    }else{
        menuBtns.remove('click', scrollToSection);
    }

    function scrollToSection(evt){
        evt.preventDefault();
        // получаем часть адреса из нажатой ссылки для поиска элемента по id
        var href = $(this).attr('href');
        var indexStr = href.indexOf('#');

        // если ссылка ссылается на другую станицу (без якаря)
        if(indexStr === -1){
            var host = document.location.host;
            var protocol = document.location.protocol;

            var newUrl = protocol + '//' + host + '/' + href;
            document.location.href = newUrl;
        }else{
            var idAnchor = href.slice(indexStr);

            var element = $(idAnchor);

            var destination = element.offset().top;

            // TODO желательно делать условием body иначе html - что бы срабатывала два раза функция
            $('body, html').animate({scrollTop: destination}, 500, function () {
                closeMenu();
            });

            document.location.hash = idAnchor;

            var $sections = $('[data-anchor]');

            // удаляем все классы active
            $sections.removeClass('active');
            element.addClass('active');
        }
    }
})();