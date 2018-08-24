$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        responsive:{
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            },
            1180:{
                items:4
            }
        },
        autoplay: true,
        autoplayTimeout: 2000,
        autoplaySpeed: 1000,
        autoplayHoverPause: true,
        dots: true,
        loop: true
    });
});