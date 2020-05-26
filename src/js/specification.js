(function () {


    // cлайдер - ассортимент
    var $slickSlider_specItems = $('[data-slick-slider--spec-items]');
    // внутренние слайдеры (показ фото)
    var $slickSliders_specPhotos = $('[data-slick-slider--spec-photos]');
    // кнопка и выпадающий контент при разрешении >=576
    var $dropdownBtn =  $('[data-spec-dropdown-block--btn]');
    var $dropdownContent = $('[data-spec-dropdown-block--content]');




    // инициализация основного слайдера
    mainRangeSlider();

    var timerId;
    $(window).resize(function() {

        clearTimeout(timerId);
        timerId = setTimeout(function() {
            disableSliders($slickSliders_specPhotos);
            enableSlider($slickSliders_specPhotos);

            }, 400);
    });


    // инициализируем слайды
    function mainRangeSlider(){

        var $leftBtn;
        var $rightBtn;

        // переключения разных кнопок для одного слайдера
        $leftBtn = $('[data-full-slider-btn-left--spec]');
        $rightBtn = $('[data-full-slider-btn-right--spec]');

        // слайдер для всех спецификаций
        $slickSlider_specItems.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            swipe: false,
            prevArrow: $leftBtn,
            nextArrow: $rightBtn,
        });

        // инициализируем первые внутренние слайды (показ фото)
        // с задержкой из-за глюков
        disableSliders($slickSliders_specPhotos);
        setTimeout(function () {
            enableSlider($slickSliders_specPhotos);
        }, 400);
    }

    function enableSlider($slideNode) {
        // слайдер -- привьюшки + кнопки
        var $slider = $slideNode.find('.slide-specifications__photo-full-wrp');
        var $previewSlider = $slideNode.find('.slide-specifications__photo-preview-items');
        var $leftBtn = $slideNode.find('.icon-angle-left');
        var $rightBtn = $slideNode.find('.icon-angle-right');

        // при ширине экрана больше 576 покажем слайдер и привьюшкми
        if($( window ).width() > 576){
            $slider.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                fade: true,
                dots:false,
                /*infinite: true,*/
                asNavFor: $previewSlider,
                prevArrow: $leftBtn,
                nextArrow: $rightBtn,
                responsive: [
                    {
                        breakpoint: 577,
                        settings: {
                            dots: true
                        }
                    }
                ]
            });
            $previewSlider.slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                asNavFor: $slider,
                dots: false,
                focusOnSelect: true,
                infinite: true,
                arrows: false
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
              /*  infinite: true,*/
            });
        }
    }

    // отключаем внутренние слайдеры (показ фото)
    function disableSliders($currentContent) {
        var $slider = $currentContent.find('.slide-specifications__photo-full-wrp');
        var $previewSlider = $currentContent.find('.slide-specifications__photo-preview-items');

        if($( window ).width() > 576){
            if($slider.is('.slick-initialized')) $slider.slick('unslick');
            if($previewSlider.is('.slick-initialized')) $previewSlider.slick('unslick');

        }else{
            if($slider.is('.slick-initialized')) $slider.slick('unslick');
        }
    }



    // внутренний слайдер с фотографиями товара
    var $specificationsNavBtns = $('[data-target-spec]');

    $specificationsNavBtns.on('click', showSpecificationsContent);

    function showSpecificationsContent(evt) {
        // прячем весь не свернутый контент при 576
        hideDropdownContent();

        var attr = $(this).data('target-spec');
        var $parent = $(this).closest('.slide-item--specifications');

        // отобразим характеристики
        var $newContentNode = getNewContent(attr, $parent);
        show($newContentNode, $(this), $parent);
    }

    function getNewContent(dataAttr, $parent) {
         return $parent.find('.slide-specifications__content-wrp').eq(dataAttr);
    }

    function show(node, $btn, $parent) {
        // отключаем слайдеры
        disableSliders($slickSliders_specPhotos);

        // удаляем класс у кнопок
        $parent.find('[data-target-spec]').removeClass('active');
        $parent.find('.slide-specifications__content-wrp').removeClass('active');

        node.addClass("active");
        $btn.addClass('active');

        setTimeout(function () {
            enableSlider($slickSliders_specPhotos);
        }, 200);

    }




    // выпадающий блок при 576
    var $dropdownBtns = $('[data-spec-dropdown-block--btn]');

    $dropdownBtns.on('click', function (evt) {

        var $dropdownElement = $(this).siblings("[data-spec-dropdown-block--content]");

        $dropdownElement.toggleClass('active');
        $(this).toggleClass('active');
    });

    // при смене слайдов, прячем весь не свернутый контент при 576
    function hideDropdownContent(){
        $dropdownBtn.removeClass('active');
        $dropdownContent.removeClass('active');
    }


    $($slickSlider_specItems).on('beforeChange', function(){
        hideDropdownContent();
    });


    $('.slide-specifications__photo-full-wrp [data-fancybox]').fancybox({
        loop: true
    })

})();


