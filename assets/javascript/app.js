$( document ).ready(function() {
    // An array of actions, new actions will be pushed into this array;
    var topics = ["Skittles", "Gummy Bears", "Smarties", "Sour Patch Kids", "Starbust", "Air Heads", "Mike and Ikes", "Lemonheads", "Twizzlers", "Gummy Worms","Jolly Ranchers", "Snickers", "Dots"];
    // Creating Functions & Methods
    // Function that displays gif buttons
    function displayGifButtons(){
        $("#gifButtonsView").empty();
        for (var i = 0; i < topics.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("candy");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", topics [i]);
            gifButton.text(topics [i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
       // Function to add a new candy button
       function addNewButton(){
        $("#addGif").on("click", function(){
        var candy = $("#candy-input").val().trim();
        if (candy == ""){
          return false;
        }
        topics.push(candy);
    
        displayGifButtons();
        return false;
        });
    }

    // Function that displays all of the gifs
    function displayGifs(){
        var candy = $(this).attr("data-name");
        var queryURL = "http://" + candy + "V00lp6evlnUIr8X0GVKqXTKTyvlGjQc3";
        console.log(queryURL); 
        $.ajax({
            url: queryURL,
            method: 'GET'
        })

        .done(function(response) {
            console.log(response); 
            $("#gifsView").empty(); 
            var results = response.data;
            if (results == ""){
              alert("There isn't a gif for this selected button");
            }
            for (var i=0; i<results.length; i++){
    
                var gifDiv = $("<div>");
                gifDiv.addClass("gifDiv");

                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);

                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url);
                gifImage.attr("data-state", "still");
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
   
    displayGifButtons(); 
    addNewButton();
    removeLastButton();
   
    $(document).on("click", ".action", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });
    