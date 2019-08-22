
//Create array of stock button names & that users can add to from search bar
var searchesList = [
  "Cats",
  "GrumpyCat",
  "Dogs",
  "Corgi",
  "Pandas",
  "Sloths",
  "Hamsters",
  "Monkeys",
  "Squirrels",
  "Raccoons",
  "Goats",
  "Fish",
];

//Create click event to GET data from GIPHY.com for each button on the DOM
$(document).on("click", ".GIFbutton", function(){
  var searchData = $(this).data("type"); //'this' references the individual button being clicked
  //Create variable for API key and the queryURL for AJAX call
  var APIKey = "NIM6Dup1OCl6C6LFe4GoU7klnitCdc6Z";
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchData + "&api_key=" + APIKey + "&limit=12";
//Create AJAX GET call
$.ajax({
  url: queryURL, 
  method: "GET"
}).then(function(response){
  console.log(response);
  console.log(queryURL);
  console.log(response.data[0].title);
  console.log(response.data[0].rating);
  console.log(response.data[0].images.original.url);
  console.log(response.data[0].images.original_still.url);

  //Loop through data from Giphy.com and assign variables for title, rating, still image, and GIF
  for (i = 0; i < response.data.length; i++){
    var title = response.data[i].title;
    var rating = response.data[i].rating;
    var animated = response.data[i].images.original.url;
    var picture = response.data[i].images.original_still.url;
    //Create div container to hold all GIFS
    var GIFdiv = $("<div>").addClass("GIFdiv");
    //Create image element on DOM, add class, src, data
    var image = $("<img>")
      .addClass("image") 
      .attr({
        "src": picture,
        "alt": title,
        "data-picture": picture,
        "data-animated": animated,
        "data-status": "picture"
      }); 
      //Create p tag to add rating and title
      var GIFdiv2 = $("<div class='gifdiv2'>")
      var p = $("<p>").text("Rating: " + rating);
      //Append image element and p element to the created div
      GIFdiv.append(image);
      GIFdiv2.append(p); 
      GIFdiv.append(GIFdiv2)
      //Prepend the created div to the GIFContainer so images are shown at the top of the page
      $("#GIFcontainer").prepend(GIFdiv);
  };  
});
});

//Create function to add a custom button for each item in the searchesList array
function addBtns(searchesList, className){   
   $("#button-group").empty(); 
  //Loop through each item in searchesList
  for (i = 0; i < searchesList.length; i++){
    //Create DOM element for each button & add its class and text
    var createButton = $("<button>")
      .attr("data-type", searchesList[i])
      .text(searchesList[i])
      .addClass(className);
    //Append button into button-group       
    $("#button-group").append(createButton);
  };
};

//Create click function for search bar submit button to grab the value.. 
//..inserted into the search form and add that search as a new button
$("#searchBtn").on("click", function(){
  event.preventDefault();
  var newSearch = $("input").val();
  searchesList.push(newSearch);
  //Call addBtns function 
  addBtns(searchesList, "GIFbutton");
  //Clear input field after button click
  $("#searchInput").val("");
  return false;  
});

  

//Create click function to play GIF animation when clicked, and stop animation when clicked again
$(document).on("click", ".image", function(){
  var status = $(this).attr("data-status");
    //If the targeted image is showing the still picture, change the image src to the..
    //..animated GIF
    if (status === "picture"){
      $(this).attr("src", $(this).data("animated"));
      $(this).attr("data-status", "animated");
    //when clicked again, if the targeted GIF is playing its animation, the if statement..
    //..will move to the else statement and should change the image src back to the still picture
    } else {
      $(this).attr("src", $(this).data("picture"));
      $(this).attr("data-status", "picture");
    };
});

$(function(){
  addBtns(searchesList, "GIFbutton")
});




//**Create a "PlayAllGIF's" button** 

  // $(document).on("click", ".playall", function(){
  //   event.preventDefault();  
  //     for (i = 0; i < image.length; i++){
  //       var status = $(image[i]).attr("data-status");
  //         if (status == "picture"){
  //           $(this).attr("src", $(this).data("animated"));
  //           $(this).attr("data-status", "animated");
  //           console.log("HELLO");
  //         }
  //     }
  // })