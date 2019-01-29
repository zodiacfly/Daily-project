
function addLoadEvent(func){
	var oldLoad=window.onload;
	if (typeof window.onload != 'function'){
		window.onload = func;
	} else {
		window.onload = function(){
			oldLoad();
			func();
		}
	}
}

function checkboxSelectAll(){

	var selectAll = document.getElementById('all');
	var inner = document.getElementById('inner');
	var list = inner.getElementsByTagName('input');

	function checkboxList(){
		var flag = true;
		for (var i = 0; i < list.length; i++) {
			if(!list[i].checked){
				flag = false;
				break;
			}
		}
		selectAll.checked = flag;
	}

	for (var i = 0; i < list.length; i++) {
		list[i].onclick = checkboxList;
	}

	selectAll.onclick = function(){
		for (var i = 0; i < list.length; i++) {
			list[i].checked = this.checked;
		}
	};
	
	
}

addLoadEvent(checkboxSelectAll)