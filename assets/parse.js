$(document).ready(function() {
  var pathname = window.location.pathname;
  var url = window.location.href;
  var query = url.substring(url.indexOf('?') + 1);
  $('.nav-link[data-id="' + query + '"]').addClass("active");
  var raw = localStorage[query];
  $('#parsedHtml').html(parseHtml(raw, true));


  $('#parsedHtml a').hover(function() {
    var classes = $(this).attr("class");
    var connected = $('#parsedHtml a').filter("." + classes);
    connected.css('text-decoration', 'underline');
    connected.css('color', '#014c8c');
  }, function() {
    var classes = $(this).attr("class");
    var connected = $('#parsedHtml a').filter("." + classes);
    connected.css('text-decoration', 'none');
    connected.css('color', '#0275d8');
  });

  $('#parsedHtml a').click(function(ev) {
    ev.preventDefault();
    var classes = $(this).attr("class");
    embolden(classes);
    var dirty = dirtyClass(classes);
    $('#domSelector').val(dirty);
  });

  $('#domSelector').change(function() {
    var classes = $(this).val();
    classes = cleanClass(classes);
    console.log(classes);
    embolden(classes);
  });

});

function embolden(classes) {

  $('#parsedHtml a').css('font-weight', 'normal');
  var connected = $('#parsedHtml a').filter("[class~='" + classes + "']");
  connected.css('font-weight', '900');
}

function parseHtml(data, doTrim) {
  var d = data;
  if (doTrim) {
    d = data.trim()
  }
  var obj = {};

  var root = $.parseHTML(d);
  obj.root = root[0].tagName;
  obj.children = [];
  $.each(root.children, function(i, el) {
    obj.children.push(el.nodeName);
  });
  console.log(typeof root);
  console.log(getString("", root, ""));
  return getString("", root, "");
}

function getString(parents, root, tabs) {
  if (!root || !root.length) {
    return "";
  }
  var str = "";
  parents += "&gt;";

  $.each(root, function(i, el) {
    str += tabs;
    var tab;
    if (i == root.length - 1) {
      str += '└──';
      tab = "   ";
    } else {
      str += '├──';
      tab = "|  ";
    }

    console.log(el.children);
    var fullName = getFullName(el);
    str += "<a href='#' class='" + cleanClass(parents + fullName) + "'>" + fullName + "</a>\n";
    str += getString(parents + fullName ,el.children, tabs + tab);
  });
  return str;
}

function cleanClass(text) {
  var ret = text.replaceAll('&gt;', '-gt-');
  ret = ret.replaceAll('>', '-gt-');
  ret = ret.replaceAll('.', '-dot-');
  ret = ret.replaceAll('#', '-pound-');
  ret = ret.replaceAll('/', '-slash-');
  return ret;
}

function dirtyClass(text) {
  var ret = text.replaceAll('-gt-', '>');
  ret = ret.replaceAll('-dot-', '.');
  ret = ret.replaceAll('-pound-', '#');
  ret = ret.replaceAll('-slash-', '/');
  return ret;
}

function getFullName(element) {
  var name = element.nodeName;
  if (element.id) {
    name += "#" + element.id;
  }
  if (!element.classList) {
    return name;
  }
  for (cl of element.classList) {
    name += "." + cl;
  }
  return name;
}
