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

    var headerLeft = header.offset().left;
    var righterLeft = righter.offset().left;
    var righterPad = righter.css('padding');
    
    var headerTop = header.offset().top;
    var righterTop = righter.offset().top;

    $window.resize(function () {
        console.log("resize event");
        waitForFinalEvent(function () {
            console.log("Actual function");
            headerLeft = header.offset().left;
            righterLeft = righter.offset().left;
            var headerTop = header.offset().top;
            var righterTop = righter.offset().top;
        }, 500, "some unique id");
    });

    if ($sidebar.length > 0) {

        //var initialSidebarTop = $sidebar.position().top;
        $window.scroll(function(event) {

            var scroll = $(window).scrollTop();
    
            if (scroll >= 101) {
                header.removeClass('fixed-left').addClass('fixed-topp');
                righter.removeClass('relative-right').addClass('fixed-right');
                $('.fixed-topp').css('left', headerLeft);
                $('.fixed-right').css('padding-left', ((parseInt(righterLeft,10)+parseInt(righterPad,10))+"px"));
    
            } else {
                header.removeClass("fixed-topp").addClass('fixed-left');
                righter.removeClass('fixed-right').addClass('relative-right');
                $('.fixed-left').css('left', headerLeft);
                $('.relative-right').css('padding-left', (parseInt(righterPad,10)+"px"));
                
            }
        });
    }
});