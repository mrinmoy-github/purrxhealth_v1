var domainName = document.location.host;
jQuery(window).resize(function() {
   jQuery('#mobile-categories ul').css('max-height', screen.height);
   if (jQuery(window).width() >= 768) {
      $('body').removeClass('st-off-canvas');
      $('#st-container').removeClass('st-effect-1 st-menu-open');
   }
});


function setThumbHeight(elem) {
   var max = -1;
   jQuery(elem).each(function() {
      var h = jQuery(this).children('a').children('img').height();
      max = h > max ? h : max;
   });
   jQuery(elem).css({
      'height': max
   });

}

jQuery(document).ready(function($) {
   //SideBar Toggle Mobile View
   $(document).on('click', '#sidebar-toggle', function() {
      if ($(this).find('i').hasClass('fa-plus')) {
         $('#leftBar').fadeIn(200);
         $('#blog .blogNav').fadeIn(200);
         if ($('#leftBar').length) {
            $(window).scrollTop($('#leftBar').offset().top - 60);
         }
         if ($('#blog .blogNav').length) {
            $(window).scrollTop($('#blog .blogNav').offset().top - 120);
         }
         $(this).find('i').attr('class', 'fa fa-minus');
      } else if ($(this).find('i').hasClass('fa-minus')) {
         if ($('#leftBar').length) {
            $('#leftBar').fadeOut(200);
         }
         if ($('#blog .blogNav').length) {
            $('#blog .blogNav').fadeOut(200);
         }
         $(this).find('i').attr('class', 'fa fa-plus');
      }
   });
   // if ($('#sidebar-toggle').length) {
   // }
    // append all subs of same parent class to 1 parent
   if ($('.sub-categories-format').length > 0){
      $('.sub-categories-format ul').addClass('owl-carousel');
      $('.sub-categories-format').each(function(index, el) {
         var firstSub = $(this).children('ul:eq(0)');
         if ($(this).children('ul').length >= 2){
            firstSub.siblings().children().appendTo(firstSub);
            firstSub.siblings().remove();
         }
      });
      $('.sub-categories-format ul:eq(0)').owlCarousel({
         nav: true,
         dots: false,
         items: 5,
         margin: 26,
         slideBy: 5,
         responsive: {
            0: {
               items: 2,
               slideBy: 2
            },
            480: {
               items: 3,
               slideBy: 3
            },
            768: {
               items: 3,
               slideBy: 3
            },
            992: {
               items: 4,
               slideBy: 4
            },
            1200: {
               items: 5,
               slideBy: 5
            }
         },
         responsiveRefreshRate: 0,
         navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']
      });
   }


   if ($('.inner-wrapper').children('.productBlockContainer').length > 0){
      $('.inner-wrapper').each(function(index, el) {
         $(this).children('.productBlockContainer').children('div:not(".product-container")').remove();
         var firstChild = $(this).children('.productBlockContainer:eq(0)');

         if ($(this).children('.productBlockContainer').length >= 2){
            firstChild.siblings().children().appendTo(firstChild);
            firstChild.siblings().remove();
         }
      });
   }
});

jQuery(document).ready(function($) {



   //Mobile Menu Links
  /*  $('#mobile-categories ul').prepend($('#top-categories-menu1 .container > ul').html());
   $('#mobile-categories ul').css('max-height', screen.height);
   $('#mobile-customer ul').prepend($('.header-top-left > ul').html());
  $('#mobile-customer ul').append('<li>' + $('.wishlist-link').html() + '</li>');
   $('#mobile-customer ul').append($('.header-panel-top ul').html());*/


   $('#top-categories-menu ul li').has('ul li').addClass('hasSub');
   $('#mobile-categories ul li').has('ul li').addClass('hasSub').prepend('<span class="toggle-expand"></span>');
   $('#mobile-categories ul li.hasSub > span').click(function() {
      if ($(this).hasClass('toggle-expand')) {
         $(this).siblings('.subMegaMenu').addClass('sub-expand');
         $(this).parent().addClass('expanded');
         $(this).attr('class', 'toggle-close');
      } else if ($(this).hasClass('toggle-close')) {
         $(this).siblings('.subMegaMenu').removeClass('sub-expand');
         $(this).parent().removeClass('expanded');
         $(this).attr('class', 'toggle-expand');
      }
   });

   

   //QuickView MagnificPopup
  //  $('.btnQV').magnificPopup({
  //     type: 'iframe',
  //     mainClass: 'mfp-quickview mfp-fade'
  //  })

   //Disable QuickView
 /*  $(function() {
      if (!$('#qv_buttons').size()) {
         $('.btnQV').remove();
      }
   });*/



   jQuery('.productContainer').each(function() {
      if (jQuery(this).children().length < 1) {
         jQuery(this).hide();
      }
   });


   setThumbHeight('#homeFeatured .prod-item .prod-image');
   setThumbHeight('#productCategoryBlock .prod-item .prod-image');

   //product video youtube-iframe height
   jQuery('#realmediaBlock iframe#realmedia').css({
      'width': '100%',
      'height': '300px'
   });



});

jQuery(document).ready(function($) {

   //Related Products
   var $relatedProducts = $('#relatedProducts .owl-carousel');
   if ($relatedProducts.length > 0) {
      $relatedProducts.owlCarousel({
         nav: true,
         dots: false,
         items: 4,
         margin: 30,
         slideBy: 4,
         responsive: {
            0: {
               items: 2,
               slideBy: 2
            },
            480: {
               items: 2,
               slideBy: 2
            },
            768: {
               items: 2,
               slideBy: 2
            },
            992: {
               items: 3,
               slideBy: 3
            },
            1200: {
               items: 4,
               slideBy: 4
            }
         },
         responsiveRefreshRate: 0,
         navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']
      });
   }

   //Accessories Products
   var $accessoriesBlock = $('#accessoriesBlock .owl-carousel');
   if ($accessoriesBlock.length > 0) {
      $accessoriesBlock.owlCarousel({
         nav: true,
         dots: false,
         items: 4,
         margin: 30,
         slideBy: 4,
         responsive: {
            0: {
               items: 2,
               slideBy: 2
            },
            480: {
               items: 2,
               slideBy: 2
            },
            768: {
               items: 2,
               slideBy: 2
            },
            992: {
               items: 3,
               slideBy: 3
            },
            1200: {
               items: 4,
               slideBy: 4
            }
         },
         responsiveRefreshRate: 0,
         navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']
      });
   }

   //You May Also Like
   var $alsoLikeProducts = $('#alsoLikeProducts .owl-carousel');
   if ($alsoLikeProducts.length > 0) {
      $alsoLikeProducts.owlCarousel({
         nav: true,
         dots: false,
         items: 5,
         margin: 30,
         slideBy: 5,
         responsive: {
            0: {
               items: 2,
               slideBy: 2
            },
            480: {
               items: 2,
               slideBy: 2
            },
            768: {
               items: 3,
               slideBy: 3
            },
            992: {
               items: 4,
               slideBy: 4
            },
            1200: {
               items: 5,
               slideBy: 5
            }
         },
         responsiveRefreshRate: 0,
         navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']
      });
   }

   //Recently Viewed Items
   var $recentlyViewed = $('#recentlyViewed .owl-carousel');
   if ($recentlyViewed.length > 0) {

      $recentlyViewed.owlCarousel({
         nav: true,
         dots: false,
         items: 4,
         margin: 30,
         slideBy: 4,
         responsive: {
            0: {
               items: 2,
               slideBy: 2
            },
            480: {
               items: 2,
               slideBy: 2
            },
            768: {
               items: 2,
               slideBy: 2
            },
            992: {
               items: 3,
               slideBy: 3
            },
            1200: {
               items: 4,
               slideBy: 4
            }
         },
         responsiveRefreshRate: 0,
         navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
         onInitialized: function(){
            var item_id = 'product.asp?itemid='+$('input[name="item_id"]').val()+'&amp;delhist=0';
            $('.history-disable-btn').appendTo( $recentlyViewed);
         }
      });
   }
   //Blog Tagged Products
   var $blogRelatedBlock = $('#blogRelatedBlock .owl-carousel');
   if ($blogRelatedBlock.length > 0) {
      $blogRelatedBlock.owlCarousel({
         nav: true,
         dots: false,
         items: 4,
         margin: 30,
         slideBy: 4,
         responsive: {
            0: {
               items: 2,
               slideBy: 2
            },
            480: {
               items: 2,
               slideBy: 2
            },
            768: {
               items: 2,
               slideBy: 2
            },
            992: {
               items: 3,
               slideBy: 3
            },
            1200: {
               items: 4,
               slideBy: 4
            }
         },
         responsiveRefreshRate: 0,
         navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']

      });
   }

   //Account Recommended
   var $accountRecommended = $('#accountRecommended .owl-carousel');
   if ($accountRecommended.length > 0) {
      $accountRecommended.owlCarousel({
         nav: true,
         dots: false,
         items: 5,
         margin: 30,
         slideBy: 5,
         responsive: {
            0: {
               items: 2,
               slideBy: 2
            },
            480: {
               items: 2,
               slideBy: 2
            },
            768: {
               items: 3,
               slideBy: 3
            },
            992: {
               items: 4,
               slideBy: 4
            },
            1200: {
               items: 5,
               slideBy: 5
            }
         },
         responsiveRefreshRate: 0,
         navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']
      });

   }

   //Top Sellers
   var $modTopSellers = $('#modTopSellers .owl-carousel');
   if ($modTopSellers.length > 0) {
      $modTopSellers.owlCarousel({
         items: 1,
         nav: true,
         dots: false,
         margin: 30,
         responsiveRefreshRate: 0,
         responsive: {
            480: {
               items: 2,
               slideBy: 2
            },
            768: {
               items: 1,
               slideBy: 1
            }

         },
         navText: ['<i class="fa fa-angle-left"></i><span>PREV</span>','<span>NEXT</span><i class="fa fa-angle-right"></i>']
      });
   }

   //Home Brands Carousel
   var $homeBrands = $('#homeBrands .owl-carousel');
   if ($homeBrands.length > 0) {
      $homeBrands.owlCarousel({
         items: 5,
         nav: true,
         dots: false,
         slideBy: 5,
         responsive: {
            0: {
               items: 1,
               slideBy: 1
            },
            420: {
               items: 2,
               slideBy: 2
            },
            560: {
               items: 3,
               slideBy: 3
            },
            768: {
               items: 4,
               slideBy: 4
            },
            992: {
               items: 4,
               slideBy: 4
            },
            1200: {
               items: 5,
               slideBy: 5
            }
         },
         responsiveRefreshRate: 0,
         navText: ['<i class="fa fa-caret-left"></i>','<i class="fa fa-caret-right"></i>']
      });
   }

   //Testimonials
   var $testimonials = $('#footer-testimonials .owl-carousel');
   if ($testimonials.length > 0) {
      $testimonials.owlCarousel({
         items: 1,
         nav: true,
         dots: false,
         margin: 30,
         responsiveRefreshRate: 0,
         navText: ['<i class="fa fa-caret-left"></i>','<i class="fa fa-caret-right"></i>']
      });
   }


});


jQuery(document).ready(function($) {
   /*halothemes.init();*/
});

//HALO THEME FUNCTIONS
var halothemes = {
   init: function() {
      this.initSearchBoxFixed();
      this.initDropdownCart();
      this.initCustomScrollbar();
      this.initBackToTop();
      this.initBottomPageInfo(true);      //set true for enabled - false for disabled
      this.initNewsletterPopup(false, 1);  //set true for enabled - false for disabled
      this.initPagesCookie(false, 1);      //set true for enabled - false for disabled
      this.initQuickViewProduct(true);    //set true for enabled - false for disabled
      this.initLoadMoreProducts(true);
   },
   initDropdownCart: function() {

      if ($('#dropdown-cart').length) {
         var eventtype = jQuery.browser.mobile ? 'touchstart' : 'click';

         $('.top-cart > a').on(eventtype, function(ev) {
            ev.preventDefault();
            $(this).parent().toggleClass('cart-expanded');
         });
         $(document).on(eventtype, function(ev) {
            if ($(ev.target).closest(".top-cart").length === 0) {
               $('.top-cart').removeClass('cart-expanded');
            }
         });

      } else {
         $('.top-cart > a').attr('href', 'view_cart.asp');
      }



   },
   initCustomScrollbar: function() {
      //Dropdown Cart ScrollBar
      var $cartScroll = $('#dropdown-cart #recalculate');
      if ($cartScroll.length > 0) {
         $cartScroll.mCustomScrollbar('destroy');
         if (jQuery.browser.mobile) {
            $cartScroll.mCustomScrollbar('destroy');
            $cartScroll.css({
               'overflow': 'auto',
               'max-height': '117px'
            });
         } else {
            $cartScroll.mCustomScrollbar({
               scrollInertia: 400
            });
         }
      }

      //QuickSearch ScrollBar
     /* var $searchScroll = $('.searchlight-balloon');
      if ($searchScroll.length > 0) {
         $searchScroll.mCustomScrollbar('destroy');
         if (jQuery.browser.mobile) {
            $searchScroll.mCustomScrollbar('destroy');
            $searchScroll.css({
               'overflow': 'auto',
               'max-height': '98px'
            });
         } else {
            $searchScroll.mCustomScrollbar({
               scrollInertia: 400
            });
         }
      }*/

      //Checkout Cart ScrollBar

      var $chkCartScroll = $('.chkcart-container');
      if ($chkCartScroll.length > 0) {
         $chkCartScroll.mCustomScrollbar('destroy');
         if (jQuery.browser.mobile) {
            $chkCartScroll.mCustomScrollbar('destroy');
            $chkCartScroll.css({
               'overflow': 'auto',
               'max-height': '98px'
            });
         } else {
            $chkCartScroll.mCustomScrollbar({
               scrollInertia: 400
            });
         }
      }




   },
   initBackToTop: function() {
      // browser window scroll (in pixels) after which the "back to top" link is shown
      var offset = 300,
         //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
         offset_opacity = 1200,
         //duration of the top scrolling animation (in ms)
         scroll_top_duration = 700,
         //grab the "back to top" link
         $back_to_top = $('#back-to-top');

      //hide or show the "back to top" link
      $(window).scroll(function() {
         ($(this).scrollTop() > offset) ? $back_to_top.addClass('is-visible'): $back_to_top.removeClass('is-visible fade-out');
         if ($(this).scrollTop() > offset_opacity) {
            $back_to_top.addClass('fade-out');
         }
      });
      //smooth scroll to top
      $back_to_top.on('click', function(event) {
         event.preventDefault();
         $('body,html').animate({
            scrollTop: 0,
         }, scroll_top_duration);
      });
   },
   initSearchBoxFixed: function() {
      var eventtype = jQuery.browser.mobile ? 'touchstart' : 'click';
      $('.search-toggle').on(eventtype, function(ev) {
         ev.preventDefault();
         $(this).parent().toggleClass('on');
         /*if (!$(this).parent().hasClass('on')) {
            $('.header-search form #searchlight').val('');
         }*/
      });
      $(document).on(eventtype, function(ev) {
         if ($(ev.target).closest("#searchBox").length === 0) {
            $('.search-toggle').parent().removeClass('on');
           // $('.header-search form #searchlight').val('');
            $('.searchlight-balloon').hide();
         }
      });
   },
   initBottomPageInfo: function(e, t) {
      if (e === true) {
         var eventtype = jQuery.browser.mobile ? 'touchstart' : 'click';

         $('#bottom-page-information').removeClass('hide').addClass('animated fadeIn');

         $('#bottom-page-information button.btn-close').on(eventtype, function() {
            $('#bottom-page-information').addClass('hide');
         });
      }
   },
   /*initPagesCookie: function(e, t) {
      if (e === true) {
         var eventtype = jQuery.browser.mobile ? 'touchstart' : 'click';

         if (Cookies.get('pageCookies') != 'closed') {
            setTimeout(function() {
               $('#page-cookies').removeClass('hide').addClass('animated fadeIn');
            }, 2000);
            $('#page-cookies button.btn-color').on(eventtype, function() {
               Cookies.set('pageCookies', 'closed', {
                  expires: t,
                  path: '/',
                  domain: domainName
               });

               $('#page-cookies').addClass('animated fadeOut');
               setTimeout(function() {
                  $('#page-cookies').addClass('hide');
               }, 600);
            });
         }

         $('#page-cookies button.btn-close').on(eventtype, function() {
            $('#page-cookies').addClass('animated fadeOut');
            setTimeout(function() {
               $('#page-cookies').addClass('hide');
            }, 600);
         });

      } else {
         Cookies.remove('pageCookies', { domain: domainName });
      }

   },*/
   initQuickViewProduct: function(e) {
      if (e === true) {
         $('.productContainer .prod-item .prod-image .actions .btnQV').css({
            'display': 'block'
         });
         $('.owl-item .prod-item .prod-image .actions .btnQV').css({
            'display': 'block'
         });
      }
   },
   initNewsletterPopup: function(e, t) {

      if (e === true) {
         var eventtype = jQuery.browser.mobile ? 'touchstart' : 'click';

         if (Cookies.get('haloNewsletterPopup') != 'closed') {
            setTimeout(function() {
               $('#halo-newsletter-popup').removeClass('hide').addClass('animated fadeIn');
               $('body').addClass('has-newsletter');
            }, 2000);

            $('#mailingFormPopup').submit(function(event) {
               if (document.getElementById('mailingFormPopup').elements['email'].value == "") {
                  alert("Please enter an email!");
                  return false;
               } else {
                  Cookies.set('haloNewsletterPopup', 'closed', {
                     expires: t,
                     path: '/',
                     domain: domainName
                  });

                  $('#halo-newsletter-popup').addClass('animated fadeOut');
                  setTimeout(function() {
                     $('#halo-newsletter-popup').addClass('hide');

                     $('body').removeClass('has-newsletter');

                     return true;
                  }, 600);
               }
            });


            $('#halo-newsletter-popup button.mfp-close').on(eventtype, function() {
               Cookies.set('haloNewsletterPopup', 'closed', {
                  expires: t,
                  path: '/',
                  domain: domainName
               });

               $('#halo-newsletter-popup').addClass('animated fadeOut');
               setTimeout(function() {
                  $('#halo-newsletter-popup').addClass('hide');

                  $('body').removeClass('has-newsletter');
               }, 600);
            });
         }
      } else {
         /*Cookies.remove('haloNewsletterPopup', { domain: domainName });*/
      }

   },
   initLoadMoreProducts(e) {
      if (e == true) {
         if ($('#homeFeatured .product-container').length >=11){
            $('#homeFeatured .product-container:nth-child(n+11)').css({'display': 'none'});
            $('#homeFeatured .container').append('<div class="loadMoreProduct text-center"><a href="javascript:void(0);">Load More Products</a></div>');
         }

         var productsToShow = 10;
         var totalProducts = jQuery("#homeFeatured .product-container");
         jQuery(".loadMoreProduct a").click(function() {
            if (jQuery('#homeFeatured .product-container:hidden').length > 0) {
               jQuery('#homeFeatured .product-container:hidden:lt(' + productsToShow + ')').show();
               jQuery("window").scroll();
               if (jQuery('#homeFeatured .product-container:hidden').length == 0) {
                  //no more products
                  jQuery(".loadMoreProduct a").text("No More Products").addClass('disabled');
               }
            }
         });


      }
   }

}

function footer_mailing_list() {
   if (document.getElementById('footerMailingForm').elements['email'].value == "") {
      alert("Please enter an email!");
      return false;
   } else {
      return true;
   }
}

/**
 * sidebarEffects.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var SidebarMenuEffects = (function() {

   function hasParentClass(e, classname) {
      if (e === document) return false;
      if (classie.has(e, classname)) {
         return true;
      }
      return e.parentNode && hasParentClass(e.parentNode, classname);
   }

   function init() {

      var container = document.getElementById('st-container'),
         buttons = Array.prototype.slice.call(document.querySelectorAll('#st-trigger-effects > li > a:not(#mobile-cart)')),
         // event type (if mobile use touch events)
         eventtype = jQuery.browser.mobile ? 'touchstart' : 'click',
         resetMenu = function() {
            classie.remove(container, 'st-menu-open');
            jQuery('body').removeClass('st-off-canvas');
         },
         bodyClickFn = function(evt) {
            //if( hasParentClass( evt.target, 'close-canvas' ) ) {
            if (!hasParentClass(evt.target, 'st-menu')) {
               resetMenu();
               document.removeEventListener(eventtype, bodyClickFn);
            }
         };

      buttons.forEach(function(el, i) {
         var effect = el.getAttribute('data-effect');

         el.addEventListener(eventtype, function(ev) {
            ev.stopPropagation();
            ev.preventDefault();
            container.className = 'st-container'; // clear
            classie.add(container, effect);
            jQuery(window).scrollTop(0);
            setTimeout(function() {
               classie.add(container, 'st-menu-open');
               jQuery('body').addClass('st-off-canvas');
            }, 25);
            document.addEventListener(eventtype, bodyClickFn);
         });
      });

   }

   init();

})();



/*$(document).ready(function() {

   function setActiveMenu() {

      var winPath = window.location.pathname.toLowerCase().replace('/', '');

      var breadLink;
      if ($('.breadcrumbs a:nth-child(2)').size() != 0) {
         breadLink = $('.breadcrumbs a:nth-child(2)').attr('href').toLowerCase().replace('/', '');
      }

      var blogLink;
      if ($('.blogNav .blog-home a').size() != 0) {
         blogLink = $('.blogNav .blog-home a').attr('href').toLowerCase().replace('/', '');
      }
      if (winPath == '') {
         $('#top-categories-menu li.home-menu a').addClass('active');
      }

      $('#top-categories-menu .container > ul > li > a').each(function() {

         var thisPath = $(this).attr('href').toLowerCase().replace('/', '');

         if (winPath == thisPath) {
            $(this).addClass("active");
         } else if (breadLink == thisPath) {
            $(this).addClass("active");
         } else if (blogLink == thisPath) {
            $(this).addClass("active");
         }

      });
   }

   setActiveMenu();


});
*/
