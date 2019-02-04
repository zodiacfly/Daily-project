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
		var hour = Math.floor(time/3600);
		var minute = Math.floor(time%3600/60);
		var second = Math.floor(time%60);
		hour = hour < 10 ? '0'+hour : hour;
		minute = minute < 10 ? '0'+minute : minute;
		second = second < 10 ? '0'+second : second;
		return hour+':'+minute+':'+second;
	}

		//script for play/pause----------------------------------
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
		// work out the total duration of video-----------------------
		videoObj.oncanplay = function(){
			var total = videoObj.duration;
			var result = getTime(total);
			totalTime.innerHTML = result;
		}
		//work out the current time by ontimeupdate event -----------------
		videoObj.ontimeupdate = function(){
			var current = videoObj.currentTime;
			var result = getTime(current);
			currentMomentTime.innerHTML = result;
		//work out the progress bar------------------------------------
			var percent = current/videoObj.duration*100+'%';
			elapsed.style.width = percent;
		//still have bug with buffered porgress bar, unable to fix the problem atm, will fix in the futrue!!
			var buffered = this.buffered.end(0)/videoObj.duration*100+'%';
			loaded.style.width = buffered;
		}

		videoObj.onended = function(){
			videoObj.currentTime = 0;
			switchObj.innerHTML = '>';
		}

		//use 'e.offsetX' attr to find out current place by mouse clicking--------------
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