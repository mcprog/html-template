$(document).ready(function() {
  for (var i in localStorage) {
    console.log(i);
    /*var name = i.substring(0, i.indexOf('-'));
    console.log(name);
    if (name) {
      addTemplate(name, i);
    }*/

    addTemplate(i);
  }

  $('#templateList .nav-link').contextmenu(function(ev) {
    ev.preventDefault();
    if ($(this).hasClass("active")) {
      return;
    }
    $(this).addClass("nav-focused");
    console.log("right clicked");
    $('.custom-menu').show(100).css({
      top: ev.pageY + "px",
      left: ev.pageX + "px"
    }).attr("data-id", $(this).attr("data-id"));
  });

  $(document).mousedown(function(ev) {
    if ($(ev.target).parents(".custom-menu").length <= 0) {
      $(".custom-menu").hide(100);
      $('.nav-link').removeClass("nav-focused");
    }
  });

  $('.custom-menu .nav-item').click(function() {

    var id = $('.custom-menu').attr("data-id");
    switch ($(this).attr("data-action")) {
      case "open":
        var base = window.location.pathname;
        base = base.substring(0, base.lastIndexOf("/") + 1);
        window.location.assign(base + "template.html?" + id);
        break;
      case "delete":
        $('#templateList .nav-link[data-id="' + id + '"]').remove();
        localStorage.removeItem(id);
        break;

    }
    $(".custom-menu").hide(100);
  });

});

function addTemplate(name) {
  var html = '<li class="nav-item"><a class="nav-link" href="template.html?' + name + '" data-id="' + name + '">' + name + '</a></li>';
  $('#templateList').append(html);
  $('#templateTaunt').remove();
}

/*function addTemplate(name, id) {
  var html = '<li class="nav-item"><a class="nav-link" href="template.html?' + id + '" data-id="' + id + '">' + name + '</a></li>';
  $('#templateList').append(html);
  $('#templateTaunt').remove();
}*/
