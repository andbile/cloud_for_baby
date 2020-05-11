(function () {
    // проверка наличия блока для скролинга
    if( $('[data-is-scroll-block]').length === 0) return;

    var ARROW_UP = 38;
    var ARROW_DOWN = 40;
    var WINDOW_WIDTH_MIN = 1024;
    // TODO TOP_SHIFT получать динамически из размера main-header
    var TOP_SHIFT = 95;

    var $sections = $('[data-anchor]');

    if(device.type === 'desktop' && $(window).width() >= WINDOW_WIDTH_MIN){
        // включение прокрутки
        enable();
    }else{
        disable();
    }

    // при ресайзе, сбрасываем все настройки по умолчанию
    var isEventResize = false;
    $(window).resize(function() {
        setTimeout(function () {
            if(!isEventResize){
                if(device.type === 'desktop' && $(window).width() >= WINDOW_WIDTH_MIN) {
                    enable();
                }
                else disable();
                isEventResize = true;
            }
        },500);
        isEventResize = false;
    });

    // отключаем прокрутку по секциям и возвращаем установки
    function disable() {
        $('body').css({'overflow' : 'visible'});
        
        window.removeEventListener('keydown', windowScrollHandler);
        window.removeEventListener('wheel', windowScrollHandler);
    }

    // включение прокрутки
    function enable() {
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

        document.location.href = document.location.hostname +  '#' + currentAnchor;

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
})();