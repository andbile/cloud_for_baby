(function () {

    window.animateBaby = animateBaby;
    window.resetAnimateBaby = resetAnimateBaby;

    // сбрасываем начальный координаты в белье
    var $pillows = $('.index-section-baby__pillow-img');
    var $blankets = $('.index-section-baby__blanket-img');

    // так как функция срабатывает два раза (из-за $('body, html')) делаем проверку
    var isStartFunc = false;

    // анимация детей
    function animateBaby ($node, isSlick) {

        // TODO исправить = из-за двойного срабатывания пришлось делать костыль
        if(isSlick === 'from-slick'){
            isStartFunc = true;
        }

        if(!isStartFunc) {
            isStartFunc = true;
            return;
        }

        // сбрасываем начальный координаты в белье
        resetAnimateBaby($node);

        var $baby = $node.find('.index-section-baby__baby-img');
        var $babyImg = $node.find('.index-section-baby__baby-img img');
        var $pillow = $node.find('.index-section-baby__pillow-img');
        var $blanket = $node.find('.index-section-baby__blanket-img');

        // высоты ребёнка
        var babyHeight = $babyImg.height();
        var headHeight = Math.round(babyHeight * 0.272);
        var legsHeight = Math.round(babyHeight * 0.484);
        var breastHeight = Math.round(babyHeight * 0.652);

        // высота подушки/одеяла
        var pillowHeight = $pillow.height();
        var blanketHeight = $blanket.height();


        if($node.is('.index-section-baby--slide2')){
            $pillow.animate({top: -pillowHeight}, 1000);
            $blanket.animate({bottom: (-blanketHeight + legsHeight)}, 1000);
        }

        if($node.is('.index-section-baby--slide3')){
            $pillow.animate({top: -40}, 1000);
            $blanket.animate({bottom: (-blanketHeight + breastHeight)}, 1000);
        }

        // если событие пришло из слайдера слик
        if(isSlick === 'from-slick'){
            $pillow.animate({top:-40}, 1000);
            $blanket.animate({bottom: (-blanketHeight + breastHeight)}, 1000);
        }

        isStartFunc = false;
    }

    // сбрасываем начальный координаты в белье
    function resetAnimateBaby(){
        $pillows.css('top', '');
        $blankets.css('bottom', '');
    }



    // слайдер одеяла с ребенком
    $('[data-slick-slider-baby-items]').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        prevArrow: $('[data-full-slider-btn-left--baby]'),
        nextArrow: $('[data-full-slider-btn-right--baby]'),
    });

    $('[data-slick-slider-baby-items]').on('beforeChange', function(){
        resetAnimateBaby();
    });

    $('[data-slick-slider-baby-items]').on('afterChange', function(event, slick, currentSlide, nextSlide){
        animateBaby(slick.$slider, 'from-slick');
    });


})();