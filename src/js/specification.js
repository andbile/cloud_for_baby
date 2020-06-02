(function () {

    $('.popup-link').magnificPopup({

        callbacks: {
            open: function() {
                enableSlider($(this)[0].content);
                if(device.type === 'desktop'){
                    disableScroll();
                }

            },

            close: function() {
                disableSliders($(this)[0].content);
                if(device.type === 'desktop'){
                    enableScroll();
                }
            }
        }
    });



    // включаем слайдер
    function enableSlider($slideNode) {
        // слайдер -- привьюшки + кнопки
        var $slider = $slideNode.find('.slider__full-img');
        var $previewSlider = $slideNode.find('.slider__preview-img');
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
            });
        }
    }


    // отключаем слайдер
    function disableSliders($element) {
        var slickInitElements = $element.find('.slick-initialized');
        slickInitElements.slick('unslick');
    }


    $('.specifications__popup .slider__full-img [data-fancybox]').fancybox({
        loop: true
    });


    // выпадающий блок c описанием/характеристиками и кнопками при 576
    var $dropdownBtns = $('[data-spec-dropdown-block--btn]');
    var $dropdownContent = $('[data-spec-dropdown-block--content]');

    // выпадающий блок c описанием/характеристиками и кнопками при 576
     $dropdownBtns.on('click', function (evt) {

         var $dropdownElement = $(this).siblings("[data-spec-dropdown-block--content]");

         $dropdownElement.toggleClass('active');
         $(this).toggleClass('active');
     });

    // при смене слайдов, прячем весь не свернутый контент при 576
    function hideDropdownContent(){
        $dropdownBtns.removeClass('active');
        $dropdownContent.removeClass('active');
    }



    // переключение табов
    var $specificationsNavBtns = $('[data-target-spec]');
    var $specificationsGoodsItems = $('[data-content-spec]');

   $specificationsNavBtns.on('click', showSpecificationsContent);

    function showSpecificationsContent(evt) {
        // прячем весь не свернутый контент при 576
        //hideDropdownContent();

        var attr = $(this).data('target-spec');

        // отобразим характеристики
        var $newContentNode = getNewContent(attr);

        show($newContentNode, $(this));
    }

    function getNewContent(dataAttr) {
        var selector  = '[data-content-spec="' + dataAttr +  '"]';
        return $specificationsGoodsItems.filter(selector);
    }

    function show(node, $btn) {
        // удаляем класс у кнопок/блока
        $specificationsNavBtns.removeClass('active');
        $specificationsGoodsItems.removeClass('active');

        node.addClass("active");
        $btn.addClass('active');
    }

})();


