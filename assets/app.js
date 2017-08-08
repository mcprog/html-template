$(document).ready(function() {
  for (var i in localStorage) {
    if (i.includes("-patterns")) {
      console.log("pattern exists: " + i);
      continue;
    }
    addTemplate(i);
  }

  $('#templateList').on('contextmenu', '.nav-link', function(ev) {
    ev.preventDefault();
    /*if ($(this).hasClass("active")) {
      return;
    }*/
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
        localStorage.removeItem(id + "-patterns");
        break;
      case "duplicate":
        var copyName = "copy_of_" + id;
        while(localStorage[copyName]) {
          copyName = "copy_of_" + copyName;
        }
        localStorage[copyName] = localStorage[id];
        localStorage[copyName + "-patterns"] = localStorage[id + "-patterns"];
        console.log("Duplicated!:" + copyName);
        addTemplate(copyName);
        break;
      case "rename":
        var base = window.location.pathname;
        base = base.substring(0, base.lastIndexOf("/") + 1);
        window.location.assign(base + "rename.html?" + id);
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

function mcEnable(jqStr) {
  $(jqStr).prop("disabled", false);
}

function mcDisable(jqStr) {
  $(jqStr).prop("disabled", true);
}

/*function addTemplate(name, id) {
  var html = '<li class="nav-item"><a class="nav-link" href="template.html?' + id + '" data-id="' + id + '">' + name + '</a></li>';
  $('#templateList').append(html);
  $('#templateTaunt').remove();
}*/
