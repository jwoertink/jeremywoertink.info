/*  Jeremy Woertink 2011 
 *
 ********/
var development = (window.location.hostname == "localhost"),
    new_to_site = function() {
      if(development) {
        return true;
      } else {
        return getCookie("visited") == null;
      }
    };

//Initialize stuff
$(function() {
  animateStory();
  backButton();
  $('a[rel=about]').click(function() {
    $('#story > *').animate({
      top: "-1000px"
    }, 1500, "easeInElastic", function() {
      $("body").stop().animate({"background-color": "#000000"}, 2000, function() {
        $('#bottom').fadeIn("slow");
        setTimeout(function() { $('#bottom span').fadeIn("fast"); }, 2000);
      });
    });
    
     return false
  });
});

//Animations for the home page
function animateStory() {
  if($('#story').length > 0) {
    intro();
  }
  
  function intro() {
    if(new_to_site()) {
      setTimeout(function() {
        $('.greeting').show("fast").animate({
          top: "100px",
          left: "100px"
        }, 1500, "easeInCirc", two);
      }, 1500);
      setCookie("visited", true)
    } else {
      showNormalSite();
    }
  }
  function two() {
    setTimeout(function() {
      $('.tagline').animate({
        left: $(window).width() + "px"
      }, 300, function() {
        $('.tagline').show("fast").animate({
          top: "170px",
          left: "340px"
        }, 1500, "easeInQuint", three);
      });
    });
  }
  function three() {
    setTimeout(function() {
      $('.red.bubble').fadeIn("fast").animate({
        top: "300px",
        left: ($(window).width() - 500) + "px"
      }, 5000, "easeInCubic", function() {
        $(this).animate({top: "65px"}, 300, "easeOutExpo", four);
      });
    }, 300);
  }
  function four() {
    setTimeout(function() {
      $('.green.bubble').fadeIn("fast").animate({
        left: "10px",
        bottom: "-100px"
      }, 1000, function() {
        $(this).animate({
          top: "200px",
          height: "80px"
        }, 1000, "easeOutBounce", five);
      });
    });
  }
  function five() {
    setTimeout(function() {
      $('.yellow.bubble').animate({
        top: ($(window).height() - 300) + "px",
        left: ($(window).width() / 2) + "px"
      }, 300, function() {
        $(this).slideDown("fast");
      });
    });
  }
}

function showNormalSite() {
  $("body").stop().animate({"background-color": "#222222"}, 800);
  $('#site').fadeIn('slow');
}


//Displays a back button to the home page from the 
//Resume page only when the user hits the bottom of the page
function backButton() {
  if($('#resume')) {
    $(window).scroll(function() {
      var back_link = $('#back');
      if($(window).scrollTop() + $(window).height() == $(document).height()) {
        if(back_link.hasClass('hidden')) {
          back_link.animate({"left": "0px"}, "fast", function() {
            back_link.removeClass('hidden');
          });
        }
      } else {
        if(parseInt(back_link.css('left'), 10) == 0) {
          back_link.animate({"left": "-24px"}, "fast", function() {
            back_link.addClass('hidden');
          });
        }
      }
    });
  }
}
// Create a cookie with the specified name and value.
// The cookie expires at the end of the 21st century.
function setCookie(name, value) {
  date = new Date();
  date.setTime(date.getTime()+(7*24*60*60*1000));
  // need to set a later time. maybe 1 hour?
  document.cookie = name + "=" + escape(value) + "; expires=" + date + ";";
}
// Get the value of the cookie with the specified name.
function getCookie(name) {
  var oreos = document.cookie.split("; ");
  for (var i=0; i < oreos.length; i++) {
    var crumb = oreos[i].split("=");
    if (name == crumb[0])
      return unescape(crumb[1]);
  }

  return null;
}
// Delete the cookie with the specified name.
function deleteCookie(name) {
  document.cookie = name + "=; expires=Fri, 21 Dec 1976 04:31:24 GMT;";
}
