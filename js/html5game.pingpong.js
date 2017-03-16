var pingpong={}
var KEY={
	UP:38,
	DOWN:40,
	W:87,
	S:83
}
pingpong.ball={
	speed:5,
	x:150,
	y:100,
	directionX:1,
	directionY:1
}
pingpong.pressedKeys=[];
$(function(){
	pingpong.timer=setInterval(gameloop,30);//每30ms调用一次gameloop；
	$(document).keydown(function(e){
		pingpong.pressedKeys[e.which]=true;
	});
	$(document).keyup(function(e){
		pingpong.pressedKeys[e.which]=false;
	});
});
function gameloop(){
	moveBall();
	movePaddles();
}
function moveBall(){
	var playgroundHeight=parseInt($("#playground").height());
	var playgroundWidth=parseInt($("#playground").width());
	var ball=pingpong.ball;
	if(ball.y+ball.speed*ball.directionY>playgroundHeight)
	{
		ball.directionY=-1;
	}
	if(ball.y+ball.speed*ball.directionY<0)
	{
		ball.directionY=1;
	}
	if(ball.x+ball.speed*ball.directionX>playgroundWidth)
	{
		//玩家B丢分
		ball.x=250;
		ball.y=100;;
		$("#ball").css({
			"left":ball.x,
			"top":ball.y
		});
		ball.directionX=-1;
	}
	if(ball.x+ball.speed*ball.directionX<0)
	{
		ball.x=150;
		ball.y=100;;
		$("#ball").css({
			"left":ball.x,
			"top":ball.y
		});
		ball.directionX=1;
	}
	ball.x+=ball.speed*ball.directionX;
	ball.y+=ball.speed*ball.directionY;
	var paddleAX=parseInt($("#paddleA").css("left"))+parseInt($("#paddleA").css("width"));
	var paddleAYBottom=parseInt($("#paddleA").css("top"))+parseInt($("#paddleA").css("height"));
	var paddleAYTop=parseInt($("#paddleA").css("top"));
	if(ball.x+ball.speed*ball.directionX<paddleAX)
	{
		if(ball.y+ball.speed*ball.directionY<=paddleAYBottom &&
			ball.y+ball.speed*ball.directionY>=paddleAYTop)
			{
				ball.directionX=1;
			}
	}
	var paddleBX=parseInt($("#paddleB").css("left"))+parseInt($("#paddleB").css("width"));
	var paddleBYBottom=parseInt($("#paddleB").css("top"))+parseInt($("#paddleB").css("height"));
	var paddleBYTop=parseInt($("#paddleB").css("top"));
	if(ball.x+ball.speed*ball.directionX>=paddleBX)
	{
		if(ball.y+ball.speed*ball.directionY<=paddleBYBottom &&
			ball.y+ball.speed*ball.directionY>=paddleBYTop)
			{
				ball.directionX=-1;
			}
	}
	$("#ball").css({
		"left":ball.x,
		"top":ball.y
	});
}
function movePaddles(){
	if(pingpong.pressedKeys[KEY.UP])
	{
		var top=parseInt($("#paddleB").css("top"));//字符串转为数字
		$("#paddleB").css("top",top-5);
	}
	if(pingpong.pressedKeys[KEY.DOWN])
	{
		var top=parseInt($("#paddleB").css("top"));//字符串转为数字
		$("#paddleB").css("top",top+5);
	}
	if(pingpong.pressedKeys[KEY.W])
	{
		var top=parseInt($("#paddleA").css("top"));//字符串转为数字
		$("#paddleA").css("top",top-5);
	}
	if(pingpong.pressedKeys[KEY.S])
	{
		var top=parseInt($("#paddleA").css("top"));//字符串转为数字
		$("#paddleA").css("top",top+5);
	}
}