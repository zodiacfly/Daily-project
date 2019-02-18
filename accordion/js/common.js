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

function getStyle(ele,attr){
	return window.getComputedStyle ? window.getComputedStyle(ele,null)[attr] : element.currentStyle[attr];
}

function aminate(ele,json,callback){
	clearInterval(ele.timeId);
	var current = 0;
	var target = 0;
	var step = 0;
	var flag;
	ele.timeId = setInterval(function(){
		flag = true;
		for(var key in json){
			if(key == 'zIndex'){
				ele.style[key] = json[key];
			} else if(key == 'opacity'){
				current = parseInt(getStyle(ele,key))*100;
				target = parseInt(json[key])*100;
				step = (target - current)/10;
				step = step > 0 ? Math.ceil(step) : Math.floor(step);
				current += step;
				ele.style[key] = current/100;
			} else {
				current = parseInt(getStyle(ele,key));
				target = parseInt(json[key]);
				step = (target - current)/10;
				step = step > 0 ? Math.ceil(step) : Math.floor(step);
				current += step;
				ele.style[key] = current + 'px';
			}
			if(current != target){
				flag = false;
			}
		}
		if(flag){
			clearInterval(ele.timeId);
			callback && callback();
		}
	},20)
}

function setAccordionEvent(){

	var box = document.querySelector('.box');
	var ulObj = box.querySelector('ul');
	var list = ulObj.querySelectorAll('li');
	
	function addMouseoverHandle(){
		for (var j = 0; j < list.length; j++) {
			aminate(list[j],{'width':110})
		}
		aminate(this,{'width':750})
	}
	function addMouseoutHandle(){
		for (var i = 0; i < list.length; i++) {
			aminate(list[i],{'width':240})
		}
	}

	for (var i = 0; i < list.length; i++) {
		list[i].style.backgroundImage = 'url(images/bryant0'+(i+1)+'.jpg)';
		list[i].addEventListener('mouseover',addMouseoverHandle)
		list[i].addEventListener('mouseout',addMouseoutHandle)
	}
}

addLoadEvent(setAccordionEvent)