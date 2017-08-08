$(document).ready(function() {
  var pathname = window.location.pathname;
  var url = window.location.href;
  console.log(pathname + ", " + url);
  var query = url.substring(url.indexOf('?') + 1);
  console.log(query);
  $('.nav-link[data-id="' + query + '"]').addClass("active");
  var patterns = localStorage[query + "-patterns"];
  if (patterns) {
    var arr = JSON.parse(patterns);
    for (i = 0; i < arr.length; ++i) {
      addPattern(arr[i][0], arr[i][1]);
    }
    console.log("Patterns:");
    console.log(patterns);
  }
  updateListChanged();
  $('#templateHtml').text(localStorage[query]);

  $('#addPatternButton').click(function() {
    var searchFor = $('#searchFor').val();
    if (!searchFor) {
      $('#patternModal').modal('show');
      return;
    }
    addPattern(searchFor, $('#replaceWith').val());
    savePattern(searchFor, $('#replaceWith').val(), query);
    console.log(localStorage[query + "-patterns"]);
    updateListChanged();
  });

  $(document).on('click', '.close-chip', function() {
    var chip = $(this).closest('.chip');
    console.log(chip.text());
    var s = chip.text();
    var a = s.indexOf('[');
    var b = s.indexOf(']');
    var c = s.lastIndexOf('[');
    var d = s.lastIndexOf(']');
    var search = s.substring(a + 1, b);
    var replace = s.substring(c + 1, d);
    console.log(search + ", " + replace);
    deletePattern(search, replace, query);
    chip.remove();
    updateListChanged();
  });

  $('#templateHtml').change(function() {
    mcEnable('#templateSave');
  });

  $('#templateDelete').click(function() {
    localStorage.removeItem(query);
      $('.nav-link[data-id="' + query + '"]').closest('.nav-item').remove();
      var base = pathname.substring(0, pathname.lastIndexOf('/') + 1);
      window.location.assign(base + "index.html");
  });
});

function updateListChanged() {
  if ($('.chip') && $('.chip').length > 0) {
    mcEnable('#templateNext1');
  } else {
    mcDisable('#templateNext1');
  }
}

function savePattern(search, replace, id) {
  if (search === replace) {
    return;
  }
  var patterns = localStorage[id + "-patterns"];
  if (!patterns) {
    var arr = [[search, replace]];
    localStorage[id + "-patterns"] = JSON.stringify(arr);
    return;
  }
  var arr = JSON.parse(patterns);
  for (i = 0; i < arr.length; ++i) {
    if (arr[i][0] == search && arr[i][1] == replace) {
      return;
    }
  }
  arr.push([search, replace]);
  localStorage[id + "-patterns"] = JSON.stringify(arr);
}

function deletePattern(search, replace, id) {
  var patterns = localStorage[id + "-patterns"];

  var arr = JSON.parse(patterns);
  for (i = 0; i < arr.length; ++i) {
    if (arr[i][0] == search && arr[i][1] == replace) {
      arr.splice(i, 1);
      break;
    }
  }
  localStorage[id + "-patterns"] = JSON.stringify(arr);

}

function addPattern(search, replace) {
  if (search === replace) {
    return;
  }
  $('#patternList').append('<div class="chip bg-info text-white">[' + search + '], [' + replace + ']&nbsp;&nbsp;<span class="close-chip text-white" aria-hidden="true">&times;</span></div>');

}
