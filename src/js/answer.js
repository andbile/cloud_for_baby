(function () {

    var $btns = $('.questions__plus');
    var $questionsItems = $('.questions__item');
    var $questionsBlocks = $('.questions__block--question');

    $btns.on('click', function (evt) {
        evt.stopPropagation();
        showAnswer($(this));
    });

    $questionsBlocks.on('click', function () {
        showAnswer($(this));
    });

    function showAnswer(target) {
        var $parent = target.closest('.questions__item');

        if($parent.hasClass('active')){
            $parent.removeClass('active');
        }else{
            $questionsItems.removeClass('active');
            $parent.addClass('active');
        }
    }

    var $scrollContainer = $('.questions__items');

    if(device.type === 'desktop'){
        $scrollContainer.on('mouseover', function () {
            disableScroll();
            // в методе disableScroll для боди включается {'overflow' : 'auto'},
            // что приводит к появлению правой прокрутки и потрясыванию
            $('body').css({'overflow' : 'hidden'});
        });

        $scrollContainer.on('mouseout', function () {
            enableScroll();
        });
    }

})();