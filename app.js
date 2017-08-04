$(document).ready(function() {
  for (var i in localStorage) {
    console.log(i);
    var name = i.substring(0, i.indexOf('-'));
    console.log(name);
    if (name) {
      addTemplate(name, i);
    }
  }

  $('.nav-link').contextmenu(function(ev) {
    ev.preventDefault();
    $(this).addClass("nav-focused");
    console.log("right clicked");
    $('.custom-menu').show(100).css({
      top: ev.pageY + "px",
      left: ev.pageX + "px"
    });
  });

  $(document).mousedown(function(ev) {
    if ($(ev.target).parents(".custom-menu").length <= 0) {
      $(".custom-menu").hide(100);
      $('.nav-link').removeClass("nav-focused");
    }
  });

});


function addTemplate(name, id) {
  var html = '<li class="nav-item"><a class="nav-link" href="template.html?' + id + '" data-id="' + id + '">' + name + '</a></li>';
  $('#templateList').append(html);
  $('#templateTaunt').remove();
}
