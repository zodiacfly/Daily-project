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

function setValentinesDayEvent(){
	
	var box = document.querySelector('.box');
	var h1Obj = document.querySelector('h1');

	setInterval(function(){
		var color = 'rgba('+parseInt(Math.random()*255)+','+parseInt(Math.random()*255)+','+parseInt(Math.random()*255)+','+(Math.random()+0.5)+')';
		var colorShadow = 'rgba('+parseInt(Math.random()*255)+','+parseInt(Math.random()*255)+','+parseInt(Math.random()*255)+','+(Math.random()+0.5)+')';
		h1Obj.style.color = color;
		h1Obj.style.textShadow =parseInt(Math.random()*10)+'px '+parseInt(Math.random()*10)+'px '+parseInt(Math.random()*20)+'px '+colorShadow;
	},200)
}

addLoadEvent(setValentinesDayEvent)