function report(){
  var API_key="bc79a33d1c8671364632e1ff075eb5da";
  var str=document.getElementById("report").elements["place"].value;
  var API_callfunc="http://api.openweathermap.org/data/2.5/weather?q="+str+"&appid="+API_key;

  $.getJSON(API_callfunc, function(result){
      console.log(result);
      document.getElementById("temp").innerHTML = "temperature\t"+result.main.temp;
      document.getElementById("lat").innerHTML = "latitude\t"+result.coord.lat;
      document.getElementById("lon").innerHTML = "longitude\t"+result.coord.lon;      
  });
}

