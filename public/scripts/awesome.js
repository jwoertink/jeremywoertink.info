/*  Jeremy Woertink 2014
 *
 ********/

//Initialize stuff
$(function() {
  startGame()
  backButton();
});
function startGame() {
  if($('#game').length > 0) {
    $('#game').focus();
  	var activateControls = true;
  	$('#game').focus(function() {
  		activateControls = true;
  	});
  	$('#game').blur(function() {
  		activateControls = false;
  	});
    Game.start(mapone, 0, 0);
    $(window).keypress(function(event) {
      var code = (event.keyCode ? event.keyCode : event.which);
  		if(activateControls && code == 13) {
  			$('#game').blur();
  		}
  		if(Game.controls[code] != null && activateControls) {
  		  Game.keyboard.parseInput(event);
  			event.preventDefault;
  		}
    });
  }
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
