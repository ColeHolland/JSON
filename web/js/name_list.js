// Main Javascript File

function my_callback(json_result)
{
	$("#datatable")[0].rows[1].remove();
	console.log("Hi");

	for (var i = 0; i < json_result.length; i++) 
	{
            $("#datatable").append("<tr><td>"+json_result[i].first+
            	"<td>"+json_result[i].last+"</td>"+
            	"<td>"+json_result[i].id+"</td>"+
            	"<td>"+json_result[i].phone+"</td>"+
            	"<td>"+json_result[i].email+"</td>"+
            	"<td>"+json_result[i].birthday+"</td></tr");
    }

	console.log("Done");
}

function updateTable() 
{
	var url = "api/name_list_get";
	$.getJSON(url, null, my_callback);
}

updateTable();