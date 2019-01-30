
function addLoadEvent1(func){
	var oldLoad = window.onload;
	if (typeof window.onload != 'function'){
		window.onload = func;
	} else {
		window.onload = function(){
			oldLoad();
			func();
		}
	}
}

function inputOnChangeEvent(){
	var inputObj = document.querySelector('#myFile');
	inputObj.onchange = function(){
		getFileContent();
	}
	
}

function getFileContent(){
	var img = document.querySelector('#img');
	var reader = new FileReader();
	var file = document.querySelector('#myFile').files[0];
	reader.readAsDataURL(file)

	//onload event to make sure file has upload successfully and then receive result
	reader.onload = function(){
		img.src = reader.result;
	}
	
}


addLoadEvent1(inputOnChangeEvent)





