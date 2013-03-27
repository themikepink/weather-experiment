function Point(x,y) {
	this.x = x;
	this.y = y;

	this.clone=function() {
		return new Point(this.x,this.y);
	}
};

function debugText(ctx, txt, position) {

	ctx.fillStyle = '#f00';
	ctx.font = '10px sans-serif';
	ctx.textBaseline = 'bottom';
	ctx.fillText(txt, position.x, position.y);

}