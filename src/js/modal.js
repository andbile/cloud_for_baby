(function () {

    modal();

    function modal() {

        // модальные окна
        var $modalWindows = $('.modal-window');

        // отключение прокрутки document если навели на модальное окно
   /*     $modalWindows.on('mouseover', function () {
            disableScroll();
            $('body').css({'overflow' : 'hidden'});
        });

        $modalWindows.on('mouseout', function () {
            enableScroll();
        });
*/


        // коллекция ссылок при нажатии на которые открываются модальные окна
        var $modalButtonLinks = $('[data-action="modal_window"]');

        var $overlay = $('#overlay');

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

        function getCurrentModalWindow(dataAttr) {
            if(dataAttr){
                var selector = '[data-modal-target="' + dataAttr +  '"]';
                return  $modalWindows.filter(selector);
            }
        }

        function showModalWindow($modalWindow) {
            $modalWindow.addClass("active");
            $overlay.toggleClass('active');
        }

        function closeWindow($modalWindow) {
            $overlay.removeClass('active');
            $overlay.addClass('active--fadeout');
            $modalWindow.addClass('active--fadeout');

           setTimeout(function () {
               $modalWindow.removeClass('active');
               $modalWindow.removeClass('active--fadeout');
               $overlay.removeClass('active--fadeout');
            },500);
        }
    }
})();

