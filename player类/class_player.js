function class_player()
{
	//"use strict";
	this.positionMinx = 0;
	this.positionMiny = 0;
	this.positionMaxx = 10;
	this.positionMaxy = 10;
	this.moveLength = 100;
	this.shoot = function(){
								if(MouseClick == true)
								{
								MouseClick = false;
								//TO DO:add a bullut
								}
							}
	this.die = function(positionMinx,positionMiny,positionMaxx,positionMaxy){
								if(((positionMinx >= this.positionMinx && positionMinx <= this.positionMaxx)||(positionMaxx >= this.positionMinx && positionMaxx <= this.positionMaxx))&&((positionMaxy >= this.positionMiny && positionMaxy <= this.positionMaxy)||(positionMiny >= this.positionMiny && positionMiny <= this.positionMaxy)))
									{
										//上面那行用来判断两个矩形是否相交，用\换行失败，所以写在一行了
										return true;
									}
									else return false;
							}
	this.moveLeft = function(){
									if( LeftArrow == true)
									{
										LeftArrow = false;
										this.positionMinx -= moveLength;
										this.positionMaxx -= moveLength;
									}
							}
	this.moveRight = function(){
									if( RightArrow == true)
									{
										RightArrow = false;
										this.positionMinx += moveLength;
										this.positionMaxx += moveLength;
									}
							}
	this.moveUp = function(){
									if( UpArrow == true)
									{
										UpArrow = false;
										this.positionMiny += moveLength;
										this.positionMaxy += moveLength;
									}
							}															
	this.moveDown = function(){
									if( DownArrow == true)
									{
										DownArrow = false;
										this.positionMiny -= moveLength;
										this.positionMaxy -= moveLength;
									}
							}	

}