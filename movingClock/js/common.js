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

function getTimeAndRandomMovement(){
	var box = document.querySelector('#box');
			//get time---------------------------------------
			var time = new Date();
			var hour = time.getHours();
			var minute = time.getMinutes();
			var second = time.getSeconds();
			hour = hour < 10 ? '0' + hour : hour;
			minute = minute < 10 ? '0' + minute : minute;
			second = second < 10 ? '0' + second : second;
			var result = hour+':'+minute+':'+second;

			//get time element from DOM----------------------------------------------
			var myTime = document.querySelector('#my-time');

			//remove exist time before append new time------------------------------
			if(myTime){
				box.removeChild(myTime);
			}
			//append new time into box---------------------------------------------
			var h1Obj = document.createElement('h1');
			h1Obj.innerHTML = result;
			h1Obj.id = 'my-time';
			box.appendChild(h1Obj);
			
			//add random movement to the box----------------------------------------
			var moveX = parseInt(Math.random()*1000);
			var moveY = parseInt(Math.random()*500);
			box.style.left = moveX + 'px';
			box.style.top = moveY + 'px';

			setTimeout(getTimeAndRandomMovement,1000);
		}

		addLoadEvent(getTimeAndRandomMovement);
