var header = $('.header');
$(document).on('scroll ready', function (e) {
  var scrolled = $(window).scrollTop();
  if (scrolled > 120) {
    header.addClass('fixed animated fadeInDown');
  } else {
    header.removeClass('fixed animated fadeInDown');
  }

});

$(document).ready(function () {
  /**
   * This part causes smooth scrolling using scrollto.js
   * We target all a tags inside the nav, and apply the scrollto.js to it.
   */
  $("nav a").click(function (evn) {
    // evn.preventDefault();
    $('html,body').scrollTo(this.hash, this.hash);
  });

  $('#register_Email,#register_invoiceEmail').on('input', function () {
    var input = $(this);
    var re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    var is_email = re.test(input.val());
    if (is_email) {
      input.removeClass("invalid").addClass("valid");
    } else {
      input.removeClass("valid").addClass("invalid");
    }
  });

  // Website must be a website
  $('#register_Website').on('input', function () {
    var input = $(this);
    // if (input.val().substring(0, 4) == 'www.') {
    //   input.val('http://www.' + input.val().substring(4));
    // }
    var re = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    var is_url = re.test(input.val());
    if (is_url) {
      input.removeClass("invalid").addClass("valid");
    } else {
      input.removeClass("valid").addClass("invalid");
    }
  });

  // Name can't be blank
  $('#register_UserName').on('input', function () {
    var input = $(this);
    var re = /^[a-zA-Z0-9][a-zA-Z0-9_\s\-]*[a-zA-Z0-9](?<![_\s\-]{2,}.*)$/;
    var is_name = re.test(input.val());
    if (is_name) {
      input.removeClass("invalid").addClass("valid");
    } else {
      input.removeClass("valid").addClass("invalid");
    }
  });

  $('#register_Phone ,#register_ContactName ,#register_CompanyName ,#register_Password').keyup('input', function () {
    var input = $(this);
    // var re = /^[a-zA-Z0-9][a-zA-Z0-9_\s\-]*[a-zA-Z0-9](?<![_\s\-]{2,}.*)$/;
    var is_name = input.val();
    if (is_name) {
      input.removeClass("invalid").addClass("valid");
    } else {
      input.removeClass("valid").addClass("invalid");
    }
  });


  $("#contact_submit button").click(function (event) {
    console.log("check", details);
    var form_data = $("#register").serializeArray();
    var error_free = true;
    for (var input in form_data) {
      var element = $("#register_" + form_data[input]['name']);
      var valid = element.hasClass("valid");
      var error_element = $("span", element.parent());
      if (!valid) {
        error_element.removeClass("error").addClass("error_show");
        error_free = false;
      } else {
        error_element.removeClass("error_show").addClass("error");
      }
    }
    if (!error_free) {
      event.preventDefault();
      alert('Please fill required info');
    } else {
      alert('No errors: Form will be submitted');
      return false;

    }
  });

  // function search(key, value) {

  $("#register_UserName").keyup(function () {
    var val = "";
    setTimeout(function () {
      $("#userNameBlank").css("display", "none");
      var userName = $("#register_UserName").val();
      if (userName != val && userName.length > 4) {

        val = userName;
        var t = "http://arsdigitizing.com";
        $.post(t + "/server/post.php", {
            "searchFor": userName.trim(),
            "keyFor": "userName",
            "search": true
          },
          function (data, status) {
            if (data) {
              var res = JSON.parse(data);

              if (userName != res.message) {
                require = false;
                $("#userNameBlank").css("display", "none");
              } else {
                $("#register_UserName").removeClass("valid").addClass("invalid");
                $("#userNameBlank").css("display", "block").css("color", "red").text(
                  "User Name already registerd. please try again");
              }
            } else {
              $("#register_UserName").removeClass("invalid").addClass("valid");
              $("#userNameBlank").css("display", "block").css("color", "green").text(
                userName + " is availble ");
            }
          });
      } else {
        if (!userName) {
          require = true;
          $("#userNameBlank").css("display", "block").css("color", "red").text(
            "User Name is required");
        } else {
          if (userName == val) {
            // require = false;
          } else {
            require = true;
            $("#userNameBlank").css("display", "block").css("color", "red").text(
              "Min 5 alphabet are allowed");
          }
        }
      }
    }, 800)
  });
});


/**
 * This part handles the highlighting functionality.
 * We use the scroll functionality again, some array creation and
 * manipulation, class adding and class removing, and conditional testing
 */
var aChildren = $("nav li").children(); // find the a children of the list items
var aArray = []; // create the empty aArray
for (var i = 0; i < aChildren.length; i++) {
  var aChild = aChildren[i];
  var ahref = $(aChild).attr('href');
  aArray.push(ahref);
} // this for loop fills the aArray with attribute href values

$(window).scroll(function () {
  var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
  var windowHeight = $(window).height(); // get the height of the window
  var docHeight = $(document).height();

  for (var i = 0; i < aArray.length; i++) {
    var theID = aArray[i];
    var divPos = $(theID).offset().top - 20; // get the offset of the div from the top of page
    var divHeight = $(theID).height(); // get the height of the div in question
    if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
      $("a[href='" + theID + "']").parent().addClass("active");
    } else {
      $("a[href='" + theID + "']").parent().removeClass("active");
    }
  }

  if (windowPos + windowHeight == docHeight) {
    if (!$("nav li:last-child a").hasClass("nav-active")) {
      var navActiveCurrent = $(".nav-active").attr("href");
      $("a[href='" + navActiveCurrent + "']").removeClass("nav-active");
      $("nav li:last-child a").addClass("nav-active");
    }
  }
});





var searchTrigger = jQuery('#search'),
  searchBox = jQuery('.search-form'),
  closeSearch = jQuery('#close');
searchTrigger.click(function (e) {
  searchBox.toggleClass('shown');
});
closeSearch.click(function (e) {
  searchBox.toggleClass('shown');
});


wow = new WOW({
  boxClass: 'wow',
  animateClass: 'animated',
  offset: 150,
  mobile: false,
})
wow.init();


$(document).ready(function () {
  var bigimage = $("#big");
  var thumbs = $("#thumbs");
  var totalslides = 2;
  var syncedSecondary = true;

  bigimage.owlCarousel({
    items: 1,
    slideSpeed: 2000,
    nav: true,
    autoplay: true,
    dots: false,
    loop: true,
    navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
  }).on('changed.owl.carousel', syncPosition);

  thumbs
    .on('initialized.owl.carousel', function () {
      thumbs.find(".owl-item").eq(0).addClass("current");
    })
    .owlCarousel({
      items: 8,
      responsiveClass: true,
      responsive: {
        0: {
          items: 2
        },
        400: {
          items: 3
        },
        600: {
          items: 4
        },
        1000: {
          items: 6
        },
        1300: {
          items: 8
        }
      },
      dots: true,
      margin: 13,
      nav: false,
      loop: false,
      smartSpeed: 200,
      slideSpeed: 500,
      slideBy: totalslides,
      responsiveRefreshRate: 100
    }).on('changed.owl.carousel', syncPosition2);

  function syncPosition(el) {
    //if loop is set to false, then you have to uncomment the next line
    //var current = el.item.index;

    //to disable loop, comment this block
    var count = el.item.count - 1;
    var current = Math.round(el.item.index - (el.item.count / 2) - .5);

    if (current < 0) {
      current = count;
    }
    if (current > count) {
      current = 0;
    }
    //to this
    thumbs
      .find(".owl-item")
      .removeClass("current")
      .eq(current)
      .addClass("current");
    var onscreen = thumbs.find('.owl-item.active').length - 1;
    var start = thumbs.find('.owl-item.active').first().index();
    var end = thumbs.find('.owl-item.active').last().index();

    if (current > end) {
      thumbs.data('owl.carousel').to(current, 100, true);
    }
    if (current < start) {
      thumbs.data('owl.carousel').to(current - onscreen, 100, true);
    }
  }

  function syncPosition2(el) {
    if (syncedSecondary) {
      var number = el.item.index;
      bigimage.data('owl.carousel').to(number, 100, true);
    }
  }

  thumbs.on("click", ".owl-item", function (e) {
    e.preventDefault();
    var number = $(this).index();
    bigimage.data('owl.carousel').to(number, 300, true);
  });
});


var testimonials = $('#testimonials');
testimonials.owlCarousel({
  items: 1,
  nav: true,
  navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>']
});

var clients = $('#clients');
clients.owlCarousel({
  items: 4,
  margin: 18,
  dots: true,
  responsiveClass: true,
  responsive: {
    0: {
      items: 2
    },
    400: {
      items: 3
    },
    600: {
      items: 4
    }
  },
});

var clients_v2 = $('#clients-v2');
clients_v2.owlCarousel({
  items: 4,
  margin: 18,
  dots: false,
  responsiveClass: true,
  responsive: {
    0: {
      items: 2
    },
    400: {
      items: 3
    },
    600: {
      items: 4
    }
  },
  nav: true,
  navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
});



var portfolio = $('.portfolio-details-slider');

portfolio.owlCarousel({
  items: 1,
  margin: 0,
  dots: false,
  nav: true,
  navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
});



(function ($) {
  var $window = $(window);
  var windowHeight = $window.height();
  $window.resize(function () {
    windowHeight = $window.height();
  });
  $.fn.parallax = function (xpos, speedFactor, outerHeight) {
    var $this = $(this);
    var getHeight;
    var firstTop;
    var paddingTop = 0;
    $this.each(function () {
      firstTop = $this.offset().top;
    });
    if (outerHeight) {
      getHeight = function (jqo) {
        return jqo.outerHeight(true);
      };
    } else {
      getHeight = function (jqo) {
        return jqo.height();
      };
    }
    if (arguments.length < 1 || xpos === null) xpos = "50%";
    if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
    if (arguments.length < 3 || outerHeight === null) outerHeight = true;

    function update() {
      var pos = $window.scrollTop();
      $this.each(function () {
        var $element = $(this);
        var top = $element.offset().top;
        var height = getHeight($element);
        if (top + height < pos || top > pos + windowHeight) {
          return;
        }
        $this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
      });
    }
    $window.bind('scroll', update).resize(update);
    update();
  };
})(jQuery);;

var $parallax = $('.parallax');
$parallax.each(function () {
  var $this = $(this);
  $this.removeClass('parallax');
  $this.parallax("50%", 0.3);
});


// Simple Lightbox
$(function () {
  $('.img-box a').simpleLightbox({
    spinner: true
  });
});


$('a.scrolltop').on('click', function (event) {
  event.preventDefault();
  $('html,body').animate({
    scrollTop: $(this.hash).offset().top
  }, 1500);
});

var $section = $('.progress-bars');

function loadDaBars() {
  $(".progress-bar").each(function () {
    bar_width = $(this).attr('aria-valuenow');
    $(this).width(bar_width + '%');
  });
}

$(document).bind('scroll', function (ev) {
  var scrollOffset = $(document).scrollTop();
  var containerOffset = $section.offset().top - window.innerHeight;
  if (scrollOffset > containerOffset) {
    setTimeout(function () {
      loadDaBars();
    }, 200);
    // unbind event not to load scrolsl again
    $(document).unbind('scroll');
  }
});


// external js: isotope.pkgd.js
// init Isotope
var $grid = $('#fitrows').isotope({
  itemSelector: '.element-item',
  layoutMode: 'fitRows',
  getSortData: {
    name: '.name',
    category: '[data-category]',
    weight: function (itemElem) {
      var weight = $(itemElem).find('.weight').text();
      return parseFloat(weight.replace(/[\(\)]/g, ''));
    }
  }

});



var $grid1 = $('#masonry').isotope({
  itemSelector: '.element-item',
  masonry: {},
  getSortData: {
    name: '.name',
    category: '[data-category]',
    weight: function (itemElem) {
      var weight = $(itemElem).find('.weight').text();
      return parseFloat(weight.replace(/[\(\)]/g, ''));
    }
  }
});


// filter functions
var filterFns = {
  // show if number is greater than 50
  numberGreaterThan50: function () {
    var number = $(this).find('.number').text();
    return parseInt(number, 10) > 50;
  }, // show if name ends with -ium
  ium: function () {
    var name = $(this).find('.name').text();
    return name.match(/ium$/);
  }
};
// bind filter button click
$('#filters').on('click', 'button', function () {
  var filterValue = $(this).attr('data-filter');
  // use filterFn if matches value
  filterValue = filterFns[filterValue] || filterValue;
  $grid.isotope({
    filter: filterValue
  });
});

$('#filters').on('click', 'button', function () {
  var filterValue = $(this).attr('data-filter');
  // use filterFn if matches value
  filterValue = filterFns[filterValue] || filterValue;
  $grid1.isotope({
    filter: filterValue
  });
});

$('.trigger-items').each(function (i, buttonGroup) {
  var $buttonGroup = $(buttonGroup);
  $buttonGroup.on('click', 'button', function () {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    $(this).addClass('is-checked');
  });
});


//just for portfolio link to project details, please remove when you add custom links to the View Details button

jQuery('.portfolio-info').find('a.btn-color').attr('href', 'portfolio-details.html');
//jQuery('.blogbox').find('a').attr('href','blog-list-right-sidebar.html');

jQuery(window).on("load resize", function (e) {
  if (jQuery(window).width() < 768) {
    jQuery(".showcase-img").detach().insertBefore(".showcase-left");
    jQuery(".blogs-sidebar").detach().insertAfter(".blogs-main");

    jQuery("#search").parent().hide();
  }
});


/** Mobile menu js **/
if (jQuery(window).width() < 768) {
  var searchHtml = jQuery('<a href="javascript:void(0);" id="searchToggle" class="searchToggle"><span class="fa fa-search"></span></a>'),
    submenuParent = jQuery("#topnav li > ul").parent().addClass("hasSubMenu");

  searchHtml.insertAfter('.logo');
  submenuParent.prepend('<div class="accordion-toggle"><i class="fa fa-angle-down"></i></div>');

  jQuery('#searchToggle').click(function (e) {
    searchBox.toggleClass('shown');
  });

  jQuery("#topnav li").each(function (index, element) {
    jQuery(this).find('.accordion-toggle').click(function () {
      jQuery(this).parent().find('> ul').slideToggle(200);
      jQuery(this).find('.fa').toggleClass('rotate-me');
      jQuery(this).parent().siblings().find('> ul').slideUp(200);
      jQuery(this).parent().siblings().find('.fa').removeClass('rotate-me');
    });
  });
};