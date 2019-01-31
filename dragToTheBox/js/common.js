
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


function addDragToTheBoxEvent(){

	var boxObj = document.querySelector('#box');
	var dragObj = document.querySelector('#drag');

	document.ondragstart = function(e){
		e.target.style.opacity = 0.5;
		e.target.innerHTML = "Yeah...";
		e.dataTransfer.setData('text/html',e.target.id);

	}
	boxObj.ondragover = function(e){
		if(e.target != this){
			e.preventDefault();
		}			
	}
	document.ondragend = function(e){
		e.target.style.opacity = 1;
		e.target.innerHTML = "Darg me";
	}
	document.ondrop = function(e){
		var id = e.dataTransfer.getData('text/html');
		var targetObj = document.querySelector("#"+id);
		e.target.appendChild(targetObj)

	}

}

addLoadEvent(addDragToTheBoxEvent)
