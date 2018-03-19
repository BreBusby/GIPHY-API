$( document ).ready(function() {
    // An array of actions, new actions will be pushed into this array;
    var topics = ["Skittles", "Gummy Bears", "Smarties", "Sour Patch Kids", "Starbust", "Air Heads", "Mike and Ikes", "Lemonheads", "Twizzlers", "Gummy Worms"];

  // Function to display gifs and ratings
    $("button").on("click", function() {

        var topics = $(this).attr("data-name");
  
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topics + "&api_key=V00lp6evlnUIr8X0GVKqXTKTyvlGjQc3&limit=10"

        $.ajax({
          url: queryURL,
          method: "GET"
        })

          .then(function(response) {

            var results = response.data;
  
            for (var i = 0; i < results.length; i++) {
  
              if (results[i].rating !== "r" && results[i].rating !== "g") {

                var gifDiv = $("<div class='item'>");

                var rating = results[i].rating;
  
                var c = $("<p>").text("Rating: " + rating);
  
                var candyImage = $("<img>");
  
                candyImage.attr("src", results[i].images.fixed_height.url);
  
                gifDiv.append(c);
                gifDiv.append(candyImage);
  
                $("#gifsView").prepend(gifDiv);
              }
            }
          });
     
          // Function to add a new candy button
       function addNewButton(){
        $("#addGif").on("click", function(){
        var candy = $("#candy-input").val().trim();
        if (candy === ""){
          return false;
        }
        topics.push(candy);
    
        displayGifButtons();
        return false;
        });
    }


    });
});
    