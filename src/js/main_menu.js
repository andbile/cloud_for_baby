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

        // при скроле двигаем меню
        $(window).scroll(function(){
            var scrollTop = $(window).scrollTop();
            if (scrollTop > 1){
                $headerNode.addClass("fixed");
            } else if(scrollTop <= 1) {
                $headerNode.removeClass("fixed");
            }
        });


        // кнопка
        //var $btn = $('[data-popup-btn]');


        // подменю
        //var $submenu = $('[data-main-submenu]');


        // показываем выпадающее меню
     /*   $btn.on('click', function (e) {
            $(this).toggleClass('active');

            if($btn.hasClass('active')){
                $submenu.addClass('active');
                var height = menuHeight + 'px';
                TweenMax.to($submenu, 1, {delay:0.3, top: height, opacity: 1});
            }else{
                TweenMax.to($submenu, 1, {delay:0.3, top: '-1000px', opacity: 0});
            }
        });*/


        // кнопка поиска
       /* $('[data-btn-search]').on('click', function (e) {
            e.preventDefault();

            $(".input").toggleClass("active");
            $(".main-menu__search").toggleClass("active");
            $(this).toggleClass('active');
        });*/
    }

    // показываем выпадающее меню
    var $btn = $('[data-main-menu-btn-show]');
    var $btnClose = $('[data-main-menu-btn--close]');
    var $popupMenu = $('[data-main-menu]');

    // показываем меню
    $btn.on('click', function () {
        $popupMenu.toggleClass('active');
        TweenMax.to($popupMenu, 0.5, {delay:0.2, right: 0, opacity: 1});
    });

    // скрываем меню
    $btnClose.on('click', function () {
        TweenMax.to($popupMenu, 0.5, {delay:0.3, right: '-500px', opacity: 0, onComplete: function () {
                $popupMenu.toggleClass('active');
            }});
    })



})();