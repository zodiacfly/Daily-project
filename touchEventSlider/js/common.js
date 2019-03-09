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
addLoadEvent(setSlider)


function setSlider(){

	var slider = document.querySelector('.slider');
	var ulObj = document.querySelector('ul');
	var liObj = document.querySelectorAll('li');
	var index = 1;
	var timeId;
	//get first img----------
	var first = liObj[0];
	//get last img------------
	var last = liObj[liObj.length-1];
	//clone first img to the last position--------
	ulObj.appendChild(first.cloneNode(true));
	//clone last img to the first position---------
	ulObj.insertBefore(last.cloneNode(true),ulObj.firstChild);
	//count all the img again after above 2 steps--------
	liObj = document.querySelectorAll('li');
	var count = liObj.length;
	//get width of img --------------
	var imgWidth = slider.offsetWidth;
	//set width for img box-------------------
	ulObj.style.width = count*imgWidth+'px';
	//set width for each img---------------------
	for (var i = 0; i < liObj.length; i++) {
		liObj[i].style.width = imgWidth+'px';
	}
	//set initial position for img box---------
	ulObj.style.left = -imgWidth+'px';

	//sync the img size(width) when resizing window---------
	window.onresize = function(){
		//don't assign the imgWidth again!!!
		imgWidth = slider.offsetWidth;
		ulObj.style.width = count*imgWidth+'px';

		for (var i = 0; i < liObj.length; i++) {
			liObj[i].style.width = imgWidth+'px';
		}

		ulObj.style.left = -index*imgWidth+'px';
	}
	//let the slider playing------------
	function setSliderTimeInterval(){
		timeId = setInterval(function(){
			index++;		
			ulObj.style.transition = 'left 0.5s linear';
			ulObj.style.left = -index*imgWidth+'px';
			//settimeout to make sure last img has played and then move to the img[1]
			setTimeout(function(){
				if(index == count-1){
					index = 1;
					//must clear the transition here--------
					ulObj.style.transition = 'none';
					ulObj.style.left = -index*imgWidth+'px';
				}
			},500)
		},2000)
	}
	
	setSliderTimeInterval();
	
	
	//mobile device touchstart and touchmove event--------------
	var startX, moveX, distanceX;
	//set lock to prevent user move slider to fast--------------
	var flag = true;
	//get current position when finger touch and stop slider auto playing--
	ulObj.addEventListener('touchstart',function(e){
		startX = e.targetTouches[0].clientX;
		clearInterval(timeId);
	})
	//get position when moving finger and work out the distance
	ulObj.addEventListener('touchmove',function(e){
		if(flag){
			moveX = e.targetTouches[0].clientX;
			distanceX = moveX - startX;
			this.style.left = (-index*imgWidth+distanceX)+'px';
			//must to clear the transition here---------------
			ulObj.style.transition = 'none';
		}

	})

	ulObj.addEventListener('touchend',function(e){
		//lock the slider every touchend------------
		flag = false;
		//if touchmove distance over 100 then move to the next or previous img
		if(Math.abs(distanceX) > 100){
			if(distanceX > 0){
				index--;
				this.style.left = -index*imgWidth+'px';
				this.style.transition = 'left 0.5s linear';
			} else {
				index++;
				this.style.left = -index*imgWidth+'px';
				this.style.transition = 'left 0.5s linear';
			}
			//if less than 100 keep current img
			//if = 0, don't do anything
		} else if(Math.abs(distanceX) > 0){
			this.style.left = -index*imgWidth+'px';
			this.style.transition = 'left 0.5s linear';
		}
		//clear following three to make sure touchend event will not affect slider 
		//when touchmove event has been locked
		startX = 0;
		moveX = 0;
		distanceX = 0;
		//restart the slider--------------
		setSliderTimeInterval();
	})

	ulObj.addEventListener('webkitTransitionEnd',function(){
		//move to the img[1] once transition finish  
		if(index == count-1){
			index = 1;
			this.style.left = -index*imgWidth+'px';
			this.style.transition = 'none';
			//move to the img[img.length-2] once transition finish  
		} else if(index == 0){
			index = count-2;
			this.style.left = -index*imgWidth+'px';
			this.style.transition = 'none';
		}
		//unlock the touchmove event once transition finish
		setTimeout(function(){
			flag = true;
		},8000);		
	})
}