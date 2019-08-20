var APIKey = "NIM6Dup1OCl6C6LFe4GoU7klnitCdc6Z";
var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=" + APIKey

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(queryURL)
    console.log(response);
    console.log("imageTitle: " + imageTitle)
    console.log("imageurl: " + imageUrl)
    var imageUrl = response.data[0].url 
    var imageTitle = response.data[0].title

      // Creating and storing an image tag
      var imageElement = $("<img>") 
    //   "<p class='card-text'>"
     

      // Setting the catImage src attribute to imageUrl
      imageElement.attr("src", imageUrl);
      imageElement.attr("alt", imageTitle)
     
      // Prepending the catImage to the images div
      $(".card").prepend(imageElement);
  });