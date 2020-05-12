(function () {
    // проверка наличия блока для скролинга
    if( $('[data-is-scroll-block]').length === 0) return;

    var ARROW_UP = 38;
    var ARROW_DOWN = 40;
    var WINDOW_WIDTH_MIN = 1024;
    // TODO TOP_SHIFT получать динамически из размера main-header
    var TOP_SHIFT = 95;

    window.enableScroll = enableScroll;
    window.disableScroll = disableScroll;
    window.WINDOW_WIDTH_MIN = WINDOW_WIDTH_MIN;


    var $sections = $('[data-anchor]');

    if(device.type === 'desktop' && $(window).width() >= WINDOW_WIDTH_MIN){
        // включение прокрутки
        enableScroll();
    }else{
        disableScroll();
    }

    // при ресайзе, сбрасываем все настройки по умолчанию
    var isEventResize = false;
    $(window).resize(function() {
        setTimeout(function () {
            if(!isEventResize){
                if(device.type === 'desktop' && $(window).width() >= WINDOW_WIDTH_MIN) {
                    enableScroll();
                }
                else disableScroll();
                isEventResize = true;
            }
        },500);
        isEventResize = false;
    });

    // отключаем прокрутку по секциям и возвращаем установки
    function disableScroll() {
        $('body').css({'overflow' : 'visible'});
        
        window.removeEventListener('keydown', windowScrollHandler);
        window.removeEventListener('wheel', windowScrollHandler);
    }

    // включение прокрутки
    function enableScroll() {
        $('body').css({'overflow' : 'hidden'});

        // определяем на каком слайде была перезагрузка страницы
        var fullHref = document.location.href;
        var anchor = fullHref.slice(fullHref.indexOf('#') + 1);
        var $currentNode = $sections.filter('[data-anchor="' + anchor + '"]');

        // удаляем пометки у слайдов и ставим на текущем активном (показанном)
        $sections.removeClass('active');
        $currentNode.addClass('active');

        window.addEventListener('wheel', windowScrollHandler);
        window.addEventListener('keydown', windowScrollHandler);
    }


    // TODO скролл через мобильные экраны
   /* window.addEventListener('scroll', windowScrollHandler);*/

    function windowScrollHandler (evt){
        // после срабатывания события отключаем обработчики
        window.removeEventListener('keydown', windowScrollHandler);
        window.removeEventListener('wheel', windowScrollHandler);

        // текущий слайд 
        var $current = $sections.filter('.active');
        var currentIndex = $sections.index($current);

        // индекс следующего слайда
        var nextNode = getNextIndex(evt, currentIndex);

        // проматываем слайд
        scrolling (nextNode);

        // получаем якорь у текущего блока и устанавливаем ссылку
        var currentAnchor = $sections.eq(nextNode).data("anchor");
        document.location.hash = '#' + currentAnchor;

        // после перемотки включаем обработчики событий
        setTimeout(function () {
            window.addEventListener('keydown', windowScrollHandler);
            window.addEventListener('wheel', windowScrollHandler);
        }, 400);
    }

    // получаем индекс следующего блока
    function getNextIndex (evt, currentIndex) {

        // событие - нажатие кнопок на клавиатуре
        var keyCode = evt.keyCode;
        var nextNode = currentIndex;

        if(keyCode === ARROW_DOWN || evt.deltaY > 10){
            if(nextNode === $sections.length - 1){
                nextNode = $sections.length - 1;
            }else nextNode = currentIndex + 1;
        }

        if(keyCode === ARROW_UP || evt.deltaY < -10){
            if(nextNode === 0){
                nextNode = 0
            }else nextNode = currentIndex - 1;
        }

        return nextNode;
    }

    // прокрутка
    function scrolling (index) {

        var destination = $sections.eq(index).offset().top - TOP_SHIFT;

        $('body, html').animate({scrollTop: destination}, 500);

        // удаляем все классы active
        $sections.removeClass('active');
        $sections.eq(index).addClass('active');
    }


    /*var fullPage = $('#fullpage').fullpage({
        sectionSelector: '.index-full-view',
         scrollBar:true,
        autoScrolling:true,
        // scrollHorizontally: true,
        anchors: ['first', 'baby1', 'baby2', 'baby3-slider', 'specifications', 'baby-slider', 'questions', 'reviews', 'about', 'where-buy', 'footer'],
        afterLoad: function(origin, destination, direction){
            // Nav scroll
            if ($(window).width() > 767) {
                setTimeout(function() {
                    if ($('body').hasClass('fp-viewing-section-1')) {
                        $('.header').removeClass('js-header-fixed');
                    } else {
                        $('.header').addClass('js-header-fixed');
                    }
                }, 50);
            }
            if ($('body').hasClass('fp-viewing-section-3') || $('body').hasClass('fp-viewing-section-4')) {
                $('.step-2').addClass('js-active');
            } else {
                // $('.step-2').removeClass('js-active');
            }

            if ($('body').hasClass('fp-viewing-section-4')) {
                $('.step-3').addClass('js-active');
            } else {
                $('.step-3').removeClass('js-active');
            }

            if ($('body').hasClass('fp-viewing-section-2') || $('body').hasClass('fp-viewing-section-3') || $('body').hasClass('fp-viewing-section-4')) {
                $('.step-1 .steps__img').addClass('js-active');
            }

            if ($('body').hasClass('fp-viewing-section-2') || $('body').hasClass('fp-viewing-section-3') || $('body').hasClass('fp-viewing-section-4')) {
            } else {
                $('.step-1 .steps__img').removeClass('js-active');
            }

            /!*if ($('body').hasClass('fp-viewing-section-1') || $('body').hasClass('fp-viewing-section-2') || $('body').hasClass('fp-viewing-section-3') || $('body').hasClass('fp-viewing-section-4')) {
               $('.img-sky').removeClass('js-active');
            } else {
               $('.img-sky').addClass('js-active');
            }*!/
        },

    });*/

})();