function Enemy()
{
	playMap = $("#playBox");
	MapWidth = playMap.css("width");
	MapHeight = playMap.css("height");
	this.startPos = {x : 0, y : 0};
	this.direction = {x : 0.6, y : 0.8};
	this.life = 100;
	this.currentPos = startPos;

	this.getPos = function(){
		return this.currentPos;
	}
	this.setPos = function(Pos){
		this.currentPos = Pos;
	}
	this.isKilled = function(){
		if (this.life == 0)
			return true;
		else
			return false;
	}
	this.isOut = function(){
		if (this.currentPos.x < 0 || this.currentPos.x > MapWidth || this.currentPos.y < 0 || this.currentPos > MapHeight)
			return true;
		else
			return false;
	}
	this.move = function(Pos){
		this.setPos(Pos);
	}
}

var a = new Enemy();