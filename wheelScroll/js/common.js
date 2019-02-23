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
addLoadEvent(addMouseWheelEvent)

function addMouseWheelEvent(){

	var cover = document.querySelector('.cover');
		
	if(document.addEventListener){
		document.addEventListener('DOMMouseScroll',setWheelHandle)//for firefox-----------
	}
	document.onmousewheel = setWheelHandle;//for ie, chrome-------------

	function setWheelHandle(e){
		 e = e || event;
		var direct = '';
		if(e.wheelDelta){//for ie, chrome----------------------------
			direct = e.wheelDelta > 0 ? 'up' : 'down';
		} else if(e.detail) {//for firefox--------------------------
			direct = e.detail < 0 ? 'up' : 'down';
		}
		switch(direct){
			case 'up': cover.style.height = cover.offsetHeight - 10 + 'px'; break;
			case 'down': cover.style.height = cover.offsetHeight >= document.documentElement.clientHeight ? document.documentElement.clientHeight + 'px' : cover.offsetHeight + 10 + 'px'; break;
		}

		if(e.preventDefault){//for firefox to ban the scroll bar--------------
			e.preventDefault();
		}

		return false;//for ie, chrome to ban the scroll bar-----------------
	}

	
}