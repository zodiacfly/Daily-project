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

function setTapEvent(ele,callback){
	if(!ele || typeof ele != 'object'){
		return;
	}
	
	var startTime, finishTime, startX, startY, endX, endY;

	ele.addEventListener('touchstart',function(e){
		if(e.targetTouches.length > 1){
			return;
		}
		startTime = Date.now();
		startX = e.targetTouches[0].clientX;
		startY = e.targetTouches[0].clientY;
		
	})
	ele.addEventListener('touchend',function(e){
		
		if(e.changedTouches.length > 1){
			return;
		}
		finishTime = Date.now();
		if((finishTime - startTime) > 150){
			return;
		}
		
		endX = e.changedTouches[0].clientX;
		endY = e.changedTouches[0].clientY;
		if(Math.abs(endX - startX) < 5 && Math.abs(endY - startY) < 5){
			callback && callback(e);
		}
	})

}

function setSideMenuTouchMove(){
	var layout = document.querySelector('.layout');
	var sidemenu = document.querySelector('.sidemenu');
	var ulObj = sidemenu.querySelector('ul');
	var list = ulObj.querySelectorAll('li');
	var startY, moveY, distanceY;
	var currentY = 0;
	var maxTop = 0;
	var minTop = sidemenu.offsetHeight - ulObj.offsetHeight;
	var maxBounceTop = maxTop + 100;
	var minBounceTop = minTop - 100;

	ulObj.addEventListener('touchstart',function(e){
		startY = e.targetTouches[0].clientY;
	})

	ulObj.addEventListener('touchmove',function(e){
		moveY = e.targetTouches[0].clientY;
		distanceY = moveY - startY;
		if(distanceY+currentY > maxBounceTop || distanceY+currentY < minBounceTop){
			return;
		}
		ulObj.style.top = (distanceY+currentY)+'px';
		ulObj.style.transition = 'none';
	})

	ulObj.addEventListener('touchend',function(){
		if(distanceY+currentY > maxTop){
			currentY = maxTop;
			ulObj.style.top = maxTop + 'px';
			ulObj.style.transition = 'top 0.5s';
		} else if(distanceY+currentY < minTop) {
			currentY = minTop;
			ulObj.style.top = minTop + 'px';
			ulObj.style.transition = 'top 0.5s';
		} else {
			currentY += distanceY;
		}		
	})

	setTapEvent(ulObj,function(e){
		for (var i = 0; i < list.length; i++) {
			list[i].classList.remove('current')
		}
		e.target.parentNode.classList.add('current');
	})
}



addLoadEvent(setSideMenuTouchMove)
