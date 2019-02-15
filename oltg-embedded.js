// var oltgApi = "https://testguide.labmed.uw.edu/public/api/v2/";
// var oltgApi = "https://oltgtest.labmed.uw.edu/public/api/v2/";
var oltgApi = "http://localhost:5000/api/v2/";

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function embedOLTGView() {
  $( document ).ready(function() {
    let mnemonic = getUrlParameter('mnemonic');
    console.log(mnemonic);
    console.log(location.pathname);
    let url = oltgApi + "mnemonic/" + mnemonic + '?prefix=' + location.pathname;
    console.log(url);
    $.ajaxSetup({ cache: false });
    $.getJSON(url, function(data) {
      var template = $("#oltg-view-template").html();
      var text = Mustache.render(template, data);
      $("#oltg-embed-view").html(text);
    });
  });
};

function embedOLTGList(mnemonics) {
  $( document ).ready(function() {
    let url = oltgApi + "search?order_by=name&mnemonic=" + mnemonics;
    console.log(url);
    $.ajaxSetup({ cache: false });
    $.getJSON(url, function(data) {
      // inject prefix for links, assuming that view.html is in the same path
      data.prefix = location.pathname;
      var template = $("#oltg-list-template").html();
      var text = Mustache.render(template, data);
      $("#oltg-embed-list").html(text);
    });
  });
};
