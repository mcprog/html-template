$(document).ready(function() {
  for (var i in localStorage) {
    console.log(i);
    var name = i.substring(0, i.indexOf('-'));
    console.log(name);
    if (name) {
      addTemplate(name, i);
    }
  }
});


function addTemplate(name, id) {
  var html = '<li class="nav-item"><a class="nav-link" href="template.html?hhh" data-id="' + id + '">' + name + '</a></li>';
  $('#templateList').append(html);
  $('#templateTaunt').remove();
}
