//Responsive Tabs initialized
jQuery('#rTabs').responsiveTabs({
    rotate: false,
    startCollapsed: 'accordion',
    collapsible: 'accordion',
    setHash: false
});

//Responsive Tabs initializing the first tab on mobile
if (document.body.clientWidth < 767) {
    //jQuery('span.pipe').hide();
    jQuery('#rTabs').responsiveTabs('activate', 0);
}


//Responsive Tabs initializing the first tab on mobile
if (document.body.clientWidth < 767) {
    //jQuery('span.pipe').hide();
    jQuery('#rTabs').responsiveTabs('activate', 0);
}

function viewTabs() {
jQuery('html, body').animate({
    scrollTop: jQuery('#rTabs').offset().top - jQuery('#top-categories-menu').outerHeight()
}, 'fast');
}