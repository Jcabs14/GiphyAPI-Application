//my API key
//cNYBdM1HCGn3LmnNf4GJmk8Hm0BUNp5L

//variable for array to create buttons to start out with
var topics = ["Star Wars", "Grizzlies", "Food", "Ghost Rider", "Wolverine"];

// 
//function to display gifs
function displayGifs() {
    var topic = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=cNYBdM1HCGn3LmnNf4GJmk8Hm0BUNp5L&limit=10";

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        var results = response.data
        for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== 'r' && results[i].rating !== 'pg-13') {
                // Creating a div for the gif

                var gifDiv = $('<div>');

                // Storing the result item's rating
                var rating = results[i].rating;

                // Creating a paragraph tag with the result item's rating
                var p = $('<p>').text('Rating: ' + rating);

                // Creating an image tag
                var gifImage = $('<img>');

                // Giving the image tag an src attribute of a proprty pulled off the
                // result item
                gifImage.attr('src', results[i].images.fixed_height.url);

                // Appending the paragraph and personImage we created to the "gifDiv" div we created
                gifDiv.append(gifImage);
                gifDiv.append(p);

                // Prepending the gifDiv to the "#gifArea" div in the HTML
                $("#gifArea").prepend(gifDiv);
            }

        }
    });
}

//function to create our existing topics with buttons
function createTopics() {

    $('#gifButtons').empty();

    for (var i = 0; i < topics.length; i++) {
        var createBtn = $('<button>');
        createBtn.addClass('gif');
        createBtn.attr('data-name', topics[i]);
        createBtn.text(topics[i]);
        $('#gifButtons').append(createBtn);

    }
}

//function to add new buttons
$("#searchBtn").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var newTopic = $("#gifInput").val().trim();

    // The movie from the textbox is then added to our array
    topics.push(newTopic);

    // Calling renderButtons which handles the processing of our movie array
    createTopics();
});

//adds on click event for all buttons with gifTopic class
$(document).on("click", ".gif", displayGifs);

createTopics();
