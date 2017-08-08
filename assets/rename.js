$(document).ready(function() {
  var pathname = window.location.pathname;
  var url = window.location.href;
  console.log(pathname + ", " + url);
  var query = url.substring(url.indexOf('?') + 1);
  $('#renameTitle').text("Rename Template: " + query);
  $('#rawHtml').text(localStorage[query]);

  $('#renameTemplateForm').submit(function(event) {
    event.preventDefault();
    console.log("Submitted!");
    var name = $('#templateName').val();
    var raw = $('#rawHtml').val();
    if (localStorage[name]) {
      $('#fileExistsModal').modal("show");
      return;
    }
    localStorage[name] = raw;
    console.log("Submitted!:" + name);
    addTemplate(name);
    $('#renameTemplateForm')[0].reset();
    var oldPatterns = localStorage[query + "-patterns"];
    localStorage.removeItem(query + "-patterns");
    localStorage[query + "-patterns"] = oldPatterns;
  });
});
