
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

		if(square == "") {
			possibleMoves[i] = front;
			i++;
			if(front < 55  && pNum < 16) {
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
				if(square != "b" && square != "") {
					possibleMoves[i] = front;
					i++;
				}
				diag += 2;
				theCount++;
			}
		}
	}//end if "b"

	else if("w" && currentTurn == "white") {
		//calculate spaces directly in front of pawn
		front = parseFloat(pNum) - 8;
		cellAgain = "col-" + front;
		square = checkSquare(cellAgain);
		if(square == "") {
			possibleMoves[i] = front;
			i++;
			if(front > 8) {
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
		//alert("Error on line 226");
	}
	console.log(possibleMoves);
	showTheMoves(possibleMoves, i, pSpot);