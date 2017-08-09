var g_state = 0;

$(document).ready(function() {
  var pathname = window.location.pathname;
  var url = window.location.href;
  var query = url.substring(url.indexOf('?') + 1);
  setState(0, query);
  $('.nav-link[data-id="' + query + '"]').addClass("active");
  var patterns = localStorage[query + "-patterns"];
  if (patterns && patterns.length > 0) {
    var arr = JSON.parse(patterns);
    for (i = 0; i < arr.length; ++i) {
      addPattern(arr[i][0], arr[i][1]);
    }
  }
  updateListChanged();
  $('#templateHtml').text(localStorage[query]);
  $('#parse').attr("href", "parse.html?" + query);

  $('#addPatternButton').click(function() {
    var searchFor = $('#searchFor').val();
    if (!searchFor) {
      $('#patternModal').modal('show');
      return;
    }
    var replaceWith =  $('#replaceWith').val();
    searchFor = getCleanText(searchFor);
    replaceWith = getCleanText(replaceWith);
    addPattern(searchFor, replaceWith);
    savePattern(searchFor, replaceWith, query);
    updateListChanged();
    $('#searchFor').val("");
    $('#replaceWith').val("");
  });

  $(document).on('click', '.close-chip', function() {
    var chip = $(this).closest('.chip');
    var s = chip.text();
    var a = s.indexOf('[');
    var b = s.indexOf(']');
    var c = s.lastIndexOf('[');
    var d = s.lastIndexOf(']');
    var search = s.substring(a + 1, b);
    var replace = s.substring(c + 1, d);
    deletePattern(search, replace, query);
    chip.remove();
    updateListChanged();
  });

  $('#templateHtml').change(function() {
    mcEnable('#templateSave');
  });

  $('#templateDelete').click(function() {
    localStorage.removeItem(query);
    localStorage.removeItem(query + "-patterns");
      $('.nav-link[data-id="' + query + '"]').closest('.nav-item').remove();
      var base = pathname.substring(0, pathname.lastIndexOf('/') + 1);
      window.location.assign(base + "index.html");
  });

  $('#templateNext1').click(function() {
    if (g_state == 0) {
      setState(1, query);
    }
    else if (g_state == 1) {
      setState(2, query);
    }
  });

  $('#templateBack').click(function() {
    if (g_state == 1) {
      setState(0, query);
    }
    else if (g_state == 2) {
      setState(1, query);
    }
  });
});

function setState(state, query) {
  g_state = state;
  $('.state').hide();
  if (state == 0) {
    mcDisable('#templateBack');
    $('.state-0').show();
  }
  else if (state == 1) {
    var patterns = JSON.parse(localStorage[query + "-patterns"]);

    var rawJQ = $('#templateHtml');
    rawJQ.prop("white-space", "pre-wrap");
    var newText = markText(rawJQ.html(), patterns);
    var changedText = changeText(newText, patterns);
    $('#markedText').html(newText);
    $('#changedText').html(changedText);
    mcEnable('#templateBack');
    $('.state-1').show();
  }
  else if (state == 2) {
    mcDisable('#templateNext1');
    $('#outputHtml').text($('#changedText').text());
    $('.state-2').show();
  }
}

function markText(text, patterns) {
  var i = 0;
  var newText = "";
  var staticLength = text.length;
  while (i < staticLength) {
    var min  = text.indexOf(patterns[0][0]);
    var patt = 0;
    for (j = 1; j < patterns.length; ++j) {
      var candidate = text.indexOf(patterns[j][0]);
      if (candidate == -1) {
        continue;
      }
      else if (min == -1 || candidate < min) {
        min = candidate;
        patt = j;
      }
    }
    if (min == -1) {
      newText += text;
      break;
    } else {
      newText += text.substring(0, min);
      newText += '<mark>';
      var endPatternIndex = min + patterns[patt][0].length;
      var found = text.substring(min, endPatternIndex);
      newText += found;
      newText += '</mark>';
      text = text.substring(endPatternIndex);
      i = endPatternIndex;
    }
  }
  return newText;
}



function changeText(markedText, patterns) {
  for (i = 0; i < patterns.length; ++i) {
    markedText = markedText.replaceAll('<mark>' + patterns[i][0] + '</mark>', '<mark>' + patterns[i][1] + '</mark>');
  }
  return markedText;
}

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

function getCleanText(pattern) {
  var p = pattern.replaceAll('<', '&lt;');
  p = p.replaceAll('>', '&gt;');
  return p;
}

function getDirtyText(text) {
  var t = text.replaceAll('&lt;', '<');
  t = t.replaceAll('&gt;', '>');
  return t;
}
