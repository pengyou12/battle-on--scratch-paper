//enemy 构造函数
//sx,sy 初始位置
//dx,dy 运行方向
//type  敌人类型
function class_Enemy(sx,sy,dx,dy,type)
{
	playMap = $("#playBox");
	MapWidth = playMap.css("width");
	MapHeight = playMap.css("height");
	this.startX = sx;
	this.startY = sy;
	this.DirectX = dx;
	this.DirectY = dy;
	this.PosX = sx;
	this.PosY = sy;
	this.Type = type;          //enemy类型
	this.life = 100;
	this.moveLength = 10;

	this.getPosX = function(){
		return this.PosX;
	}
	this.getPosY = function(){
		return this.PosY;
	}
	this.setPos = function(x,y){
		this.PosX = x;
		this.PosY = y;
	}
	this.isKilled = function(){
		if (this.life <= 0)
			return true;
		else
			return false;
	}
	this.isOut = function(){
		if (this.PosX < 0 || this.PosX > parseInt(MapWidth) || this.PosY < 0 || this.PosY > parseInt(MapHeight))
		{
			return true;
		}
		else
			return false;
	}
	this.move = function(x, y){
		this.setPos(x, y);
	}
}

//bullet 构造函数
//sx,sy  初始位置
//dx,dy  运行方向
function class_Bullet(sx,sy,dx,dy,id){
	playMap = $("#playBox");
	MapWidth = playMap.css("width");
	MapHeight = playMap.css("height");
	this.startX = sx;
	this.startY = sy;
	this.DirectX = dx;
	this.DirectY = dy;
	this.PosX = sx;
	this.PosY = sy;
	this.Id = id;
	this.moveLength = 10;
	this.getPosX = function(){
		return this.PosX;
	}
	this.getPosY = function(){
		return this.PosY;
	}
	this.setPos = function(x,y){
		this.PosX = x;
		this.PosY = y;
	}
	this.isOut = function(){
		if (this.PosX < 0 || this.PosX > parseInt(MapWidth) || this.PosY < 0 || this.PosY > pasrInt(MapHeight))
			return true;
		else
			return false;
	}
	this.move = function(x, y){
		this.setPos(x, y);
	}
}

function class_player()
{
	//"use strict";
	playMap = $("#playBox");
	MapWidth = playMap.css("width");
	MapHeight = playMap.css("height");
	this.positionMinx = Math.random() * parseInt(MapWidth);
	this.positionMiny = Math.random() * parseInt(MapHeight);
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

//产生0~top的伪随机数
function RandomInteger(top){
	return Math.round(Math.random()*top);
}

function Play(){
	playMap = $("#playBox"); //游戏地图
	var PlayerArr = [];//玩家数组，包括上轮挂掉的
	PlayerTotal = 0;//玩家总数
	BulletArr = [];  //子弹数组
	BulletTotal = 0; //子弹总数
	EnemyArr = [];  //敌人数组
	EnemyTotal = 0; //敌人总数
	intervalTime = 200; //间隔时间
	$('#playBox').append($('<div id = "enemyBox"></div>'));
	//设定：
	//开始：产生 player
	function playerGenerate(){
		var tempPlayer;
		//产生当前的player
		player = new class_player();
		PlayerArr.push(player);
		$('#playBox').append($('<img id = "player'+(PlayerTotal)+'" style="position:absolute;" src = "http://pengyou12.github.io/icon32.png">'));
		$('#player'+(PlayerTotal))[0].style.left = PlayerArr[PlayerTotal].positionMinx + "px";
  		$('#player'+(PlayerTotal))[0].style.top = PlayerArr[PlayerTotal].positionMiny + "px";
  		PlayerTotal++;
		tempPlayer = new class_player();
		PlayerArr.push(tempPlayer);
		$('#playBox').append($('<img id = "player'+(PlayerTotal)+'" style="position:absolute;" src = "http://pengyou12.github.io/icon32.png">'));
		$('#player'+PlayerTotal)[0].style.left = PlayerArr[PlayerTotal].positionMinx + "px";
  		$('#player'+PlayerTotal)[0].style.top = PlayerArr[PlayerTotal].positionMiny + "px";
  		PlayerTotal++;//下标从0开始
	}
	playerGenerate();//产生两个player
	//每1秒：产生 enemy
	var enemyGenerate = function(){
		//随意设了初始值，待改为随机数
		type = 1;
		sx = RandomInteger(parseInt(MapWidth));
		sy = RandomInteger(parseInt(MapHeight));
		dx = 0.6;
		dy = 0.6;
		var e = new class_Enemy(sx,sy,dx,dy,type);
		EnemyArr.push(e);
		temp = $("<img style='position:absolute;' src='http://pengyou12.github.io/loge2.png' class='enemy' id='enemy"+EnemyTotal+"'></div>");
		$('#enemyBox').append(temp);
		//画好位置
		$('#enemy'+EnemyTotal)[0].style.left = sx+"px";
		$('#enemy'+EnemyTotal)[0].style.top = sy+"px";
		EnemyTotal++;
	}
	ReEnemyGenerate = setInterval(enemyGenerate, intervalTime*15);
	
	//产生子弹
	//sx,sy初始位置
	//dx,dy运行方向
	var bulletGenerate = function(sx,sy,dx,dy){
		var b = new class_Bullet(sx,sy,dx,dy, BulletTotal);
		BulletArr.push(b);
		temp = "<div class='bullet' id='bullet"+BulletTotal+"'></div>";
		$('#bulletBox').append(temp);
		BulletTotal++;
	}

	//事件检测:
		//每0.2秒-检测撞击：player与enemy（game over） bullet与enemey（生命值减少-检测是否死亡）
		//每0.2秒-检测出界：player（禁止出界） enemy（消除） bullet（消除）
		var checkRange = function(){
			for(var elem in PlayerArr)
			{
				if (PlayerArr[elem].positionMiny > parseInt(MapHeight) ||  PlayerArr[elem].positionMaxx < 0 || PlayerArr[elem].positionMinx > parseInt(MapWidth) || PlayerArr[elem].positionMaxy < 0 )
				{
					//remove 
					$("#player"+elem).remove();
					delete PlayerArr[elem];
					}
			}
			for(var ele in EnemyArr)
			{
				if (EnemyArr[ele].isOut())
				{	
					$("#enemy"+ele).remove();
					delete EnemyArr[ele];
				}
			}

		}
			RecheckRange = setInterval(checkRange,500);
		//每0.2秒-检测player方向改变：player:键盘方向键按下
		var CheckKey = function(){
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
  			 	$('#player0')[0].style.left = player.positionMinx + "px";
  				$('#player0')[0].style.top = player.positionMiny + "px";
		} 
		setInterval(CheckKey,50);
		//每0.1秒-检测player发射子弹：鼠标左键按下
	//事件进行：
		//每0.2秒-子弹直线运动
		var bulletMove = function(){
			for (var i in BulletArr){
				var cursor = BulletArr[i];
				var newX = cursor.PosX + cursor.DirectX * cursor.moveLength;
				var newY = cursor.PosY + cursor.DirectY * cursor.moveLength;
				BulletArr[i].setPos(newX, newY);
				$('.bullet')[i].animate({left:""+newX+"px", top:""+newY+"px"}, 'fast');
			}
		}
		ReBulletMove = setInterval(bulletMove, intervalTime);

		//每0.2秒-enemy（1）（3）直线运动
		var enemyMoveStraight = function(){
			for (var i in EnemyArr){

				if (EnemyArr[i].Type != 2){
				var cursor = EnemyArr[i];
				var newX = cursor.PosX + cursor.DirectX * cursor.moveLength;
				var newY = cursor.PosY + cursor.DirectY * cursor.moveLength;
				EnemyArr[i].setPos(newX, newY);
				$("#enemy"+i).animate({left:""+newX+"px", top:""+newY+"px"}, 10);
				}
			}
		}
		ReEnemyMoveStraight = setInterval(enemyMoveStraight, intervalTime);

		//每0.2秒-enemy（2）瞄准player运动
		var enemyMoveToward = function(){
			for (var i in EnemyArr)
				if (EnemyArr[i].Type == 2){
				var cursor = EnemyArr[i];
				var DX = player.PosX - cursor.PosX;
				var DY = player.PosY - cursor.PosY;
				DX = DX /Math.sqrt((DX*DX)+(DY*DY));
				DY = DY /Math.sqrt((DX*DX)+(DY*DY));
				var newX = cursor.PosX + cursor.DirectX * cursor.moveLength;
				var newY = cursor.PosY + cursor.DirectY * cursor.moveLength;
				EnemyArr[i].setPos(newX, newY);
				$("#enemy"+i).animate({left:""+newX+"px", top:""+newY+"px"}, 'fast');
			}
		}
		ReEnemyMoveToward = setInterval(enemyMoveStraight, intervalTime);

		//每0.4秒-enemy（3） 瞄准player发射子弹
		var enemyShootToward = function(){
			for (var i in EnemyArr)
				if (EnemyArr[i].Type == 2){
				var cursor = EnemyArr[i];
				var DX = player.PosX - cursor.PosX;
				var DY = player.PosY - cursor.PosY;
				DX = DX /Math.sqrt((DX*DX)+(DY*DY));
				DY = DY /Math.sqrt((DX*DX)+(DY*DY));
				bulletGenerate(cursor.PosX, cursor.PosY, DX, DY);
			}
		}
		ReEnemyShootToward = setInterval(enemyShootToward, intervalTime*2);
}

var LeftArrow,RightArrow,UpArrow,DownArrow;//记录按键情况
var MapWidth,MapHeight;
Play();
