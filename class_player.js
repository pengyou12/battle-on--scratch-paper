function class_player()
{
	//"use strict";
	this.positionMinx = 0;
	this.positionMiny = 0;
	this.positionMaxx = 10;
	this.positionMaxy = 10;
	this.moveLength = 30;
	this.shoot = function(){
								if(MouseClick == true)
								{
								MouseClick = false;
								//TO DO:add a bullut
								}
							};
	this.die = function(positionMinx,positionMiny,positionMaxx,positionMaxy){
								if(((positionMinx >= this.positionMinx && positionMinx <= this.positionMaxx)||(positionMaxx >= this.positionMinx && positionMaxx <= this.positionMaxx))&&((positionMaxy >= this.positionMiny && positionMaxy <= this.positionMaxy)||(positionMiny >= this.positionMiny && positionMiny <= this.positionMaxy)))
									{
										//上面那行用来判断两个矩形是否相交，用\换行失败，所以写在一行了
										return true;
									}
									else return false;
							};
	this.moveLeft = function(){
									if( LeftArrow == true)
									{
										LeftArrow = false;
										this.positionMinx -= this.moveLength;
										this.positionMaxx -= this.moveLength;
									}
							};
	this.moveRight = function(){
									if( RightArrow == true)
									{
										RightArrow = false;
										this.positionMinx += this.moveLength;
										this.positionMaxx += this.moveLength;
									}
							};
	this.moveUp = function(){
									if( UpArrow == true)
									{
										UpArrow = false;
										this.positionMiny -= this.moveLength;
										this.positionMaxy -= this.moveLength;
									}
							};															
	this.moveDown = function(){
									if( DownArrow == true)
									{
										DownArrow = false;
										this.positionMiny += this.moveLength;
										this.positionMaxy += this.moveLength;
										
									}
									
							};
}
var keyboard;
player = new class_player();
var LeftArrow,RightArrow,UpArrow,DownArrow;

document.onkeydown = function (e)
{
	if(window.event) // IE
	{
	keynum = e.keyCode
	}
else if(e.which) // Netscape/Firefox/Opera
	{
	keynum = e.which
	}
	if(keynum == 37){
		LeftArrow = true;
		//player.moveLeft();
	}
	else if(keynum == 38){
		UpArrow = true;
	//	player.moveUp();
	}
	else if(keynum == 39){
		RightArrow = true;
	//	player.moveRight();
	}
	else if(keynum == 40){
		DownArrow = true;
		//player.moveDown();
	}
}

//主函数
//测试函数，画一个能跑的人
window.onload  = function(){
$('#playBox').append($('<img id = "player1" style="position:absolute;" src = "http://pengyou12.github.io/icon32.png">'));
$('#player1')[0].style.left = 0 +"px";
$('#player1')[0].style.top = player.positionMiny + "px"; 
  setInterval(function(){
  		if((LeftArrow && RightArrow)||(UpArrow && DownArrow))//按键冲突
  		{
  			LeftArrow = false;RightArrow = false;UpArrow = false; DownArrow = false;
  		}
  		else
  		{
  			if(LeftArrow) player.moveLeft();
  			else if(RightArrow) player.moveRight();
  			else if(UpArrow) player.moveUp();
  			else if(DownArrow) player.moveDown();
  		} 
  		$('#player1')[0].style.left = player.positionMinx + "px";
  		$('#player1')[0].style.top = player.positionMiny + "px";
  	},50);
}