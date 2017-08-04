$(document).ready(function() {
  var pathname = window.location.pathname;
  var url = window.location.href;
  console.log(pathname + ", " + url);
  var query = url.substring(url.indexOf('?') + 1);
  console.log(query);
  $('.nav-link[data-id="' + query + '"]').addClass("active");
});
