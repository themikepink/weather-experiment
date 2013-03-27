var Game = function() {

	this.dayCount = 100;


	this.tickInterval = 4;
	this.weatherInterval = 1000;

	this.currentHour = 8;
	this.totalHours = 24;


	this.sun = new Sun();
	this.background = new Background();

	this.canvas = document.getElementById('wCanvas');
	this.context = this.canvas.getContext('2d');

	//console.log("Day: "+this.dayCount+", Distance: "+this.sun.getDistance(this.dayCount));
	//console.log("Hour: "+this.currentHour+" Sun Position: "+this.sun.getPosition(this.currentHour));

	this.gametick();

};

Game.prototype.gametick = function() {



	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.sun.update(this.dayCount,this.currentHour);
	this.background.setLight(this.sun.position.y);
	this.background.draw(this.canvas);

	this.sun.draw(this.canvas);

	debugText(this.context, "Day: "+this.dayCount+", Hour: "+Math.round(this.currentHour)+", Distance: "+this.sun.distance, new Point(10,190));


	this.currentHour += 0.01;
	if(this.currentHour < this.totalHours) {

	} else {
		if(this.dayCount > 365) {
			this.dayCount = 0;
		}

		this.currentHour = 0;
		this.dayCount++;
	}

	//console.log("Day: "+this.dayCount+", Distance: "+this.sun.getDistance(this.dayCount));

	var t = setTimeout(this.gametick.bind(this), this.tickInterval);
};



