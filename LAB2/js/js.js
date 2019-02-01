function getList(){
	x = document.getElementsByName('todo');
	//x = documment.getElementsByTagName('LI');
	return x; 
}

textField = document.getElementById("newitem");
textField.addEventListener('keyup', function(e){
		if(e.keyCode == 13){
			addEvent();
		}
})

x = getList();
console.log(x);
var iCompleted = 0;

function addEvent(){
		var todo = document.getElementById('lista');
		var node = document.createElement('LI');
		var newSpan = document.createElement('SPAN');
		var newInput = document.createElement('INPUT');

		newInput.type = "checkbox";
		newInput.value = x.length;
		newInput.name = "todo";
		newSpan.textContent = textField.value;

		//todo.appendChild(node);
		insertNew(node);
		node.appendChild(newInput);
		node.appendChild(newSpan);

		agregaListener(newInput);

		textField.value = "";
}

//Agrega el evento de click a los elementos existentes
x.forEach(agregaListener);

//Agrega el evento de click a un elemento input, permite macar como hecha a una tarea y desmarcarla
function agregaListener(element){
	element.addEventListener("click", function(){
		let liParent  = this.parentElement;
		let todo = document.getElementById('lista');
		let eventSpan = liParent.getElementsByTagName("span")[0]; //Posición 0 representa el primer y unico elemento Span
		if(eventSpan.classList.length == 0)
		{	
			let tempLI = liParent;
			eventSpan.classList.add("done");			
			liParent.remove();
			todo.appendChild(tempLI);
			iCompleted++;
		}else{
			let tempLI = liParent;
			liParent.remove;
			insertNew(tempLI);
			eventSpan.classList.remove("done");
			iCompleted--;
		}
	});
}

function insertNew(element){
	let todo = document.getElementById('lista');
	todo.insertBefore(element, todo.children[x.length-iCompleted]);
}