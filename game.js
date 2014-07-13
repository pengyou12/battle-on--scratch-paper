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
		if (this.life == 0)
			return true;
		else
			return false;
	}
	this.isOut = function(){
		if (this.PosX < 0 || this.PosX > MapWidth || this.PosY < 0 || this.PosY > MapHeight)
			return true;
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
		if (this.PosX < 0 || this.PosX > MapWidth || this.PosY < 0 || this.PosY > MapHeight)
			return true;
		else
			return false;
	}
	this.move = function(x, y){
		this.setPos(x, y);
	}
}

//产生0~top的伪随机数
function RandomInteger(top){
	return Math.round(Math.random()*top);
}

function Play(){
	playMap = $("#playBox"); //游戏地图
	BulletArr = [];  //子弹数组
	BulletTotal = 0; //子弹总数
	EnemyArr = [];  //敌人数组
	EnemyTotal = 0; //敌人总数
	intervalTime = 200; //间隔时间
	//设定：
	//开始：产生 player
	function playerGenerate(){

	}
	//每1秒：产生 enemy
	var enemyGenerate = function(){
		//随意设了初始值，待改为随机数
		type = 1;
		sx = 0;
		sy = 0;
		dx = 0.6;
		dy = 0.6;
		var e = new class_Enemy(sx,sy,dx,dy,type);
		EnemyArr.push(e);
		temp = "<div class='enemy' id='enemy"+""+EnemyTotal+"'></div>";
		$('#enemyBox').append(temp);
		EnemyTotal++;
	}
	ReEnemyGenerate = setInterval(enemyGenerate, intervalTime*5);
	
	//产生子弹
	//sx,sy初始位置
	//dx,dy运行方向
	var bulletGenerate = function(sx,sy,dx,dy){
		var b = new class_Bullet(sx,sy,dx,dy, BulletTotal);
		BulletArr.push(b);
		temp = "<div class='bullet' id='bullet"+""+BulletTotal+"'></div>";
		$('#bulletBox').append(temp);
		BulletTotal++;
	}

	//事件检测:
		//每0.2秒-检测撞击：player与enemy（game over） bullet与enemey（生命值减少-检测是否死亡）
		//每0.2秒-检测出界：player（禁止出界） enemy（消除） bullet（消除）
		//每0.2秒-检测player方向改变：player:键盘方向键按下
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
			for (var i in EnemyArr)
				if (EnemyArr[i].Type != 2){
				var cursor = EnemyArr[i];
				var newX = cursor.PosX + cursor.DirectX * cursor.moveLength;
				var newY = cursor.PosY + cursor.DirectY * cursor.moveLength;
				EnemyArr[i].setPos({x:newX, y:newY});
				$('.enemy')[i].animate({left:""+newX+"px", top:""+newY+"px"}, 'fast');
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
				EnemyArr[i].setPos({x:newX, y:newY});
				$('.enemy')[i].animate({left:""+newX+"px", top:""+newY+"px"}, 'fast');
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