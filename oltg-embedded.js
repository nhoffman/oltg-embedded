var prepareData = function(obj){
  return {
    mnemonic: obj.mnemonic,
    title: obj.title,
    tabs:  obj.tabs.map( tab => ({ title: tab[0], body: tab[1] }) )
  }
}

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

$( document ).ready(function() {
  let baseurl = "https://testguide.labmed.uw.edu/public/api/1.0/mnemonic/";
  // let baseurl = "http://localhost:5000/api/1.0/mnemonic/";
  let mnemonic = getUrlParameter('mnemonic');
  let url = baseurl + mnemonic;

  $.getJSON(url, function(data) {
    var template = $("#oltg-view-template").html();
    var text = Mustache.render(template, prepareData(data));
    $("#oltg-embed").html(text);
  });
});
