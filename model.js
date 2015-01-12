
function attachClickEvent(playerUp) {
	var cell;
	var i = 0;
	var image;
	var cls;
	var color;

	for(i = 0; i < 64; i++) {
		cell = document.getElementById("col-" + i);
		cell.addEventListener("click", function(){ updateBox(this); });
		if (cell && cell.innerHTML != "") {
			image = cell.children[0];
			color = image.className.split(' ')[1];
			cls = image.className.split(' ')[0];
			//color = getColor(cell);
			// dd = function hl(m, classi) {
			// 	highlight(m, classi);
			// }

			if(color == "w" && playerUp == "white") {
				cell.addEventListener("click", highlight);
			}
			else if(color == "b" && playerUp == "black") {
				cell.addEventListener("click", highlight);
			}
		}
		//cell.addEventListener("click", function(){ updateBox(this); });		
	}
}

function getColor(givenCell) {
	var theClr;
	var innerImage;
	var insideImage = givenCell.getElementsByTagName("img");
	if(givenCell && givenCell.innerHTML != ""/* && givenCell.innerHTML > 1*/) {
		//innerImage = givenCell.children[0];
		innerImage = insideImage[0];
		theClr = innerImage.className.split(' ')[1];
	}
	return theClr;//returns b or w
}

function getPieceType(anotherCell) {
	var givenType;
	var innerImage1;
	var img = anotherCell.getElementsByTagName("img");
	if(anotherCell && anotherCell.innerHTML != "") {
		//innerImage1 = anotherCell.children[0];
		innerImage1 = img[0];
		givenType = innerImage1.className.split(' ')[0];
		return givenType;//ie "pawn"
	}
	else {
		return "";
	}
}

function highlight() {
	var aCell = this;
	var color = aCell.className.split(' ')[1];
	var selected = aCell.className.split(' ')[2];
	var isSame = document.getElementsByClassName("highlighted");
	var pieceType = getPieceType(aCell);
	var bg;
	if(selected == "highlighted") {//same table
		if(color == "dark") {
			bg = "#4a299f";
			aCell.style.background = bg;
			aCell.className = "box " + color;
			removeHighlight(aCell);
		}
		else {
			bg = "#a1a1a1";
			aCell.style.background = bg;
			aCell.className = "box " + color;
			removeHighlight(aCell);
		}
	}
	else if(isSame.length < 1) {
		aCell.className = "box " + color + " highlighted";
		aCell.style.background = "#d3d3d3";
		pieceType = getPieceType(aCell);
		showMoves(aCell, pieceType);

		//showMoves using piecetype
		//add event listeners to all possible moves function is called move
	}
}

function showMoves(crtSpot, thePiece) {
	var theId;
	var cellNum;
	theId = crtSpot.id;
	var fine;
	cellNum = theId.substring(4, 6);
	switch(thePiece) {
    case "pawn":
        showPawnMoves(crtSpot, thePiece, cellNum);
        break;
    case "knight":
        showKnightMoves(crtSpot, thePiece, cellNum);
        break;
    case "bishop":
        showBishopMoves(crtSpot, thePiece, cellNum);
        break;
    case "rook":
        showRookMoves(crtSpot, thePiece, cellNum);
        break;
    case "queen":
        showQueenMoves(crtSpot, thePiece, cellNum);
        break;
    case "king":
    	showKingMoves(crtSpot, thePiece, cellNum);
        break;
    default:
    	//alert("The switch had an error!");
	}
}

function showPawnMoves(pSpot, pPiece, pNum) {
	var front1;
	var front;
	var front2;
	var cellAgain;
	var possibleMoves = [];
	var square = "";
	var i = 0;
	var side;
	var diag;
	var theCount = 0;
	var pawnColor = "";

	var currentTurn = getTurn();
	pawnColor = getColor(pSpot);

	if(pawnColor == "b" && currentTurn == "black") {
		//calculate spaces directly in front of pawn
		front = parseFloat(pNum) + 8;
		cellAgain = "col-" + front;
		square = checkSquare(cellAgain);

		if(square == "" && pNum < 56) {
			possibleMoves[i] = front;
			i++;
			if(pNum < 16) {
				front += 8;
				cellAgain = "col-" + front;
				square = checkSquare(cellAgain);
				if(square == "") {
					possibleMoves[i] = front;
					i++;
				}
			}
		}
		//check diagonals
		side = isEdge(pNum);
		if(side != false) {
			if(side == "left") {
				diag = 9;
			}
			else if(side == "right") {
				diag = 7;
			}
			front = parseFloat(pNum) + diag;
			cellAgain = "col-" + front;
			square = "";
			square = checkSquare(cellAgain);
			if(square == "w") {
				possibleMoves[i] = front;
				i++;
			}
		}
		else {
			diag = 7;
			while(theCount < 2) {
				front = parseFloat(pNum) + diag;
				
				cellAgain = "col-" + front;
				square = "";
				square = checkSquare(cellAgain);
				if(square == "w") {
					possibleMoves[i] = front;
					i++;
				}
				diag += 2;
				theCount++;
			}
		}
	}//end if "b"

	else if(pawnColor == "w" && currentTurn == "white") {
		//calculate spaces directly in front of pawn
		front = parseFloat(pNum) - 8;
		cellAgain = "col-" + front;
		square = checkSquare(cellAgain);
		if(square == "" && pNum > 7) {
			possibleMoves[i] = front;
			i++;
			if(pNum > 47) {
				front -= 8;
				cellAgain = "col-" + front;
				square = checkSquare(cellAgain);
				if(square == "") {
					possibleMoves[i] = front;
					i++;
				}
			}
		}
		//check diagonals
		side = isEdge(pNum);
		if(side != false) {
			if(side == "left") {
				diag = 7;
			}
			else if(side == "right") {
				diag = 9;
			}
			front = parseFloat(pNum) - diag;
			cellAgain = "col-" + front;
			square = "";
			square = checkSquare(cellAgain);
			if(square != "w" && square != "") {
				possibleMoves[i] = front;
				i++;
			}
		}
		else {
			diag = 7;
			while(theCount < 2) {
				front = parseFloat(pNum) - diag;
				cellAgain = "col-" + front;
				square = "";
				square = checkSquare(cellAgain);
				if(square != "w" && square != "") {
					possibleMoves[i] = front;
					i++;
				}
				diag += 2;
				theCount++;
			}
		}
	}
	else {
	}
	showTheMoves(possibleMoves, i, pSpot);
}

function showKnightMoves(pSpot, pPiece, pNum) {
	var possibleMoves = [];
	var i = 0;
	var square = "";
	var cellAgain = "";
	var offSet = 0;
	var count = 0;
	var num = pNum;
	var diff = 0;

	var color = getColor(pSpot);
	var currentTurn = getTurn()

	//back half
	count = num;
	while(count % 8 != 0) {
		count--
	}
	diff = num - count;
	offSet = (parseInt(count) + 8) - num - 1; 

	if(color == "b" && currentTurn == "black") {
		var place = pNum - 17;//-17
		if(place > -1 && place < 64 && diff > 0) {
			//check and save
			cellAgain = "col-" + place;
			square = checkSquare(cellAgain);
			if(square == "" || square == "w") {
				possibleMoves[i] = place;
				i++;
			}
		}
		place = parseInt(place) + 2;//-15
		if(place > -1 && place < 64 && offSet > 0) {
			//check and save
			cellAgain = "col-" + place;
			square = checkSquare(cellAgain);
			if(square == "" || square == "w") {
				possibleMoves[i] = place;
				i++;
			}
		}
		place = parseInt(place) + 5;//-10
		if(place > -1 && place < 64 && diff > 1) {
			//check and save
			cellAgain = "col-" + place;
			square = checkSquare(cellAgain);
			if(square == "" || square == "w") {
				possibleMoves[i] = place;
				i++;
			}
		}
		place = parseInt(place) + 4;//-6
		if(place > -1 && place < 64 && offSet > 1) {
			//check and save
			cellAgain = "col-" + place;
			square = checkSquare(cellAgain);
			if(square == "" || square == "w") {
				possibleMoves[i] = place;
				i++;
			}
		}

		//************   front half   ***********
		place = parseInt(pNum) + 6;//+6
		if(place > -1 && place < 64 && diff > 1) {
			//check and save
			cellAgain = "col-" + place;
			square = checkSquare(cellAgain);
			if(square == "" || square == "w") {
				possibleMoves[i] = place;
				i++;
			}
		}
		place = parseInt(place) + 4;//+10
		if(place > -1 && place < 64 && offSet > 1) {
			//check and save
			cellAgain = "col-" + place;
			square = checkSquare(cellAgain);
			if(square == "" || square == "w") {
				possibleMoves[i] = place;
				i++;
			}
		}
		place = parseInt(place) + 5;//+15
		if(place > -1 && place < 64 && diff > 0) {
			//check and save
			cellAgain = "col-" + place;
			square = checkSquare(cellAgain);
			if(square == "" || square == "w") {
				possibleMoves[i] = place;
				i++;
			}
		}
		place = parseInt(place) + 2;//+17
		if(place > -1 && place < 64 && offSet > 0) {
			//check and save
			cellAgain = "col-" + place;
			square = checkSquare(cellAgain);
			if(square == "" || square == "w") {
				possibleMoves[i] = place;
				i++;
			}
		}
	}

	/********************* white Knight *********************** */
	else if(color == "w" && currentTurn == "white") {
		var place = pNum - 17;//-17
		if(place > -1 && place < 64 && diff > 0) {
			//check and save
			cellAgain = "col-" + place;
			square = checkSquare(cellAgain);
			if(square == "" || square == "b") {
				possibleMoves[i] = place;
				i++;
			}
		}
		place = parseInt(place) + 2;//-15
		if(place > -1 && place < 64 && offSet > 0) {
			//check and save
			cellAgain = "col-" + place;
			square = checkSquare(cellAgain);
			if(square == "" || square == "b") {
				possibleMoves[i] = place;
				i++;
			}
		}
		place = parseInt(place) + 5;//-10
		if(place > -1 && place < 64 && diff > 1) {
			//check and save
			cellAgain = "col-" + place;
			square = checkSquare(cellAgain);
			if(square == "" || square == "b") {
				possibleMoves[i] = place;
				i++;
			}
		}
		place = parseInt(place) + 4;//-6
		if(place > -1 && place < 64 && offSet > 1) {
			//check and save
			cellAgain = "col-" + place;
			square = checkSquare(cellAgain);
			if(square == "" || square == "b") {
				possibleMoves[i] = place;
				i++;
			}
		}

		//************   front half   ***********
		place = parseInt(pNum) + 6;//+6
		if(place > -1 && place < 64 && diff > 1) {
			//check and save
			cellAgain = "col-" + place;
			square = checkSquare(cellAgain);
			if(square == "" || square == "b") {
				possibleMoves[i] = place;
				i++;
			}
		}
		place = parseInt(place) + 4;//+10
		if(place > -1 && place < 64 && offSet > 1) {
			//check and save
			cellAgain = "col-" + place;
			square = checkSquare(cellAgain);
			if(square == "" || square == "b") {
				possibleMoves[i] = place;
				i++;
			}
		}
		place = parseInt(place) + 5;//+15
		if(place > -1 && place < 64 && diff > 0) {
			//check and save
			cellAgain = "col-" + place;
			square = checkSquare(cellAgain);
			if(square == "" || square == "b") {
				possibleMoves[i] = place;
				i++;
			}
		}
		place = parseInt(place) + 2;//+17
		if(place > -1 && place < 64 && offSet > 0) {
			//check and save
			cellAgain = "col-" + place;
			square = checkSquare(cellAgain);
			if(square == "" || square == "b") {
				possibleMoves[i] = place;
				i++;
			}
		}
	}
	showTheMoves(possibleMoves, i, pSpot);
}

function showBishopMoves(pSpot, pPiece, pNum) {
	var possibleMoves = [];
	var front = 8 + parseInt(pNum);
	var num = 0;
	var space = "";
	var cellAgain = "";
	var i = 0;
	var color = getColor(pSpot);
	var currentTurn = getTurn()
	var theWay = "";
	var square = "";
	/************************ Get black moves *************************/
	if(color == "b" && currentTurn == "black") {
		//************ get high left ***************
		num = pNum;
		while((num % 8) != 0 && num < 64 && square == "") {
			num = parseInt(num) + 7;
			cellAgain = "col-" + parseInt(num);
			if(num < 64) {
				square = checkSquare(cellAgain);
			}
			else {
				square = "b";
			}
			if(square == "") {
				possibleMoves[i] = num;
				i++;
			}
			else {
				square = "b";
			}
		}
		if(num % 8 != 0 && num < 64) {
			square = "";
			cellAgain = "col-" + parseInt(num);
			square = checkSquare(cellAgain);
			if(square == "w") {
				possibleMoves[i] = num;
				i++;
			}
		}
		else if(num % 8 == 0) {
			square = "";
			cellAgain = "col-" + parseInt(num);
			square = checkSquare(cellAgain);
			if(square == "w") {
				possibleMoves[i] = num;
				i++;
			}
		}
		//****************** get low left *********************
		num = pNum;
		square = "";
		while((num % 8) != 0 && num > -1 && square == "") {
			num = num - 9;
			if(num > -1) {
				cellAgain = "col-" + parseInt(num);
				//square = "";
				square = checkSquare(cellAgain);
				if(square == "") {
					possibleMoves[i] = num;
					i++;
				}
				else {
					square = "b";
				}
			}
		}
		if(num % 8 != 0 && num > -1) {
			square = "";
			cellAgain = "col-" + parseInt(num);
			square = checkSquare(cellAgain);
			if(square == "w") {
				possibleMoves[i] = num;
				i++;
			}
		}
		else if(num % 8 == 0) {
			square = "";
			cellAgain = "col-" + parseInt(num);
			square = checkSquare(cellAgain);
			if(square == "w") {
				possibleMoves[i] = num;
				i++;
			}
		}
		//****************** get low right *********************
		num = pNum;
		square = "";
		if(pNum % 8 != 0) {
			while((num % 8) != 0 && num > -1 && square == "") {
				num = num - 7;
				cellAgain = "col-" + parseInt(num);
				//square = "";
				if(num > -1) {
					square = checkSquare(cellAgain);
				}
				if(square == "" && num > -1 && (num % 8) != 0) {
					possibleMoves[i] = num;
					i++;
				}
				else {
					square = "b";
				}
			}
		
			if(/*num % 8 != 0 &&*/ num > -1) {
				square = "";
				cellAgain = "col-" + parseInt(num);
				square = checkSquare(cellAgain);
				if(square == "w" && (num % 8) != 0) {
					possibleMoves[i] = num;
					i++;
				}
			}
		}
		else if(pNum % 8 == 0) {
			while(num > -1 && square == "") {
				num = num - 7;
				cellAgain = "col-" + parseInt(num);
				//square = "";
				if(num > -1) {
					square = checkSquare(cellAgain);
				}
				if(square == "" && num > -1 && (num % 8) != 0) {
					possibleMoves[i] = num;
					i++;
				}
				else {
					square = "b";
				}
			}
		
			if(/*num % 8 != 0 &&*/ num > -1) {
				square = "";
				cellAgain = "col-" + parseInt(num);
				square = checkSquare(cellAgain);
				if(square == "w" && (num % 8) != 0) {
					possibleMoves[i] = num;
					i++;
				}
			}
		}
		//****************** get high right *********************
		num = pNum;
		square = "";
		if(pNum % 8 != 0) {
			while((num % 8) != 0 && num < 64 && square == "") {
				num = parseInt(num) + 9;
				cellAgain = "col-" + parseInt(num);
				if(num < 64) {
					square = checkSquare(cellAgain);
				}
				else {
					square = "b";
				}
				if(square == "" && (num % 8) != 0) {
					possibleMoves[i] = num;
					i++;
				}
				else {
					square = "b";
				}
			}
			if(num % 8 != 0 && num < 64) {
				square = "";
				cellAgain = "col-" + parseInt(num);
				square = checkSquare(cellAgain);
				if(square == "w") {
					possibleMoves[i] = num;
					i++;
				}
			}
		}
		else if(pNum % 8 == 0) {
			while(num < 64 && square == "") {
				num = parseInt(num) + 9;
				cellAgain = "col-" + parseInt(num);
				if(num < 64) {
					square = checkSquare(cellAgain);
				}
				else {
					square = "b";
				}
				if(square == "") {
					possibleMoves[i] = num;
					i++;
				}
				else {
					square = "b";
				}
			}
			if(num % 8 != 0 && num < 64) {
				square = "";
				cellAgain = "col-" + parseInt(num);
				square = checkSquare(cellAgain);
				if(square == "w") {
					possibleMoves[i] = num;
					i++;
				}
			}
		}
	}
/********************get white bishop moves ************************/
	if(color == "w" && currentTurn == "white") {
		//************ get high left ***************
		num = pNum;
		while((num % 8) != 0 && num < 64 && square == "") {
			num = parseInt(num) + 7;
			cellAgain = "col-" + parseInt(num);
			if(num < 64) {
				square = checkSquare(cellAgain);
			}
			else {
				square = "w";
			}
			if(square == "") {
				possibleMoves[i] = num;
				i++;
			}
			else {
				square = "w";
			}
		}
		if(num % 8 != 0 && num < 64) {
			square = "";
			cellAgain = "col-" + parseInt(num);
			square = checkSquare(cellAgain);
			if(square == "b") {
				possibleMoves[i] = num;
				i++;
			}
		}
		else if(num % 8 == 0) {
			square = "";
			cellAgain = "col-" + parseInt(num);
			square = checkSquare(cellAgain);
			if(square == "b") {
				possibleMoves[i] = num;
				i++;
			}
		}
		//****************** get low left *********************
		num = pNum;
		square = "";
		while((num % 8) != 0 && num > -1 && square == "") {
			num = num - 9;
			if(num > -1) {
				cellAgain = "col-" + parseInt(num);
				//square = "";
				square = checkSquare(cellAgain);
				if(square == "") {
					possibleMoves[i] = num;
					i++;
				}
				else {
					square = "w";
				}
			}
		}
		if(num % 8 != 0 && num > -1) {
			square = "";
			cellAgain = "col-" + parseInt(num);
			square = checkSquare(cellAgain);
			if(square == "b") {
				possibleMoves[i] = num;
				i++;
			}
		}
		else if(num % 8 == 0 && num > -1) {
			square = "";
			cellAgain = "col-" + parseInt(num);
			square = checkSquare(cellAgain);
			if(square == "b") {
				possibleMoves[i] = num;
				i++;
			}
		}
		//****************** get low right *********************
		num = pNum;
		square = "";
		if(pNum % 8 != 0) {
			while((num % 8) != 0 && num > -1 && square == "") {
				num = num - 7;
				cellAgain = "col-" + parseInt(num);
				//square = "";
				if(num > -1) {
					square = checkSquare(cellAgain);
				}
				if(square == "" && num > -1 && (num % 8) != 0) {
					possibleMoves[i] = num;
					i++;
				}
				else {
					square = "w";
				}
			}
		
			if(/*num % 8 != 0 &&*/ num > -1) {
				square = "";
				cellAgain = "col-" + parseInt(num);
				square = checkSquare(cellAgain);
				if(square == "b" && (num % 8) != 0) {
					possibleMoves[i] = num;
					i++;
				}
			}
		}
		else if(pNum % 8 == 0) {
			while(num > -1 && square == "") {
				num = num - 7;
				cellAgain = "col-" + parseInt(num);
				//square = "";
				if(num > -1) {
					square = checkSquare(cellAgain);
				}
				if(square == "" && num > -1 && (num % 8) != 0) {
					possibleMoves[i] = num;
					i++;
				}
				else {
					square = "w";
				}
			}
		
			if(/*num % 8 != 0 &&*/ num > -1) {
				square = "";
				cellAgain = "col-" + parseInt(num);
				square = checkSquare(cellAgain);
				if(square == "b" && (num % 8) != 0) {
					possibleMoves[i] = num;
					i++;
				}
			}
		}
		
		//****************** get high right *********************
		num = pNum;
		square = "";
		if(pNum % 8 != 0) {
			while((num % 8) != 0 && num < 64 && square == "") {
				num = parseInt(num) + 9;
				cellAgain = "col-" + parseInt(num);
				if(num < 64) {
					square = checkSquare(cellAgain);
				}
				else {
					square = "w";
				}
				if(square == "" && (num % 8) != 0) {
					possibleMoves[i] = num;
					i++;
				}
				else {
					square = "w";
				}
			}
			if(num % 8 != 0 && num < 64) {
				square = "";
				cellAgain = "col-" + parseInt(num);
				square = checkSquare(cellAgain);
				if(square == "b") {
					possibleMoves[i] = num;
					i++;
				}
			}
		}
		else if(pNum % 8 == 0) {
			while(num < 64 && square == "") {
				num = parseInt(num) + 9;
				cellAgain = "col-" + parseInt(num);
				if(num < 64) {
					square = checkSquare(cellAgain);
				}
				else {
					square = "w";
				}
				if(square == "" && (num % 8) != 0) {
					possibleMoves[i] = num;
					i++;
				}
				else {
					square = "w";
				}
			}
			if(num % 8 != 0 && num < 64) {
				square = "";
				cellAgain = "col-" + parseInt(num);
				square = checkSquare(cellAgain);
				if(square == "b") {
					possibleMoves[i] = num;
					i++;
				}
			}
		}
	}

	showTheMoves(possibleMoves, i, pSpot);
}

function showRookMoves(pSpot, pPiece, pNum) {
	var possibleMoves = [];
	var front = 8 + parseInt(pNum);
	var space = "";
	var cellAgain;
	var i = 0;
	var color = getColor(pSpot);
	var currentTurn = getTurn()
	var theWay;
	//Get the moves for black rooks
	if(color == "b" && currentTurn == "black") {
		if(pNum < 56) {
			while(space == "" && front < 64) {
				cellAgain = "col-" + front;
				square = "";
				square = checkSquare(cellAgain);
				if(square == "") {
					possibleMoves[i] = front;
					i++;
				}
				else {
					space = "b";
				}
				front = parseFloat(front) + 8;
			}
			if(front < 72) {
				front = front - 8;
				cellAgain = "col-" + front;
				theWay = checkSquare(cellAgain);
				if(theWay == "w") {
					possibleMoves[i] = front;
					i++;
				}
			}
		}
		//get moves for going backward
		space = "";
		front = parseInt(pNum) - 8;

		if(front > -1) { 
			while(space == "" && front > -1) {
				cellAgain = "col-" + front;
				square = "";
				square = checkSquare(cellAgain);
				if(square == ""  && front > -1) {
					possibleMoves[i] = front;
					i++;
				}
				else {
					space = "b";
				}
				front = parseFloat(front) - 8;
			}
		}
		//if(front > -1) {
		front = front + 8;
		cellAgain = "col-" + front;
		theWay = checkSquare(cellAgain);
		if(theWay == "w") {
			possibleMoves[i] = front;
			i++;
		}
		//}
		//get moves from side to side.
		//Get left options
		var divisible = pNum;
		while(divisible % 8 != 0) {
			divisible--;
		}
		var count = pNum - 1;
		var side = 0;
		var isEmpty = "";
		cellAgain = "";
		while(isEmpty == "" && count > divisible - 1) {
			cellAgain = "col-" + count;
			isEmpty = checkSquare(cellAgain);
			if(isEmpty == "" && count > divisible - 2) {
				possibleMoves[i] = count;
				i++;
			}
			else {
				isEmpty = "b";
			}
			count--;
		}
		if(count > divisible - 2) {
			isEmpty = "";
			count += 1;
			side = "col-" + (count);
			isEmpty = checkSquare(side);
			if(isEmpty == "w") {
				possibleMoves[i] = count;
				i++;
			}
		}
		//get right options
		var farRight = 8 + parseFloat(divisible);
		isEmpty = "";
		count = 1 + parseInt(pNum);
		while(isEmpty == "" && farRight > count) {
			cellAgain = "col-" + count;
			isEmpty = checkSquare(cellAgain);
			if(isEmpty == "" && farRight > count) {
				possibleMoves[i] = count;
				i++;
			}
			else {
				isEmpty = "b";
			}
			count++;
		}
		count--;
		if(count < farRight) {
			cellAgain = "col-" + count;
			isEmpty = checkSquare(cellAgain);
			if(isEmpty == "w") {
				possibleMoves[i] = count;
				i++;
			} 
		}
	}
	/************* Get white rook moves *************/
	if(color == "w" && currentTurn == "white") {
		if(pNum < 56) {
			while(space == "" && front < 64) {
				cellAgain = "col-" + front;
				square = "";
				square = checkSquare(cellAgain);
				if(square == "") {
					possibleMoves[i] = front;
					i++;
				}
				else {
					space = "w";
				}
				front = parseFloat(front) + 8;
			}
			if(front < 72) {
				front = front - 8;
				cellAgain = "col-" + front;
				theWay = checkSquare(cellAgain);
				if(theWay == "b") {
					possibleMoves[i] = front;
					i++;
				}
			}
		}
		//get moves for going backward
		space = "";
		front = parseInt(pNum) - 8;

		if(front > -1) { 
			while(space == "" && front > -1) {
				cellAgain = "col-" + front;
				square = "";
				square = checkSquare(cellAgain);
				if(square == ""  && front > -1) {
					possibleMoves[i] = front;
					i++;
				}
				else {
					space = "w";
				}
				front = parseFloat(front) - 8;
			}
		}
		//if(front > -1) {
		front = front + 8;
		cellAgain = "col-" + front;
		theWay = checkSquare(cellAgain);
		if(theWay == "b") {
			possibleMoves[i] = front;
			i++;
		}
		//}

		//get moves from side to side.
		//Get left options
		var divisible = pNum;
		while(divisible % 8 != 0) {
			divisible--;
		}
		var count = pNum - 1;
		var side = 0;
		var isEmpty = "";
		cellAgain = "";
		while(isEmpty == "" && count > divisible - 1) {
			cellAgain = "col-" + count;
			isEmpty = checkSquare(cellAgain);
			if(isEmpty == "" && count > divisible - 2) {
				possibleMoves[i] = count;
				i++;
			}
			else {
				isEmpty = "w";
			}
			count--;
		}
		if(count > divisible - 2) {
			isEmpty = "";
			count += 1;
			side = "col-" + (count);
			isEmpty = checkSquare(side);
			if(isEmpty == "b") {
				possibleMoves[i] = count;
				i++;
			}
		}
		//get right options
		var farRight = 8 + parseFloat(divisible);
		isEmpty = "";
		count = 1 + parseInt(pNum);
		while(isEmpty == "" && farRight > count) {
			cellAgain = "col-" + count;
			isEmpty = checkSquare(cellAgain);
			if(isEmpty == "" && farRight > count) {
				possibleMoves[i] = count;
				i++;
			}
			else {
				isEmpty = "w";
			}
			count++;
		}
		count--;
		if(count < farRight) {
			cellAgain = "col-" + count;
			isEmpty = checkSquare(cellAgain);
			if(isEmpty == "b") {
				possibleMoves[i] = count;
				i++;
			}
		}
	}
	showTheMoves(possibleMoves, i, pSpot);
}

function showQueenMoves(pSpot, pPiece, pNum) {
		
	var possibleMoves = [];
	var front = 8 + parseInt(pNum);
	var space = "";
	var cellAgain;
	var i = 0;
	var color = getColor(pSpot);
	var currentTurn = getTurn()
	var theWay;
	if(color == "b" && currentTurn == "black") {
		if(pNum < 56) {
			while(space == "" && front < 64) {
				cellAgain = "col-" + front;
				square = "";
				square = checkSquare(cellAgain);
				if(square == "") {
					possibleMoves[i] = front;
					i++;
				}
				else {
					space = "b";
				}
				front = parseFloat(front) + 8;
			}
			if(front < 72) {
				front = front - 8;
				cellAgain = "col-" + front;
				theWay = checkSquare(cellAgain);
				if(theWay == "w") {
					possibleMoves[i] = front;
					i++;
				}
			}
		}
		//get moves for going backward
		space = "";
		front = parseInt(pNum) - 8;

		if(front > -1) { 
			while(space == "" && front > -1) {
				cellAgain = "col-" + front;
				square = "";
				square = checkSquare(cellAgain);
				if(square == ""  && front > -1) {
					possibleMoves[i] = front;
					i++;
				}
				else {
					space = "b";
				}
				front = parseFloat(front) - 8;
			}
		}
		//if(front > -1) {
		front = front + 8;
		cellAgain = "col-" + front;
		theWay = checkSquare(cellAgain);
		if(theWay == "w") {
			possibleMoves[i] = front;
			i++;
		}

		var divisible = pNum;
		while(divisible % 8 != 0) {
			divisible--;
		}
		var count = pNum - 1;
		var side = 0;
		var isEmpty = "";
		cellAgain = "";
		while(isEmpty == "" && count > divisible - 1) {
			cellAgain = "col-" + count;
			isEmpty = checkSquare(cellAgain);
			if(isEmpty == "" && count > divisible - 2) {
				possibleMoves[i] = count;
				i++;
			}
			else {
				isEmpty = "b";
			}
			count--;
		}
		if(count > divisible - 2) {
			isEmpty = "";
			count += 1;
			side = "col-" + (count);
			isEmpty = checkSquare(side);
			if(isEmpty == "w") {
				possibleMoves[i] = count;
				i++;
			}
		}
		//get right options
		var farRight = 8 + parseFloat(divisible);
		isEmpty = "";
		count = 1 + parseInt(pNum);
		while(isEmpty == "" && farRight > count) {
			cellAgain = "col-" + count;
			isEmpty = checkSquare(cellAgain);
			if(isEmpty == "" && farRight > count) {
				possibleMoves[i] = count;
				i++;
			}
			else {
				isEmpty = "b";
			}
			count++;
		}
		count--;
		if(count < farRight) {
			cellAgain = "col-" + count;
			isEmpty = checkSquare(cellAgain);
			if(isEmpty == "w") {
				possibleMoves[i] = count;
				i++;
			} 
		}
	}
	/************* Get white moves *************/
	if(color == "w" && currentTurn == "white") {
		if(pNum < 56) {
			while(space == "" && front < 64) {
				cellAgain = "col-" + front;
				square = "";
				square = checkSquare(cellAgain);
				if(square == "") {
					possibleMoves[i] = front;
					i++;
				}
				else {
					space = "w";
				}
				front = parseFloat(front) + 8;
			}
			if(front < 72) {
				front = front - 8;
				cellAgain = "col-" + front;
				theWay = checkSquare(cellAgain);
				if(theWay == "b") {
					possibleMoves[i] = front;
					i++;
				}
			}
		}
		//get moves for going backward
		space = "";
		front = parseInt(pNum) - 8;

		if(front > -1) { 
			while(space == "" && front > -1) {
				cellAgain = "col-" + front;
				square = "";
				square = checkSquare(cellAgain);
				if(square == ""  && front > -1) {
					possibleMoves[i] = front;
					i++;
				}
				else {
					space = "w";
				}
				front = parseFloat(front) - 8;
			}
		}
		//if(front > -1) {
		front = front + 8;
		cellAgain = "col-" + front;
		theWay = checkSquare(cellAgain);
		if(theWay == "b") {
			possibleMoves[i] = front;
			i++;
		}
		//}

		//get moves from side to side.
		//Get left options
		var divisible = pNum;
		while(divisible % 8 != 0) {
			divisible--;
		}
		var count = pNum - 1;
		var side = 0;
		var isEmpty = "";
		cellAgain = "";
		while(isEmpty == "" && count > divisible - 1) {
			cellAgain = "col-" + count;
			isEmpty = checkSquare(cellAgain);
			if(isEmpty == "" && count > divisible - 2) {
				possibleMoves[i] = count;
				i++;
			}
			else {
				isEmpty = "w";
			}
			count--;
		}
		if(count > divisible - 2) {
			isEmpty = "";
			count += 1;
			side = "col-" + (count);
			isEmpty = checkSquare(side);
			if(isEmpty == "b") {
				possibleMoves[i] = count;
				i++;
			}
		}
		//get right options
		var farRight = 8 + parseFloat(divisible);
		isEmpty = "";
		count = 1 + parseInt(pNum);
		while(isEmpty == "" && farRight > count) {
			cellAgain = "col-" + count;
			isEmpty = checkSquare(cellAgain);
			if(isEmpty == "" && farRight > count) {
				possibleMoves[i] = count;
				i++;
			}
			else {
				isEmpty = "w";
			}
			count++;
		}
		count--;
		if(count < farRight) {
			cellAgain = "col-" + count;
			isEmpty = checkSquare(cellAgain);
			if(isEmpty == "b") {
				possibleMoves[i] = count;
				i++;
			}
		}
	}

	var num = 0;
	var space = "";
	var cellAgain = "";
	var color = getColor(pSpot);
	var currentTurn = getTurn()
	var theWay = "";
	var square = "";
	
	/************************ Get diagonal black moves *************************/
	if(color == "b" && currentTurn == "black") {
		//************ get high left ***************
		num = pNum;
		while((num % 8) != 0 && num < 64 && square == "") {
			num = parseInt(num) + 7;
			cellAgain = "col-" + parseInt(num);
			if(num < 64) {
				square = checkSquare(cellAgain);
			}
			else {
				square = "b";
			}
			if(square == "") {
				possibleMoves[i] = num;
				i++;
			}
			else {
				square = "b";
			}
		}
		if(num % 8 != 0 && num < 64) {
			square = "";
			cellAgain = "col-" + parseInt(num);
			square = checkSquare(cellAgain);
			if(square == "w") {
				possibleMoves[i] = num;
				i++;
			}
		}
		else if(num % 8 == 0 && num < 64) {
			square = "";
			cellAgain = "col-" + parseInt(num);
			square = checkSquare(cellAgain);
			if(square == "w") {
				possibleMoves[i] = num;
				i++;
			}
		}
		//****************** get low left *********************
		num = pNum;
		square = "";
		while((num % 8) != 0 && num > -1 && square == "") {
			num = num - 9;
			if(num > -1) {
				cellAgain = "col-" + parseInt(num);
				//square = "";
				square = checkSquare(cellAgain);
				if(square == "") {
					possibleMoves[i] = num;
					i++;
				}
				else {
					square = "b";
				}
			}
		}
		if(num % 8 != 0 && num > -1) {
			square = "";
			cellAgain = "col-" + parseInt(num);
			square = checkSquare(cellAgain);
			if(square == "w") {
				possibleMoves[i] = num;
				i++;
			}
		}
		else if(num % 8 == 0) {
			square = "";
			cellAgain = "col-" + parseInt(num);
			square = checkSquare(cellAgain);
			if(square == "w") {
				possibleMoves[i] = num;
				i++;
			}
		}
		//****************** get low right *********************
		num = pNum;
		square = "";
		if(pNum % 8 != 0) {
			while((num % 8) != 0 && num > -1 && square == "") {
				num = num - 7;
				cellAgain = "col-" + parseInt(num);
				//square = "";
				if(num > -1) {
					square = checkSquare(cellAgain);
				}
				if(square == "" && num > -1 && (num % 8) != 0) {
					possibleMoves[i] = num;
					i++;
				}
				else {
					square = "b";
				}
			}
		
			if(/*num % 8 != 0 &&*/ num > -1) {
				square = "";
				cellAgain = "col-" + parseInt(num);
				square = checkSquare(cellAgain);
				if(square == "w" && (num % 8) != 0) {
					possibleMoves[i] = num;
					i++;
				}
			}
		}
		else if(pNum % 8 == 0) {
			while(num > -1 && square == "") {
				num = num - 7;
				cellAgain = "col-" + parseInt(num);
				//square = "";
				if(num > -1) {
					square = checkSquare(cellAgain);
				}
				if(square == "" && num > -1 && (num % 8) != 0) {
					possibleMoves[i] = num;
					i++;
				}
				else {
					square = "b";
				}
			}
		
			if(/*num % 8 != 0 &&*/ num > -1) {
				square = "";
				cellAgain = "col-" + parseInt(num);
				square = checkSquare(cellAgain);
				if(square == "w" && (num % 8) != 0) {
					possibleMoves[i] = num;
					i++;
				}
			}
		}
		//****************** get high right *********************
		num = pNum;
		square = "";
		if(pNum % 8 != 0) {
			while((num % 8) != 0 && num < 64 && square == "") {
				num = parseInt(num) + 9;
				cellAgain = "col-" + parseInt(num);
				if(num < 64) {
					square = checkSquare(cellAgain);
				}
				else {
					square = "b";
				}
				if(square == "" && (num % 8) != 0) {
					possibleMoves[i] = num;
					i++;
				}
				else {
					square = "b";
				}
			}
			if(num % 8 != 0 && num < 64) {
				square = "";
				cellAgain = "col-" + parseInt(num);
				square = checkSquare(cellAgain);
				if(square == "w") {
					possibleMoves[i] = num;
					i++;
				}
			}
		}
		else if(pNum % 8 == 0) {
			while(num < 64 && square == "") {
				num = parseInt(num) + 9;
				cellAgain = "col-" + parseInt(num);
				if(num < 64) {
					square = checkSquare(cellAgain);
				}
				else {
					square = "b";
				}
				if(square == "") {
					possibleMoves[i] = num;
					i++;
				}
				else {
					square = "b";
				}
			}
			if(num % 8 != 0 && num < 64) {
				square = "";
				cellAgain = "col-" + parseInt(num);
				square = checkSquare(cellAgain);
				if(square == "w") {
					possibleMoves[i] = num;
					i++;
				}
			}
		}
	}
/********************get white diagonal moves ************************/
	if(color == "w" && currentTurn == "white") {
		//************ get high left ***************
		num = pNum;
		while((num % 8) != 0 && num < 64 && square == "") {
			num = parseInt(num) + 7;
			cellAgain = "col-" + parseInt(num);
			if(num < 64) {
				square = checkSquare(cellAgain);
			}
			else {
				square = "w";
			}
			if(square == "") {
				possibleMoves[i] = num;
				i++;
			}
			else {
				square = "w";
			}
		}
		if(num % 8 != 0 && num < 64) {
			square = "";
			cellAgain = "col-" + parseInt(num);
			square = checkSquare(cellAgain);
			if(square == "b") {
				possibleMoves[i] = num;
				i++;
			}
		}
		else if(num % 8 == 0) {
			square = "";
			cellAgain = "col-" + parseInt(num);
			square = checkSquare(cellAgain);
			if(square == "b") {
				possibleMoves[i] = num;
				i++;
			}
		}
		//****************** get low left *********************
		num = pNum;
		square = "";
		while((num % 8) != 0 && num > -1 && square == "") {
			num = num - 9;
			if(num > -1) {
				cellAgain = "col-" + parseInt(num);
				//square = "";
				square = checkSquare(cellAgain);
				if(square == "") {
					possibleMoves[i] = num;
					i++;
				}
				else {
					square = "w";
				}
			}
		}
		if(num % 8 != 0 && num > -1) {
			square = "";
			cellAgain = "col-" + parseInt(num);
			square = checkSquare(cellAgain);
			if(square == "b") {
				possibleMoves[i] = num;
				i++;
			}
		}
		else if(num % 8 == 0 && num > -1) {
			square = "";
			cellAgain = "col-" + parseInt(num);
			square = checkSquare(cellAgain);
			if(square == "b") {
				possibleMoves[i] = num;
				i++;
			}
		}
		//****************** get low right *********************
		num = pNum;
		square = "";
		if(pNum % 8 != 0) {
			while((num % 8) != 0 && num > -1 && square == "") {
				num = num - 7;
				cellAgain = "col-" + parseInt(num);
				//square = "";
				if(num > -1) {
					square = checkSquare(cellAgain);
				}
				if(square == "" && num > -1 && (num % 8) != 0) {
					possibleMoves[i] = num;
					i++;
				}
				else {
					square = "w";
				}
			}
		
			if(/*num % 8 != 0 &&*/ num > -1) {
				square = "";
				cellAgain = "col-" + parseInt(num);
				square = checkSquare(cellAgain);
				if(square == "b" && (num % 8) != 0) {
					possibleMoves[i] = num;
					i++;
				}
			}
		}
		else if(pNum % 8 == 0) {
			while(num > -1 && square == "") {
				num = num - 7;
				cellAgain = "col-" + parseInt(num);
				//square = "";
				if(num > -1) {
					square = checkSquare(cellAgain);
				}
				if(square == "" && num > -1 && (num % 8) != 0) {
					possibleMoves[i] = num;
					i++;
				}
				else {
					square = "w";
				}
			}
		
			if(/*num % 8 != 0 &&*/ num > -1) {
				square = "";
				cellAgain = "col-" + parseInt(num);
				square = checkSquare(cellAgain);
				if(square == "b" && (num % 8) != 0) {
					possibleMoves[i] = num;
					i++;
				}
			}
		}
		
		//****************** get high right *********************
		num = pNum;
		square = "";
		if(pNum % 8 != 0) {
			while((num % 8) != 0 && num < 64 && square == "") {
				num = parseInt(num) + 9;
				cellAgain = "col-" + parseInt(num);
				if(num < 64) {
					square = checkSquare(cellAgain);
				}
				else {
					square = "w";
				}
				if(square == "" && (num % 8) != 0) {
					possibleMoves[i] = num;
					i++;
				}
				else {
					square = "w";
				}
			}
			if(num % 8 != 0 && num < 64) {
				square = "";
				cellAgain = "col-" + parseInt(num);
				square = checkSquare(cellAgain);
				if(square == "b") {
					possibleMoves[i] = num;
					i++;
				}
			}
		}
		else if(pNum % 8 == 0) {
			while(num < 64 && square == "") {
				num = parseInt(num) + 9;
				cellAgain = "col-" + parseInt(num);
				if(num < 64) {
					square = checkSquare(cellAgain);
				}
				else {
					square = "w";
				}
				if(square == "" && (num % 8) != 0) {
					possibleMoves[i] = num;
					i++;
				}
				else {
					square = "w";
				}
			}
			if(num % 8 != 0 && num < 64) {
				square = "";
				cellAgain = "col-" + parseInt(num);
				square = checkSquare(cellAgain);
				if(square == "b") {
					possibleMoves[i] = num;
					i++;
				}
			}
		}
	}
	showTheMoves(possibleMoves, i, pSpot);
}

function showKingMoves(pSpot, pPiece, pNum) {
	var possibleMoves = [];
	var i = 0;
	var side = isEdge(pNum);
	var low = 0;
	var high = 0;
	var lowFront = pNum - 8;
	var highFront = parseInt(pNum) + 8;
	var square = "";
	var cellAgain = "";
	var color = getColor(pSpot);
	var currentTurn = getTurn()
	var proxim = 0;
	//Get the moves for black king
	if(color == "b" && currentTurn == "black") {
		if(lowFront > -1) {
			//check and save
			cellAgain = "col-" + parseInt(lowFront);
			square = checkSquare(cellAgain);
			if(square != "b") {
				possibleMoves[i] = lowFront;
				i++;
			}
		}
		if(highFront < 64) {
			//check and save
			cellAgain = "col-" + parseInt(highFront);
			square = checkSquare(cellAgain);
			if(square != "b") {
				possibleMoves[i] = highFront;
				i++;
			}
		}
		if(side != "right") {
			low = parseInt(lowFront) + 1;
			if(low > -1) {
				//check and save
				cellAgain = "col-" + parseInt(low);
				square = checkSquare(cellAgain);
				if(square != "b") {
					possibleMoves[i] = low;
					i++;
				}
			}
			high = parseInt(highFront) + 1;
			if(high < 64) {
				//check and save
				cellAgain = "col-" + parseInt(high);
				square = checkSquare(cellAgain);
				if(square != "b") {
					possibleMoves[i] = high;
					i++;
				}
			}
			proxim = parseInt(pNum) + 1;
			if(proxim < 64 && proxim > -1) {
				//check and save
				cellAgain = "col-" + parseInt(proxim);
				square = checkSquare(cellAgain);
				if(square != "b") {
					possibleMoves[i] = proxim;
					i++;
				}
			}
		}
		if(side != "left") {
			low = lowFront - 1;
			if(low > -1) {
				//check and save
				cellAgain = "col-" + parseInt(low);
				square = checkSquare(cellAgain);
				if(square != "b") {
					possibleMoves[i] = low;
					i++;
				}
			}
			high = highFront - 1;
			if(high < 64) {
				//check and save
				cellAgain = "col-" + parseInt(high);
				square = checkSquare(cellAgain);
				if(square != "b") {
					possibleMoves[i] = high;
					i++;
				}
			}
			proxim = pNum - 1;
			if(proxim < 64 && proxim > -1) {
				//check and save
				cellAgain = "col-" + parseInt(proxim);
				square = checkSquare(cellAgain);
				if(square != "b") {
					possibleMoves[i] = proxim;
					i++;
				}
			}
		}
	}
	if(color == "w" && currentTurn == "white") {
		if(lowFront > -1) {
			//check and save
			cellAgain = "col-" + parseInt(lowFront);
			square = checkSquare(cellAgain);
			if(square != "w") {
				possibleMoves[i] = lowFront;
				i++;
			}
		}
		if(highFront < 64) {
			//check and save
			cellAgain = "col-" + parseInt(highFront);
			square = checkSquare(cellAgain);
			if(square != "w") {
				possibleMoves[i] = highFront;
				i++;
			}
		}
		if(side != "right") {
			low = parseInt(lowFront) + 1;
			if(low > -1) {
				//check and save
				cellAgain = "col-" + parseInt(low);
				square = checkSquare(cellAgain);
				if(square != "w") {
					possibleMoves[i] = low;
					i++;
				}
			}
			high = parseInt(highFront) + 1;
			if(high < 64) {
				//check and save
				cellAgain = "col-" + parseInt(high);
				square = checkSquare(cellAgain);
				if(square != "w") {
					possibleMoves[i] = high;
					i++;
				}
			}
			proxim = parseInt(pNum) + 1;
			if(proxim < 64 && proxim > -1) {
				//check and save
				cellAgain = "col-" + parseInt(proxim);
				square = checkSquare(cellAgain);
				if(square != "w") {
					possibleMoves[i] = proxim;
					i++;
				}
			}
		}
		if(side != "left") {
			low = lowFront - 1;
			if(low > -1) {
				//check and save
				cellAgain = "col-" + parseInt(low);
				square = checkSquare(cellAgain);
				if(square != "w") {
					possibleMoves[i] = low;
					i++;
				}
			}
			high = highFront - 1;
			if(high < 64) {
				//check and save
				cellAgain = "col-" + parseInt(high);
				square = checkSquare(cellAgain);
				if(square != "w") {
					possibleMoves[i] = high;
					i++;
				}
			}
			proxim = pNum - 1;
			if(proxim < 64 && proxim > -1) {
				//check and save
				cellAgain = "col-" + parseInt(proxim);
				square = checkSquare(cellAgain);
				if(square != "w") {
					possibleMoves[i] = proxim;
					i++;
				}
			}
		}
	}
	showTheMoves(possibleMoves, i, pSpot);
}

function showTheMoves(possibleMovesHere, assignedLength, station) {
	var i = 0;
	var createID;
	var tc;
	var from = station;
	Gsolution = [];
	theMoves = [];
	theMoves[0] = assignedLength;

	for(i = 1; i < assignedLength + 1; i++) {
		theMoves[i] = possibleMovesHere[i - 1];
	}

	for(i = 0; i < assignedLength; i++) {
		createID = "col-"+ possibleMovesHere[i];
		tc = document.getElementById(createID);
		tc.style.background = "#f0e947";
		tc.addEventListener("click", move);
		//add event listener for moving piece
	}
	Gsolution[0] = station;
	Gsolution[1] = possibleMovesHere;
	Gsolution[2] = assignedLength;
}

function move() { //going, from, pm, len) {
	var going = this;
	var from = Gsolution[0];
	var pm = Gsolution[1];
	var len = Gsolution[2];

	going.innerHTML = from.innerHTML;//moved piece
	var ii = from.children[0];
	var i = 0;
	var cd;
	from.removeChild(ii); 

	from.removeEventListener("click", move);
	from.removeEventListener("click", highlight);

	if (from.removeEventListener) {
	    for(i = 0; i < len; i++) {
		cd = "col-"+ pm[i];
		mt = document.getElementById(cd);
		mt.removeEventListener("click", move);
		}
	} else if (from.detachEvent) {                   // For old browsers
	   // x.detachEvent("click", myFunction);
	   	from.detachEvent("click", move);
	    for(i = 1; i < len; i++) {
		cd = "col-"+ pm[i -1];
		mt = document.getElementById(cd);
		mt.detachEvent("click", move);
		}
	}
	removeHighlight(from);
	if(getTurn() == "white") {
		nextTurn("black");
	}
	else {
		nextTurn("white");
	}
}

function removeHighlight(hmCell) {
	var createAnID;
	var len = theMoves[0];
	var trc;
	var cr;
	var bgclr;
	for(i = 1; i < len + 1; i++) {
		createAnID = "col-"+ theMoves[i];
		trc = document.getElementById(createAnID);
		cr = trc.className.split(' ')[1];
		if(cr == "dark") {
			bgclr =  "#4a299f";
		}
		else {
			bgclr = "#a1a1a1";
		}
		trc.style.background = bgclr;
	}
	cr = hmCell.className.split(' ')[1];
	if(cr == "dark") {
		bgclr =  "#4a299f";
	}
	else {
		bgclr = "#a1a1a1";
	}
	hmCell.className = "box " + cr;
	hmCell.style.background = bgclr;
}

function isEdge(colNumber) {
	var counter = 63;
	var edgeSide;
	while(counter > 0 && counter != colNumber) {
		counter-= 8;
	}
	if(counter == colNumber) {
		edgeSide = "right";
		return edgeSide;
	}
	counter = 56;
	while(counter > 0 && counter != colNumber) {
		counter-= 8;
	}
	if(counter == colNumber) {
		edgeSide = "left";
		return edgeSide;
	}
	return false;
}

function checkSquare(checkSpot) {
	var saveColor;
	var blank = "";
	var cell = document.getElementById(checkSpot);
	if(cell.innerHTML != "") {
		saveColor = getColor(cell);
		return saveColor;
	}
	else {
		return blank;
	}
}

function setTurn(currentTurn) {
	nextPersonToGo = currentTurn;
}

function getTurn() {
	return nextPersonToGo;
}

function nextTurn(playerUp1) {
	//select all the appropriate pieces for that color
	setTurn(playerUp1);
	attachClickEvent(playerUp1);
}

function updateBox(clickedCell) {
	var pTag = document.createElement("P");
	var peace = getPieceType(clickedCell);
	var celer = getColor(clickedCell);
	if(celer == "w") {
		celer = "white";
	}
	else if(celer = "b"){
		celer="black";
	}
	else{
		celer = "";
	}
	if(peace != ""){
    	var words = document.createTextNode("You clicked on a "+ celer + " " + peace + " in cell " + clickedCell.id);
	}
	else{
		var words = document.createTextNode("You clicked on cell " + clickedCell.id);
	}

    pTag.appendChild(words);
    document.getElementById("update-box").appendChild(pTag);
}


function loadGame() {
	//erase everything first
	var all = 64;
	var cellAgain = "";
	var count = 0;
	var current = "";
	var image = "";
	var piece = "";
	var color = "";

	//image strings
	var brook = "images/brook.png";

	for(count = 0; count < all; count++) {
		cellAgain = "col-" + count;
		current = document.getElementById(cellAgain);
		current.innerHTML = "";
	}

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

    //var placeData = document.getElementById("xml-data");
    var html = "";
    var xmldoc = file.responseXML;
    var turn = "";

    // THE FOLLOWING CODE USES THE SAME XML STRUCTURE (AND A FEW OF THE
    // SAME VARIABLE NAMES) AS Example 21-7 IN JavaScript: The Definitive Guide
    // BY DAVID FLANAGAN, BUT THIS EXAMPLE IS A LOT SIMPLER.

    var xmlrows = xmldoc.getElementsByTagName("spot");
    for (var r = 0; r < xmlrows.length; r++) {
    	var xmlrow = xmlrows[r];
    	piece = xmlrow.getAttribute("piece");
    	color = xmlrow.getAttribute("color");
    	//black pieces
    	if(piece == "pawn" && color == "b") {
    		image =  "images/bpawn.png" ;
    	}
    	if(piece == "knight" && color == "b") {
    		image =  "images/bknightl.png" ;
    	}
    	if(piece == "bishop" && color == "b") {
    		image =  "images/bbishop.png" ;
    	}
    	if(piece == "rook" && color == "b") {
    		image =  "images/brook.png" ;
    	}
    	if(piece == "queen" && color == "b") {
    		image =  "images/bqueen.png" ;
    	}
    	if(piece == "king" && color == "b") {
    		image =  "images/bking.png" ;
    	}
    	//white images
    	if(piece == "pawn" && color == "w") {
    		image =  "images/wpawn.png" ;
    	}
    	if(piece == "knight" && color == "w") {
    		image =  "images/wknightl.png" ;
    	}
    	if(piece == "bishop" && color == "w") {
    		image =  "images/wbishop.png" ;
    	}
    	if(piece == "rook" && color == "w") {
    		image =  "images/wrook.png" ;
    	}
    	if(piece == "queen" && color == "w") {
    		image =  "images/wqueen.png" ;
    	}
    	if(piece == "king" && color == "w") {
    		image =  "images/wking.png" ;
    	}
    	current = "";
		var xlocation = xmlrow.getElementsByTagName("location")[0];
		var number = xlocation.firstChild.data;

		if(number == "black" || number == "white") {
			turn = number
		}
		else {
			cellAgain = "col-" + number;
			current = document.getElementById(cellAgain);
    		html = '<img class="' + piece + ' ' + color + '" src="' + image + '">';
    		current.innerHTML = html;
		}
    }
    nextTurn(turn);

    var msg = "It is currently the " + turn +  " player\'s turn.";
    alert(msg);
}