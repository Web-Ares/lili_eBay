$(function(){
    'use strict';

    $(function() {

        $('.menu').each(function () {
            new Menu($(this));
        });

        $('.product__gallery').each(function () {
            new ProductGallery($(this));
        });

        $('.search').each(function () {
            new Search($(this));
        });

    });

    var Menu = function( obj ) {

        //private properties
        var _obj = obj,
            _btn = _obj.find( '.menu__btn' ),
            _opened = false;

        //private methods
        var _addEvents = function() {
                _btn.on( {
                    click: function() {

                        if ( _obj.hasClass( 'menu_open' ) ) {
                            _hide();
                        } else {
                            _show();
                        }
                    }
                } );
            },
            _hide = function(){
                _opened = false;
                _obj.removeClass('menu_open');
            },
            _show = function(){
                _opened = true;
                _obj.addClass('menu_open');
            },
            _init = function() {
                _addEvents();
            };

        _init();
    };

    var ProductGallery = function (obj) {

        var _obj = obj,
            _perView = 0,
            _galleryTop = _obj.find('.gallery-top .swiper-container'),
            // _picItem = _obj.find(".product__zoom-pic"),
            _galleryThumbs = _obj.find('.gallery-thumbs');

        var addEvents = function () {
                $(window).on({
                    resize: function () {
                        updateSwiper();
                        // removeZoomContainer();
                        // createZoomContainer();
                        // setTimeout(function(){
                        //     activeZoomContainer();
                        // }, 500);
                    }
                });

            },
            createZoomContainer = function(){
                var ind = 0;
                $.each(_picItem, function(){
                    ind++;
                    $(this).elevateZoom({
                        zoomType	: "lens",
                        lensShape : "round",
                        lensSize : 200,
                        classIndex: ind
                    });
                })
            },
            removeZoomContainer = function(){
                $('.zoomContainer').remove();
            },
            activeZoomContainer = function(){
                var topGallery = $('.gallery-thumbs'),
                    curElem = topGallery.find('.swiper-slide'),
                    curIndex = parseInt(curElem.index(topGallery.find('.swiper-slide-active'))+1);

                $('.zoomContainer').removeClass('active');

                $('.elem' + curIndex).addClass('active');
            },
            createSwiper = function () {

                if ($(window).width() < 768) {
                    _perView = 3;
                } else if ($(window).width() >= 768) {
                    _perView = 5;
                }

                _galleryTop = new Swiper(_galleryTop, {
                    effect: 'fade',
                    spaceBetween: 0
                });

                _galleryThumbs = new Swiper(_galleryThumbs, {
                    spaceBetween: 10,
                    centeredSlides: true,
                    slidesPerView: _perView,
                    touchRatio: 0.2,
                    slideToClickedSlide: true,
                    onSlideChangeEnd: function(){
                        // activeZoomContainer();
                    }
                });

                _galleryTop.params.control = _galleryThumbs;
                _galleryThumbs.params.control = _galleryTop;

            },

            updateSwiper = function () {

                if ($(window).width() < 768) {
                    _galleryThumbs.params.slidesPerView = 3;

                } else if ($(window).width() >= 768) {
                    _galleryThumbs.params.slidesPerView = 5;
                }

            },
            init = function () {
                addEvents();
                createSwiper();
                // createZoomContainer();
                // setTimeout(function(){
                //     activeZoomContainer();
                // }, 500);
            };

        init();

    };

    var Search = function( obj ) {

        //private properties
        var _obj = obj,
            _btn = _obj.find( '.search__btn' ),
            _opened = false;

        //private methods
        var _addEvents = function() {
                _btn.on( {
                    click: function() {

                        if ( _obj.hasClass( 'open' ) ) {
                            _hide();
                        } else {
                            _show();
                        }
                    }
                } );
            },
            _hide = function(){
                _opened = false;
                _obj.removeClass('open');
            },
            _show = function(){
                _opened = true;
                _obj.addClass('open');
            },
            _init = function() {
                _addEvents();
            };

        _init();
    };

});