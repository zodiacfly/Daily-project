function addLoadEvent(func){
	var oldLoad = window.onload;
	if ( typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function(){
			oldLoad();
			func();
		}
	}
}

function changeMeterEvent(){
	var score = document.getElementById('score');
	var	meter = document.getElementById('meter');
	score.oninput = function(){
		meter.value=this.value;
	};
	score.oninvalid = function(){
		this.setCustomValidity('input between 0--100');
	};

}	


addLoadEvent(changeMeterEvent)