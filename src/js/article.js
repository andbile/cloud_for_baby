(function () {

    $(".articles__item").slice(0, 6).show();
    $("[data-articles-btn-show-more]").on('click', function (e) {
        $(".articles__item:hidden").slice(0, 6).slideDown();
        makeResponsiveImg();

        if($(".articles__item:hidden").length === 0){
            $(this).hide();
        }

    });

    makeResponsiveImg();

})();