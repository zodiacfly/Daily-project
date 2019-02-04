function addLoadEvent(func){
	var oldLoad = window.onload;
	if(typeof window.onload != 'function'){
		window.onload = func;
	} else {
		window.onload = function(){
			oldLoad();
			func();
		}
	}
}

function aminate(ele,target){
	clearInterval(ele.timer);
	ele.timer = setInterval(function(){
		var current = ele.offsetLeft;
		var step = 10;
		step = target > current ? step : -step;
		current += step;
		if(Math.abs(step) > Math.abs(target - current)){
			ele.style.left = target + 'px';
			clearInterval(ele.timer);
		} else {
			ele.style.left = current + 'px';
		}
	},10);
}


function setMovingBox(){

	function getTarget(){
		var target = this.offsetLeft;
		aminate(moveObj,target);
	}
	var moveObj = document.getElementsByClassName('move')[0];
	var firstDiv = document.getElementsByClassName('first')[0];
	var secondDiv = document.getElementsByClassName('second')[0];
	var thirdDiv = document.getElementsByClassName('third')[0];

	secondDiv.addEventListener('click',getTarget,false)
	firstDiv.addEventListener('click',getTarget,false)
	thirdDiv.addEventListener('click',getTarget,false)
}

addLoadEvent(setMovingBox);

