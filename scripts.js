var key = "8da8c96f0f9e192e876aa314cfa3d9de"
$(document).ready(function () {
    // var saved = []
    function retrieve(){
        var entry = $("#citySearch").val()
        localStorage.setItem(entry,entry);
        var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + entry + "&appid=" + key;
        console.log(entry);
    $.get(queryUrl).then(function(response){
        console.log(response);
        var iconCode = response.weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png"
        $(".cityName").text(response.name);
        $("#weatherIcon").attr("src", iconUrl);
        $("#weatherIcon").show();
        var today = new Date();
        var todayString = (parseInt(today.getMonth()) + 1 ) + "/" + today.getDate() + "/" + today.getFullYear()
        $("#date").text(todayString);
        var temp = (parseFloat(response.main.temp)*9/5-459.7)
        var temperature = temp.toFixed(1);
        $(".temperature").text(temperature);
        var wind = (parseFloat(response.wind.speed)*2.237);
        wind = wind.toFixed(1);
        $(".wind").text(wind + "mph");
        // var uv = response.uv

    });
}

    $("button").on("click", retrieve);


})