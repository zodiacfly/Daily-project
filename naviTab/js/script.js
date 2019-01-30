function addLoadEvent(func){
	var oldLoad = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function(){
			oldLoad();
			func();
		}
	}
}

function naviTabBar() {
	var box = document.getElementsByClassName("box")[0];
	var top1 = document.getElementsByClassName("top")[0];
	var body = document.getElementsByClassName("body")[0];
	var topList = top1.getElementsByTagName("li");
	var bodyList = body.getElementsByTagName("li");
	var num = null;

	function tabMouseOverEvent(){
		for (var j = 0; j < topList.length; j++) {
			topList[j].removeAttribute('class')
		}
		this.className = 'current-li';
		num = this.getAttribute('index');
		for (var k = 0; k < bodyList.length; k++) {
			bodyList[k].removeAttribute('class')
		}
		bodyList[num].className = 'current';
	}
	
	for (var i = 0; i < topList.length; i++) {
		topList[i].setAttribute('index',i)
		topList[i].onmouseover = tabMouseOverEvent;
	}
}

addLoadEvent(naviTabBar)