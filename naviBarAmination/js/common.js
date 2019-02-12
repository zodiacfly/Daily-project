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
	clearInterval(ele.timeId);
	ele.timeId = setInterval(function(){
		var current = ele.offsetLeft;
		var step = (target-current)/10;
		step = step > 0 ? Math.ceil(step) : Math.floor(step);
		current += step;
		ele.style.left = current +'px';
		if(current == target){
			clearInterval(ele.timeId);
		}
	},20)
}

function setNaviAmination(){

	var cover = document.querySelector('.cover');
	var ulObj = document.querySelector('ul');
	var list = ulObj.querySelectorAll('li');
	var lastPosition = list[0].offsetLeft;

	function setMouseoverHandle(){
		aminate(cover,this.offsetLeft);
	}
	function setMouseClickHandle(){
		lastPosition = this.offsetLeft;
	}
	function setMouseoutHandle(){
		aminate(cover,lastPosition);
	}

	for (var i = 0; i < list.length; i++) {
		list[i].addEventListener('mouseover',setMouseoverHandle);
		list[i].addEventListener('click',setMouseClickHandle);
		list[i].addEventListener('mouseout',setMouseoutHandle);

	}
}
addLoadEvent(setNaviAmination);