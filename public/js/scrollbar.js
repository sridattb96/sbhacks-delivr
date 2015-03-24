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