var weather;
function setup() {
  createCanvas(640, 480);
  var API_key="bc79a33d1c8671364632e1ff075eb5da";
  var str="chicago";
  var API_callfunc="https://api.openweathermap.org/data/2.5/weather?q="+str+"&appid="+API_key;
  loadJSON(API_callfunc,gotData);
}
function gotData(data){
  weather=data;
}
function draw() {
  if(weather){
    ellipse(50,50,weather.data.temp, weather.data.temp);
    ellipse(50,50,weather.data.humidity, weather.data.humidity);
  }
}
