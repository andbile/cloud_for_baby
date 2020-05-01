(function () {

    // проверка наличия блока для скролинга
    if( $('[data-is-scroll-block]').length === 0) return;

    var ARROW_UP = 38;
    var ARROW_DOWN = 40;
    var $section = $('[data-anchor]');

    // TODO на мобильных версиях можно удалять якаря у блоков которые низя проматывать

    // TODO получать размеры из блока
    var topShift = 95;

    // начальная инициализация
    initial();

    function initial() {
        $('body').css({'overflow' : 'hidden'});

        // определяем на каком слайде была перезагрузка страницы
        var fullHref = document.location.href;
        var anchor = fullHref.slice(fullHref.indexOf('/#') + 2);
        var $currentNode = $section.filter('[data-anchor="' + anchor + '"]');

        $section.removeClass('active');
        $currentNode.addClass('active');
    }




    window.addEventListener('wheel', windowScrollHandler);

    window.addEventListener('keydown', windowScrollHandler);

    // TODO скролл через мобильные экраны
   /* window.addEventListener('scroll', windowScrollHandler);*/

    function windowScrollHandler (event){
        // после срабатывания события отключаем обработчики
        window.removeEventListener('keydown', windowScrollHandler);
        window.removeEventListener('wheel', windowScrollHandler);

        // текущий слайд 
        var $current = $section.filter('.active');
        var currentIndex = $section.index($current);

        // индекс следующего слайда
        var nextNode = getNextIndex(event, currentIndex);

        // проматываем слайд
        scrolling (nextNode);

        // получаем якорь у текущего блока
        // устанавливаем ссылку
        var currentAnchor = $section.eq(nextNode).data("anchor");
        document.location.href = '/#' + currentAnchor;

        // после перемотки включаем обработчики событий
        setTimeout(function () {
            window.addEventListener('keydown', windowScrollHandler);
            window.addEventListener('wheel', windowScrollHandler);
        }, 400);
    }

    // получаем индекс следующего блока
    function getNextIndex (event, currentIndex) {

        // событие - нажатие кнопок на клавиатуре
        var keyCode = event.keyCode;
        var nextNode = currentIndex;

        if(keyCode === ARROW_DOWN || event.deltaY > 10){
            if(nextNode === $section.length - 1){
                nextNode = $section.length - 1;
            }else nextNode = currentIndex + 1;
        }

        if(keyCode === ARROW_UP || event.deltaY < -10){
            if(nextNode === 0){
                nextNode = 0
            }else nextNode = currentIndex - 1;
        }

        return nextNode;
    }

    // прокрутка
    function scrolling (index) {

        var destination = $section.eq(index).offset().top - topShift;

        $('body, html').animate({scrollTop: destination}, 500);

        // удаляем все классы active
        $section.removeClass('active');
        $section.eq(index).addClass('active');
    }
})();