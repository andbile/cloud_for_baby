(function () {



    // слайдер фото зданий в model_page.html
    $('[data-slider-slick-01]').slick({
        speed: 1000,
        //autoplay: true,
        //autoplaySpeed: 4000,
        dots:false,
        prevArrow: $('.slider-btn-wrp--reviews .slider-btn--prev'),
        nextArrow: $('.slider-btn-wrp--reviews .slider-btn--next')
    });



})();