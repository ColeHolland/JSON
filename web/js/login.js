/**
 * Created by Cole on 3/28/2017.
 */


function LogOutButton()
{
    var url = "api/logout_servlet";

    $.post(url, null, function(dataFromServer)
    {
        console.log("Finished calling logout servlet.");
        console.log(dataFromServer);
        getLoginButton();
    });
}

function getLoginButton()
{
    var url = "api/get_login_servlet";

    $.post(url, null, function(dataFromServer)
    {
        console.log("Finished calling get login servlet.");
        console.log(dataFromServer);
        $("#getLoginResult").html(dataFromServer);
        if (dataFromServer.trim() !== "You are logged in as null.")
        {
            $("#hideMessage").show();
            $("#getLoginResult").html(dataFromServer).show();
        }

        else
        {
            $("#hideMessage").hide(500);
            $("#getLoginResult").html(dataFromServer).hide(500);
        }
    });
}

function setLoginButton()
{
    var url = "api/login_servlet";

    var loginID = $("#loginID").val();

    var dataToServer = {loginID : loginID};

    $.post(url, dataToServer, function (dataFromServer)
    {
        console.log("Finished calling login servlet.");
        console.log(dataFromServer);
        $("#loginID").val("");
    });

    getLoginButton();
}

button = $("#Login");
button.on("click", setLoginButton);

button = $("#LogOut");
button.on("click", LogOutButton);

getLoginButton();