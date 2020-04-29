(function () {
    // подгонка размеров изображения под адаптивный блок
    // изображения должно заполнить всю ширину и высоту блока
    // если по какой-то из сторон изображения больше родительского блока, то изображение обрезается по краям
    makeResponsiveImg();

    // при смене ширины экрана выполняем пересчёт габаритов изображения,
    // один раз через 0,5 секунд после изменения ширины экрана
    var isEventResizeImg = false;
    $(window).resize(function() {

        setTimeout(function () {
            if(!isEventResizeImg){
                makeResponsiveImg();
                isEventResizeImg = true;
            }

        },500);
        isEventResizeImg = false;
    });

    // обработка каждого узла и изображения
    function makeResponsiveImg() {
        $("[data-block-img--full]").each(function(){
            var $adaptiveBlock = $(this);
            fix($adaptiveBlock);
        });
    }


    // обработка всех узлов на странице
    function fix($adaptiveBlock) {
        var $adaptiveImg = $adaptiveBlock.find("img");

        // сброс стилей img
        reset($adaptiveImg);

        // ширина и высота изображения из атрибутов img
        var imgWidth = $adaptiveImg.width();
        var imgHeight = $adaptiveImg.height();
        // соотношение ширины к высоты
        var ratio = imgWidth / imgHeight;

        var newWidth, newHeight;

        if($adaptiveBlock.width() > $adaptiveImg.width()){

            $adaptiveImg.css({width: "100%", height: ""});

            // получаем новую высоту после увеличения ширины
            newHeight = $adaptiveBlock.width() / ratio;
            $adaptiveImg.css( {height: (newHeight + 'px'), maxHeight: "none"} );
        }

        if($adaptiveBlock.height() > $adaptiveImg.height()){

            $adaptiveImg.css("height", "100%");

            // получаем новую ширину после увеличения высоты
            newWidth = $adaptiveBlock.height() * ratio;
            $adaptiveImg.css( {width: (newWidth + 'px'), maxWidth: "none"} );
        }

    }

    // сброс стилей
    function reset($img){
        $img.removeAttr("width")
            .removeAttr("height")
            .css({ width: "", height: "" })
            .css({ maxWidth: "100%", maxHeight: "100%" });
    }

})();