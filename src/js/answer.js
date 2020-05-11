(function () {

    var $btns = $('.questions__plus');
    var $questionsItems = $('.questions__item');

    $btns.on('click', function () {
        var $parent = $(this).closest('.questions__item');

        if($parent.hasClass('active')){
            $parent.removeClass('active');
        }else{
            $questionsItems.removeClass('active');
            $parent.addClass('active');
        }
    });


    var $scrollContainer = $('.questions__items');

    $scrollContainer.on('mouseover', function () {
        disableScroll();
    });

    $scrollContainer.on('mouseout', function () {
        if(device.type === 'desktop' && $(window).width() >= WINDOW_WIDTH_MIN) {
            enableScroll();
        }
    });

})();