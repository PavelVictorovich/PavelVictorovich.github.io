(function() {
    $.fn.navbar = function(options) {
        var settings = $.extend({
            'scrollSpeed': 1000,
            'mySelector': 'div'
        }, options);

        var optionLocs = [],
            lastScrollTop = 0,
            menuHeight = $('.navbar').height(),
            nav = $('.navbar'),
            navA = $('.navbar a'),
            myOffset = nav.height();

        if (settings.scrollSpeed) { var scrollSpeed = settings.scrollSpeed }

        return navA.each(function(index) {
            var id = $(this).attr('href');

            if (!$(this).hasClass("extLink")) { $(this).attr('id', id); }

            optionLocs.push(new Array(
                $(id).position().top - menuHeight,
                $(id).height() + $(id).position().top, id));

            var stickyTop = nav.offset().top;

            var stickyMenu = function(direction) {

                var scrollTop = $(window).scrollTop() + myOffset;

                if (scrollTop > stickyTop + myOffset) {
                    nav.addClass('navbar-fixed-top');
                    $('body').css('padding-top', menuHeight);
                } else {
                    nav.removeClass('navbar-fixed-top');
                    $('body').css('padding-top', '0');
                }

                if (optionLocs[index][0] <= scrollTop && scrollTop <= optionLocs[index][1]) {
                    if (direction == "up") {
                        $(id).addClass("active");
                        $(optionLocs[index + 1][2]).removeClass("active");
                    } else if (index > 0) {
                        $(id).addClass("active");
                        $(optionLocs[index - 1][2]).removeClass("active");
                    } else if (direction == undefined) {
                        $(id).addClass("active");
                    }
                    $.each(optionLocs, function(i) {
                        if (id != optionLocs[i][2]) {
                            $(optionLocs[i][2]).removeClass("active");
                        }
                    });
                }
            };

            stickyMenu();

            $(window).scroll(function() {
                var st = $(this).scrollTop() + myOffset;
                if (st > lastScrollTop) {
                    //noinspection JSDuplicatedDeclaration
                    var direction = "down";
                } else if (st < lastScrollTop) {
                    //noinspection JSDuplicatedDeclaration
                    var direction = "up";
                }
                lastScrollTop = st;
                stickyMenu(direction);

                if ($(window).scrollTop() + $(window).height() == $(document).height()) {
                    navA.removeClass('active');
                    $(".navbar a:not('.extLink'):last").addClass('active');
                } else {
                    navA.last().removeClass('active');
                }
            });

            $(this).on('click', function(e) {
                var myOffset = nav.height();

                e.preventDefault();

                var hash = $(this).attr('href');

                var goTo = $(hash).offset().top - myOffset;

                $("html, body").stop().animate({ scrollTop: goTo }, scrollSpeed);

                if ($(this).hasClass("extLink")) {
                    return false;
                }
            });

            $('.intLink').on('click', function(e) {
                var myOffset = nav.height();

                e.preventDefault();

                var hash = $(this).attr('href');

                if (nav.hasClass('navbar-fixed-top')) {
                    //noinspection JSDuplicatedDeclaration
                    var goTo = $(hash).position().top - myOffset;
                } else {
                    //noinspection JSDuplicatedDeclaration
                    var goTo = $(hash).position().top - myOffset * 2;
                }

                $('html', 'body').stop().animate({ scrollTop: goTo }, scrollSpeed);

                if ($(this).hasClass("extLink")) {
                    return false;
                }
            });
        });
    };

    $.fn.navbar.defaults = { 'scrollSpeed': 1000, 'mySelector': 'div' };
})(jQuery);

$(document).ready(function () {
    $('.navbar').navbar();
});
