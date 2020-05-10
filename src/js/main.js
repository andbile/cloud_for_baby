"use strict";
jQuery(document).ready(function($) {

    @@include('./main_menu.js')
    @@include('./mask_tel.js')
    @@include('./responsive_img.js')
    @@include('./block_scrolling.js')
    @@include('./modal.js')
    @@include('./parallax.js')
    @@include('./particlesjs.js')

   /* @@include('./canvas.js')*/


    // select
    $('select#select-question').niceSelect();
});