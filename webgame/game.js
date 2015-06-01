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
function class_Bullet(sx,sy,dx,dy,id,type){
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
	this.Type = type;
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
		if (this.PosX < 0 || this.PosX > parseInt(MapWidth) || this.PosY < 0 || this.PosY > parseInt(MapHeight)){
			return true;
		}
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
	imgID = 1;
	playMap = $("#playBox");
	MapWidth = playMap.css("width");
	MapHeight = playMap.css("height");
	this.positionMinx = Math.random() * parseInt(MapWidth);
	this.positionMiny = Math.random() * parseInt(MapHeight);
	this.positionMaxx = this.positionMinx + 65;
	this.positionMaxy = this.positionMiny + 75;
	this.moveLength = 14;
	this.harm = 1;//当前子弹的伤害
	this.shoot = function(){
								if(MouseClick == true)
								{
								
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
										//LeftArrow = false;
										this.positionMinx -= this.moveLength;
										this.positionMaxx -= this.moveLength;
									}
							};
	this.moveRight = function(){
									if( RightArrow == true)
									{
										//RightArrow = false;
										this.positionMinx += this.moveLength;
										this.positionMaxx += this.moveLength;
									}
							};
	this.moveUp = function(){
									if( UpArrow == true)
									{
										//UpArrow = false;
										this.positionMiny -= this.moveLength;
										this.positionMaxy -= this.moveLength;
									}
							};															
	this.moveDown = function(){
									if( DownArrow == true)
									{
										//DownArrow = false;
										this.positionMiny += this.moveLength;
										this.positionMaxy += this.moveLength;
										
									}
									
							};
}

function player_death_animation(playerID,x,y) {
	function death_animation() {
		if (imgID > 1) {
		$('#player' + playerID + '_death' + (imgID - 1))[0].style.display = "none";
		}
		if(imgID >= 7 )
		{
			delete PlayerArr[ele];
			clearInterval(check_death_aniimation);
			return;
		}
		var tempAng;
		tempAng = angle;
		if(mouseposX < x + 65 / 2)
		{
			$("#player" + playerID + "_death" + imgID).css('transform', 'rotateY(' + 180 + 'deg) rotate(' + -tempAng + 'deg)');
		}
		else{$("#player" + playerID + "_death" + imgID).css('transform', 'rotate(' + tempAng + 'deg)');}
		$('#player' + playerID + '_death' + imgID)[0].style.left = x + "px";
		$('#player' + playerID + '_death' + imgID)[0].style.top = y + "px";
		$('#player' + playerID + '_death' + imgID)[0].style.display = "block";
		imgID ++;
	}
	check_death_aniimation = setInterval(death_animation,100);
}
function CheckKey() {
	if(playDeath){return;}//人物死亡
	var middleX = (player.positionMinx + player.positionMaxx) / 2;
	var middleY = (player.positionMiny + player.positionMaxy) / 2;
	var changeToState = 0;
	if (LeftArrow) player.moveLeft();
	if (RightArrow) player.moveRight();
	if (UpArrow) player.moveUp();
	if (DownArrow) player.moveDown();
	mouseMove();
	if (false) //按键冲突 LeftArrow && RightArrow) || (UpArrow && DownArrow)
	{
		// LeftArrow = false;
		// RightArrow = false;
		// UpArrow = false;
		// DownArrow = false;
	} else {
		if (LeftArrow || RightArrow || UpArrow || DownArrow) {
			if (mouseposX < middleX) { //左边模式
				LeftRightModel = 0;
				LeftImgcount = (LeftImgcount + 1) % 3;
				RightImgcount = 0;
				if (LeftImgcount == 0) {
					changeToState = 4;
				} else if (LeftImgcount == 1) {
					changeToState = 5;
				} else {
					changeToState = 6;
				}
			} else { //右边模式
				LeftImgcount = 0;
				LeftRightModel = 1;
				RightImgcount = (RightImgcount + 1) % 4;
				changeToState = RightImgcount;
			}
			$("#player0_" + currentState)[0].style.display = "none";
			$('#player0_' + changeToState)[0].style.left = player.positionMinx + "px";
			$('#player0_' + changeToState)[0].style.top = player.positionMiny + "px";
			$("#player0_" + changeToState)[0].style.display = "block";
			currentState = changeToState;
			$("#player0_" + currentState).css('transform', 'rotate(' + angle + 'deg)');

	}
		//换图片，实现过渡效果
	}
	$('#player' + 0 + '_' + currentState)[0].style.left = player.positionMinx + "px";
	$('#player' + 0 + '_' + currentState)[0].style.top = player.positionMiny + "px";
	$("#player0_" + currentState).css('transform', 'rotate(' + angle + 'deg)');


}
function mouseMove(ev)
{
	if(playDeath){return;}
	if(ev)
	{
		mouseposX = ev.pageX-50;
   		mouseposY = ev.pageY-50;
   		} 
	var middleX = (player.positionMinx + player.positionMaxx) / 2;
	var middleY = (player.positionMiny + player.positionMaxy) / 2;
   	var tanangle = (middleY - mouseposY) / (middleX - mouseposX);
   	angle = Math.atan(tanangle);
   	if(mouseposX <= middleX ){//左边模式

   						if(LeftRightModel == 1){
   						LeftRightModel = 0;
  						LeftImgcount = 0;
  						RightImgcount = 0;
  						if(ev){
  						$("#player0_"+currentState)[0].style.display = "none";
  						$('#player0_4')[0].style.left = player.positionMinx + "px";
  						$('#player0_4')[0].style.top = player.positionMiny + "px";
  						$("#player0_4")[0].style.display = "block";
  						currentState = 4; 
  							}
  						}
  					}
  	else if(mouseposX > middleX ){
  		angle = Math.atan(tanangle);
		if (LeftRightModel == 0) {
			RightImgcount = 0;
			LeftRightModel = 1;
			if(ev){
			$("#player0_" + currentState)[0].style.display = "none";
			$('#player0_0')[0].style.left = player.positionMinx + "px";
			$('#player0_0')[0].style.top = player.positionMiny + "px";
			$("#player0_0")[0].style.display = "block";
			currentState = 0;
			}
		}
  	}
  		angle = angle * 180 / 3.14159;
  		if(ev){
  		$("#player0_"+currentState).css( 'transform', 'rotate('+angle+'deg)' );
  		}
}
//判断鼠标是否被按下
function MouseDown(ev){
	//var e = ev || window.event;             
    mouseposX = ev.pageX-50;
    mouseposY = ev.pageY-50; 
	MouseClick = true;
}
function MouseUp(){
	MouseClick = false;
}
window.onkeydown = function (e)
{
	if(window.event) // IE
	{
	keynum = e.keyCode
	}
else if(e.which) // Netscape/Firefox/Opera
	{
	keynum = e.which
}	if (keynum == 37) {
		LeftArrow = true;
		//player.moveLeft();
	} else if (keynum == 38) {
		UpArrow = true;
		//	player.moveUp();
	} else if (keynum == 39) {
		RightArrow = true;
		//	player.moveRight();
	} else if (keynum == 40) {
		DownArrow = true;
		//player.moveDown();
	}
}
window.onkeyup = function(e){
	var keynum;
	if(window.event) // IE
	{
	keynum = e.keyCode
	}
	else if(e.which) // Netscape/Firefox/Opera
	{
	keynum1 = e.which
	}
		if(keynum == 37){
		LeftArrow = false;
		//player.moveLeft();
	}
	else if(keynum == 38){
		UpArrow = false;
	//	player.moveUp();
	}
	else if(keynum == 39){
		RightArrow = false;
	//	player.moveRight();
	}
	else if(keynum == 40){
		DownArrow = false;
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
	LeftRightModel = 1;//0表示是左边模式，1是右边模式
	intervalTime = 200; //间隔时间
	LeftImgcount = 0;
	RightImgcount = 0;
	currentState = 0;//记录当前切换到第几张图了
	$('#playBox').append($('<div id = "enemyBox"></div>'));
	$('#playBox').append($('<div id = "bulletBox"></div>'));
	//设定：
	//开始：产生 player
	function playerGenerate(){
		var tempPlayer;
		//产生当前的player
		player = new class_player();
		PlayerArr.push(player);
		for(var i = 0; i <7;i++){
			if(!i){
				$('#playBox').append($('<img id = "player'+PlayerTotal+'_'+i+'" style="position:absolute;display:block" src = "doom_guy.png">'));
				$('#player'+PlayerTotal+'_'+i)[0].style.left = PlayerArr[PlayerTotal].positionMinx + "px";
  				$('#player'+PlayerTotal+'_'+i)[0].style.top = PlayerArr[PlayerTotal].positionMiny + "px";
			}
			else{
			$('#playBox').append($('<img id = "player'+PlayerTotal+'_'+i+'" style="position:absolute;display:none" src = "doom_guy_frame'+i+'.png">'));
			$('#player'+PlayerTotal+'_'+i)[0].style.left = PlayerArr[PlayerTotal].positionMinx + "px";
  			$('#player'+PlayerTotal+'_'+i)[0].style.top = PlayerArr[PlayerTotal].positionMiny + "px";
  			$('#playBox').append($('<img id = "player'+PlayerTotal+'_death'+i+'" style="position:absolute;display:none" src = "doom_death_frame'+i+'.png">'));
			$('#player'+PlayerTotal+'_death'+i)[0].style.left = PlayerArr[PlayerTotal].positionMinx + "px";
  			$('#player'+PlayerTotal+'_death'+i)[0].style.top = PlayerArr[PlayerTotal].positionMiny + "px";
  			}
  		}
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
	var bulletGenerate = function(sx,sy,dx,dy,type){
		var b = new class_Bullet(sx,sy,dx,dy, BulletTotal,type);
		var middleX = (player.positionMinx + player.positionMaxx) / 2;
		var middleY = (player.positionMiny + player.positionMaxy) / 2;
		var tempangle2 = angle;
		BulletArr.push(b);
		if (type == 1)
		{
			temp = "<img style='position:absolute;' src = 'old_guy_bullet.png'class='bullet' id='bullet"+BulletTotal+"'></div>";
			$('#bulletBox').append(temp);
			$('#bullet'+BulletTotal)[0].style.left = sx+"px";
			$('#bullet'+BulletTotal)[0].style.top = sy+"px";
			if(mouseposX < middleX){
				tempangle2 += 180;
			}
			$("#bullet"+BulletTotal).css( 'transform', 'rotate('+tempangle2+'deg)' );
		}	
		else
		{
			temp = "<div class='bullet' style='left:" + sx + "px;top:" + sy + "px' id='bullet" + "" + BulletTotal +"'></div>";
			$('#bulletBox').append(temp);

		}
		BulletTotal++;
	}

	//事件检测:
		//每0.2秒-检测撞击：player与enemy（game over） bullet与enemey（生命值减少-检测是否死亡）
	var checkDeath = function(){
		if(playDeath){return ;}
		var enemyWidth = 15;//怪中心到边上的距离
		var playerWidth = 10;
		//删除被子弹打中的怪物
		for(var elem in BulletArr)
		{
			if (BulletArr[elem].Type == 1){
				for(var ele in EnemyArr)
				{
					if(EnemyArr[ele].PosX + enemyWidth > BulletArr[elem].PosX && EnemyArr[ele].PosY + enemyWidth > BulletArr[elem].PosY && EnemyArr[ele].PosY - enemyWidth < BulletArr[elem].PosY && EnemyArr[ele].PosX - enemyWidth < BulletArr[elem].PosX){
						//remove
						// EnemyArr[ele].life -= player.harm;
						$("#bullet"+elem).remove();
						delete BulletArr[elem];
						EnemyArr[ele].life -= 50;
						if(EnemyArr[ele].life <= 0)
						{
							$("#enemy"+ele).remove();
							delete EnemyArr[ele];
						}
					}	
				}
			}
			else
			{
				for(var ele in PlayerArr)
		 		{
		 			if(PlayerArr[ele].positionMinx + playerWidth > BulletArr2[elem].positionMinx && PlayerArr[ele].positionMiny + playerWidth > BulletArr2[elem].positionMiny && PlayerArr[ele].positionMiny - playerWidth < BulletArr2[elem].positionMiny && PlayerArr[ele].positionMinx - playerWidth < BulletArr2[elem].positionMinx){
		 				//remove
		 				// PlayerArr[ele].life -= player.harm;
		 				$("#bullet_enemy"+elem).remove();
		 				delete BulletArr2[elem];
		 				$("#player0_"+currentState).remove();
		 				player_death_animation(0,PlayerArr[ele].positionMinx,PlayerArr[ele].positionMiny);
		 				playDeath = true;
		 				delete PlayerArr[ele];
		 			}
		 		}
		 	}	
		}
		//删除被怪物撞到的人
		for(var ele in PlayerArr)
		{
			for(var elem in EnemyArr)
			{
				if(PlayerArr[ele].positionMaxx < EnemyArr[elem].PosX - enemyWidth || PlayerArr[ele].positionMaxy < EnemyArr[elem].PosY - enemyWidth || EnemyArr[elem].PosX + enemyWidth < PlayerArr[ele].positionMinx || EnemyArr[elem].PosY + enemyWidth < PlayerArr[ele].positionMiny){
					;
				}
				else{
					$("#player0_"+currentState).remove();
					playDeath = true;
					player_death_animation(0,PlayerArr[ele].positionMinx,PlayerArr[ele].positionMiny);
					delete PlayerArr[ele];
					}
			}
		}
}
	var RecheckDeath = setInterval(checkDeath,20);
		//每0.2秒-检测出界：player（禁止出界） enemy（消除） bullet（消除）
		var checkRange = function(){
			//监测人物出界
			for(var elem in PlayerArr)
			{
				if (PlayerArr[elem].positionMiny > parseInt(MapHeight) ||  PlayerArr[elem].positionMaxx < 0 || PlayerArr[elem].positionMinx > parseInt(MapWidth) || PlayerArr[elem].positionMaxy < 0 )
				{
					//remove 
					$("#player0_"+currentState).remove();
					delete PlayerArr[elem];
					}
			}
			//监测怪物出界
			for(var ele in EnemyArr)
			{
				if (EnemyArr[ele].isOut())
				{	
					$("#enemy"+ele).remove();
					delete EnemyArr[ele];
				}
			}
			//监测子弹出界
				for(var el in BulletArr)
			{
				if (BulletArr[el].isOut())
				{	
					$("#bullet"+el).remove();
					delete BulletArr[el];
				}
			}

		}
			RecheckRange = setInterval(checkRange,500);
		//每0.2秒-检测player方向改变：player:键盘方向键按下
			setInterval(CheckKey,500);
		//每0.05秒-检测player发射子弹：鼠标左键按下
		var CheckMouse = function(){
			if(MouseClick)
			{	
				// cursor.PosX = mouseposX;
				// cursor.PosY = mouseposY;
				var tempWidth = (player.positionMaxx - player.positionMinx) / 2; 
				var tempHeight = (player.positionMaxy - player.positionMiny) / 2;
				var middleX = (player.positionMinx + player.positionMaxx) / 2;
				var middleY = (player.positionMiny + player.positionMaxy) / 2;
				var DX = mouseposX - middleX;
				var DY = mouseposY - middleY;
				var dx1,dy1;
				dx1 = DX /Math.sqrt((DX*DX)+(DY*DY));
				dy1 = DY /Math.sqrt((DX*DX)+(DY*DY));
				DX = dx1;
				DY = dy1;
				var tempangle = -angle;
				if(mouseposX < middleX)
				{
					tempangle += 180;
				}
				bulletGenerate(middleX + tempWidth * Math.cos(tempangle/180 * 3.14159 - 0.2), middleY - tempWidth * Math.sin(tempangle/180 * 3.14159 - 0.2), DX, DY,1);

			}
		}
		var ReCheckMouse = setInterval(CheckMouse,200);
	//事件进行：
		//每0.2秒-子弹直线运动
		var bulletMove = function(){
			for (var i in BulletArr){
				var cursor = BulletArr[i];
				var newX = cursor.PosX + cursor.DirectX * cursor.moveLength;
				var newY = cursor.PosY + cursor.DirectY * cursor.moveLength;
				BulletArr[i].setPos(newX, newY);
				// $("#bullet"+i).animate({left:""+newX+"px", top:""+newY+"px"}, 10);
				$("#bullet"+i)[0].style.left = newX + "px";
				$("#bullet"+i)[0].style.top = newY + "px";
			}
		}
		var ReBulletMove = setInterval(bulletMove, intervalTime/15);

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
		var ReEnemyMoveStraight = setInterval(enemyMoveStraight, intervalTime);

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

		// //每0.4秒-enemy（3） 瞄准player发射子弹
		// var enemyShootToward = function(){
		// 	for (var i in EnemyArr)
		// 		if (EnemyArr[i].Type == 2){
		// 		var cursor = EnemyArr[i];
		// 		var DX = player.PosX - cursor.PosX;
		// 		var DY = player.PosY - cursor.PosY;
		// 		DX = DX /Math.sqrt((DX*DX)+(DY*DY));
		// 		DY = DY /Math.sqrt((DX*DX)+(DY*DY));
		// 		bulletGenerate(cursor.PosX, cursor.PosY, DX, DY,1);
		// 	}
		// }
		// ReEnemyShootToward = setInterval(enemyShootToward, intervalTime*2);
}

var LeftArrow,RightArrow,UpArrow,DownArrow, MouseClick;//记录按键情况
var MapWidth,MapHeight;
var mouseposX,mouseposY;
var angle,keyEvent;
var playDeath = false;
// var keylist = new Array();//记录按键队列
Play();
