$(document).ready(function() {
  $('#addPatternButton').click(function() {
    var pattern = $('#addPattern').val();
    $('#addPattern').val('');
    if (pattern != '') {
      $('#patternList').append(pattern + ", ");
    }
  });

  $('#createTemplateForm').submit(function(event) {
    event.preventDefault();
    var name = $('#templateName').val();
    var raw = $('#rawHtml').val();
    if (localStorage[name]) {
      $('#fileExistsModal').modal("show");
      return;
    }
    localStorage[name] = raw;
    addTemplate(name);
    $('#createTemplateForm')[0].reset();
  });

});
