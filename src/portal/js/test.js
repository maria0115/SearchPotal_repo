var AC = (function($) {
    var $search = $('.searchBox');

    $(document).on('change keyup paste', '.searchBox input', function() {
        var val = $(this).val();

        if (val.length) {
            $search.addClass('on');
        } else {
            $search.removeClass('on');
        }
    });
    
})($);

var FILTER = (function($) {
    var BUTTON = '.filterItem .btnToggle',
        MENUS   = '.filterItem ul li > a',
        SUBMIT = '.datepickerArea .btnSubmit';

    $(document).on('click', BUTTON, function(e) {
        var item = $(this).parent('.filterItem');

        item.toggleClass('active').siblings().removeClass('active');
        e.preventDefault();
    });

    $(document).on('click', MENUS, function(e) {
        var _this = $(this);
        var _item = _this.parent(),
            text = _this.text();

        if (_item.hasClass('on')) {
            return;
        } else {
            _item.addClass('on').siblings().removeClass('on');
            
            if (_this.hasClass('btnPeriod')) {
                $('.datepickerArea').show();
            } else {
                var item = _this.parents('.filterItem');

                $('.datepickerArea').hide();
                item.find('.btnToggle').html(text);
                item.removeClass('active');
            }
        }
    });

    $(document).on('click', SUBMIT, function(e) {
        var item = $(this).parents('.filterItem');

        item.find('.btnToggle').html('기간설정');
        item.removeClass('active');
    });


    $(function() {
        $("input.datepicker").datepicker();
    });
})($);


var TABS = (function($) {
    var MENU = '.tabMenu a',
        CONTENT = '.tabContent';

    $(document).on('click', MENU, function() {
        var target = $(this).attr('href');
        var _this = $(this).parent();

        if (!_this.hasClass('on')) {
            _this.addClass('on').siblings().removeClass('on');
            $(target).show().siblings(CONTENT).hide();
        }
    });
})($);