$(document).ready(function() {
  var pathname = window.location.pathname;
  var url = window.location.href;
  console.log(pathname + ", " + url);
  var query = url.substring(url.indexOf('?') + 1);
  console.log(query);
  $('.nav-link[data-id="' + query + '"]').addClass("active");
  var patterns = localStorage[query + "-patterns"];
  if (patterns) {
    //TODO patterns
  }

  $('#addPatternButton').click(function() {
    var searchFor = $('#searchFor').val();
    if (!searchFor) {
      $('#patternModal').modal('show');
      return;
    }
    addPattern(searchFor, $('#replaceWith').val());
  });

  $(document).on('click', '.close-chip', function() {
    $(this).closest('.chip').remove();
  });
});


function addPattern(search, replace) {
  $('#patternList').append('<div class="chip bg-info text-white">[' + search + '], [' + replace + ']&nbsp;&nbsp;<span class="close-chip text-white" aria-hidden="true">&times;</span></div>');
}
