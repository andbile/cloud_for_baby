(function () {


    // проверяем - открывается ли модальное окно в документе который скролится
     var isScrollBlock;
     if( $('[data-is-scroll-block]').length === 0){
         isScrollBlock = false;
     } else isScrollBlock = true;


    // модальные окна
    var $modalWindows = $('.modal-window');
    // коллекция ссылок при нажатии на которые открываются модальные окна
    var $modalButtonLinks = $('[data-action="modal_window"]');
    var $overlay = $('#overlay');


    modal();
    function modal() {

        // подключение обработчика событий к кнопкам
        $modalButtonLinks.on('click', function (event) {
            event.preventDefault();

            var targetModal = $(this).data('target');

            var $currentModalWindow = getCurrentModalWindow(targetModal);

            showModalWindow($currentModalWindow);

            var $btnClose = $currentModalWindow.find('[data-modal-close]');

            $btnClose.on('click', function () {
                closeWindow($currentModalWindow);
            });
        });
    }

    function getCurrentModalWindow(dataAttr) {
        if(dataAttr){
            var selector = '[data-modal-target="' + dataAttr +  '"]';
            return  $modalWindows.filter(selector);
        }
    }

    function showModalWindow($modalWindow) {
        $modalWindow.addClass("active");
        $overlay.toggleClass('active');

        if(!isScrollBlock){
            $('body').css({'overflow' : 'hidden'});

        }else if(isScrollBlock){

            if(device.type === 'desktop'){
                disableScroll();
                $('body').css({'overflow' : 'hidden'});
            }
            if(device.type === 'mobile' || device.type === 'tablet'){
                $('body').css({'overflow' : 'hidden'});
            }
        }
    }

    function closeWindow($modalWindow) {
        $overlay.removeClass('active');
        $overlay.addClass('active--fadeout');
        $modalWindow.addClass('active--fadeout');

        if(!isScrollBlock){
            $('body').css({'overflow' : 'auto'});


        }else if(isScrollBlock){
            if(device.type === 'desktop'){
                enableScroll();
            }

            if(device.type === 'mobile' || device.type === 'tablet'){
                $('body').css({'overflow' : 'auto'});
            }
        }


        setTimeout(function () {
            $modalWindow.removeClass('active');
            $modalWindow.removeClass('active--fadeout');
            $overlay.removeClass('active--fadeout');
        },500);
    }


})();

