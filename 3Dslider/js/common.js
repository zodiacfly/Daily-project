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

function set3dSliderEvent(){
	var left = document.querySelector('.left');
	var right = document.querySelector('.right');
	var box = document.querySelector('.box');
	var divObj = box.getElementsByTagName('div');
	var index = 0;	
	var flag = true;//set lock----------------

	function setLeftButtonEvent(){
		if(flag){
			flag = false;
			index++;
			for (var i = 0; i < divObj.length; i++) {
				divObj[i].style.transform = 'rotateX('+index*90+'deg)';
				divObj[i].style.transitionDelay = i*0.1+'s';
			}
			setTimeout(function(){
				flag = true;
			},1500);
		}
	}

	function setRightButtonEvent(){
		if(flag){
			flag = false;
			index--;
			for (var i = 0; i < divObj.length; i++) {
				divObj[i].style.transform = 'rotateX('+index*90+'deg)';
				divObj[i].style.transitionDelay = ''+i*0.1+'s';
			}
			setTimeout(function(){
				flag = true;
			},1500);
		}
	}

	left.addEventListener('click',setLeftButtonEvent,false)
	right.addEventListener('click',setRightButtonEvent,false)
}

addLoadEvent(set3dSliderEvent)