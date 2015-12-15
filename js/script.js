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
  var begin = '&begin_date=20000103';



  var nyURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + $street + '+' + $city + begin + '&api-key=' + api;

  $.getJSON(nyURL, function (data) {
    console.log(data);
    console.log(nyURL);

    for (i = 0; i < data.response.docs.length; i++) {
      var headline = data.response.docs[i].headline.main;
      var snippet = data.response.docs[i].snippet;
      var pubdate = data.response.docs[i].pub_date.substring(0,10);
      var link = data.response.docs[i].web_url;
      var stuff = '<li>' + '<a href="' + link + '">' + '<strong>' + headline + '</strong>'  + '</a>' + ' (' + pubdate + ')' + '<br>' + snippet + '<br>' + '</li>';
      $('#nytimes-articles').append(stuff);

    }
  })
    .fail(function () {
    $nytElem.text("Something went wrong with something!");
  });
  
  
  // Wikipedia
  
  var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + $city + '&format=json&callback=wikiCallback';
  console.log(wikiURL);
  
  $.ajax({
    url: wikiURL,
    dataType: "jsonp",
     jsonp: "callback",
    success: function (response) {
      var articleList = response[1];
      
      for (var i = 0; i < articleList.length; i++) {
        articleStr = articleList[i];
        var url = 'http://en.wikipedia.org/wiki/' + articleStr;
        $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
      };
    },
    error: function (e) {
      $wikiElem.text("Can't get it");
    }
  });
    
           
           


  return false;
};

$('#form-container').submit(loadData);