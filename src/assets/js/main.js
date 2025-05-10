'use strict';
(function ($) {
    /* ==================== Ready Function Start ========================== */
    $(document).ready(function () {
        /* ==================== Header Navbar Collapse JS Start ===================== */
        function hideNavbarCollapse() {
            new bootstrap.Collapse($('.navbar-collapse')[0]).hide();
            $('.navbar-collapse').trigger('hide.bs.collapse');
        }

        $('.navbar-collapse').on({
            'show.bs.collapse': function () {
                $('body').addClass('scroll-hide');
                $('.body-overlay').addClass('show').on('click', hideNavbarCollapse);
            },
            'hide.bs.collapse': function () {
                $('body').removeClass('scroll-hide');
                $('.body-overlay').removeClass('show').unbind('click', hideNavbarCollapse);
            },
        });
        /* ==================== Header Navbar Collapse JS End ======================= */

        /*===================== Dynamically Add Active Class JS Start ============================== */
        function dynamicActiveMenuClass(selector) {
            if (!($(selector).length)) return;

            let fileName = window.location.pathname.split('/').reverse()[0];
            selector.find('li').each(function () {
                let anchor = $(this).find('a');
                if ($(anchor).attr('href') == fileName) {
                    $(this).addClass('active');
                }
            });
            // if any li has active element add class
            selector.children('li').each(function () {
                if ($(this).find('.active').length) {
                    $(this).addClass('active');
                }
            });
            // if no file name return
            if ('' == fileName) {
                selector.find('li').eq(0).addClass('active');
            }
        }
        // dynamicActiveMenuClass($('.header .nav-menu'));
        // dynamicActiveMenuClass($('.offcanvas-sidebar--dashboard .offcanvas-sidebar-menu'));
        /*===================== Dynamically Add Active Class JS End ================================ */

        /* ==================== Dynamically Add BG Image JS Start ====================== */
        $('.bg-img').css('background-image', function () {
            return `url(${$(this).data('background-image')})`;
        });
        /* ==================== Dynamically Add BG Image JS End ========================= */

        /* ==================== Dynamically Add Mask Image JS Start ====================== */
        $('.mask-img').css('mask-image', function () {
            return `url(${$(this).data('mask-image')})`;
        });
        /* ==================== Dynamically Add Mask Image JS End ======================== */

        /* ==================== Add A Class In Select Input JS Start ===================== */
        $('.form-select.form--select').each((index, select) => {
            if ($(select).val()) {
                $(select).addClass('selected');
            }

            $(select).on('change', function () {
                if ($(this).val()) {
                    $(this).addClass('selected')
                } else {
                    $(this).removeClass('selected')
                }
            });
        });
        /* ==================== Add A Class In Select Input JS End ======================== */

        /* ==================== Select2 Initialization JS Start ==================== */
        $('.select2').each((index, select) => {
            $(select).wrap('<div class="select2-wrapper"></div>').select2({
                dropdownParent: $(select).closest('.select2-wrapper')
            });
        });
        /* ==================== Select2 Initialization JS End ==================== */

        /* ==================== Slick Slider Initialization JS Start ==================== */
        const sliderConfig = {
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 2000,
            speed: 1500,
            dots: true,
            pauseOnHover: true,
            arrows: false,
            prevArrow:
                '<button type="button" class="slick-prev"><i class="fas fa-long-arrow-alt-left"></i></button>',
            nextArrow:
                '<button type="button" class="slick-next"><i class="fas fa-long-arrow-alt-right"></i></button>',
        };

        $('.testimonial-slider').slick({
            ...sliderConfig,
            slidesToShow: 3,
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        arrows: false,
                        slidesToShow: 2,
                        dots: true,
                    },
                },
                {
                    breakpoint: 991,
                    settings: {
                        arrows: false,
                        slidesToShow: 2,
                    },
                },
                {
                    breakpoint: 464,
                    settings: {
                        arrows: false,
                        slidesToShow: 1,
                    },
                },
            ],
        });
        /* ==================== Slick Slider Initialization JS End ====================== */

        /* ==================== Password Toggle JS Start ================================ */
        $('.input--group-password').each(function (index, inputGroup) {
            let inputGroupBtn = $(inputGroup).find('.input-group-btn');
            let formControl = $(inputGroup).find('.form-control.form--control');

            inputGroupBtn.on('click', function () {
                if (formControl.attr('type') === 'password') {
                    formControl.attr('type', 'text');
                    $(this).find('i').removeClass('fa-eye-slash').addClass('fa-eye');
                } else {
                    formControl.attr('type', 'password');
                    $(this).find('i').removeClass('fa-eye').addClass('fa-eye-slash');
                }
            });
        });
        /* ==================== Password Toggle JS End ================================== */
    });
    /* ==================== Ready Function End ============================ */

    /* ==================== Header Fixed JS Start ========================= */
    $(window).on('scroll', function () {
        if ($(window).scrollTop() >= 300) {
            $('.header').addClass('fixed-header');
        } else {
            $('.header').removeClass('fixed-header');
        }
    });
    /* ==================== Header Fixed JS End ============================= */

    /* ==================== Scroll To Top Button JS Start ==================== */
    let scrollTopBtn = $('.scroll-top');

    if (scrollTopBtn.length) {
        let progressPath = scrollTopBtn.find('.scroll-top-progress path');
        let pathLength = progressPath[0].getTotalLength();
        let offset = 250;
        let duration = 550;

        progressPath.css({
            transition: 'none',
            WebkitTransition: 'none',
            strokeDasharray: `${pathLength} ${pathLength}`,
            strokeDashoffset: pathLength,
            transition: 'stroke-dashoffset 10ms linear',
            WebkitTransition: 'stroke-dashoffset 10ms linear',
        });

        function updateProgress() {
            let scroll = $(window).scrollTop();
            let height = $(document).height() - $(window).height();
            let progress = pathLength - (scroll * pathLength / height);
            progressPath.css('strokeDashoffset', progress)
        }

        updateProgress();

        $(window).on('scroll', function () {
            updateProgress();
            if ($(this).scrollTop() > offset) {
                scrollTopBtn.addClass('active');
            } else {
                scrollTopBtn.removeClass('active');
            }
        });

        scrollTopBtn.on('click', function (e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, duration);
            return false;
        });
    }

    // Disabled scroll top for account pages
    if ($(scrollTopBtn).next(':is(.page-wrapper)').find('.account').length) {
        $(scrollTopBtn).hide();
    }
    /* ==================== Scroll To Top Button JS End ==================== */

    /* ==================== Preloader JS Start ============================== */
    $(window).on('load', () => $('.preloader').fadeOut());
    /* ==================== Preloader JS End ================================ */

})(jQuery);








