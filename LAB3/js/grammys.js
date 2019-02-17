var fields

function loadFields(){
	$.ajax({
		url: "data/grammys.json",
		type: "GET",
		dataType: "json",
		success: function(data){
			let new_html= " ";
			fields = data.fields;
			for (var i = 0; i < data.fields.length; i++) {
				new_html += `<option value="${data.fields[i].field_id}">
					${data.fields[i].field}
				</option>`
			}
			$("#category_types").append(new_html);
		},
		error: function(error_msg){
			console.log(error_msg)
		}
	});
}

function loadNominees(nominees, winner_id){
	var new_html = "";
	var ifWinner = "";
	var winnerMsg = "";
	for (var i = 0; i < nominees.length; i++) {
		if(winner_id == i)
		{
			ifWinner = "winner";
			winnerMsg = `<span class="winner_msg">WINNER!</span>`
		}else{
			ifWinner="";
			winnerMsg = "";
		}
		new_html += `<li class="${ifWinner}">${nominees[i].nominee} ${winnerMsg}</li>`
		new_html += `<p>${nominees[i].artist}</p>`
		if(nominees[i].info != ""){
			new_html += `<p>${nominees[i].info}</p>`
		}
	}
	return new_html;
}

function loadCategories(categories){
	var new_html = "";
	for (var i = 0; i < categories.length; i++) {
		new_html += `<h3>${categories[i].category_name}
					</h3>
					<ul>${loadNominees(categories[i].nominees, categories[i].winner_id)}</ul>
					<hr>
					`
	}
	return new_html;
}

function loadField(field){
	var new_html = "";
	new_html += `<h2>${field.field}</h2>`;
	if(field.description != null){
		new_html += `<p class="description">
						${field.description}
					</p>`
	}
	new_html+= loadCategories(field.categories);
	$("#nominees_section").empty();
	$("#nominees_section").append(new_html);
	
}



$("#category_types").on('change', function(event){
	let id = $(this).val();
	for (var i = 0; i < fields.length; i++) {
		if(fields[i].field_id == id){
			loadField(fields[i]);
		}
	}
})
loadFields();
$("#category_types").change()