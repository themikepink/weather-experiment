var Background = function() {

	this.g = 0;
	this.b = 0;

	this.startR = 0;
	this.startG = 0;
	this.startB = 0;
};

Background.prototype.draw = function(canvas) {

	var context = canvas.getContext('2d');
	// Create Linear Gradients
	var lingrad = context.createLinearGradient(0,0,0,370);
	lingrad.addColorStop(0, 'rgb(0, '+this.g+', '+this.b+')');
	lingrad.addColorStop(0.5,'rgb('+this.startR+','+this.startG+','+this.startB+')');
	lingrad.addColorStop(1, 'rgb('+this.startR+','+this.startG+','+this.startB+')');
	context.fillStyle = lingrad;
    context.fillRect(0,0,canvas.width,canvas.height);
};

Background.prototype.setLight = function(sunHeight) {

	this.g = sunHeight+80;
	this.b = sunHeight+80;
	this.startR = this.startG = this.startB = (sunHeight + 130);
};