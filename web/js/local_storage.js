/**
 * Created by Cole on 3/23/2017.
 */

var textContent = localStorage.getItem("localStorageKey", $("#htmlFormFieldForLocalStorage").val());

if (textContent)
{
    console.log("Initialized with saved data.");
    $("#htmlFormFieldForLocalStorage".val(textContent));
}
else console.log("No saved data.");

textContent = sessionStorage.getItem("sessionStorageKey", $("#htmlFormFieldForSessionStorage").val());

if (textContent)
{
    console.log("Initialized with saved data.");
    $("#htmlFormFieldForSessionStorage").val(textContent);
}
else console.log("No saved data.");

$("#htmlFormFieldForLocalStorage").bind("input", function(e)
{
    if (typeof(Storage)=== "undefined")
    {
        console.log("Sorry, no local storage available.");
        return;
    }
    localStorage.setItem("localStorageKey", $("#htmlFormFieldForLocalStorage").val());
});

$("#htmlFormFieldForSessionStorage").bind("input", function(e)
{
    if (typeof(Storage) === "undefined")
    {
        console.log("Sorry, no local storage available.");
        return;
    }
    sessionStorage.setItem("sessionStorageKey", $("#htmlFormFieldForSessionStorage").val());
});
