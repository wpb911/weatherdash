    // Global Variables
    var lat;
    var lon;

    // Initial array of cities
    var cities = ["Laurens", "Columbia", "New York", "San Francisco", "Raleigh"];
    // var cityInput = "";

    function updateButtons() {

      // Deleting the movie buttons prior to adding new movie buttons
      // (this is necessary otherwise we will have repeat buttons)
      $("#cities-view").empty();

      // Looping through the array of movies
      for (var i = 0; i < cities.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("list-group-item list-group-item-action");
        // Adding a data-attribute with a value of the movie at index i
        a.attr("data-name", cities[i]);
        // Providing the button's text with a value of the movie at index i
        a.text(cities[i]);
        // Adding the button to the HTML
        $("#cities-view").append(a);
      }
    }
    $("#add-city").on("click", function(event) {
      event.preventDefault();
      
      var city = $("#city-input").val().trim();
      cities.push(city);

      //update cities array 
      updateButtons();

    });

    // This function display all the city weather data
    function displayCityInfo() {
      // event.preventDefault() prevents the form from trying to submit itself.
      
      //event.preventDefault();

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
        $(".city").html("<h1>" + response.name + " Weather Details</h1>");
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
        //var uvQueryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=-3.38&lon=29.36&appid=" + APIKey;
        var uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" +lat + "&lon=" + lon + "&appid=" + APIKey;
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
            
            $(".uv").text("UV: " + uvResponse.value);
            
          

            // Log the data in the console as well
            //console.log("UV: " + uvResponse.value);
            //console.log("Temperature (F): " + tempF);
        
          });

            //use AJAX to get forecast info 
            var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" +
            cityInput + "&appid=" + APIKey;
            $.ajax({
              url: forecastQueryURL,
              method: "GET"
            })
            // We store all of the retrieved data inside of an object called "forecastResponse"
            .then(function(forecastResponse) {

              // Log the queryURL
              console.log(forecastQueryURL);

              // Log the resulting object
              console.log(forecastResponse);

              // Transfer content to HTML
              const str = forecastResponse.list[0].dt_txt
              const oneDate = str.split(' ');
              $(".day0date").text("Date: " + oneDate[0]);
              console.log("date: " + forecastResponse.list[0].dt_txt);
              var tempF0 = (forecastResponse.list[0].main.temp - 273.15) * 1.80 + 32;
              $(".day0temp").text("Temp F: " + tempF0.toFixed(2));
              $(".day0humid").text("Humidity:  " + forecastResponse.list[0].main.humidity);
              // Log the data in the console as well
              //console.log("UV: " + uvResponse.value);
              //console.log("Temperature (F): " + tempF);
          
            });

      });

    };

  

    // Calling the renderButtons function at least once to display the initial list of cities
    //renderButtons();
    $(document).on("click", ".list-group-item ", displayCityInfo);

    updateButtons();
      
