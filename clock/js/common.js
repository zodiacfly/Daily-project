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

function setClockEvent(){

	var style = document.getElementById('style');
	var ulObj = document.querySelector('ul');
	var hourObj = document.querySelector('.hour');
	var minuteObj = document.querySelector('.minute');
	var secondObj = document.querySelector('.second');
	var liObj = '';

	for (var i = 0; i < 60; i++) {
		liObj += '<li></li>';
		style.innerHTML += 'ul > li:nth-of-type(' + (i+1) + ') {transform: translate(-50%,-100%) rotate(' + i*6 + 'deg);}'
	}
	ulObj.innerHTML = liObj;

	function setClockTime(){
		var date = new Date();
		var second = date.getSeconds();
		var minute = date.getMinutes()+second/60;
		var hour = date.getHours()+minute/60;

		secondObj.style.transform = 'translate(-50%,-100%) rotate('+second*6+'deg)';
		minuteObj.style.transform = 'translate(-50%,-100%) rotate('+minute*6+'deg)';
		hourObj.style.transform = 'translate(-50%,-100%) rotate('+hour*30+'deg)';
		setTimeout(setClockTime,1000);

	}
	setClockTime()
}

addLoadEvent(setClockEvent)
