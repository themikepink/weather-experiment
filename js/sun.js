var Sun = function() {

	this.maxDistance = 182.5;
	this.cycleLength = 365;

	this.radius = 20;
	this.distance = 0;
	this.position = 0;

};

Sun.prototype.getDistance = function(day) {

	var distance = 0;
	// Get the incriments of half the circumference
	var circIncrement = ((Math.PI * (this.maxDistance*2)) / 2) / this.cycleLength;
	// Get the angle for the day
	var angleIncrement = 90 - ((180 / 365) * day);
	// Calculate the opposite traingle side using the angle and the radius
	var oppositeSide = Math.sqrt(this.maxDistance * this.maxDistance + this.maxDistance * this.maxDistance - 2 * this.maxDistance * this.maxDistance * Math.cos((angleIncrement / 180 * Math.PI)));
	// Get the adjacent side of the sub traingle
	var x = (this.cycleLength / 2) - day;
	// Get the opposide side of the sub triangle
	var y = Math.pow(oppositeSide, 2) - Math.pow(x, 2);
	// Calculate distance
	distance = Math.round(Math.sqrt(y),2);

	//console.log(distance);

	return distance;
};

Sun.prototype.getPosition = function(hour) {

	var angleIncrement = 360 / 24;

	var angle = hour * angleIncrement;
	var anglexInRadians = angle * Math.PI / 180;

	var sidea = Math.round(Math.sin(anglexInRadians) * 180, 2); // 180 temp
	var sideb = Math.round(Math.cos(anglexInRadians) * (180 - (this.distance/2)), 2); // height of sun - should be calculation of sun distance

	var point = new Point(sidea, -sideb);

	return point;
};

Sun.prototype.update = function(day, hour) {
	this.distance = this.getDistance(day);
	this.position = this.getPosition(hour);
};

Sun.prototype.draw = function(canvas) {

	var context = canvas.getContext('2d');

	this.radius = 30 - (this.distance/10);

	context.beginPath();
	context.arc((canvas.width/2)-this.position.x, (canvas.height-this.position.y), this.radius, 0, 2 * Math.PI);
	context.fillStyle = '#ffea00';
	context.fill();
	context.lineWidth = 2;
	context.strokeStyle = '#ffba00';
	context.stroke();

};