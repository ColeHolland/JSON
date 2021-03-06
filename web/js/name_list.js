// Main Javascript File

function my_callback(json_result)
{
	//$("#datatable")[0].rows[1].remove();

	for (var i = 0; i < json_result.length; i++) 
	{
		var goodPhone = json_result[i].phone.substring(0,3)
						+ '-' + json_result[i].phone.substring(3,6)
						+ '-' + json_result[i].phone.substring(6,10);

            $("#datatable").append("<tr><td>"+json_result[i].first+
            	"<td>"+json_result[i].last+"</td>"+
            	"<td>"+json_result[i].id+"</td>"+
            	"<td>"+goodPhone+"</td>"+
            	"<td>"+json_result[i].email+"</td>"+
            	"<td>"+json_result[i].birthday+"</td>" +
                "<td><button type='button' name='edit' class='editButtons btn' value='" + json_result[i].id + "'>Edit</button></td>" +
                "<td><button type='button' name='delete' class='deleteButtons btn' value='" + json_result[i].id + "'>Delete</button></td></tr>");
    }

    $('.editButtons').on("click", editItem);
    $('.deleteButtons').on("click", deleteItem);
}

function updateTable() 
{
	var url = "api/name_list_get";
	$.getJSON(url, null, my_callback);
}

updateTable();

var addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd);

function showDialogAdd()
{
	console.log("opening add item dialog");

	$('#id').val("");

	$('#firstNameDiv').removeClass("has-success");
    $('#firstNameDiv').removeClass("has-error");
	$('#firstNameGlyph').removeClass("glyphicon-ok");
    $('#firstNameGlyph').removeClass("glyphicon-remove");
	$('#firstNameStatus').val("");
    $('#firstName').val("");

    $('#lastNameDiv').removeClass("has-success");
    $('#lastNameDiv').removeClass("has-error");
    $('#lastNameGlyph').removeClass("glyphicon-ok");
    $('#lastNameGlyph').removeClass("glyphicon-remove");
    $('#lastNameStatus').val("");
	$('#lastName').val("");

    $('#phoneDiv').removeClass("has-success");
    $('#phoneDiv').removeClass("has-error");
    $('#phoneGlyph').removeClass("glyphicon-ok");
    $('#phoneGlyph').removeClass("glyphicon-remove");
    $('#phoneStatus').val("");
    $('#phone').val("");

    $('#emailDiv').removeClass("has-success");
    $('#emailDiv').removeClass("has-error");
    $('#emailGlyph').removeClass("glyphicon-ok");
    $('#emailGlyph').removeClass("glyphicon-remove");
    $('#emailStatus').val("");
    $('#email').val("");

    $('#birthdayDiv').removeClass("has-success");
    $('#birthdayDiv').removeClass("has-error");
    $('#birthdayGlyph').removeClass("glyphicon-ok");
    $('#birthdayGlyph').removeClass("glyphicon-remove");
    $('#birthdayStatus').val("");
    $('#birthday').val("");

    $('#myModal').modal('show');
}

var saveChangesButton = $('#saveChanges');
saveChangesButton.on("click", saveChanges);

function saveChanges()
{
    validate();
    console.log("Changes saved.");
    $('#myModal').modal('hide');
}

function deleteItem(e)
{
    console.debug("Delete");
    console.debug(e.target.value);
    var url = "/api/name_list_delete";
    var dataToServer = {id : e.target.value};
    console.log(dataToServer);

    $.post(
        url,
        dataToServer,
        function(dataFromServer)
        {
            $('#datatable').empty();
            updateTable();
        }
    );
}

function editItem(e)
{
    var id = e.target.value;
    var firstName = e.target.parentNode.parentNode.querySelectorAll("td")[0].innerHTML;
    var lastName = e.target.parentNode.parentNode.querySelectorAll("td")[1].innerHTML;
    var phone = e.target.parentNode.parentNode.querySelectorAll("td")[3].innerHTML;
    var email = e.target.parentNode.parentNode.querySelectorAll("td")[4].innerHTML;
    var birthday = e.target.parentNode.parentNode.querySelectorAll("td")[5].innerHTML;

    $('#id').val(id);
    $('#firstName').val(firstName);
    $('#lastName').val(lastName);
    $('#phone').val(phone);
    $('#email').val(email);
    $('#birthday').val(birthday);

    $('#firstNameDiv').removeClass("has-success");
    $('#firstNameGlyph').removeClass("glyphicon-ok");
    $('#lastNameDiv').removeClass("has-success");
    $('#lastNameGlyph').removeClass("glyphicon-ok");
    $('#phoneDiv').removeClass("has-success");
    $('#phoneGlyph').removeClass("glyphicon-ok");
    $('#emailDiv').removeClass("has-success");
    $('#emailGlyph').removeClass("glyphicon-ok");
    $('#birthdayDiv').removeClass("has-success");
    $('#birthdayGlyph').removeClass("glyphicon-ok");

    $('#myModal').modal('show');
}

function validate()
{
    var f1 = $('#firstName').val();
    var firstName = /^[A-Za-z'áéíóúüñ]{1,10}$/;

    var f2 = $('#lastName').val();
    var lastName = /^[A-Za-z'áéíóúüñ]{1,15}$/;

    var f3 = $('#phone').val();
    var phone = /^[0-9]{3}\-[0-9]{3}\-[0-9]{4}$/;

    var f4 = $('#email').val();
    var email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    var f5 = $('#birthday').val();
    var birthday = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/;

    var f6 = $('#id').val();

    var validForm = true;

    if (firstName.test(f1))
    {
        $('#firstNameDiv').removeClass("has-error");
        $('#firstNameDiv').addClass("has-success");
        $('#firstNameGlyph').removeClass("glyphicon-remove");
        $('#firstNameGlyph').addClass("glyphicon-ok");
        $('#firstNameStatus').val("(success)");
        console.log("First name good.");

    }

    else
    {
        $('#firstNameDiv').removeClass("has-success");
        $('#firstNameDiv').addClass("has-error");
        $('#firstNameGlyph').removeClass("glyphicon-ok");
        $('#firstNameGlyph').addClass("glyphicon-remove");
        $('#firstNameStatus').val("(fail)");
        console.log("First name bad");
        validForm = false;
    }

    if (lastName.test(f2))
    {
        $('#lastNameDiv').removeClass("has-error");
        $('#lastNameDiv').addClass("has-success");
        $('#lastNameGlyph').removeClass("glyphicon-remove");
        $('#lastNameGlyph').addClass("glyphicon-ok");
        $('#lastNameStatus').val("(success)");
        console.log("Last name good");
    }

    else
    {
        $('#lastNameDiv').removeClass("has-success");
        $('#lastNameDiv').addClass("has-error");
        $('#lastNameGlyph').removeClass("glyphicon-ok");
        $('#lastNameGlyph').addClass("glyphicon-remove");
        $('#lastNameStatus').val("(fail)");
        console.log("Last name bad");
        validForm = false;
    }

    if (phone.test(f3))
    {
        $('#phoneDiv').removeClass("has-error");
        $('#phoneDiv').addClass("has-success");
        $('#phoneGlyph').removeClass("glyphicon-remove");
        $('#phoneGlyph').addClass("glyphicon-ok");
        $('#phoneStatus').val("(success)");
        console.log("Phone good");
    }

    else
    {
        $('#phoneDiv').removeClass("has-success");
        $('#phoneDiv').addClass("has-error");
        $('#phoneGlyph').removeClass("glyphicon-ok");
        $('#phoneGlyph').addClass("glyphicon-remove");
        $('#phoneStatus').val("(fail)");
        console.log("Phone bad");
        validForm = false;
    }

    if (email.test(f4))
    {
        $('#emailDiv').removeClass("has-error");
        $('#emailDiv').addClass("has-success");
        $('#emailGlyph').removeClass("glyphicon-remove");
        $('#emailGlyph').addClass("glyphicon-ok");
        $('#emailStatus').val("(success");
        console.log("Email good");
    }

    else
    {
        $('#emailDiv').removeClass("has-success");
        $('#emailDiv').addClass("has-error");
        $('#emailGlyph').removeClass("glyphicon-ok");
        $('#emailGlyph').addClass("glyphicon-remove");
        $('#emailStatus').val("(fail)");
        console.log("Email bad");
        validForm = false;
    }

    if (birthday.test(f5))
    {
        $('#birthdayDiv').removeClass("has-error");
        $('#birthdayDiv').addClass("has-success");
        $('#birthdayGlyph').removeClass("glyphicon-remove");
        $('#birthdayGlyph').addClass("glyphicon-ok");
        $('#birthdayStatus').val("(success)");
        console.log("Birthdate good");
    }

    else
    {
        $('#birthdayDiv').removeClass("has-success");
        $('#birthdayDiv').addClass("has-error");
        $('#birthdayGlyph').removeClass("glyphicon-ok");
        $('#birthdayGlyph').addClass("glyphicon-remove");
        $('#birthdayStatus').val("(fail)");
        console.log("Birthdate bad");
        validForm = false;
    }

    validForm = true;

    if (validForm)
    {
        var url = "/api/name_list_edit";
        var dataToServer = { id : f6, first : f1, last : f2,
        phone : f3, email : f4, birthday : f5};

        $.post(

            url,
            dataToServer,
            function(dataFromServer)
            {
                $('#datatable').empty();
                updateTable();
            }
        );
    }

    else console.log("Not all fields are valid");
}