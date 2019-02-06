
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

function setRotatingSquare(){
	var start = document.getElementsByTagName('span')[0];
	var pause = document.getElementsByTagName('span')[1];
	var box = document.querySelector('.box');

	function setBoxShadowOnMouseDown(){
		this.style.boxShadow = '4px 4px 4px #000 inset, -2px -2px 2px #fff inset';
	}

	function setBoxShadowOnMouseUp(){
		this.style.boxShadow = '4px 4px 4px #000 ';
	}

	function setRunning(){
		box.style.animationPlayState = 'running';
	}

	function setPause(){
		box.style.animationPlayState = 'paused';
	}

	start.addEventListener('click',setRunning,false);
	start.addEventListener('mousedown',setBoxShadowOnMouseDown,false);
	start.addEventListener('mouseout',setBoxShadowOnMouseUp,false);
	start.addEventListener('mouseup',setBoxShadowOnMouseUp,false);

	pause.addEventListener('click',setPause,false);
	pause.addEventListener('mousedown',setBoxShadowOnMouseDown,false);
	pause.addEventListener('mouseout',setBoxShadowOnMouseUp,false);
	pause.addEventListener('mouseup',setBoxShadowOnMouseUp,false);
}

addLoadEvent(setRotatingSquare);

