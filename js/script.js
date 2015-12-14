function loadData() {

  var $body = $('body');
  var $wikiElem = $('#wikipedia-links');
  var $nytHeaderElem = $('#nytimes-header');
  var $nytElem = $('#nytimes-articles');
  var $greeting = $('#greeting');

  // clear out old data before new request
  $wikiElem.text("");
  $nytElem.text("");

  // load streetview

  // YOUR CODE GOES HERE!

  var $street = $('input[id=street]').val();
  var $city = $('input[id=city]').val();

  $body.append('<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + $street + ', ' + $city + '"/>');

  // NY Times

  var api = "79ebfdfe795baffcc3b5110a9535d88c:8:73765177";



  var nyURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + $street + '+' + $city + '&api-key=' + api;

  $.getJSON(nyURL, function (data) {
    console.log(data);
    console.log(nyURL);

    for (i = 0; i < data.response.docs.length; i++) {
      var headline = data.response.docs[i].headline.main;
      var snippet = data.response.docs[i].snippet;
      //      console.log(headline + snippet);
      var stuff = '<li>' + '<strong>' + headline + '</strong>' + '<br>' + snippet + '</li>';
      //    $('#nytimes-articles').append('<li>' + headine + '</li>');
      $('#nytimes-articles').append(stuff);

    }
  });


  return false;
};

$('#form-container').submit(loadData);



$.getJSON("ajax/test.json", function (data) {
  var items = [];
  $.each(data, function (key, val) {
    items.push("<li id='" + key + "'>" + val + "</li>");
  });

  $("<ul/>", {
    "class": "my-new-list",
    html: items.join("")
  }).appendTo("body");
});