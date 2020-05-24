(function () {
    var ARROW_UP = 38;
    var ARROW_DOWN = 40;
    var WINDOW_WIDTH_MIN = 1024;

    window.enableScroll = enableScrollingPC;
    window.disableScroll = disableScrollingPC;
    window.WINDOW_WIDTH_MIN = WINDOW_WIDTH_MIN;

    // проверка наличия блока для скролинга
    if( $('[data-is-scroll-block]').length === 0) return;

    var $sections = $('[data-anchor]');

    if(device.type === 'desktop'){
        // включение прокрутки
        enableScrollingPC();
    }

    if(device.type === 'mobile' || device.type === 'tablet'){
        enableScrollingMobile();
    }


    // включение прокрутки ПК-версия
    function enableScrollingPC() {
        $('body').css({'overflow' : 'hidden'});

        // определяем на каком слайде была перезагрузка страницы
        var $currentNode = getCurrentNode();

        // удаляем пометки у всех слайдов и ставим на текущем активном (показанном) после перезагрузки
        setCurrentNode($currentNode);

        window.addEventListener('wheel', windowKeyDownWheelHandler);
        window.addEventListener('keydown', windowKeyDownWheelHandler);
    }


    // включение прокрутки Мобильная версия
    function enableScrollingMobile(){
        $('body').css({'overflow' : 'hidden'});

        //определяем на каком слайде была перезагрузка страницы
        var $currentNode = getCurrentNode();

        // удаляем пометки у всех слайдов и ставим на текущем активном (показанном) после перезагрузки
        setCurrentNode($currentNode);

        window.addEventListener("touchstart", windowTouchMoveHandler);
        window.addEventListener("touchend", windowTouchMoveHandler);
    }



    var touchstartPositionY = 0;
    var touchendPositionY = 0;
    function windowTouchMoveHandler(evt) {

        console.log('windowTouchMoveHandler');

        if(evt.type === 'touchstart'){
            touchstartPositionY = evt.touches[0].screenY;
        }

        if(evt.type === 'touchend'){
            touchendPositionY = evt.changedTouches[0].screenY;

            // если при нажатии нечаянно сдвинули палец
            var delta = Math.abs(touchstartPositionY - touchendPositionY);
            if(delta < 40) return;

            window.removeEventListener("touchstart", windowTouchMoveHandler);
            window.removeEventListener("touchend", windowTouchMoveHandler);




            var direction = getDirection();

            // текущий слайд
            var $current = $sections.filter('.active');
            var currentIndex = $sections.index($current);

            // индекс следующего слайда
            // при прокрутке и вычислении следующего узла вылазит нюанс
            // когда доводим на 4-го блока надо значение замораживать при перемотки вниз (direction === down)
            // так как автоматическая перемотка работает только если "nextNode <=4", выставляем nextNode=5
            var nextNode = getNextIndexTouch(currentIndex, direction);

            // мотаем с нулевого по 4-й слайд (включительно), перемотку заканчиваем на 5-м слайде
            if(direction === 'down' && nextNode >= 0 && nextNode <= 4){

                // проматываем слайд
                $('body').css({'overflow' : 'hidden'});

                scrolling (nextNode);

                // получаем якорь у текущего блока и устанавливаем ссылку
                var currentAnchor = $sections.eq(nextNode).data("anchor");
                document.location.hash = '#' + currentAnchor;
            }

            // мотаем с нулевого по 4-й слайд (включительно), перемотку заканчиваем на 5-м слайде
            if(direction === 'down' && nextNode >= 4){
                $('body').css({'overflow' : 'auto'});
            }


            // скролим вверх
           if(direction === 'up'){
               $('body').css({'overflow' : 'auto'});

               window.removeEventListener("touchstart", windowTouchMoveHandler);
               window.removeEventListener("touchend", windowTouchMoveHandler);

               console.log(direction);

               // координаты относительно начала страницы с учетом высоты блока
               var topElement = $('#baby3-slider').offset().top;
               // высота блока
               var heightElement = $('#baby3-slider').height();
               var fullHeight = topElement + heightElement;

               // ткущая высота прокрутки
               var scrollY = $(document).scrollTop();

               // если прокрутка элемента с учётом высоты больше прокрутки документа
               // то прокручиваем блок вверх
               if ((fullHeight - 100) >= scrollY /*&& nextNode === 3*/){

                   $('body').animate({scrollTop: topElement}, 300);

                    scrolling (nextNode);

                    // получаем якорь у текущего блока и устанавливаем ссылку
                    currentAnchor = $sections.eq(nextNode).data("anchor");
                    document.location.hash = '#' + currentAnchor;

                }

               // на блоках 0-1 прокручиваем вверх
               if(nextNode < 3){

                   window.removeEventListener("touchstart", windowTouchMoveHandler);
                   window.removeEventListener("touchend", windowTouchMoveHandler);

                    scrolling (nextNode);

                     //получаем якорь у текущего блока и устанавливаем ссылку
                    currentAnchor = $sections.eq(nextNode).data("anchor");
                    document.location.hash = '#' + currentAnchor;
               }
           }
        }

        enableTouchEventListener();
    }



    function enableTouchEventListener() {
        setTimeout(function () {
            window.addEventListener('touchstart', windowTouchMoveHandler);
            window.addEventListener('touchend', windowTouchMoveHandler);
        }, 500);
    }

    function getDirection() {
        var direction = '';

        if(touchstartPositionY > touchendPositionY){
            direction = 'down';
        }else if(touchstartPositionY < touchendPositionY){
            direction = 'up';
        }else{
            direction = '';
        }
        return direction
    }

    function windowKeyDownWheelHandler (evt){
        // после срабатывания события отключаем обработчики
        window.removeEventListener('keydown', windowKeyDownWheelHandler);
        window.removeEventListener('wheel', windowKeyDownWheelHandler);

        // текущий слайд
        var $current = $sections.filter('.active');
        var currentIndex = $sections.index($current);

        // индекс следующего слайда
        var nextNode = getNextIndexPC(evt, currentIndex);

        // проматываем слайд
        scrolling (nextNode);

        // получаем якорь у текущего блока и устанавливаем ссылку
        var currentAnchor = $sections.eq(nextNode).data("anchor");
        document.location.hash = '#' + currentAnchor;

        enableEventListener();
    }

    // после перемотки включаем обработчики событий
    function enableEventListener (){
        setTimeout(function () {
            window.addEventListener('keydown', windowKeyDownWheelHandler);
            window.addEventListener('wheel', windowKeyDownWheelHandler);
        }, 500);
    }


    // получаем индекс следующего блока (мобилки)
    function getNextIndexTouch(currentIndex, direction) {
        var nextNode = currentIndex;

        if(direction === "down"){
            if(nextNode === $sections.length - 1){
                nextNode = $sections.length - 1;
            }else nextNode = currentIndex + 1;
        }

        if(direction === 'up'){
            if(nextNode === 0){
                nextNode = 0
            }else nextNode = currentIndex - 1;
        }

        // не считать блоки больше 4-х
        if(direction === "down" && nextNode > 4){
            nextNode = 5;
        }


        if(direction === "up" && nextNode > 4){
            nextNode = 3;
        }

        return nextNode;
    }


    // получаем индекс следующего блока
    function getNextIndexPC (evt, currentIndex) {

        // событие - нажатие кнопок на клавиатуре
        var keyCode = evt.keyCode;
        var nextNode = currentIndex;

        if(keyCode === ARROW_DOWN || evt.deltaY > 1){
            if(nextNode === $sections.length - 1){
                nextNode = $sections.length - 1;
            }else nextNode = currentIndex + 1;
        }

        if(keyCode === ARROW_UP || evt.deltaY < -1){
            if(nextNode === 0){
                nextNode = 0
            }else nextNode = currentIndex - 1;
        }

        return nextNode;
    }


    // прокрутка
    function scrolling (index) {

        var destination = $sections.eq(index).offset().top;

        // TODO желательно делать условием body иначе html - что бы срабатывала два раза функция
        $('body, html').animate({scrollTop: destination}, 500, function () {
            animateBaby($sections.eq(index));
        });

        // удаляем все классы active
        $sections.removeClass('active');
        $sections.eq(index).addClass('active');
    }


    // определяем на каком слайде была перезагрузка страницы
    function getCurrentNode() {
        var anchor;
        var hash = document.location.hash;
        // если загружать сайт первый раз (со строкой в адресе, но без hash)
        // ты выбираем по умолчанию первый слайд
        if (!hash){
            anchor = $sections.eq(0).attr('id');
        }else{
            anchor = hash.slice(hash.indexOf('#') + 1);
        }
        return $sections.filter('[data-anchor="' + anchor + '"]');
    }

    // удаляем пометки у всех слайдов и ставим на текущем активном (показанном) после перезагрузки
    function setCurrentNode($node) {
        $sections.removeClass('active');
        $node.addClass('active');

        // устанавливаем якорь в строку адреса, если токовой отсутствует, после первой загрузки
        var hash = document.location.hash;
        if (!hash){
            var anchor = $sections.eq(0).attr('id');
            document.location.hash = '#' + anchor;
        }
    }

    // при ресайзе, сбрасываем все настройки по умолчанию
    // TODO исправить
    var isEventResize = false;
    $(window).resize(function() {
        setTimeout(function () {
            if(!isEventResize){
                if(device.type === 'desktop'){
                    enableScrollingPC();
                }else if(device.type === 'mobile' || device.type === 'tablet'){
                    enableScrollingMobile();
                }
                isEventResize = true;
            }
        },500);
        isEventResize = false;
    });


    // отключаем прокрутку по секциям и возвращаем установки
    function disableScrollingPC() {
        $('body').css({'overflow' : 'auto'});

        window.removeEventListener('keydown', windowKeyDownWheelHandler);
        window.removeEventListener('wheel', windowKeyDownWheelHandler);
    }

    // отключаем прокрутку по секциям и возвращаем установки
    function disableScrollingMobile() {
        $('body').css({'overflow' : 'auto'});

        window.removeEventListener("touchstart", windowTouchMoveHandler);
        window.removeEventListener("touchend", windowTouchMoveHandler);
    }

})();