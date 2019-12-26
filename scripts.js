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
        $(".cityName").text(response.name + response.weather[0].id);

        
    });
}

    $("button").on("click", retrieve);


})