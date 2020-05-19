(function () {

    // слайдер - ОТЗЫВЫ О НАШЕЙ ПРОДУКЦИИ
    $('[data-slider-slick-01]').slick({
        speed: 1000,
        //autoplay: true,
        //autoplaySpeed: 4000,
        dots:false,
        prevArrow: $('.slider-btn-wrp--reviews .slider-btn--prev'),
        nextArrow: $('.slider-btn-wrp--reviews .slider-btn--next')
    });

    // слайдер - идеи для фото
    $('[data-slider-slick-02]').slick({
        speed: 1000,
        slidesToShow: 2,
        //autoplay: true,
        //autoplaySpeed: 4000,
        dots:false,
        infinite: true,
        prevArrow: $('.index-section-4__slider .slider-btn--prev'),
        nextArrow: $('.index-section-4__slider .slider-btn--next'),
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

})();