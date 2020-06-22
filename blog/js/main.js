var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId";
        }
        if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();

$(function() {
    var $window = $(window);
    var lastScrollTop = $window.scrollTop();
    var wasScrollingDown = true;

    var $sidebar = $("#sidebar");
    var header = $(".fixed-left");
    var righter = $(".relative-right");
    var navbars = $("#nav-bar");

    var headerLeft = header.offset().left;
    var righterLeft = righter.offset().left;
    var righterPad = righter.css('padding');
    var navHeight = navbars.css("height");
    var headerHeight = header.css("height");
    var docHeight = $(window).height();
    var righterHeight = righter.css("height");

    $window.resize(function () {
        console.log("resize event");
        waitForFinalEvent(function () {
            console.log("Actual function");
            headerLeft = header.offset().left;
            righterLeft = righter.offset().left;
            navHeight = navbars.css("height");
            headerHeight = header.css("height");
            docHeight = $(window).height();
            righterHeight = righter.css("height");
        }, 500, "some unique id");
    });

    $(window).bind('orientationchange', function(event){
    /*    if(event.orientation) {
              if(event.orientation == 'portrait') {
            // do something
                } else if (event.orientation == 'landscape') {
                         // do something else 
                         } 
              } else {
                    // optional... PC-version javascript for example
                    }
    */
        console.log("orientation event");
        headerLeft = header.offset().left;
        righterLeft = righter.offset().left;
        navHeight = navbars.css("height");
        headerHeight = header.css("height");
        docHeight = $(window).height();
        righterHeight = righter.css("height");
    });

    console.log("Header Height: ",headerHeight);

    if ($sidebar.length > 0) {

        //var initialSidebarTop = $sidebar.position().top;
        $window.scroll(function(event) {

            var scroll = $(window).scrollTop();
    
            if (scroll >= parseInt(navHeight)) {
                header.removeClass('fixed-left').addClass('fixed-topp');
                righter.removeClass('relative-right').addClass('fixed-right');
                $('.fixed-topp').css('left', headerLeft);
                if(parseInt(navHeight) + parseInt(headerHeight) + parseInt(righterHeight) == parseInt(docHeight)){
                    $('.vertical-spacer').css('height',  ((parseInt(headerHeight,10))+"px"));
                    
                }
                $('.fixed-right').css('padding-left', ((parseInt(righterLeft,10)+parseInt(righterPad,10))+"px"));
    
            } else {
                header.removeClass("fixed-topp").addClass('fixed-left');
                righter.removeClass('fixed-right').addClass('relative-right');
                $('.fixed-left').css('left', headerLeft);
                $('.relative-right').css('padding-left', (parseInt(righterPad,10)+"px"));
                $('.vertical-spacer').css('height', 0);

            }
        });
    }
});