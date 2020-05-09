(function () {

    // плавающий main-header -- data-main-header
    mainHeaderScrollHandler();

    function mainHeaderScrollHandler(){
        // обёртка main-header, высота
        var $parentNode = $('[data-main-header--parent]');
        // плавающий main-header (display = fixed)
        var $headerNode = $('[data-main-header-hover]');

        // установка высоты для обёртки и плавающего  main-header
        var heightHeaderNode = Math.round($headerNode.innerHeight());
        $parentNode.innerHeight(heightHeaderNode);
        $headerNode.innerHeight(heightHeaderNode);

        $headerNode.addClass("fixed");

    }

    // показываем выпадающее меню
    var $btn = $('[data-main-menu-btn-show]');
    var $btnClose = $('[data-main-menu-btn--close]');
    var $popupMenu = $('[data-main-menu]');
    var $overlay = $('#overlay--main-header');

    // показываем меню
    $btn.on('click', function () {
        $popupMenu.toggleClass('active');
        TweenMax.to($popupMenu, 0.5, {delay:0.2, right: 0, opacity: 1});
        $overlay.toggleClass('active');
    });

    // скрываем меню
    $btnClose.on('click', function () {
        $overlay.removeClass('active');
        $overlay.addClass('active--fadeout');
        console.log($overlay);
        TweenMax.to($popupMenu, 0.5, {delay:0.3, right: '-500px', opacity: 0, onComplete: function () {
                $popupMenu.toggleClass('active');
                $overlay.removeClass('active--fadeout');
            }});
    })

})();