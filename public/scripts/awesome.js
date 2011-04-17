/*  Jeremy Woertink 2011 
 *
 ********/

//Initialize stuff
$(function() {

  backButton();

});

function twitter() {
  return new TWTR.Widget({
    version: 2,
    type: 'profile',
    rpp: 4,
    interval: 6000,
    width: 250,
    height: 300,
    theme: {
      shell: {
        background: '#333333',
        color: '#ffffff'
      },
      tweets: {
        background: '#000000',
        color: '#ffffff',
        links: '#4aed05'
      }
    },
    features: {
      scrollbar: false,
      loop: false,
      live: false,
      hashtags: true,
      timestamp: true,
      avatars: false,
      behavior: 'all'
    }
  }).render().setUser('jeremywoertink').start();
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
