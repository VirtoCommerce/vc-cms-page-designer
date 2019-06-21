$(function() {

    // Tabs
    // $('.tabs__item').on('click', function() {
    //     $(this).addClass('tabs__item--active').siblings().removeClass('tabs__item--active');
    //     $('.tabs__content').eq($(this).index()).addClass('tabs__content--active').siblings().removeClass('tabs__content--active');

    //     var name = $(this).data('name');

    //     $('main').attr('data-view', name);
    // });

    // List group
    $('.list-group-visible').on('click', function(e) {
        e.preventDefault();

        var self = $(this).parents('.list-group-item');

        if(self.hasClass('disabled')) {
            self.removeClass('disabled');
            self.find('.list-group-visible').removeClass('hidden');
        }
        else {
            self.addClass('disabled');
            self.find('.list-group-visible').addClass('hidden');
        }
    });

    // Sortable
    $('[data-name="sortable"]').sortable({
        handle: ".list-group-drag",
        placeholder: "list-group-item highlight"
    });

    $('[data-name="sortable"]').disableSelection();

    // Dropdowns
    $('.dropdown__toggle').on('click', function() {
        var self = $(this).parent();

        if(self.hasClass('dropdown--show')) {
            self.removeClass('dropdown--show');
        }
        else {
            self.addClass('dropdown--show');
        }
    });

    $('.dropdown__menu-item').on('click', function() {
        var text = $(this).find('.dropdown__menu-item-text').text();

        $(this).parents('.dropdown').find('.dropdown__toggle').text(text);
        $(this).parents('.dropdown').removeClass('dropdown--show');
    });

    // Upload file input preview
    // Closest dropdown
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.dropdown').length) {
            $('.dropdown').removeClass('dropdown--show');
        }

        e.stopPropagation();
    });

    // Presets
    $('.preset-list__item').on('click', function() {
        $(this).addClass('preset-list__item--active').siblings().removeClass('preset-list__item--active');
    });

    // Scroll
    var settings = {
        autoReinitialise: true
    };

    // var pane = $('.scroll-pane');
    // pane.jScrollPane(settings);
});

