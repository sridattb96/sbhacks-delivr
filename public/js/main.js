// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
  if ($(".navbar").offset().top > 50) {
    $(".navbar-fixed-top").addClass("top-nav-collapse");
    $(".navbar-brand").css("display", "block");
    $(".nav-btn").css("color", "black");
    
  } else {
    $(".navbar-fixed-top").removeClass("top-nav-collapse");
    $(".navbar-brand").css("display", "none");
    $(".nav-btn").css("color", "white");
    
    
  }

});

/* smooth scrolling sections */
$('a[href*=#]:not([href=#])').click(function() {
  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
    if (target.length) {
      $('html,body').animate({
        scrollTop: target.offset().top - 50
      }, 1000);
      return false;
    }
  }
});




