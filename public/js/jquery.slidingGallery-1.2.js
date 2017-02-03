/*
*       Developed by Justin Mead
*       ©2009 MeadMiracle
*		www.meadmiracle.com / meadmiracle@gmail.com
*       Version 1.0
*       Testing: IE7/Windows XP
*                Firefox/Windows XP
*       Licensed under the Creative Commons GPL http://creativecommons.org/licenses/GPL/2.0/
*
*       OPTIONS LISTING:
*           *Lheight, Lwidth            - the height and width to use for the center image (landscape)
*           *Lshrink                    - the function to use when shrinking an image to a smaller size.  must take in and return an integer value. (landscape)
*           *Lzoom                      - the function to use when enlarging an image for the zoom view.  must take in and return an integer value. (landscape)
*           *Pheight, Pwidth            - the height and width to use for the center image (portrait)
*           *Pshrink                    - the function to use when shrinking an image to a smaller size.  must take in and return an integer value. (portrait)
*           *Pzoom                      - the function to use when enlarging an image for the zoom view.  must take in and return an integer value. (portrait)
*           *defaultLayout              - the layout attribute to apply when the image has no layout attribute
*           *startClass                 - the class label of the image to place in the center slot at the start of the gallery
*           *slideSpeed                 - the animation speed of sliding. use jQuery animation speed values
*           *zoomSpeed                  - the animation speed of zooming. use jQuery animation speed values
*           *gutterWidth                - the horizontal distance between each of the images. use a pixel value
*           *captionUpPath              - the path of the image to use for the "caption up" button
*           *captionUpWidth             - the pixel width of the "caption up" image
*           *captionUpHeight            - the pixel height of the "caption up" image
*           *captionUpID                - the ID attribute to use for the "caption up" image
*           *captionDownPath            - the path of the image to use for the "caption down" button
*           *captionDownWidth           - the pixel width of the "caption down" image
*           *captionDownHeight          - the pixel height of the "caption down" image
*           *captionDownID              - the ID attribute to use for the "caption down" image
*           *captionHeight              - the function to use to determine the height of the caption. takes in an integer value (usually the height of the image to caption)
                                          and returns an integer value
*           *captionStyle               - the CSS style value to apply to the captions
*           *captionClass               - the CSS class to apply to the captions
*           *captionID                  - the ID attribute to apply to the currently active caption
*           *captionTextAttribute       - the attribute containing the text to use in captions
*           *useCaptions                - allow captions to be shown
*
*       All options have default values, and as such, are optional.  Check the 'options' JSON object below to see the defaults.
*/

(function($) {
    $.galleryUtility = {};
    $.galleryUtility.centerImage = {};
    $.galleryUtility.rightImage = {};
    $.galleryUtility.leftImage = {};
    $.galleryUtility.rightImageStorage = {};
    $.galleryUtility.leftImageStorage = {};
    $.galleryUtility.zoomImage = {};
    $.galleryUtility.gallery = {};

    $.galleryUtility.Options = {
        container: null,
        Lheight: 300,
        Lwidth: 400,
        Lshrink:
                        function(dimension) {
                            return dimension * 0.75;
                        },
        Lzoom:
                        function(dimension) {
                            return dimension * 2;
                        },
        Pheight: 400,
        Pwidth: 300,
        Pshrink:
                        function(dimension) {
                            return dimension * 0.75;
                        },
        Pzoom:
                        function(dimension) {
                            return dimension * 2;
                        },
        defaultLayout: 'landscape',
        startClass: 'start',
        slideSpeed: 'normal',
        zoomSpeed: 'fast',
        gutterWidth: 50,
        captionUpPath: 'Images/SlidingGallery/captionUpArrow.png',
        captionUpWidth: 24,
        captionUpHeight: 17,
        captionUpID: 'captionArrowUp',
        captionDownPath: 'Images/SlidingGallery/captionDownArrow.png',
        captionDownWidth: 24,
        captionDownHeight: 17,
        captionDownID: 'captionArrowDown',
        captionHeight:
                        function(zoomHeight) {
                            return zoomHeight * 0.1;
                        },
        captionStyle: 'background-color:white; color:black; opacity: 0.6; filter: alpha(opacity = 60); font-size: 16px; text-align:center;',
        captionClass: 'captionBox',
        captionID: 'activeCaption',
        captionTextAttribute: 'caption',
        useCaptions: false
    };

    $.fn.slidingGallery = function(options) {
        //global settings
        $.extend($.galleryUtility.Options, options);
        //eliminate overflow
        $('body').css('overflow-x', 'hidden');
        var container = null;
        if (!$.galleryUtility.Options.container) {
            $.galleryUtility.Options.container = $('body');
        } else {
            $.galleryUtility.Options.container.css('position', 'relative');
        }
        $.galleryUtility.gallery = $(this).css('cursor', 'pointer');
        $.galleryUtility.definePositions();
        if ($.galleryUtility.Options.useCaptions) {
            $.galleryUtility.Options.container.append('<img src="' + $.galleryUtility.Options.captionUpPath + '" style="width: ' + $.galleryUtility.Options.captionUpWidth + '; display: none; border-width:0px;"' + 'id="' + $.galleryUtility.Options.captionUpID + '" />').append('<img src="' + $.galleryUtility.Options.captionDownPath + '" style="width: ' + $.galleryUtility.Options.captionDownWidth + '; display: none; border-width:0px;"' + 'id="' + $.galleryUtility.Options.captionDownID + '" />');
            $('#' + $.galleryUtility.Options.captionUpID + ',#' + $.galleryUtility.Options.captionDownID).css('cursor', 'help');
        }

        //setup existing images
        var lastIndex = 0;
        var gallerySize = $.galleryUtility.gallery.each(function(i) {
            $(this).attr({
                'index': i,
                'prev': (i - 1),
                'next': (i + 1)
            }).css('position', 'absolute');
            if (($(this).attr('layout') !== 'portrait') && ($(this).attr('layout') !== 'landscape')) {
                $(this).attr('layout', $.galleryUtility.Options.defaultLayout);
            }
            lastIndex = i;
        }).hide().size();

        //fill in gallery with duplicates until there are at least 7
        var currIndex = 0;
        while (gallerySize < 7) {
            var $clone = $.galleryUtility.gallery.filter('[index=' + currIndex + ']').clone().attr({
                'index': lastIndex + 1,
                'prev': lastIndex,
                'next': lastIndex + 2
            }).removeClass($.galleryUtility.Options.startClass);
            $.galleryUtility.gallery.filter('[index=' + (lastIndex) + ']').after($clone);
            $.galleryUtility.gallery = $.galleryUtility.gallery.add('img[index=' + (lastIndex + 1) + ']');
            lastIndex++;
            currIndex++;
            gallerySize++;
        }
        $.galleryUtility.gallery.filter('[index=' + lastIndex + ']').attr('next', 0);
        $.galleryUtility.gallery.filter('[index=0]').attr('prev', lastIndex);

        //set images
        $.galleryUtility.setCenter($.galleryUtility.gallery.filter('.' + $.galleryUtility.Options.startClass).show());
        $.galleryUtility.setLeft($.galleryUtility.gallery.filter('[index=' + $.galleryUtility.centerImage.image.attr('prev') + ']').show());
        $.galleryUtility.setRight($.galleryUtility.gallery.filter('[index=' + $.galleryUtility.centerImage.image.attr('next') + ']').show());
        $.galleryUtility.setLeftStorage($.galleryUtility.gallery.filter('[index=' + $.galleryUtility.leftImage.image.attr('prev') + ']'));
        $.galleryUtility.setRightStorage($.galleryUtility.gallery.filter('[index=' + $.galleryUtility.rightImage.image.attr('next') + ']'));

        //bind events
        /*$.galleryUtility.leftImage.image.one('click', $.galleryUtility.slideRight);
        $.galleryUtility.rightImage.image.one('click', $.galleryUtility.slideLeft);
        $.galleryUtility.centerImage.image.one('click', $.galleryUtility.zoomIn);*/
        $(window).resize(function() {
            $.galleryUtility.definePositions();
            $.galleryUtility.setCenter($.galleryUtility.centerImage.image);
            $.galleryUtility.setLeft($.galleryUtility.leftImage.image);
            $.galleryUtility.setRight($.galleryUtility.rightImage.image);
            $.galleryUtility.setLeftStorage($.galleryUtility.leftImageStorage.image);
            $.galleryUtility.setRightStorage($.galleryUtility.rightImageStorage.image);
        });
		
		//begin sliding
		window.setInterval($.galleryUtility.slideLeft, 5000);

        //return the objects (for chaining purposes)
        return $(this);
    };

    $.galleryUtility.slideRight = function() {
        var liLeft = $.galleryUtility.leftImage.left($.galleryUtility.leftImageStorage.image, $.galleryUtility.leftImage.image);
        var riLeft = $.galleryUtility.rightImage.left($.galleryUtility.leftImage.image);
        var risLeft = $.galleryUtility.rightImageStorage.left($.galleryUtility.centerImage.image);
        if ($.galleryUtility.leftImageStorage.image.attr('layout') === 'landscape') {
            $.galleryUtility.leftImageStorage.image.animate({
                'top': $.galleryUtility.leftImage.Ltop,
                'left': liLeft,
                'height': $.galleryUtility.leftImage.Lheight,
                'width': $.galleryUtility.leftImage.Lwidth,
                'opacity': 'show'
            },
            $.galleryUtility.Options.slideSpeed, 'linear', function() {
                //$(this).one('click', $.galleryUtility.slideRight);
            });
        } else {
            $.galleryUtility.leftImageStorage.image.animate({
                'top': $.galleryUtility.leftImage.Ptop,
                'left': liLeft,
                'height': $.galleryUtility.leftImage.Pheight,
                'width': $.galleryUtility.leftImage.Pwidth,
                'opacity': 'show'
            },
            $.galleryUtility.Options.slideSpeed, 'linear', function() {
                //$(this).one('click', $.galleryUtility.slideRight);
            });
        }
        if ($.galleryUtility.leftImage.image.attr('layout') === 'landscape') {
            $.galleryUtility.leftImage.image.unbind().animate({
                'top': $.galleryUtility.centerImage.Ltop,
                'left': $.galleryUtility.centerImage.Lleft,
                'height': $.galleryUtility.centerImage.Lheight,
                'width': $.galleryUtility.centerImage.Lwidth
            },
            $.galleryUtility.Options.slideSpeed, 'linear', function() {
                //$(this).one('click', $.galleryUtility.zoomIn);
            });
        } else {
            $.galleryUtility.leftImage.image.unbind().animate({
                'top': $.galleryUtility.centerImage.Ptop,
                'left': $.galleryUtility.centerImage.Pleft,
                'height': $.galleryUtility.centerImage.Pheight,
                'width': $.galleryUtility.centerImage.Pwidth
            },
            $.galleryUtility.Options.slideSpeed, 'linear', function() {
                //$(this).one('click', $.galleryUtility.zoomIn);
            });
        }
        if ($.galleryUtility.centerImage.image.attr('layout') === 'landscape') {
            $.galleryUtility.centerImage.image.unbind().animate({
                'top': $.galleryUtility.rightImage.Ltop,
                'left': riLeft,
                'height': $.galleryUtility.rightImage.Lheight,
                'width': $.galleryUtility.rightImage.Lwidth
            },
            $.galleryUtility.Options.slideSpeed, 'linear', function() {
                //$(this).one('click', $.galleryUtility.slideLeft);
            });
        } else {
            $.galleryUtility.centerImage.image.unbind().animate({
                'top': $.galleryUtility.rightImage.Ptop,
                'left': riLeft,
                'height': $.galleryUtility.rightImage.Pheight,
                'width': $.galleryUtility.rightImage.Pwidth
            },
            $.galleryUtility.Options.slideSpeed, 'linear', function() {
                //$(this).one('click', $.galleryUtility.slideLeft);
            });
        }
        if ($.galleryUtility.rightImage.image.attr('layout') === 'landscape') {
            $.galleryUtility.rightImage.image.unbind().animate({
                'top': $.galleryUtility.rightImageStorage.Ltop,
                'left': risLeft,
                'height': $.galleryUtility.rightImageStorage.Lheight,
                'width': $.galleryUtility.rightImageStorage.Lwidth,
                'opacity': 'hide'
            },
            $.galleryUtility.Options.slideSpeed, 'linear');
        } else {
            $.galleryUtility.rightImage.image.unbind().animate({
                'top': $.galleryUtility.rightImageStorage.Ptop,
                'left': risLeft,
                'height': $.galleryUtility.rightImageStorage.Pheight,
                'width': $.galleryUtility.rightImageStorage.Pwidth,
                'opacity': 'hide'
            },
            $.galleryUtility.Options.slideSpeed, 'linear');
        }
        $.galleryUtility.rightImageStorage.image = $.galleryUtility.rightImage.image;
        $.galleryUtility.rightImage.image = $.galleryUtility.centerImage.image;
        $.galleryUtility.centerImage.image = $.galleryUtility.leftImage.image;
        $.galleryUtility.leftImage.image = $.galleryUtility.leftImageStorage.image;
        $.galleryUtility.setLeftStorage($.galleryUtility.gallery.filter('[index=' + $.galleryUtility.leftImageStorage.image.attr('prev') + ']'));
    };

    $.galleryUtility.slideLeft = function() {
        var riLeft = $.galleryUtility.rightImage.left($.galleryUtility.rightImage.image);
        var liLeft = $.galleryUtility.leftImage.left($.galleryUtility.centerImage.image, $.galleryUtility.rightImage.image);
        var lisLeft = $.galleryUtility.leftImageStorage.left($.galleryUtility.leftImage.image, $.galleryUtility.centerImage.image, $.galleryUtility.rightImage.image);
        if ($.galleryUtility.rightImageStorage.image.attr('layout') === 'landscape') {
            $.galleryUtility.rightImageStorage.image.animate({
                'top': $.galleryUtility.rightImage.Ltop,
                'left': riLeft,
                'height': $.galleryUtility.rightImage.Lheight,
                'width': $.galleryUtility.rightImage.Lwidth,
                'opacity': 'show'
            },
            $.galleryUtility.Options.slideSpeed, 'linear', function() {
                //$(this).one('click', $.galleryUtility.slideLeft);
            });
        } else {
            $.galleryUtility.rightImageStorage.image.animate({
                'top': $.galleryUtility.rightImage.Ptop,
                'left': riLeft,
                'height': $.galleryUtility.rightImage.Pheight,
                'width': $.galleryUtility.rightImage.Pwidth,
                'opacity': 'show'
            },
            $.galleryUtility.Options.slideSpeed, 'linear', function() {
                //$(this).one('click', $.galleryUtility.slideLeft);
            });
        }
        if ($.galleryUtility.rightImage.image.attr('layout') === 'landscape') {
            $.galleryUtility.rightImage.image.unbind().animate({
                'top': $.galleryUtility.centerImage.Ltop,
                'left': $.galleryUtility.centerImage.Lleft,
                'height': $.galleryUtility.centerImage.Lheight,
                'width': $.galleryUtility.centerImage.Lwidth
            },
            $.galleryUtility.Options.slideSpeed, 'linear', function() {
                //$(this).one('click', $.galleryUtility.zoomIn);
            });
        } else {
            $.galleryUtility.rightImage.image.unbind().animate({
                'top': $.galleryUtility.centerImage.Ptop,
                'left': $.galleryUtility.centerImage.Pleft,
                'height': $.galleryUtility.centerImage.Pheight,
                'width': $.galleryUtility.centerImage.Pwidth
            },
            $.galleryUtility.Options.slideSpeed, 'linear', function() {
                //$(this).one('click', $.galleryUtility.zoomIn);
            });
        }
        if ($.galleryUtility.centerImage.image.attr('layout') === 'landscape') {
            $.galleryUtility.centerImage.image.unbind().animate({
                'top': $.galleryUtility.leftImage.Ltop,
                'left': liLeft,
                'height': $.galleryUtility.leftImage.Lheight,
                'width': $.galleryUtility.leftImage.Lwidth
            },
            $.galleryUtility.Options.slideSpeed, 'linear', function() {
                //$(this).one('click', $.galleryUtility.slideRight);
            });
        } else {
            $.galleryUtility.centerImage.image.unbind().animate({
                'top': $.galleryUtility.leftImage.Ptop,
                'left': liLeft,
                'height': $.galleryUtility.leftImage.Pheight,
                'width': $.galleryUtility.leftImage.Pwidth
            },
            $.galleryUtility.Options.slideSpeed, 'linear', function() {
                //$(this).one('click', $.galleryUtility.slideRight);
            });
        }
        if ($.galleryUtility.leftImage.image.attr('layout') === 'landscape') {
            $.galleryUtility.leftImage.image.unbind().animate({
                'top': $.galleryUtility.leftImageStorage.Ltop,
                'left': lisLeft,
                'height': $.galleryUtility.leftImageStorage.Lheight,
                'width': $.galleryUtility.leftImageStorage.Lwidth, 'opacity': 'hide'
            },
            $.galleryUtility.Options.slideSpeed, 'linear');
        } else {
            $.galleryUtility.leftImage.image.unbind().animate({
                'top': $.galleryUtility.leftImageStorage.Ptop,
                'left': lisLeft,
                'height': $.galleryUtility.leftImageStorage.Pheight,
                'width': $.galleryUtility.leftImageStorage.Pwidth,
                'opacity': 'hide'
            },
            $.galleryUtility.Options.slideSpeed, 'linear');
        }
        $.galleryUtility.leftImageStorage.image = $.galleryUtility.leftImage.image;
        $.galleryUtility.leftImage.image = $.galleryUtility.centerImage.image;
        $.galleryUtility.centerImage.image = $.galleryUtility.rightImage.image;
        $.galleryUtility.rightImage.image = $.galleryUtility.rightImageStorage.image;
        $.galleryUtility.setRightStorage($.galleryUtility.gallery.filter('[index=' + $.galleryUtility.rightImageStorage.image.attr('next') + ']'));
    };

    $.galleryUtility.zoomIn = function() {
        $.galleryUtility.gallery.unbind();
        if ($.galleryUtility.centerImage.image.attr('layout') === 'landscape') {
            $.galleryUtility.centerImage.image.css('z-index', '99').animate({
                'top': $.galleryUtility.zoomImage.Ltop,
                'left': $.galleryUtility.zoomImage.Lleft,
                'height': $.galleryUtility.zoomImage.Lheight,
                'width': $.galleryUtility.zoomImage.Lwidth
            },
            $.galleryUtility.Options.zoomSpeed, 'linear', function() {
                $.galleryUtility.centerImage.image.one('click', $.galleryUtility.zoomOut);
                if ($.galleryUtility.Options.useCaptions) {
                    $('#' + $.galleryUtility.Options.captionDownID).css({
                        'height': 0,
                        'top': $.galleryUtility.zoomImage.Ltop + parseInt($.galleryUtility.centerImage.image.css('borderTopWidth'), 10),
                        'left': $.galleryUtility.zoomImage.Lleft + ($.galleryUtility.zoomImage.Lwidth - $.galleryUtility.Options.captionDownWidth) + parseInt($.galleryUtility.centerImage.image.css('borderLeftWidth'), 10),
                        'z-index': 1000,
                        'position': 'absolute'
                    }).show().animate({ 'height': $.galleryUtility.Options.captionDownHeight }, 'fast', 'linear', function() {
                        $('#' + $.galleryUtility.Options.captionDownID).one('click', $.galleryUtility.LcaptionDown);
                    });
                }
            });
        } else {
            $.galleryUtility.centerImage.image.css('z-index', '99').animate({
                'top': $.galleryUtility.zoomImage.Ptop,
                'left': $.galleryUtility.zoomImage.Pleft,
                'height': $.galleryUtility.zoomImage.Pheight,
                'width': $.galleryUtility.zoomImage.Pwidth
            },
            $.galleryUtility.Options.zoomSpeed, 'linear', function() {
                $.galleryUtility.centerImage.image.one('click', $.galleryUtility.zoomOut);
                if ($.galleryUtility.Options.useCaptions) {
                    $('#' + $.galleryUtility.Options.captionDownID).css({
                        'height': 0,
                        'top': $.galleryUtility.zoomImage.Ptop + parseInt($.galleryUtility.centerImage.image.css('borderTopWidth'), 10),
                        'left': $.galleryUtility.zoomImage.Pleft + ($.galleryUtility.zoomImage.Pwidth - $.galleryUtility.Options.captionDownWidth) + parseInt($.galleryUtility.centerImage.image.css('borderLeftWidth'), 10),
                        'z-index': 100,
                        'position': 'absolute'
                    }).show().animate({ 'height': $.galleryUtility.Options.captionDownHeight }, 'fast', 'linear', function() {
                        $('#' + $.galleryUtility.Options.captionDownID).one('click', $.galleryUtility.PcaptionDown);
                    });
                }
            });
        }
    };

    $.galleryUtility.LcaptionDown = function() {
        $.galleryUtility.centerImage.image.unbind();
        $.galleryUtility.Options.container.append('<span id="' + $.galleryUtility.Options.captionID + '" style="' + $.galleryUtility.Options.captionStyle + '" class="' + $.galleryUtility.Options.captionClass + '">' + $.galleryUtility.centerImage.image.attr($.galleryUtility.Options.captionTextAttribute) + '</span>');
        $('#' + $.galleryUtility.Options.captionID).css({
            'top': $.galleryUtility.zoomImage.Ltop + parseInt($.galleryUtility.centerImage.image.css('borderTopWidth'), 10),
            'left': $.galleryUtility.zoomImage.Lleft + parseInt($.galleryUtility.centerImage.image.css('borderLeftWidth'), 10),
            'width': $.galleryUtility.zoomImage.Lwidth,
            'height': 0,
            'position': 'absolute',
            'z-index': '100'
        }).animate({ 'height': Math.round($.galleryUtility.Options.captionHeight($.galleryUtility.zoomImage.Lheight)) }, 'normal', 'linear');
        $('#' + $.galleryUtility.Options.captionDownID).animate({
            'height': 0,
            'top': $.galleryUtility.zoomImage.Ltop + (Math.round($.galleryUtility.Options.captionHeight($.galleryUtility.zoomImage.Lheight))) + parseInt($.galleryUtility.centerImage.image.css('borderTopWidth'), 10)
        }, 'normal', 'linear', function() { $('#' + $.galleryUtility.Options.captionDownID).hide(); });
        $('#' + $.galleryUtility.Options.captionUpID).css({
            'top': $.galleryUtility.zoomImage.Ltop + $.galleryUtility.Options.captionDownHeight + parseInt($.galleryUtility.centerImage.image.css('borderTopWidth'), 10),
            'left': $.galleryUtility.zoomImage.Lleft + ($.galleryUtility.zoomImage.Lwidth - $.galleryUtility.Options.captionUpWidth) + parseInt($.galleryUtility.centerImage.image.css('borderLeftWidth'), 10),
            'height': 0,
            'position': 'absolute',
            'z-index': '100'
        }).show().animate({
            'top': $.galleryUtility.zoomImage.Ltop + (Math.round($.galleryUtility.Options.captionHeight($.galleryUtility.zoomImage.Lheight))) + parseInt($.galleryUtility.centerImage.image.css('borderTopWidth'), 10),
            'height': $.galleryUtility.Options.captionUpHeight
        }, 'normal', 'linear', function() {
            $('#' + $.galleryUtility.Options.captionUpID).one('click', function() {
                $.galleryUtility.LcaptionUp(false);
            });
            $.galleryUtility.centerImage.image.one('click', function() {
                $.galleryUtility.LcaptionUp(true);
            });
        });
    };

    $.galleryUtility.PcaptionDown = function() {
        $.galleryUtility.centerImage.image.unbind();
        $.galleryUtility.Options.container.append('<span id="' + $.galleryUtility.Options.captionID + '" style="' + $.galleryUtility.Options.captionStyle + '" class="' + $.galleryUtility.Options.captionClass + '">' + $.galleryUtility.centerImage.image.attr($.galleryUtility.Options.captionTextAttribute) + '</span>');
        $('#' + $.galleryUtility.Options.captionID).css({
            'top': $.galleryUtility.zoomImage.Ptop + parseInt($.galleryUtility.centerImage.image.css('borderTopWidth'), 10),
            'left': $.galleryUtility.zoomImage.Pleft + parseInt($.galleryUtility.centerImage.image.css('borderLeftWidth'), 10),
            'width': $.galleryUtility.zoomImage.Pwidth,
            'height': 0,
            'position': 'absolute',
            'z-index': '100'
        }).animate({ 'height': Math.round($.galleryUtility.Options.captionHeight($.galleryUtility.zoomImage.Pheight)) }, 'normal', 'linear');
        $('#' + $.galleryUtility.Options.captionDownID).animate({
            'height': 0,
            'top': $.galleryUtility.zoomImage.Ptop + (Math.round($.galleryUtility.Options.captionHeight($.galleryUtility.zoomImage.Pheight))) + parseInt($.galleryUtility.centerImage.image.css('borderTopWidth'), 10)
        }, 'normal', 'linear', function() { $('#' + $.galleryUtility.Options.captionDownID).hide(); });
        $('#' + $.galleryUtility.Options.captionUpID).css({
            'top': $.galleryUtility.zoomImage.Ptop + $.galleryUtility.Options.captionDownHeight + parseInt($.galleryUtility.centerImage.image.css('borderTopWidth'), 10),
            'left': $.galleryUtility.zoomImage.Pleft + ($.galleryUtility.zoomImage.Pwidth - $.galleryUtility.Options.captionUpWidth) + parseInt($.galleryUtility.centerImage.image.css('borderLeftWidth'), 10),
            'height': 0,
            'position': 'absolute',
            'z-index': '100'
        }).show().animate({
            'top': $.galleryUtility.zoomImage.Ptop + (Math.round($.galleryUtility.Options.captionHeight($.galleryUtility.zoomImage.Pheight))) + parseInt($.galleryUtility.centerImage.image.css('borderTopWidth'), 10),
            'height': $.galleryUtility.Options.captionUpHeight
        }, 'normal', 'linear', function() {
            $('#' + $.galleryUtility.Options.captionUpID).one('click', function() {
                $.galleryUtility.PcaptionUp(false);
            });
            $.galleryUtility.centerImage.image.one('click', function() {
                $.galleryUtility.PcaptionUp(true);
            });
        });
    };

    $.galleryUtility.LcaptionUp = function(unzoom) {
        $('#' + $.galleryUtility.Options.captionID).animate({ 'height': 0 }, 'normal', 'linear', function() { $('#' + $.galleryUtility.Options.captionID).remove(); });
        $('#' + $.galleryUtility.Options.captionUpID).animate({
            'top': $.galleryUtility.zoomImage.Ltop + $.galleryUtility.Options.captionDownHeight + parseInt($.galleryUtility.centerImage.image.css('borderTopWidth'), 10),
            'height': 0
        }, 'normal', 'linear', function() {
            $('#' + $.galleryUtility.Options.captionUpID).hide();
        });
        $('#' + $.galleryUtility.Options.captionDownID).show().animate({
            'height': $.galleryUtility.Options.captionDownHeight,
            'top': $.galleryUtility.zoomImage.Ltop + parseInt($.galleryUtility.centerImage.image.css('borderTopWidth'), 10)
        }, 'normal', 'linear', function() {
            if (unzoom) {
                $('#' + $.galleryUtility.Options.captionUpID).unbind();
                $.galleryUtility.zoomOut();
            } else {
                $('#' + $.galleryUtility.Options.captionDownID).one('click', $.galleryUtility.LcaptionDown);
                $.galleryUtility.centerImage.image.one('click', $.galleryUtility.zoomOut);
            }
        });
    };

    $.galleryUtility.PcaptionUp = function(unzoom) {
        $('#' + $.galleryUtility.Options.captionID).animate({ 'height': 0 }, 'normal', 'linear', function() { $('#' + $.galleryUtility.Options.captionID).remove(); });
        $('#' + $.galleryUtility.Options.captionUpID).animate({
            'top': $.galleryUtility.zoomImage.Ptop + $.galleryUtility.Options.captionDownHeight + parseInt($.galleryUtility.centerImage.image.css('borderTopWidth'), 10),
            'height': 0
        }, 'normal', 'linear', function() {
            $('#' + $.galleryUtility.Options.captionUpID).hide();
        });
        $('#' + $.galleryUtility.Options.captionDownID).show().animate({
            'height': $.galleryUtility.Options.captionDownHeight,
            'top': $.galleryUtility.zoomImage.Ptop + parseInt($.galleryUtility.centerImage.image.css('borderTopWidth'), 10)
        }, 'normal', 'linear', function() {
            if (unzoom) {
                $('#' + $.galleryUtility.Options.captionUpID).unbind();
                $.galleryUtility.zoomOut();
            } else {
                $('#' + $.galleryUtility.Options.captionDownID).one('click', $.galleryUtility.PcaptionDown);
                $.galleryUtility.centerImage.image.one('click', $.galleryUtility.zoomOut);
            }
        });
    };

    $.galleryUtility.zoomOut = function() {
        if ($.galleryUtility.Options.useCaptions) {
            $('#' + $.galleryUtility.Options.captionDownID).animate({ 'height': 0 }, 50, 'linear', $.galleryUtility.zoomOutBody).unbind();
        } else {
            $.galleryUtility.zoomOutBody();
        }
    };

    $.galleryUtility.zoomOutBody = function() {
        if ($.galleryUtility.centerImage.image.attr('layout') === 'landscape') {
            $.galleryUtility.centerImage.image.animate({
                'top': $.galleryUtility.centerImage.Ltop,
                'left': $.galleryUtility.centerImage.Lleft,
                'height': $.galleryUtility.centerImage.Lheight,
                'width': $.galleryUtility.centerImage.Lwidth
            },
            $.galleryUtility.Options.zoomSpeed, 'linear', function() {
                //$(this).css('z-index', '0').one('click', $.galleryUtility.zoomIn);
                //$.galleryUtility.leftImage.image.one('click', $.galleryUtility.slideRight);
                //$.galleryUtility.rightImage.image.one('click', $.galleryUtility.slideLeft);
            });
        } else {
            $.galleryUtility.centerImage.image.animate({
                'top': $.galleryUtility.centerImage.Ptop,
                'left': $.galleryUtility.centerImage.Pleft,
                'height': $.galleryUtility.centerImage.Pheight,
                'width': $.galleryUtility.centerImage.Pwidth
            },
            $.galleryUtility.Options.zoomSpeed, 'linear', function() {
                //$(this).css('z-index', '0').one('click', $.galleryUtility.zoomIn);
                //$.galleryUtility.leftImage.image.one('click', $.galleryUtility.slideRight);
                //$.galleryUtility.rightImage.image.one('click', $.galleryUtility.slideLeft);
            });
        }
    };

    $.galleryUtility.setRightStorage = function(image) {
        $.galleryUtility.rightImageStorage.image = image;
        if ($.galleryUtility.rightImageStorage.image.attr('layout') === 'landscape') {
            $.galleryUtility.rightImageStorage.image.hide().css({
                'top': $.galleryUtility.rightImageStorage.Ltop,
                'height': $.galleryUtility.rightImageStorage.Lheight,
                'width': $.galleryUtility.rightImageStorage.Lwidth
            });
        } else {
            $.galleryUtility.rightImageStorage.image.hide().css({
                'top': $.galleryUtility.rightImageStorage.Ptop,
                'height': $.galleryUtility.rightImageStorage.Pheight,
                'width': $.galleryUtility.rightImageStorage.Pwidth
            });
        }
        $.galleryUtility.rightImageStorage.image.css('left', $.galleryUtility.rightImageStorage.left($.galleryUtility.rightImage.image));
    };

    $.galleryUtility.setLeftStorage = function(image) {
        $.galleryUtility.leftImageStorage.image = image;
        if ($.galleryUtility.leftImageStorage.image.attr('layout') === 'landscape') {
            $.galleryUtility.leftImageStorage.image.hide().css({
                'top': $.galleryUtility.leftImageStorage.Ltop,
                'height': $.galleryUtility.leftImageStorage.Lheight,
                'width': $.galleryUtility.leftImageStorage.Lwidth
            });
        } else {
            $.galleryUtility.leftImageStorage.image.hide().css({
                'top': $.galleryUtility.leftImageStorage.Ptop,
                'height': $.galleryUtility.leftImageStorage.Pheight,
                'width': $.galleryUtility.leftImageStorage.Pwidth
            });
        }
        $.galleryUtility.leftImageStorage.image
             .css('left', $.galleryUtility.leftImageStorage.left($.galleryUtility.leftImageStorage.image, $.galleryUtility.leftImage.image, $.galleryUtility.centerImage.image));
    };

    $.galleryUtility.setCenter = function(image) {
        $.galleryUtility.centerImage.image = image;
        if ($.galleryUtility.centerImage.image.attr('layout') === 'landscape') {
            $.galleryUtility.centerImage.image.css({
                'top': $.galleryUtility.centerImage.Ltop,
                'left': $.galleryUtility.centerImage.Lleft,
                'height': $.galleryUtility.centerImage.Lheight,
                'width': $.galleryUtility.centerImage.Lwidth
            });
        } else {
            $.galleryUtility.centerImage.image.css({
                'top': $.galleryUtility.centerImage.Ptop,
                'left': $.galleryUtility.centerImage.Pleft,
                'height': $.galleryUtility.centerImage.Pheight,
                'width': $.galleryUtility.centerImage.Pwidth
            });
        }
    };

    $.galleryUtility.setRight = function(image) {
        $.galleryUtility.rightImage.image = image;
        if ($.galleryUtility.rightImage.image.attr('layout') === 'landscape') {
            $.galleryUtility.rightImage.image.css({
                'top': $.galleryUtility.rightImage.Ltop,
                'height': $.galleryUtility.rightImage.Lheight,
                'width': $.galleryUtility.rightImage.Lwidth
            });
        } else {
            $.galleryUtility.rightImage.image.css({
                'top': $.galleryUtility.rightImage.Ptop,
                'height': $.galleryUtility.rightImage.Pheight,
                'width': $.galleryUtility.rightImage.Pwidth
            });
        }
        $.galleryUtility.rightImage.image.css('left', $.galleryUtility.rightImage.left($.galleryUtility.centerImage.image));
    };

    $.galleryUtility.setLeft = function(image) {
        $.galleryUtility.leftImage.image = image;
        if ($.galleryUtility.leftImage.image.attr('layout') === 'landscape') {
            $.galleryUtility.leftImage.image.css({
                'top': $.galleryUtility.leftImage.Ltop,
                'height': $.galleryUtility.leftImage.Lheight,
                'width': $.galleryUtility.leftImage.Lwidth
            });
        } else {
            $.galleryUtility.leftImage.image.css({
                'top': $.galleryUtility.leftImage.Ptop,
                'height': $.galleryUtility.leftImage.Pheight,
                'width': $.galleryUtility.leftImage.Pwidth
            });
        }
        $.galleryUtility.leftImage.image.css('left', $.galleryUtility.leftImage.left($.galleryUtility.leftImage.image, $.galleryUtility.centerImage.image));
    };

    $.galleryUtility.definePositions = function() {
        //var Gheight = ($.galleryUtility.Options.Gheight || $(window).height());
        //var Gwidth = ($.galleryUtility.Options.Gwidth || $(window).width());
        var container = $.galleryUtility.Options.container;
        if (container[0].tagName == 'BODY') {
            container = $(window);
        }
        var Gheight = container.height();
        var Gwidth = container.width();

        $.galleryUtility.centerImage.Lheight = Math.round($.galleryUtility.Options.Lheight);
        $.galleryUtility.centerImage.Lwidth = Math.round($.galleryUtility.Options.Lwidth);
        $.galleryUtility.centerImage.Ltop = Math.round(Gheight / 2) - ($.galleryUtility.centerImage.Lheight / 2);
        $.galleryUtility.centerImage.Lleft = Math.round(Gwidth / 2) - ($.galleryUtility.centerImage.Lwidth / 2);
        $.galleryUtility.centerImage.Pheight = Math.round($.galleryUtility.Options.Pheight);
        $.galleryUtility.centerImage.Pwidth = Math.round($.galleryUtility.Options.Pwidth);
        $.galleryUtility.centerImage.Ptop = Math.round((Gheight / 2) - ($.galleryUtility.centerImage.Pheight / 2));
        $.galleryUtility.centerImage.Pleft = Math.round((Gwidth / 2) - ($.galleryUtility.centerImage.Pwidth / 2));
        $.galleryUtility.zoomImage.Lheight = Math.round($.galleryUtility.Options.Lzoom($.galleryUtility.centerImage.Lheight));
        $.galleryUtility.zoomImage.Lwidth = Math.round($.galleryUtility.Options.Lzoom($.galleryUtility.centerImage.Lwidth));
        $.galleryUtility.zoomImage.Ltop = Math.round((Gheight / 2) - ($.galleryUtility.zoomImage.Lheight / 2));
        $.galleryUtility.zoomImage.Lleft = Math.round((Gwidth / 2) - ($.galleryUtility.zoomImage.Lwidth / 2));
        $.galleryUtility.zoomImage.Pheight = Math.round($.galleryUtility.Options.Pzoom($.galleryUtility.centerImage.Pheight));
        $.galleryUtility.zoomImage.Pwidth = Math.round($.galleryUtility.Options.Pzoom($.galleryUtility.centerImage.Pwidth));
        $.galleryUtility.zoomImage.Ptop = Math.round((Gheight / 2) - ($.galleryUtility.zoomImage.Pheight / 2));
        $.galleryUtility.zoomImage.Pleft = Math.round((Gwidth / 2) - ($.galleryUtility.zoomImage.Pwidth / 2));
        $.galleryUtility.leftImage.Lheight = Math.round($.galleryUtility.Options.Lshrink($.galleryUtility.centerImage.Lheight));
        $.galleryUtility.leftImage.Lwidth = Math.round($.galleryUtility.Options.Lshrink($.galleryUtility.centerImage.Lwidth));
        $.galleryUtility.leftImage.Ltop = Math.round($.galleryUtility.centerImage.Ltop + (($.galleryUtility.centerImage.Lheight - $.galleryUtility.leftImage.Lheight) / 2));
        $.galleryUtility.leftImage.left = function(left, center) {
            if (center.attr('layout') === 'landscape') {
                if (left.attr('layout') === 'landscape') {
                    return Math.round($.galleryUtility.centerImage.Lleft - ($.galleryUtility.leftImage.Lwidth + $.galleryUtility.Options.gutterWidth));
                } else {
                    return Math.round($.galleryUtility.centerImage.Lleft - ($.galleryUtility.leftImage.Pwidth + $.galleryUtility.Options.gutterWidth));
                }
            } else {
                if (left.attr('layout') === 'landscape') {
                    return Math.round($.galleryUtility.centerImage.Pleft - ($.galleryUtility.leftImage.Lwidth + $.galleryUtility.Options.gutterWidth));
                } else {
                    return Math.round($.galleryUtility.centerImage.Pleft - ($.galleryUtility.leftImage.Pwidth + $.galleryUtility.Options.gutterWidth));
                }
            }
        };
        $.galleryUtility.leftImage.Pheight = Math.round($.galleryUtility.Options.Pshrink($.galleryUtility.centerImage.Pheight));
        $.galleryUtility.leftImage.Pwidth = Math.round($.galleryUtility.Options.Pshrink($.galleryUtility.centerImage.Pwidth));
        $.galleryUtility.leftImage.Ptop = Math.round($.galleryUtility.centerImage.Ptop + (($.galleryUtility.centerImage.Pheight - $.galleryUtility.leftImage.Pheight) / 2));
        $.galleryUtility.rightImage.Lheight = Math.round($.galleryUtility.Options.Lshrink($.galleryUtility.centerImage.Lheight));
        $.galleryUtility.rightImage.Lwidth = Math.round($.galleryUtility.Options.Lshrink($.galleryUtility.centerImage.Lwidth));
        $.galleryUtility.rightImage.Ltop = Math.round($.galleryUtility.centerImage.Ltop + (($.galleryUtility.centerImage.Lheight - $.galleryUtility.rightImage.Lheight) / 2));
        $.galleryUtility.rightImage.left = function(center) {
            if (center.attr('layout') === 'landscape') {
                return Math.round($.galleryUtility.centerImage.Lleft + ($.galleryUtility.centerImage.Lwidth + $.galleryUtility.Options.gutterWidth));
            } else {
                return Math.round($.galleryUtility.centerImage.Pleft + ($.galleryUtility.centerImage.Pwidth + $.galleryUtility.Options.gutterWidth));
            }
        };
        $.galleryUtility.rightImage.Pheight = Math.round($.galleryUtility.Options.Pshrink($.galleryUtility.centerImage.Pheight));
        $.galleryUtility.rightImage.Pwidth = Math.round($.galleryUtility.Options.Pshrink($.galleryUtility.centerImage.Pwidth));
        $.galleryUtility.rightImage.Ptop = Math.round($.galleryUtility.centerImage.Ptop + (($.galleryUtility.centerImage.Pheight - $.galleryUtility.leftImage.Pheight) / 2));
        $.galleryUtility.leftImageStorage.Lheight = Math.round($.galleryUtility.Options.Lshrink($.galleryUtility.leftImage.Lheight));
        $.galleryUtility.leftImageStorage.Lwidth = Math.round($.galleryUtility.Options.Lshrink($.galleryUtility.leftImage.Lwidth));
        $.galleryUtility.leftImageStorage.Ltop = Math.round($.galleryUtility.leftImage.Ltop + (($.galleryUtility.leftImage.Lheight - $.galleryUtility.leftImageStorage.Lheight) / 2));
        $.galleryUtility.leftImageStorage.left = function(leftStorage, left, center) {
            if (leftStorage.attr('layout') === 'landscape') {
                return Math.round($.galleryUtility.leftImage.left(left, center) - ($.galleryUtility.leftImageStorage.Lwidth + $.galleryUtility.Options.gutterWidth));
            } else {
                return Math.round($.galleryUtility.leftImage.left(left, center) - ($.galleryUtility.leftImageStorage.Pwidth + $.galleryUtility.Options.gutterWidth));
            }
        };
        $.galleryUtility.leftImageStorage.Pheight = Math.round($.galleryUtility.Options.Pshrink($.galleryUtility.leftImage.Pheight));
        $.galleryUtility.leftImageStorage.Pwidth = Math.round($.galleryUtility.Options.Pshrink($.galleryUtility.leftImage.Pwidth));
        $.galleryUtility.leftImageStorage.Ptop = Math.round($.galleryUtility.leftImage.Ptop + (($.galleryUtility.leftImage.Pheight - $.galleryUtility.leftImageStorage.Pheight) / 2));
        $.galleryUtility.rightImageStorage.Lheight = Math.round($.galleryUtility.Options.Lshrink($.galleryUtility.rightImage.Lheight));
        $.galleryUtility.rightImageStorage.Lwidth = Math.round($.galleryUtility.Options.Lshrink($.galleryUtility.rightImage.Lwidth));
        $.galleryUtility.rightImageStorage.Ltop = Math.round($.galleryUtility.rightImage.Ltop + (($.galleryUtility.rightImage.Lheight - $.galleryUtility.rightImageStorage.Lheight) / 2));
        $.galleryUtility.rightImageStorage.left = function(right) {
            if (right.attr('layout') === 'landscape') {
                return Math.round($.galleryUtility.rightImage.left(right) + ($.galleryUtility.rightImage.Lwidth + $.galleryUtility.Options.gutterWidth));
            } else {
                return Math.round($.galleryUtility.rightImage.left(right) + ($.galleryUtility.rightImage.Pwidth + $.galleryUtility.Options.gutterWidth));
            }
        };
        $.galleryUtility.rightImageStorage.Pheight = Math.round($.galleryUtility.Options.Pshrink($.galleryUtility.rightImage.Pheight));
        $.galleryUtility.rightImageStorage.Pwidth = Math.round($.galleryUtility.Options.Pshrink($.galleryUtility.rightImage.Pwidth));
        $.galleryUtility.rightImageStorage.Ptop = Math.round($.galleryUtility.rightImage.Ptop + (($.galleryUtility.rightImage.Pheight - $.galleryUtility.rightImageStorage.Pheight) / 2));
    };
})(jQuery);