var key = "b6e84350e43ff80bdae28b8c17a443a0"
$(document).ready(function () {
    for(i = 0; i < localStorage.length; i++){
        var id = localStorage.key([i]);
        console.log(id);
        
        var newButton = $("<button/>",{
            text: id,
            id: id,
        });
        $(".savedSearches").append(newButton);
        
    }


    function retrieve(entry){
        // var entry = $("#citySearch").val()
        if(entry != null){
            localStorage.setItem(entry,entry);
        }
        var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + entry + "&appid=" + key;
        console.log(entry);
        var lat = 0;
        var lon = 0;
        $.get(queryUrl).then(function(response){
            // console.log(response);
            var iconCode = response.weather[0].icon;
            var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png"
            $(".cityName").text(response.name);
            $("#weatherIcon").attr("src", iconUrl);
            $("#weatherIcon").show();
            var today = new Date();
            var todayString = (parseInt(today.getMonth()) + 1 ) + "/" + today.getDate() + "/" + today.getFullYear()
            $("#date").text(todayString);
            var temp = (parseFloat(response.main.temp)*9/5-459.7)//convert Kelvin to Fahrenheit
            var temperature = temp.toFixed(1);
            $(".temperature").text(temperature);
            var wind = (parseFloat(response.wind.speed)*2.237);//convert meter/sec to mile/hr
            wind = wind.toFixed(1);
            $(".wind").text(wind + "mph");
            var humid = response.main.humidity;
            $(".humidity").text(humid + "%");
            lat = response.coord.lat;
            lon = response.coord.lon;
        // });
        
        // lat = 47.6;
        // lon = -122.33;
        var uvUrl = "http://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + key;
        $.get(uvUrl).then(function(response1){
            // console.log(response);
            var uvi = response1[0].value;
            // console.log(uvi);
            
            $(".uv").text(uvi);
        });
    });
        var forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + entry + "&appid=" + key;
        $.get(forecastUrl).then(function(response){
            console.log(response.list);
            var date = new Date();
            hrs = date.getHours();
            // console.log(date.getHours());
            var indexStart = 0;
            // finding the index to get weather at 1500;
            if(hrs < 3){
                indexStart = 10;
            }
            else if(hrs > 2 && hrs < 6){
                indexStart = 9;
            }
            else if(hrs > 5 && hrs < 9){
                indexStart = 8;
            }
            else if(hrs > 8 && hrs < 12){
                indexStart = 7;
            }
            else if(hrs > 11 && hrs < 15){
                indexStart = 6;
            }
            else if(hrs > 14 && hrs < 18){
                indexStart = 5;
            }
            else if(hrs > 17 && hrs < 21){
                indexStart = 4;
            }
            else {
                indexStart = 3;
            }
            // console.log(indexStart);
            // setting variables for the five day forecast dates.

            var dayOne = new Date(response.list[indexStart].dt*1000).getDate();
            var monthOne = new Date(response.list[indexStart].dt*1000).getMonth() + 1;
            var yearOne = new Date(response.list[indexStart].dt*1000).getFullYear();
            var dayOneIconUrl = "http://openweathermap.org/img/wn/" +  response.list[indexStart].weather[0].icon + "@2x.png";

            // console.log(dayOne);
            var dayTwo = new Date(response.list[indexStart + 8].dt*1000).getDate();
            var monthTwo = new Date(response.list[indexStart + 8].dt*1000).getMonth() + 1;
            var yearTwo = new Date(response.list[indexStart + 8].dt*1000).getFullYear();
            var dayTwoIconUrl = "http://openweathermap.org/img/wn/" +  response.list[indexStart + 8].weather[0].icon + "@2x.png";
            // console.log(dayTwo);
            var dayThree = new Date(response.list[indexStart + 16].dt*1000).getDate();
            var monthThree = new Date(response.list[indexStart + 16].dt*1000).getMonth() + 1;
            var yearThree = new Date(response.list[indexStart + 16].dt*1000).getFullYear();
            var dayThreeIconUrl = "http://openweathermap.org/img/wn/" +  response.list[indexStart + 16].weather[0].icon + "@2x.png";

            var dayFour = new Date(response.list[indexStart + 24].dt*1000).getDate();
            var monthFour = new Date(response.list[indexStart + 24].dt*1000).getMonth() + 1;
            var yearFour = new Date(response.list[indexStart + 24].dt*1000).getFullYear();
            var dayFourIconUrl = "http://openweathermap.org/img/wn/" +  response.list[indexStart + 24].weather[0].icon + "@2x.png";

            var dayFive = new Date(response.list[indexStart + 32].dt*1000).getDate();
            var monthFive = new Date(response.list[indexStart + 32].dt*1000).getMonth() + 1;
            var yearFive = new Date(response.list[indexStart + 32].dt*1000).getFullYear();
            var dayFiveIconUrl = "http://openweathermap.org/img/wn/" +  response.list[indexStart + 32].weather[0].icon + "@2x.png";

            $("#dayOneDate").text(monthOne + "/" + dayOne + "/" + yearOne);
            $("#dayOneIcon").attr("src", dayOneIconUrl);
            $("#dayOneIcon").show();
            var dayOneTemp = (parseFloat(response.list[indexStart].main.temp)*9/5-459.7);
            dayOneTemp = dayOneTemp.toFixed(1)
            $("#dayOneTemp").text(dayOneTemp)
            $("#dayOneHumidity").text(response.list[indexStart].main.humidity)

            $("#dayTwoDate").text(monthTwo + "/" + dayTwo + "/" + yearTwo);
            $("#dayTwoIcon").attr("src", dayTwoIconUrl);
            $("#dayTwoIcon").show();
            var dayTwoTemp = (parseFloat(response.list[indexStart + 8].main.temp)*9/5-459.7);
            dayTwoTemp = dayTwoTemp.toFixed(1)
            $("#dayTwoTemp").text(dayTwoTemp)
            $("#dayTwoHumidity").text(response.list[indexStart + 8].main.humidity)

            $("#dayThreeDate").text(monthThree + "/" + dayThree + "/" + yearThree);
            $("#dayThreeIcon").attr("src", dayThreeIconUrl);
            $("#dayThreeIcon").show();
            var dayThreeTemp = (parseFloat(response.list[indexStart + 16].main.temp)*9/5-459.7);
            dayThreeTemp = dayThreeTemp.toFixed(1)
            $("#dayThreeTemp").text(dayThreeTemp)
            $("#dayThreeHumidity").text(response.list[indexStart + 16].main.humidity)

            $("#dayFourDate").text(monthFour + "/" + dayFour + "/" + yearFour);
            $("#dayFourIcon").attr("src", dayFourIconUrl);
            $("#dayFourIcon").show();
            var dayFourTemp = (parseFloat(response.list[indexStart + 24].main.temp)*9/5-459.7);
            dayFourTemp = dayFourTemp.toFixed(1)
            $("#dayFourTemp").text(dayFourTemp)
            $("#dayFourHumidity").text(response.list[indexStart + 24].main.humidity)

            $("#dayFiveDate").text(monthFive + "/" + dayFive + "/" + yearFive);
            $("#dayFiveIcon").attr("src", dayFiveIconUrl);
            $("#dayFiveIcon").show();
            var dayFiveTemp = (parseFloat(response.list[indexStart + 32].main.temp)*9/5-459.7);
            dayFiveTemp = dayFiveTemp.toFixed(1)
            $("#dayFiveTemp").text(dayFiveTemp)
            $("#dayFiveHumidity").text(response.list[indexStart + 32].main.humidity)

        });
    }

    // $("#searchButton").on("click", function(){
    //     var text = $("#citySearch").val();
    //     console.log("is" + text);
        
    //     if(text != null){
    //         retrieve(text);
    //     }
    // });
    $("button").on("click", function(){
        var ids = this.id;
        // console.log(ids);
        if(ids === "searchButton"){
            // console.log("clicked");
            var text = $("#citySearch").val();
            // console.log(text);
            retrieve(text);
        }
        else{
            var text = $(this).text();
            retrieve(text);
        }
    })

})