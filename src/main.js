$(function() {

    // Selector Cache
    $slider = $('.speaker-talks .slider');
    $speaker = $('.speaker');

    /**
     * Slick
     */
    var slick = $slider.slick({
        arrows: false,
        dots: true
    });

    /**
     * Primary Nav
     */
    $('.primary-nav a').on('click', function() {
        $('#primary-nav-toggle').prop('checked', false);
    });

    /**
     * Move speaker images to backgrounds
     */
    $('.speaker-photo').each(function() {
        $img = $(this).find('img');
        $(this).css({
            'background-image': 'url("' + $img.attr('src') + '")'
        });
        $img.remove();
    })

    /**
     * Speaker Talks
     */

     var speakerTalks = {

        open: function(index) {
            $slider.slick('slickGoTo', index, !this.isOpen());
            $('body').addClass('slide-right');
        },

        close: function() {
            $('body').removeClass('slide-right');
        },

        isOpen: function() {
            return $('body').hasClass('slide-right');
        }

     }

    /**
     * Click Speaker
     */
     $speaker.find('.speaker-photo').on('click', function(e) {
        e.stopPropagation();
        var index = $(this).parents('.speaker').index();
        speakerTalks.open(index);
     });

    /**
     * Click Page to Close Speaker Talks
     */
    $('.page, .speaker-talks button.close').on('click', function() {
       if ($('body').hasClass('slide-right')) speakerTalks.close();
    });

    // Discount
    console.log("Hello! Thank you for your interest in our source code. You are hereby rewarded with a discount code for CSSDay: ilovecss");

});