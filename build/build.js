$(function() {

    // Selector Cache
    $slider = $('.speaker-talks .slider');
    $speaker = $('.speaker').not('.stub');

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
        if (!$img.length) return;
        $(this).css({
            'background-image': 'url("' + $img.attr('src') + '")'
        });
        $img.remove();
    });

    /**
     * Speaker Talks
     */

    speakerTalks = {

        open: function(index) {
            if (index > 0) {
                $slider.slick('slickGoTo', index - 1, !this.isOpen());
                $('body').addClass('slide-right');
            }
        },

        close: function() {
            $('body').removeClass('slide-right');
        },

        isOpen: function() {
            return $('body').hasClass('slide-right');
        }

    }

    $('.open-slider').on('click', function() {
        var index = parseInt($(this).data('index'));
        speakerTalks.open(index)
        return false
    })

    /**
     * Click Page to Close Speaker Talks
     */
    $('.page, .speaker-talks button.close').on('click', function() {
       if ($('body').hasClass('slide-right')) speakerTalks.close();
    });

});