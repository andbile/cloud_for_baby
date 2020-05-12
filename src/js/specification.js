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
        //console.log($newContentNode);
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

        $slider.slick('unslick');
        $previewSlider.slick('unslick');
    }

    function enableSlider($newContentNode) {
        var $slider = $newContentNode.find('.slide-specifications__photo-full-wrp');
        var $previewSlider = $newContentNode.find('.slide-specifications__photo-preview-items');
        var $leftBtn = $newContentNode.find('.icon-angle-left');
        var $rightBtn = $newContentNode.find('.icon-angle-right');

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
    }

    // подключаем слайдер в первом блоке контента, остальные при нажатии на кнопки меню
    $('[data-target-spec-current="1"] .slide-specifications__photo-full-wrp').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: $('[data-target-spec-current="1"] .slide-specifications__photo-preview-items'),
        prevArrow: $('[data-target-spec-current="1"] .slide-specifications__photo-preview-btns .icon-angle-left'),
        nextArrow: $('[data-target-spec-current="1"] .slide-specifications__photo-preview-btns .icon-angle-right'),
    });

    $('[data-target-spec-current="1"] .slide-specifications__photo-preview-items').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: $('[data-target-spec-current="1"] .slide-specifications__photo-full-wrp'),
        dots: false,
        focusOnSelect: true,
        arrows: false,
        infinite: false
    });





    // слайдер привью товара
    //showGallery();
    function showGallery() {


        var $blockSliders =  $('[data-slider-slick-spec]');
        for (var i = 0; i < $blockSliders.length; i++){
            //SliderSpec($blockSliders[i]);
        }

        function SliderSpec (node){
            var id = $(node).attr('data-slider-slick-spec');
            var dataIdStr = '[data-slider-slick-spec="' + id + '"]';
            var sliderStr = '.slide-specifications__photo-full-wrp';
            var sliderPreviewStr = '.slide-specifications__photo-preview-items';
            var btnLeft = '.slide-specifications__photo-preview-btns .icon-angle-left';
            var btnRight = '.slide-specifications__photo-preview-btns .icon-angle-right';

            // selects
            var slider = dataIdStr + ' ' +  sliderStr;
            var preview = dataIdStr + ' ' + sliderPreviewStr;
            var leftBtn = dataIdStr + ' ' + btnLeft;
            var rightBtn = dataIdStr + ' ' + btnRight;
            
        /*   slickSliders.push({
                slider: slider,
                preview: preview
            });*/

             $(slider).slick({
                 slidesToShow: 1,
                 slidesToScroll: 1,
                 arrows: true,
                 fade: true,
                 asNavFor: preview,
                 prevArrow: $(leftBtn),
                 nextArrow: $(rightBtn),
             });
             $(preview).slick({
                 slidesToShow: 3,
                 slidesToScroll: 1,
                 asNavFor: slider,
                 dots: false,
                 focusOnSelect: true,
                 arrows: false,
                 infinite: true
             });
        }
    }

})();


