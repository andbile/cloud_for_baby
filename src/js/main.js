"use strict";
jQuery(document).ready(function($) {

    @@include('./main_menu.js')
    @@include('./mask_tel.js')
    @@include('./responsive_img.js')


    // select
    $('select#select-question').niceSelect();
});