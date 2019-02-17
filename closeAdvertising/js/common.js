function addLoadEvent(func) {
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

addLoadEvent(setCloseAdvertisingEvent)

function setCloseAdvertisingEvent(){

	function getStyle(ele,attr){
		 return window.getComputedStyle ? window.getComputedStyle(ele,null)[attr] : element.currentStyle[attr];
	}

	function aminate(ele,json,callback){
		clearInterval(ele.timeId)
		var flag;
		var current = 0;
		var step = 0;
		var target = 0;
		ele.timeId = setInterval(function(){
			flag = true;
			for(var key in json){
				if(key == 'Zindex'){
					ele.style[key] = json[key];
				}else if(key == 'opacity'){
					current = parseInt(getStyle(ele,key))*100;
					target = parseInt(json[key])*100;
					step = (target - current)/10;
					step = step > 0 ? Math.ceil(step) : Math.floor(step);
					current += step;
					ele.style[key] = current/100;
				}else{
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
			}//end for----------------------------------------
			if(flag){
				clearInterval(ele.timeId)
				callback&&callback();
			}
		},20);
	}

	var box = document.querySelector('.box');
	var upper = document.querySelector('.upper');
	var lower = document.querySelector('.lower');
	var closeObj = upper.querySelector('span');

	closeObj.addEventListener('click',function(){
		aminate(lower,{'height':0},function(){
			aminate(box,{'width':0})
			closeObj.style.display = 'none';
		})
	})
	
}