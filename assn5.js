
function attachAjax() {
	document.getElementById("login").addEventListener("click", ajaxCall);
	getGameInfo();
}

//This code has been adapted and is used courtesy of the class intructor as well as David Flanagan
function getGameInfo() {
    var file = new XMLHttpRequest();
    file.open("GET", "savedgame.xml", false);
    file.send(null);

    // THE FOLLOWING CHECK CAN BE COMMENTED OUT WHEN USED 
    // WITH A LOCAL FILE (DEPENDING ON YOUR BROWSER).  SAFARI ON A
    // MAC RETURNS A STATUS OF ZERO WHEN USING XMLHttpRequest WITH
    // A LOCAL FILE.

//Not needed because there is no server.
 //    if (request.status != 200) {
	// alert("Request failed " + request.status + ": " + request.statusText);
	// return;
 //    }

    var placeData = document.getElementById("xml-data");
    var html = "";

    var xmldoc = file.responseXML;

    // THE FOLLOWING CODE USES THE SAME XML STRUCTURE (AND A FEW OF THE
    // SAME VARIABLE NAMES) AS Example 21-7 IN JavaScript: The Definitive Guide
    // BY DAVID FLANAGAN, BUT THIS EXAMPLE IS A LOT SIMPLER.

    var xmlrows = xmldoc.getElementsByTagName("spot");

    for (var r = 0; r < xmlrows.length; r++) {
		var xmlrow = xmlrows[r];
		html += "Piece: " + xmlrow.getAttribute("piece");
		html += ", Color: " + xmlrow.getAttribute("color");

		// NOTE THAT getElementsByTagName RETURNS A LIST
		var xlocation = xmlrow.getElementsByTagName("location")[0];
		html += ", Location: " + xlocation.firstChild.data;

		html += "<br>";
    }
    placeData.innerHTML = html;
}

function ajaxCall() {
	var user = document.getElementById("username").value;	
	var password = document.getElementById("password").value;
	var fullStr = "userName=" + user + "&password=" + password;
	var ajax = new XMLHttpRequest();
	ajax.open("POST", "http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php", false);
	ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send(fullStr);
    var rText = JSON.parse(ajax.responseText);
    if(rText.result == "valid") {
    	window.location.assign("js-board.html");
		// Put the object into storage
		localStorage.setItem('cs2550timestamp', JSON.stringify(rText));
    }
    else {
    	document.getElementById("incorrect").style.display = "block";
    }

}