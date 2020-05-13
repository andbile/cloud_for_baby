(function () {


    // слайдер в разделе спецификации
    var $specificationsNavBtns = $('[data-target-spec]');
    var $specificationsContents = $('[data-target-spec-current]');

    $specificationsNavBtns.on('click', showSpecificationsContent);

    function showSpecificationsContent(evt) {
        var attr = $(this).data('target-spec');

        // отключаем текущий слайдер
        // ищем текущую показанные характеристики
        var $currentContent = $specificationsContents.filter('.active');
        // отключаем слайдер
        disableSlider($currentContent);


        // отобразим характеристики
        var $newContentNode = getNewContent(attr);
        show($newContentNode, $(this));

    }

    function getNewContent(dataAttr) {
        if(dataAttr){
            var selector = '[data-target-spec-current="' + dataAttr + '"]';
            return  $specificationsContents.filter(selector);
        }
    }

    function show(node, $btn) {
        $specificationsNavBtns.removeClass('active');
        $specificationsContents.removeClass('active');

        node.addClass("active");
        $btn.addClass('active');

        enableSlider(node);
    }

    function disableSlider($currentContent) {
        var $slider = $currentContent.find('.slide-specifications__photo-full-wrp');
        var $previewSlider = $currentContent.find('.slide-specifications__photo-preview-items');

        if($( window ).width() > 576){

            if($slider.is('.slick-initialized')) $slider.slick('unslick');
            if($previewSlider.is('.slick-initialized')) $previewSlider.slick('unslick');

        }else{
            if($slider.is('.slick-initialized')) $slider.slick('unslick');
        }
    }

    function enableSlider($newContentNode) {
        var $slider = $newContentNode.find('.slide-specifications__photo-full-wrp');
        var $previewSlider = $newContentNode.find('.slide-specifications__photo-preview-items');
        var $leftBtn = $newContentNode.find('.icon-angle-left');
        var $rightBtn = $newContentNode.find('.icon-angle-right');

        // при ширине экрана больше 576 покажем слайдер и привьюшкми
        if($( window ).width() > 576){
            $slider.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                fade: true,
                asNavFor: $previewSlider,
                prevArrow: $leftBtn,
                nextArrow: $rightBtn,
            });
            $previewSlider.slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                asNavFor: $slider,
                dots: false,
                focusOnSelect: true,
                arrows: false,
                infinite: false
            });
            // при меньше 576 покажем только слайдер и навигацию
        }else{
            $slider.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                fade: true,
                dots:true,
                nav: false,
            });
        }
    }


    console.log($( window ).width());
    // TODO циклом искать все первый блоки и активировать

    // подключаем слайдер в первом блоке контента, остальные при нажатии на кнопки меню
    if($( window ).width() > 576){
        $('[data-target-spec-current="1"] .slide-specifications__photo-full-wrp').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            asNavFor: $('[data-target-spec-current="1"] .slide-specifications__photo-preview-items'),
            prevArrow: $('[data-target-spec-current="1"] .slide-specifications__photo-preview-btns .icon-angle-left'),
            nextArrow: $('[data-target-spec-current="1"] .slide-specifications__photo-preview-btns .icon-angle-right'),
            responsive: [
                {
                    breakpoint: 576, //
                    settings: {
                        dots:true,
                        nav:false
                    }
                }
            ]
        });

        $('[data-target-spec-current="1"] .slide-specifications__photo-preview-items').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: $('[data-target-spec-current="1"] .slide-specifications__photo-full-wrp'),
            dots: false,
            focusOnSelect: true,
            arrows: false,
            infinite: false,
        });

    }else{
        $('[data-target-spec-current="1"] .slide-specifications__photo-full-wrp').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            dots:true,
            nav: false,
        });
    }

    if($( window ).width() > 576){
        $('[data-target-spec-current="5"] .slide-specifications__photo-full-wrp').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            asNavFor: $('[data-target-spec-current="5"] .slide-specifications__photo-preview-items'),
            prevArrow: $('[data-target-spec-current="5"] .slide-specifications__photo-preview-btns .icon-angle-left'),
            nextArrow: $('[data-target-spec-current="5"] .slide-specifications__photo-preview-btns .icon-angle-right'),
            responsive: [
                {
                    breakpoint: 576, //
                    settings: {
                        dots:true,
                        nav:false
                    }
                }
            ]
        });

        $('[data-target-spec-current="5"] .slide-specifications__photo-preview-items').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: $('[data-target-spec-current="1"] .slide-specifications__photo-full-wrp'),
            dots: false,
            focusOnSelect: true,
            arrows: false,
            infinite: false,
        });

    }else{
        $('[data-target-spec-current="5"] .slide-specifications__photo-full-wrp').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            dots:true,
            nav: false,
        });
    }

    if($( window ).width() > 576){
        $('[data-target-spec-current="9"] .slide-specifications__photo-full-wrp').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            asNavFor: $('[data-target-spec-current="9"] .slide-specifications__photo-preview-items'),
            prevArrow: $('[data-target-spec-current="9"] .slide-specifications__photo-preview-btns .icon-angle-left'),
            nextArrow: $('[data-target-spec-current="9"] .slide-specifications__photo-preview-btns .icon-angle-right'),
            responsive: [
                {
                    breakpoint: 576, //
                    settings: {
                        dots:true,
                        nav:false
                    }
                }
            ]
        });

        $('[data-target-spec-current="9"] .slide-specifications__photo-preview-items').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: $('[data-target-spec-current="1"] .slide-specifications__photo-full-wrp'),
            dots: false,
            focusOnSelect: true,
            arrows: false,
            infinite: false,
        });

    }else{
        $('[data-target-spec-current="9"] .slide-specifications__photo-full-wrp').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            dots:true,
            nav: false,
        });
    }






    mainSlider();
    function mainSlider(){

        var $leftBtn;
        var $rightBtn;

        if($(window).width() > 1650){
            $leftBtn = $('[data-full-slider-btn-left]');
            $rightBtn = $('[data-full-slider-btn-right]');
        }else{
            $leftBtn = $('[data-full-slider-btn-left--adaptive]');
            $rightBtn = $('[data-full-slider-btn-right--adaptive]');
        }


        // слайдер всех спецификаций
        $('[data-slick-slider-spec-items]').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            prevArrow: $leftBtn,
            nextArrow: $rightBtn,
        });

       $('[data-slick-slider-spec-items]').on('afterChange', function(event, slick, currentSlide, nextSlide){
           // отключаем все первые и снова включаем
           // TODO циклом искать все первый блоки и активировать - после смены слайдов
           // выстаильять ервык активными и активироват ьслайд

        });
    }

    $(window).resize(function() {
        $('[data-slick-slider-spec-items]').slick('unslick');
        mainSlider();
    });

})();


