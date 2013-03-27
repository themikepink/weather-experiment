var WeatherInterface = function() {

	console.log('interface loaded');

}
WeatherInterface.prototype.update = function(weather) {
	console.log('interface update: ' + weather.weatherLevel);
}