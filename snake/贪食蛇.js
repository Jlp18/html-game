
var CANVAS=document.getElementById("canvas");
var CTX=CANVAS.getContext("2d");
var SNAKE=new Array(); //用队列来模拟蛇身
var DIR="right"; //用来控制蛇头的方向
var SIZE = 20; //蛇身的宽度
var FOODX = 0; //食物的x坐标
var FOODY = 0; //食物的y坐标
var HEADX = 0; //蛇头的x坐标
var HEADY = 0; //蛇头的y坐标
var MAXWIDTH = 400; //画布的宽度
var MAXHEIGHT = 400; //画笔的高度
var TIME = 100; //蛇的速度
var SCORE = 0; //玩家得分
var interval = null;

CANVAS.width=MAXWIDTH;
CANVAS.height=MAXHEIGHT;
//当前页面加载时
window.onload=function(){
	newgame();
};

document.getElementById("newGameButton").click(function(){
	newgame();
});

function newgame(){
	SNAKE = []; //用队列模拟蛇身
	DIR = "right";  //用来控制蛇头的方向
	HEADX = 0; //蛇头初始的x坐标
	HEADY = 0; //蛇头初始的y坐标
	SCORE = 0; //初始化得分
	window.clearInterval(interval);
	interval = null;
	//初始化画布
	CTX.clearRect(0,0,MAXWIDTH,MAXHEIGHT);
	//画一条蛇
	drawSnake();
	//随机放置食物
	setFood();
	//移动蛇
	interval = window.setInterval(move,TIME);
	
}

function drawSnake(){
	CTX.fillStyle = "green";
	//画蛇头
	CTX.fillRect(HEADX,HEADY,SIZE,SIZE);
	SNAKE.push([HEADX,HEADY]);
	
	//画蛇身
	switch(DIR){
		case "up":
		  drawBody(HEADX ,HEADY+SIZE ,HEADX ,HEADY+2*SIZE);
		  break;
		case "down":
		  drawBody(HEADX ,HEADY-SIZE ,HEADX ,HEADY-2*SIZE);
		  break;
		case "left":
		  drawBody(HEADX+SIZE ,HEADY ,HEADX+2*SIZE ,HEADY);
		  break;
		case "right":
		  drawBody(HEADX-SIZE ,HEADY ,HEADX-2*SIZE ,HEADY);
		  break;
	}
}
 
 
function drawBody(x1 ,y1 ,x2 , y2){
	CTX.fillRect(x1 ,y1 ,SIZE ,SIZE);
	CTX.fillRect(x2 ,y2 ,SIZE ,SIZE);
	SNAKE.push([x1,y1]);
	SNAKE.push([x2,y2]);
}

function move(){
	switch(DIR){
		case "up": HEADY = HEADY-SIZE; break;
		case "down": HEADY = HEADY+SIZE; break;
		case "left": HEADX = HEADX-SIZE; break;
		case "right": HEADX = HEADX+SIZE; break;
	}
	if(HEADX>MAXWIDTH-SIZE||HEADY>MAXHEIGHT-SIZE||HEADX<0||HEADY<0){
		alert("您的分数为："+SCORE+"分，继续努力吧！失败原因：碰壁了...");
		window.location.reload();
	}
	for(var i=1;i<SNAKE.length;i++){
		if(SNAKE[0][0]==SNAKE[i][0]&&SNAKE[0][1]==SNAKE[i][1]){
			alert("您的分数为："+SCORE+"分，继续努力吧！失败原因：撞到自己了...");
			window.location.reload();
		}
	}
	if(SNAKE.length==MAXHEIGHT*MAXWIDTH){
		alert("好厉害！么么哒~");
		window.location.reload();
	}
	moveIn(HEADX,HEADY); //移动一格
}

document.onkeydown = function(e){ //改变蛇的方向
	var code = e.keyCode - 37;
	switch(code){
		case 1 : DIR = "up" ; break; //上
		case 2 : DIR = "right" ; break;  //右
		case 3 : DIR = "down" ; break;  //下
		case 0 : DIR = "left" ; break; //左
	}
}

function moveIn(x , y){
	CTX.fillStyle = "green";
	CTX.fillRect(x ,y ,SIZE ,SIZE); //重画蛇头
	//把新蛇头添加到SNAKE数组
	var newSnake = [[x,y]];
	SNAKE = newSnake.concat(SNAKE);
	
	if(eatFood()==false){ //如果没吃到食物，减少一格蛇尾
		var snakeTail = SNAKE.pop(); //获得蛇尾的位置
		CTX.clearRect(snakeTail[0],snakeTail[1],SIZE,SIZE); //去掉蛇尾
	}
}

function setFood(){
	do{
		FOODX = SIZE*Math.floor(Math.random()*MAXWIDTH/SIZE);
		FOODY = SIZE*Math.floor(Math.random()*MAXHEIGHT/SIZE);
	}while(foodInSnake());
	CTX.fillStyle = "red";
	CTX.fillRect(FOODX ,FOODY ,SIZE , SIZE);
}
function foodInSnake(){
	for(var i=0;i<SNAKE.length;i++){
		if(FOODX==SNAKE[i][0]&&FOODY==SNAKE[i][1]){
			return true;
		}
	}
	return false;
}

function eatFood(){
	if(HEADX == FOODX &&　HEADY == FOODY){
		CTX.fillStyle = "block";
		CTX.fillRect(FOODX ,FOODY ,SIZE ,SIZE);
		
		setFood();
		SCORE++;
		document.getElementById("score").innerHTML = SCORE;
		return true;
	}
	return false;
}
