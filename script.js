// Global Variables
var lat;
var lon;

// Initial array of cities
var cities = ["Laurens", "Columbia", "New York", "San Francisco", "Raleigh"];


function updateButtons() {

  // Deleting the movie buttons prior to adding new movie buttons
  // (otherwise we will have repeat buttons)
  $("#cities-view").empty();

  // retrieving cities from local storage
  let cityStore = JSON.parse(localStorage.getItem("weatherCities"));
  if (cityStore !== null) {
    cities = cityStore;
  } else {
    cities = ["Laurens", "Columbia", "New York", "San Francisco", "Raleigh"];  
  };

  // Looping through the array of movies
  for (var i = 0; i < cities.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array.

    var a = $("<button>");
    // Adding a class
    a.addClass("list-group-item list-group-item-action");
    // Adding a data-attribute with a value of the city at index i
    a.attr("data-name", cities[i]);
    // Providing the button's text with a value of the city at index i
    a.text(cities[i]);
    // Adding the button to the HTML
    $("#cities-view").append(a);
  }
};


//Add a city to the cities array and store the array to local storage 
//when the search button is clicked 
$("#add-city").on("click", function(event) {
  event.preventDefault();
  
  var city = $("#city-input").val().trim();
  console.log("City = " + city);
  // 
  cities.unshift(city);
 

  // This is our API key
  var APIKey = "f1ae5ec6cb6b9f1dfc10836e21d90fc2";

  // Here we are building the URL we need to query the database
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
  city + "&appid=" + APIKey;
  console.log(queryURL);

  // Here we run our AJAX call to the OpenWeatherMap API
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  // We store all of the retrieved data inside of an object called "response"
  .then(function(response) {

        // display current weather content 
    $(".city").html("<h1>" + response.name + "(" + moment().format('l') + ")" + "</h1>");
    $(".wind").text("Wind Speed: " + response.wind.speed);
    $(".humidity").text("Humidity: " + response.main.humidity);
    
    // Convert the temp to fahrenheit
    var tempF = (response.main.temp - 273.15) * 1.80 + 32;

    // display temp as fahrenheit    
    $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

    //store latitude and longitude for the UV call
    lat = response.coord.lat;
    lon = response.coord.lon;    
        
    //https://api.openweathermap.org/data/2.5/onecall?lat=30.489772&lon=-99.771335&exclude=hourly,minutely,alerts&units=imperial
    var uvQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" +lat + "&lon=" + lon + "&exclude=hourly,minutely,alerts&units=imperial&appid=" + APIKey;
    console.log(uvQueryURL);

    $.ajax({
      url: uvQueryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "uvResponse"
      .then(function(uvResponse) {

        // Log the queryURL
        //console.log(uvQueryURL);

        // Log the resulting object
        console.log(uvResponse);

        // Transfer content to HTML
        var toDay = moment().day()
        var nextDay  = moment().day() + 1
        console.log("toDay = " + toDay);
        console.log("nextDay = " + nextDay );
        var oneDay = moment.duration({'days' : 1});
        var twoDay = moment.duration({'days' : 2});
        var threeDay = moment.duration({'days' : 3});
        var fourDay = moment.duration({'days' : 4});
        var fiveDay = moment.duration({'days' : 5});
        var md = moment();
        
        //UV Index
        $(".uv").text("UV: " + uvResponse.current.uvi);
        
        //Daily forcasts from onecall API 
        $(".day1date").text("Date: " + moment(md).add(oneDay).format('l'));
        $(".day1temp").text("Temp F: " + uvResponse.daily[1].temp.day);
        $(".day1humid").text("Humidity:  " + uvResponse.daily[1].humidity);
        
        $(".day2date").text("Date: " + moment(md).add(twoDay).format('l'));
        $(".day2temp").text("Temp F: " + uvResponse.daily[2].temp.day);
        $(".day2humid").text("Humidity:  " + uvResponse.daily[2].humidity);
        
        $(".day3date").text("Date: " + moment(md).add(threeDay).format('l'));
        $(".day3temp").text("Temp F: " + uvResponse.daily[3].temp.day);
        $(".day3humid").text("Humidity:  " + uvResponse.daily[3].humidity);
        
        $(".day4date").text("Date: " + moment(md).add(fourDay).format('l'));
        $(".day4temp").text("Temp F: " + uvResponse.daily[4].temp.day);
        $(".day4humid").text("Humidity:  " + uvResponse.daily[4].humidity);
        
        $(".day5date").text("Date: " + moment(md).add(fiveDay).format('l'));
        $(".day5temp").text("Temp F: " + uvResponse.daily[5].temp.day);
        $(".day5humid").text("Humidity:  " + uvResponse.daily[5].humidity);        
    
      });

  });

  // store the cities list to local storage 
  localStorage.setItem("weatherCities", JSON.stringify(cities));

  //update cities array 
  updateButtons();
  
  //clear input box 
  $("#city-input").val("");
  

});

// This function display all the city weather data from the list of 
//cities displayed 
function displayCityInfo() {
  console.log("Running display city info function");
  // This line will grab the text from the input box
 
    var cityInput = $(this).attr("data-name");
  
  console.log(cityInput);
  // calling updateButtons which handles the processing of our array
  
          
  // This is our API key
  var APIKey = "f1ae5ec6cb6b9f1dfc10836e21d90fc2";

  // Here we are building the URL we need to query the database
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
  cityInput + "&appid=" + APIKey;
  console.log(queryURL);

  // Here we run our AJAX call to the OpenWeatherMap API
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  // We store all of the retrieved data inside of an object called "response"
  .then(function(response) {

    // Log the queryURL
    console.log(queryURL);

    // Log the resulting object
    console.log(response);
    //Grab lat and lon for UV call 
  
    // Transfer content to HTML
    $(".city").html("<h1>" + response.name + "(" + moment().format('l') + ")" + "</h1>");
    $(".wind").text("Wind Speed: " + response.wind.speed);
    $(".humidity").text("Humidity: " + response.main.humidity);
    
    // Convert the temp to fahrenheit
    var tempF = (response.main.temp - 273.15) * 1.80 + 32;

    // add temp content to html
    //$(".temp").text("Temperature (K) " + response.main.temp);
    $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

    $(".lat").text("Latitude: " + response.coord.lat);
    $(".lon").text("Longitude:  " + response.coord.lon);
  
    //store latitude and longitude for the UV call
    lat = response.coord.lat;
    lon = response.coord.lon;

    
    // Log the data in the console as well
    console.log("Wind Speed: " + response.wind.speed);
    console.log("Humidity: " + response.main.humidity);
    console.log("Temperature (F): " + tempF);
    console.log("uvlat "   + + lat);
    console.log("uvlon " + lon);

    //use AJAX to get UV info 
    console.log("uvlat= " + lat);
    console.log("uvlon= " + lon);
    
    //https://api.openweathermap.org/data/2.5/onecall?lat=30.489772&lon=-99.771335&exclude=hourly,minutely,alerts&units=imperial
    var uvQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" +lat + "&lon=" + lon + "&exclude=hourly,minutely,alerts&units=imperial&appid=" + APIKey;
    console.log(uvQueryURL);

    $.ajax({
      url: uvQueryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "uvResponse"
      .then(function(uvResponse) {

        // Log the queryURL
        //console.log(uvQueryURL);

        // Log the resulting object
        console.log(uvResponse);

        // Transfer content to HTML
        var toDay = moment().day()
        var nextDay  = moment().day() + 1
        console.log("toDay = " + toDay);
        console.log("nextDay = " + nextDay );
        var oneDay = moment.duration({'days' : 1});
        var twoDay = moment.duration({'days' : 2});
        var threeDay = moment.duration({'days' : 3});
        var fourDay = moment.duration({'days' : 4});
        var fiveDay = moment.duration({'days' : 5});
        var md = moment();
        
        //UV Index
        $(".uv").text("UV: " + uvResponse.current.uvi);
        
        //Daily forcasts from onecall API 
        $(".day1date").text("Date: " + moment(md).add(oneDay).format('l'));
        $(".day1temp").text("Temp F: " + uvResponse.daily[1].temp.day);
        $(".day1humid").text("Humidity:  " + uvResponse.daily[1].humidity);
        
        $(".day2date").text("Date: " + moment(md).add(twoDay).format('l'));
        $(".day2temp").text("Temp F: " + uvResponse.daily[2].temp.day);
        $(".day2humid").text("Humidity:  " + uvResponse.daily[2].humidity);
        
        $(".day3date").text("Date: " + moment(md).add(threeDay).format('l'));
        $(".day3temp").text("Temp F: " + uvResponse.daily[3].temp.day);
        $(".day3humid").text("Humidity:  " + uvResponse.daily[3].humidity);
        
        $(".day4date").text("Date: " + moment(md).add(fourDay).format('l'));
        $(".day4temp").text("Temp F: " + uvResponse.daily[4].temp.day);
        $(".day4humid").text("Humidity:  " + uvResponse.daily[4].humidity);
        
        $(".day5date").text("Date: " + moment(md).add(fiveDay).format('l'));
        $(".day5temp").text("Temp F: " + uvResponse.daily[5].temp.day);
        $(".day5humid").text("Humidity:  " + uvResponse.daily[5].humidity);        
    
      });
        

  });

};



// Calling the renderButtons function at least once to display the initial list of cities
//renderButtons();
$(document).on("click", ".list-group-item ", displayCityInfo);




updateButtons();
