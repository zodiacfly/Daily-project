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
addLoadEvent(setMacDockEvent)

function setMacDockEvent(){

	var wrap = document.querySelector('.wrap');
	var imgList = wrap.querySelectorAll('img');
	var radius = 320;
	
	function addMousemoveEvent(e){
		e = e || event;
		for (var i = 0; i < imgList.length; i++) {
			var currentX = imgList[i].getBoundingClientRect().left + imgList[i].offsetWidth/2 - e.clientX;
			var currentY = imgList[i].getBoundingClientRect().top + imgList[i].offsetHeight/2 - e.clientY;
			var hypotenuse = Math.sqrt(currentX*currentX + currentY*currentY);

			if(hypotenuse >= radius){
				hypotenuse = radius;	
			}
			imgList[i].style.width = (128 - hypotenuse*0.2) + 'px';
		}
	}

	document.addEventListener('mousemove',addMousemoveEvent)
}