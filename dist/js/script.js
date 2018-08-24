

function isotope_init() {
    var $grid = $('.grid').isotope({
        // options
        itemSelector: '.grid-item',
        layoutMode: 'fitRows'
    });

    $('.filter-button-group').on('click', 'button', function(){
        $('.is-checked')[0].classList.remove('is-checked');
        $(this)[0].classList.add('is-checked');
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({filter: filterValue});
    })
}

$(document).ready(function(){
    isotope_init();
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