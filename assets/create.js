$(document).ready(function() {
  $('#addPatternButton').click(function() {
    var pattern = $('#addPattern').val();
    $('#addPattern').val('');
    if (pattern != '') {
      console.log(pattern);
      $('#patternList').append(pattern + ", ");
    }
  });

  $('#createTemplateForm').submit(function(event) {
    event.preventDefault();
    console.log("Submitted!");
    var name = $('#templateName').val();
    var raw = $('#rawHtml').val();
    var id = getUniqueId(name);
    localStorage[id] = raw;
    addTemplate(name, id);
    $('#createTemplateForm')[0].reset();
  });

});




function getUniqueId(name) {
  return name + "-" + Date.now();
}
