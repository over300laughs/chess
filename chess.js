function init() {
	var rows = 8;
	var columns = 8;
	//getData();
	getNames();
	makeButton();
	generateBoard(rows, columns);
	setPieces(columns);
	nextTurn("white");
	playMusic();
}

function playMusic() {
	var music = document.getElementsByTagName("audio")[0];
	music.play();
}

function getData() {
	var dataBox = document.getElementById("dataBox");
	var depositObj = localStorage.getItem('cs2550timestamp');
	var myObj = JSON.parse(depositObj);
	var usr = myObj.userName;
	var timeStmp = myObj.timestamp;
	var newTAG = document.createElement("P");
	var notice = document.createTextNode(usr + " " + timeStmp);
    dataBox.appendChild(newTAG);
    newTAG.appendChild(notice);
}

function makeButton() {
	document.getElementById("clear-button").addEventListener("click", btn);
}

function btn() {
	var clrBtn = document.getElementById("clear-button");
	clrBtn.removeItem('cs2550timestamp');
}

function getNames() {
	var done;
	var p1;
	var p2;
	var sss;
	do {
		p1 = document.getElementById('p1p1').value;
		p2 = document.getElementById('p2p2').value;
		if(p1.length > 0 && p2.length > 0 ) {
			done = true;
		}
		else{
			return;
		}
	} while(done != true);
	sss = document.getElementsByClassName("remove");
	sss[0].style.display = "none";
	sss[1].style.display = "none";
	sss[2].style.display = "none";
	sss[3].style.display = "none";
	sss[4].style.display = "none";
	var h3Tag1 = document.createElement("H3");
	var h3Tag2 = document.createElement("H3");
	var br = document.createElement("BR");
	var full;
    var playas = document.createTextNode(p1  + " (White) ");
    
    h3Tag1.appendChild(playas);
    document.getElementById("right-box").appendChild(h3Tag1);
    playas = document.createTextNode(p2  + " (Black) ");
    h3Tag2.appendChild(playas);
    document.getElementById("right-box").appendChild(h3Tag2);
}

function generateBoard(rowSize, colSize) {
	//chess board generation
	var i, j;
	var TWO = 2;
	var color;
	var k = 0;
	var div = document.getElementById("div-handle");
	var table = document.createElement("TABLE");
	table.setAttribute("id", "chess-board");
	div.appendChild(table);
	var board = document.getElementById("chess-board");
	for(i = 0; i < rowSize; i++) {
		if(i % TWO == 0) {//even
			var color = "light";
		}
		else {//odd
			color = "dark";
		}
		var first = "row-" + i;
		var row = document.createElement("TR");
		row.setAttribute("id", first);
		board.appendChild(row);
		var currentRow = document.getElementById(first);

		for(j = 0; j < colSize; j++) {
			//do row
			var cellId = "col-" + k;
			var cell = document.createElement("TD");
			cell.setAttribute("id", cellId);
			currentRow.appendChild(cell);
			document.getElementById(cellId).className += "box" + " " + color;
			//Set new color
			if(color == "light") {
				color = "dark";
			}
			else {//is dark
				color = "light";
			}
			k++;
		}
	}
}

function setPieces(columns) {
	addPawns(columns);
	addRoyals(columns);
}

function addPawns(columns) {
	var i;
	var current;
	var cellId;
	var start = 48;//starting cell

	for(i = 0; i < columns; i++)//black pawns
	{
		current = columns + i;
		cellId = "col-" + current;
		document.getElementById(cellId).innerHTML = '<img class="pawn b" src="images/bpawn.png" />';
	}
	for(i = 0; i < columns; i++)//White pawns
	{
		cellId = "col-" + start;
		document.getElementById(cellId).innerHTML = '<img class="pawn w" src="images/wpawn.png" />';
		start++;
	}
}

function addRoyals(columns) {
	//rooks
	var pieces = [0, 7, 56, 63]
	var names = ["rook", "knight", "bishop", "queen", "king"];
	var total = 4;
	var mid = 32;
	var color;
	var HALF = 2;
	var name;

	//knights
	//bishops
	// < 8 than b
	//> 50 than w
	//kings
	//queens
	var i, j;
	for(i = 0; i < total - 1; i++)
	{
		for(j = 0; j < total; j++) {
			if(j % HALF == 0) {
				if(pieces[j] < mid) {
					color = "b";
				}
				else {
					color = "w";
				}
				concat = pieces[j] + i;
				cellId = "col-" + concat;
				if(names[i] == "knight") {

					name = "knightl";
				}
				else {
					name = names[i];
				}
				document.getElementById(cellId).innerHTML = '<img class="' + names[i] + " " + color + '" src="images/' + color + name + '.png " />';
			}
				
			else {
				if(pieces[j] < mid) {
					color = "b";
				}
				else {
					color = "w";
				}
				cellId = "col-" + (pieces[j] - i);
				if(names[i] == "knight") {
					name = "knightr";
				}
				else {
					name = names[i];
				}
				document.getElementById(cellId).innerHTML = '<img class="' + names[i] + " " + color + '" src="images/' + color + name + '.png " />';
			}
		}
	}
	corronate();
}

function corronate() {
	var place = [3, 4, 59, 60];
	var queen = "queen";
	var king = "king";
	var i;
	var total = 4;
	var HALF = 2;
	var mid = 32;
	for(i = 0; i < total; i++) {
		if(i % HALF == 0) {
			if(place[i] < mid) {
				color = "b";
			}
			else {
				color ="w";
			}
			cellId = "col-" + place[i];
			document.getElementById(cellId).innerHTML = '<img class="' + queen + " " + color + '" src="images/' + color + queen + '.png " />';
		}
		else {
			if(place[i] > mid) {
				color = "w";
			}
			else {
				color ="b";
			}
			cellId = "col-" + place[i];
			document.getElementById(cellId).innerHTML = '<img class="' + king + " " + color + '" src="images/' + color + king + '.png " />';
		}
	}
}
