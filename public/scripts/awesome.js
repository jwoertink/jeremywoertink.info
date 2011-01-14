$(function() {
  backButton();
})

//Displays a back button to the home page from the Resume page only when the user hits the bottom of the page
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
