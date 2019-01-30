function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

$( document ).ready(function() {
  let baseurl = "https://testguide.labmed.uw.edu/public/api/v2/mnemonic/";
  // let baseurl = "http://localhost:5000/api/v2/mnemonic/";
  let mnemonic = getUrlParameter('mnemonic');
  let url = baseurl + mnemonic;
  $.ajaxSetup({ cache: false });
  $.getJSON(url, function(data) {
    var template = $("#oltg-view-template").html();
    var text = Mustache.render(template, data);
    $("#oltg-embed").html(text);
  });
});
