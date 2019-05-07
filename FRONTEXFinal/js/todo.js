var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}


var todos = document.querySelectorAll("input[type=checkbox]");

function updateTodo(id, completed) {
  // revisen si completed es booleano o string
  json_to_send = {
    "completed" : completed
  };
  json_to_send = JSON.stringify(json_to_send);
  $.ajax({
      //url: 'http://localhost:3000/todos/' + id,
      url: 'https://exam-final.herokuapp.com/todos/' +id,
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'PATCH',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log("UPDATE!!")
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
}


function loadTodos() {
  $.ajax({
    //url: 'http://localhost:3000/todos',
    url: 'https://exam-final.herokuapp.com/todos',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      console.log(data)

      for( let i = 0; i < data.length; i++) {
        // aqui va su código para agregar los elementos de la lista
        console.log(data[i].description)
        // algo asi:
        addTodo(data[i]._id, data[i].description, data[i].completed)

      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

function addTodo(id, description, completed){
  var newHTML = "" 
  if(completed){
    newHTML = `
    <li><input id="${id}" type="checkbox" name="todo" value="{${id}}" checked><span class="done">${description}</span></li>
  `
    $("#finished-list").append(newHTML);
  }else{
     newHTML = `
    <li><input id="${id}" type="checkbox" name="todo" value="{${id}}"><span>${description}</span></li>
  `
    $("#unfinished-list").append(newHTML);  
  }
  agregaListener(document.getElementById(id))
}


function agregaListener(element){
  element.addEventListener("click", function(){
    let liParent  = this.parentElement;
    let notDone = document.getElementById('unfinished-list');
    let doneList = document.getElementById('finished-list');
    let eventSpan = liParent.getElementsByTagName("span")[0]; //Posición 0 representa el primer y unico elemento Span
    if(this.checked)
    { 
      let tempLI = liParent;
      eventSpan.classList.add("done");      
      liParent.remove();
      doneList.appendChild(tempLI);
    }else{

      eventSpan.classList.remove("done");
      let tempLI = liParent;
      liParent.remove;
      notDone.append(tempLI);
    }
    updateTodo(this.id,this.checked)
  });
}

loadTodos()


// o con jquery
// $('input[name=newitem]').keypress(function(event){
//     var keycode = (event.keyCode ? event.keyCode : event.which);
//     if(keycode == '13'){
//         $.ajax({})
//     }
// });

var input = document.querySelector("input[name=newitem]");

input.addEventListener('keypress', function (event) {
  if (event.charCode === 13) {
    json_to_send = {
      "description" : input.value
    };
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      //url: 'http://localhost:3000/todos',
      url: 'https://exam-final.herokuapp.com/todos',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log(data)
        addTodo(data._id,data.description,data.completed);

      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
    input.value = '';
  }
})
