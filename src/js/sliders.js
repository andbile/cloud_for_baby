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

    $('[data-slider-slick-02] [data-fancybox]:not(.slick-cloned)').fancybox({
        loop: true
    });


    // слайдер - идеи для фото
    $('[data-slider-slick-article-gallery]').slick({
        speed: 1000,
        slidesToShow: 3,
        //autoplay: true,
        //autoplaySpeed: 4000,
        dots:false,
        infinite: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    dots:true,
                }
            }

        ]
    });

    $('[data-slider-slick-article-gallery] [data-fancybox]:not(.slick-cloned)').fancybox({
        loop: true
    });




})();