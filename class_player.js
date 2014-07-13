function class_player()
{
	//"use strict";
	this.positionMinx = Math.random() * 1000;
	this.positionMiny = Math.random() * 800;
	this.positionMaxx = this.positionMinx + 10;
	this.positionMaxy = this.positionMiny + 10;
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
var playerList = new Array([1]);
var enemyList = new Array([1]);
var bulletList = new Array([1]);
var TotalWidth = 800;
var TotalHeight = 800;

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

function Game(){
//设定：
	//开始：产生 player
	setInterval(function(){
		var tempPlayer;
		tempPlayer = new class_player();
		playerList.push(tempPlayer);
		playerList[0]++;
		$('#playBox').append($('<img id = "player'+(playerList[0] - 1)+'" style="position:absolute;" src = "http://pengyou12.github.io/icon32.png">'));
		$('#player'+(playerList[0]-1))[0].style.left = playerList[playerList[0]-1].positionMinx + "px";
  		$('#player'+(playerList[0]-1))[0].style.top = playerList[playerList[0]-1].positionMiny + "px";
	},1000);
	
	//每1秒：产生 enemy
	// setInterval(function(){
	// 	enemyList[enemyList[0]++]; //= new enemy();
	// 	$('#playBox').append($('<img id = "enemy'+(enemyList[0] - 1)+'" style="position:absolute;" src = "http://pengyou12.github.io/icon32.png">'));
	// },1000);
	//事件检测:
		//每0.2秒-检测撞击：player与enemy（game over） bullet与enemey（生命值减少-检测是否死亡）
		//每0.2秒-检测出界：player（禁止出界） enemy（消除） bullet（消除）
			setInterval(function(){
			for(var elem in playerList)
			{
				if( elem != 0)
				{
					if (playerList[elem].positionMiny > TotalHeight ||  playerList[elem].positionMaxx < 0 || playerList[elem].positionMinx > TotalWidth || playerList[elem].positionMaxy < 0 )
				{
					//remove 
					$("#player"+elem).remove();
					delete playerList[elem];
					}
				}
			}	
	},200)
		//每0.2秒-检测player方向改变：player:键盘方向键按下
		//每0.1秒-检测player发射子弹：鼠标左键按下
	//事件进行：
		//每0.2秒-子弹直线运动
		//每0.2秒-enemy（1）（3）直线运动
		//每0.2秒-enemy（2）瞄准player运动
		//每0.4秒-enemy (3) 瞄准player发射子弹

}

//主函数
//测试函数，画一个能跑的人
window.onload  = function(){
	var tempPlayer;
	player = new class_player();
	playerList.push(player);
	playerList[0]++;
	$('#playBox').append($('<img id = "player'+(playerList[0] - 1)+'" style="position:absolute;" src = "http://pengyou12.github.io/icon32.png">'));
	$('#player'+(playerList[0]-1))[0].style.left = playerList[playerList[0]-1].positionMinx + "px";
  	$('#player'+(playerList[0]-1))[0].style.top = playerList[playerList[0]-1].positionMiny + "px";
	Game();
  setInterval(function(){
  		if((LeftArrow && RightArrow)||(UpArrow && DownArrow))//按键冲突
  		{
  			LeftArrow = false;RightArrow = false;UpArrow = false; DownArrow = false;
  		}
  		else
  		{
  			if(LeftArrow) player.moveLeft();
  			if(RightArrow) player.moveRight();
  			if(UpArrow) player.moveUp();
  			if(DownArrow) player.moveDown();
  		} 
  		 	$('#player1')[0].style.left = player.positionMinx + "px";
  			$('#player1')[0].style.top = player.positionMiny + "px";
  	},5);
}

