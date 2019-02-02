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

function customiseVideoPlayer(){
	var box = document.querySelector('.box');
	var videoObj = document.querySelector('video');
	var switchObj = document.querySelector('.switch');
	var fullObj = document.querySelector('.full-screen');
	var totalTime = document.querySelector('.total-time');
	var currentMomentTime = document.querySelector('.current-time');
	var elapsed = document.querySelector('.elapsed');
	var bar = document.querySelector('.bar');
	var loaded = document.querySelector('.loaded');
	var cover = document.querySelector('.cover');

	function getStyle(ele,attr){

		return window.getComputedStyle?window.getComputedStyle(ele,null)[attr]:element.currentStyle[attr];
	}

	function getTime(time){
		var total = videoObj.duration;
		var hour = Math.floor(time/3600);
		var minute = Math.floor(time%3600/60);
		var second = Math.floor(time%60);
		hour = hour < 10 ? '0'+hour : hour;
		minute = minute < 10 ? '0'+minute : minute;
		second = second < 10 ? '0'+second : second;
		return hour+':'+minute+':'+second;
	}

		//script for switch on/off----------------------------------
		switchObj.onclick = function(){
			if (videoObj.paused){
				videoObj.play();
				this.innerHTML = '| |';
				cover.style.zIndex = -10;
			} else {
				videoObj.pause();
				this.innerHTML = '>';
				cover.style.zIndex = 10;
			}
			
		}

		//script for full screen function---------------------------------
		fullObj.onclick = function(){
			if(videoObj.requestFullScreen){
				videoObj.requestFullScreen();
			} else if(videoObj.webkitRequestFullScreen) {
				videoObj.webkitRequestFullScreen();
			} else if(videoObj.mozRequestFullScreen) {
				videoObj.mozRequestFullScreen();
			} else if(videoObj.msRequestFullScreen){
				videoObj.msRequestFullScreen();
			}
		}


		videoObj.oncanplay = function(){
			this.style.display = 'block';
			var total = videoObj.duration;
			var result = getTime(total);
			totalTime.innerHTML = result;

		}

		videoObj.ontimeupdate = function(){
			var current = videoObj.currentTime;
			var result = getTime(current);
			currentMomentTime.innerHTML = result;

			var percent = current/videoObj.duration*100+'%';
			elapsed.style.width = percent;
			var buffered = this.buffered.end(0)/videoObj.duration*100+'%';
			loaded.style.width = buffered;
		}

		videoObj.onended = function(){
			videoObj.currentTime = 0;
			switchObj.innerHTML = '>';
		}

		bar.onclick = function(e){
			var width = parseInt(getStyle(this,'width'));
			var percent = e.offsetX/width;
			var current = videoObj.duration*percent;
			videoObj.currentTime = current;
		}
		
		videoObj.onclick = function(){
			if (videoObj.paused){
				videoObj.play();
				switchObj.innerHTML = '| |';
				
			} else {
				videoObj.pause();
				switchObj.innerHTML = '>';
				cover.style.zIndex = 10;
			}
		}

		cover.onclick = function(){
			videoObj.play();
			switchObj.innerHTML = '| |';
			cover.style.zIndex = -10;
		}
}

addLoadEvent(customiseVideoPlayer)