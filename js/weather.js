var WeatherSystem = function() {

	this.seasons = ['spring', 'summer', 'autumn', 'winter'];
	this.seasonTemperatureBounds = ['14|2', '40|8', '10|-2', '10|-15']; // min bound | max bound
	this.seasonRainChance = [40, 20, 60, 70];
	this.seasonSnowChance = [0, 0, 0, 70];

	this.maxSnowTemperature = 0;
	this.minCloudCoverForRain = 50;


	this.hourTemperatureVariations = [-8,-7,-6,-5,-4,-3,-2,-1,0,0,0,0,0,0,0,0,0,-1,-2,-3,-4,-5,-6,-7,-8];

	this.currentSeason = 0;
	this.turnsPerSeason = 91;

	this.startTemp = 0;

	this.snowing = false;
	this.raining = false;
	this.cloudCover = 0;

}

WeatherSystem.prototype.setWeather = function(day) {

	this.currentSeason = this.getCurrentSeason(day);
	this.setStartTemp();

}

WeatherSystem.prototype.getWeather = function(hour) {

	var defaultTemp = this.getDefaultTemp(hour);

	this.currentTemp = defaultTemp + this.startTemp + this.getVariationTemp(2);

	this.cloudCover = this.getCloudCover();
	this.snowing = this.isSnowing();
	this.raining = this.isRaining();

	console.log("season: " + this.seasons[this.currentSeason] +" - default temp: "+defaultTemp+" - start temp: "+this.startTemp+" - actual temp: "+this.currentTemp);
	console.log("snowing?: "+this.snowing);
	console.log("raining?: "+this.raining);
}

WeatherSystem.prototype.setStartTemp = function() {

	this.startTemp = this.getRandomBoundsTemp();

}

WeatherSystem.prototype.getRandomBoundsTemp = function() {

	var bounds = this.seasonTemperatureBounds[this.currentSeason].split('|');
	var temp = 0;

	if(bounds[1] < 0) {
		temp = Math.abs(parseFloat(bounds[0])) + Math.abs(parseFloat(bounds[1]));
	} else {
		temp = Math.abs(parseFloat(bounds[0])) - Math.abs(parseFloat(bounds[1]));
	}

	return parseFloat(bounds[1]) + Math.floor(Math.random()*temp);
}

WeatherSystem.prototype.getVariationTemp = function(variation) {

	var direction = (Math.floor(Math.random()*3)-1); // -1 | 0 | 1
	var random_variation = (Math.floor(Math.random()*variation)-Math.floor(variation/2));

	return (direction*variation);
}

WeatherSystem.prototype.getTemp = function() {

	var temp;

	return temp;
}

WeatherSystem.prototype.getDefaultTemp = function(hour) {

	return this.hourTemperatureVariations[hour];
}

WeatherSystem.prototype.getCurrentSeason = function(day) {

	return Math.round(day / this.turnsPerSeason);

}

/*
 * weatherFrontType
 * Return warm | cold | false
 */
WeatherSystem.prototype.weatherFrontType = function() {

	var weatherFront = false;

	return weatherFront;
}

/*
 * cloudCover
 * Return %
 */
WeatherSystem.prototype.getCloudCover = function() {

	var cloudCover = 0;

	return cloudCover;
}

/*
 * isSnowing
 * Return true or false
 */
WeatherSystem.prototype.isSnowing = function() {

	var snowing = false;

	var random = Math.floor(Math.random()*100);
	if(random <= this.seasonSnowChance[this.currentSeason] && this.currentTemp < this.maxSnowTemperature) {
		snowing = true;
	} else {
		snowing = false;
	}

	return snowing;
}

/*
 * isRaining
 * Return true or false
 */
WeatherSystem.prototype.isRaining = function() {

	var raining = false;

	var random = Math.floor(Math.random()*100);
	if(random <= this.seasonRainChance[this.currentSeason] && !this.snowing && this.cloudCover > this.minCloudCoverForRain) {
		raining = true;
	} else {
		raining = false;
	}

	return raining;
}