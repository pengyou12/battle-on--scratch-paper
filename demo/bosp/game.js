//enemy 构造函数
//sx,sy 初始位置
//dx,dy 运行方向
//type  敌人类型
function class_Enemy(dx,dy,type,id)
{
	playMap = $("#playBox");
	MapWidth = parseInt(playMap.css("width"));
	MapHeight = parseInt(playMap.css("height"));
	this.DirectX = dx;
	this.DirectY = dy;
	this.Type = type;          //enemy类型
	this.life = 100;
	this.moveLength = 10;

	this.PosX = function(){
		return parseInt($("#enemy"+""+id).css('left'));
	}
	this.PosY = function(){
		return parseInt($("#enemy"+""+id).css('top'));
	}
	this.isKilled = function(){
		if (this.life == 0)
			return true;
		else
			return false;
	}
	this.isOut = function(){
		if (this.PosX() < 0 || this.PosX() > MapWidth || this.PosY() < 0 || this.PosY() > MapHeight)
			return true;
		else
			return false;
	}
}

//bullet 构造函数
//sx,sy  初始位置
//dx,dy  运行方向
function class_Bullet(dx,dy,id){
	playMap = $("#playBox");
	MapWidth = parseInt(playMap.css("width"));
	MapHeight = parseInt(playMap.css("height"));
	this.DirectX = dx;
	this.DirectY = dy;
	this.Id = id;
	this.moveLength = 10;
	this.PosX = function(){
		return parseInt($("#bullet"+""+id).css('left'));
	}
	this.PosY = function(){
		return parseInt($("#bullet"+""+id).css('top'));
	}
	this.isOut = function(){
		if (this.PosX() < 0 || this.PosX() > MapWidth || this.PosY() < 0 || this.PosY() > MapHeight)
			return true;
		else
			return false;
	}
}

//产生0~top的伪随机数
function RandomInteger(top){
	return Math.round(Math.random()*top);
}
function RandomDouble(top){
	return Math.random()*top;
}

BulletArr = [];  //子弹数组
	BulletTotal = 0; //子弹总数
	EnemyArr = [];  //敌人数组
	EnemyTotal = 0; //敌人总数

function Play(){
	playMap = $("#playBox"); //游戏地图
	
	intervalTime = 200; //间隔时间
	//设定：
	//开始：产生 player
	// var player;
	// function playerGenerate(){
	// 	player.PosX = 300;
	// 	player.PosY = 300;
	// }
	// playerGenerate();
	//每1秒：产生 enemy
	var enemyGenerate = function(){
		//随意设了初始值，待改为随机数
		type = 3;
		sx = RandomInteger(1000);
		sy = 0;
		dx = RandomDouble(1);
		dy = Math.sqrt(1-dx*dx);
		var e = new class_Enemy(dx,dy,type,EnemyTotal);
		EnemyArr.push(e);
		temp = "<div class='enemy' style='left:" + sx + "px;top:" + sy + "px' id='enemy" + "" + EnemyTotal +"'></div>";
		$('#enemyBox').append(temp);
		EnemyTotal++;
		enemyMoveStraight(EnemyTotal-1);
	}
	ReEnemyGenerate = setInterval(enemyGenerate, intervalTime*10);
	
	//产生子弹
	//sx,sy初始位置
	//dx,dy运行方向
	var bulletGenerate = function(sx,sy,dx,dy){
		var b = new class_Bullet(dx,dy, BulletTotal);
		BulletArr.push(b);
		temp = "<div class='bullet' style='left:" + sx + "px;top:" + sy + "px' id='bullet" + "" + BulletTotal +"'></div>";
		$('#bulletBox').append(temp);
		BulletTotal++;
		bulletMove(BulletTotal-1);
	}

	//事件检测:
		//每0.2秒-检测撞击：player与enemy（game over） bullet与enemey（生命值减少-检测是否死亡）
		//每0.2秒-检测出界：player（禁止出界） enemy（消除） bullet（消除）
		//每0.2秒-检测player方向改变：player:键盘方向键按下
		//每0.1秒-检测player发射子弹：鼠标左键按下
	//事件进行：
		//每0.2秒-子弹直线运动
		var bulletMove = function(i){
				var cursor = BulletArr[i];
				var newX = cursor.PosX() + cursor.DirectX * cursor.moveLength;
				var newY = cursor.PosY() + cursor.DirectY * cursor.moveLength;
				$('.bullet').eq(i).animate({left:""+newX+"px", top:""+newY+"px"}, 'intervalTime', 'linear', function(){
					bulletMove(i);
				});
		}
		//ReBulletMove = setInterval(bulletMove, intervalTime);

		//每0.2秒-enemy（1）（3）直线运动
		var enemyMoveStraight = function(i){
			if (EnemyArr[i].Type != 2){
				var cursor = EnemyArr[i];
				var newX = cursor.PosX() + cursor.DirectX * cursor.moveLength;
				var newY = cursor.PosY() + cursor.DirectY * cursor.moveLength;
				//clearInterval(ReEnemyMoveStraight);
				$('.enemy').eq(i).animate({left:""+newX+"px", top:""+newY+"px"}, intervalTime, 'linear',function(){
					enemyMoveStraight(i);
				});
			}
		}
		//ReEnemyMoveStraight = setInterval(enemyMoveStraight, intervalTime);

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
				$('.enemy').eq(i).animate({left:""+newX+"px", top:""+newY+"px"}, 'fast');
			}
		}
		//ReEnemyMoveToward = setInterval(enemyMoveStraight, intervalTime);

		//每2秒-enemy（3） 瞄准player发射子弹
		var enemyShootToward = function(){
			for (var i in EnemyArr)
				if (EnemyArr[i].Type == 3){
				var cursor = EnemyArr[i];
				var DX = 300 - cursor.PosX();
				var DY = 300 - cursor.PosY();
				DX = DX /Math.sqrt((DX*DX)+(DY*DY));
				DY = DY /Math.sqrt((DX*DX)+(DY*DY));
				bulletGenerate(cursor.PosX(), cursor.PosY(), DX, DY);
				//clearInterval(ReEnemyShootToward);
			}
		}
		ReEnemyShootToward = setInterval(enemyShootToward, intervalTime*10);
}

$(document).ready(function() {
  Play();
})