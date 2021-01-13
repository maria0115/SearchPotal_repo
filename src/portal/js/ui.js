/*
**  Smart Groupware
*/
var SGW = {
    TOGGLE: function(m) {
        var t = $(m);

        t.toggleClass('on');
    },
    TABS: function(m) {
        var t = $(m),
            c = t.closest('.tabContainer');
        var id = t.attr('href');

        t.closest('li').addClass('on').siblings().removeClass('on');
        c.find(id).addClass('active').siblings().removeClass('active');
    },
    ACTIVE: function(m) {
        var t = $(m);

        t.closest('li').addClass('on').siblings().removeClass('on');
    },
    ALLMENU: function(m) {
        $('body').toggleClass('is-open-allmenu')
    }
};


var SELECT_MENU = (function($GW) {
    $GW(document).on('change', '.selectMenu select', function() {
        var v = $GW(this).val();
        var l = $GW(this).siblings('label');

        l.html(v);
    })
})($);
