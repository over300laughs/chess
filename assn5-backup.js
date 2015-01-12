
/*
*******************THIS IS ONLY FOR VERSION CONTROL ********************
DO NOT GRADE!
*/

// function attachAjax() {
// 	document.getElementById("login").addEventListener("click", ajaxCall);
// }

// function ajaxCall() {
// 	var user = document.getElementById("username").value;	
// 	var password = document.getElementById("password").value;
// 	var fullStr = "userName=" + user + "&password=" + password;
// 	var ajax = new XMLHttpRequest();
// 	ajax.open("POST", "http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php", false);
// 	ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//     ajax.send(fullStr);
//     var rText = JSON.parse(ajax.responseText);
//     if(rText.result == "valid") {
//     	window.location.assign("js-board.html");
// 		// Put the object into storage

// 		localStorage.setItem('cs2550timestamp', JSON.stringify(rText));
// 		//localStorage.setItem('cs2550timestamp', 
//     }
//     else {
//     	alert("Invalid and not finished!");
//     }


// }