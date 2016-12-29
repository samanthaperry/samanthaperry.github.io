/*
* ----------------------------------------------------------------------------------------
Author       : ThemeFusionBD
Template Name: JIBON Personal Portfolio Template
Version      : 1.0
* ----------------------------------------------------------------------------------------
*/

(function ($) {
    'use strict';

    jQuery(document).ready(function () {
        
        var $window = $(window),
            $body = $('body');

        /*
         * ----------------------------------------------------------------------------------------
         *  PRELOADER JS
         * ----------------------------------------------------------------------------------------
         */
        $window.load(function () {
            $('.preloader').fadeOut();
            $('.preloader-area').delay(350).fadeOut('slow');
        });


        /*
         * ----------------------------------------------------------------------------------------
         *  CHANGE MENU BACKGROUND JS
         * ----------------------------------------------------------------------------------------
         */
        $window.on('scroll', function () {
            if ($window.scrollTop() > 100) {
                $('.header-top-area').addClass('menu-bg');
            } else {
                $('.header-top-area').removeClass('menu-bg');
            }
        });


        /*
         * ----------------------------------------------------------------------------------------
         *  SMOTH SCROOL JS
         * ----------------------------------------------------------------------------------------
         */

        $('a.smoth-scroll').on("click", function (e) {
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top - 50
            }, 1000);
            e.preventDefault();
        });


        /*
         * ----------------------------------------------------------------------------------------
         *  PARALLAX JS
         * ----------------------------------------------------------------------------------------
         */

        $window.stellar({
            responsive: true,
            positionProperty: 'position',
            horizontalScrolling: false
        });
        
       

        /*
         * ----------------------------------------------------------------------------------------
         *  WORK JS
         * ----------------------------------------------------------------------------------------
         */

        $('.work-inner').mixItUp();

        
        /*
         * ----------------------------------------------------------------------------------------
         *  TESTIMONIAL JS
         * ----------------------------------------------------------------------------------------
         */

        $(".testimonial-list").owlCarousel({
            items: 1,
            autoPlay: true,
            navigation: false,
            itemsDesktop: [1199, 1],
            itemsDesktopSmall: [980, 1],
            itemsTablet: [768, 1],
            itemsTabletSmall: false,
            itemsMobile: [479, 1],
            pagination: true,
            autoHeight: true
        });


        /*
         * ----------------------------------------------------------------------------------------
         *  EXTRA JS
         * ----------------------------------------------------------------------------------------
         */
        $(document).on('click', '.navbar-collapse.in', function (e) {
            if ($(e.target).is('a') && $(e.target).attr('class') !== 'dropdown-toggle') {
                $(this).collapse('hide');
            }
        });
        $body.scrollspy({
            target: '.navbar-collapse',
            offset: 195
        });

        /*
         * ----------------------------------------------------------------------------------------
         *  WOW JS
         * ----------------------------------------------------------------------------------------
         */
        new WOW().init();
        
        
        
        /* ----------------------------------------------------------------------------------
        *
            Contact Form
        *
        *--------------------------------------------------------------------------------------
        */
        
       $("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Did you fill in the form properly?");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});


function submitForm(){
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#email").val();
    var msg_subject = $("#msg_subject").val();
    var message = $("#message").val();


    $.ajax({
        type: "POST",
        url: "php/form-process.php",
        data: "name=" + name + "&email=" + email + "&msg_subject=" + msg_subject + "&message=" + message,
        success : function(text){
            if (text === "success"){
                formSuccess();
            } else {
                formError();
                submitMSG(false,text);
            }
        }
    });
}

function formSuccess(){
    $("#contactForm")[0].reset();
    submitMSG(true, "Message Submitted!");
}

function formError(){
    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}

function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}
        
        

        
    });

})(jQuery);