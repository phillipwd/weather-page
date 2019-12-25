var key = "8da8c96f0f9e192e876aa314cfa3d9de"
$(document).ready(function () {
    // var city = "seattle";
    // var entry = $("#citySearch").val("Seattle");
    
    function retrieve(){
        var entry = $("#citySearch").val()
        var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + entry + "&appid=" + key;
        console.log(entry);
    $.get(queryUrl).then(function(response){
        
        console.log(response);
        
    });
}

    $("button").on("click", retrieve);


})