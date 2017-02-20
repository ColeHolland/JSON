// Main Javascript File

function my_callback(json_result)
{
	$("#datatable")[0].rows[1].remove();

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
            	"<td>"+json_result[i].birthday+"</td></tr>");
    }
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

    if (validForm)
    {
        var url = "/api/name_list_edit";
        var dataToServer = { first : f1, last : f2,
        phone : f3, email : f4, birthday : f5};
        console.log(dataToServer);

        $.ajax(
        {
            type: 'POST',
            url: url,
            data: JSON.stringify(dataToServer),
            success: function(dataFromServer) {
                console.log(dataFromServer);
                $('#datatable').remove();
                updateTable()
            },
            contentType: "application/json",
            dataType: 'text' // Could be JSON or whatever too
        });

        Dropzone.options.myDropzone =
            {
                init: function()
                {
                    this.on("success", function (file, response) {
                        console.log(response);
                    });
                }
            }
    }

    else console.log("Not all fields are valid");
}