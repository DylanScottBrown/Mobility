	//Input variable
	var FKeyPad = document.Keypad;
	//Running total variable
	var Accumulate = 0;
	//Check if there is a number
	var FlagNewNum = false;
	//Variable storage for operators
	var PendingOp = "";
	//Memory total variable
	var MemNum = 0;

// Returns the memory total variable
function MemCall () {
	FKeyPad.ReadOut.value = MemNum;
}	

//Clears the memory total variable
function MemClear () {
	MemNum = 0;
	ClearEntry();
}

//Minuses the memory total by the user input
function MemMinus (){
	MemNum = MemNum - parseFloat(FKeyPad.ReadOut.value);
	ClearEntry();
}

//Adds the user input to the memory total
function MemPlus (){
	MemNum = MemNum + parseFloat(FKeyPad.ReadOut.value);
	ClearEntry();
}

/*
	Checks if number is the first number, then inputs user numbers
	as long as the string of numbers is less than 10.
	If the length of numbers in the string is greater than or
	equal to 10, then a popup displays.
*/
function NumPressed (Num) {
	if (FlagNewNum) {
		FKeyPad.ReadOut.value  = Num;
		FlagNewNum = false;
   	}
	else {
	if (FKeyPad.ReadOut.value == "0")
		FKeyPad.ReadOut.value = Num;
	else if ((FKeyPad.ReadOut.value).length < 10){
		FKeyPad.ReadOut.value += Num;
	}
	else
		alert("Only 10 digits allowed.");
   	}
}

/* 
	On the first time through PendingOp hasnt been assigned so
	it automatically assigns the input value to accumulate.
	At the end of the method the PendingOp is assigned by
	the input operator and is ready to calculate once 
	an equal sign is used.

*/
function Operation (Op) {
	var Readout = FKeyPad.ReadOut.value;
	// Do nothing if there is no number input and an operator is pressed
	if (FlagNewNum && PendingOp != "=")
		;
	else {
		FlagNewNum = true;

		if ( '+' == PendingOp )
			Accumulate += parseFloat(Readout);
		else if ( '-' == PendingOp )
			Accumulate -= parseFloat(Readout);
		else if ( '/' == PendingOp )
			Accumulate /= parseFloat(Readout);
		else if ( '*' == PendingOp )
			Accumulate *= parseFloat(Readout);
		else
			Accumulate = parseFloat(Readout);

		if (Accumulate.length >= 10)
			Accumulate = "Err";
		else
			FKeyPad.ReadOut.value = Accumulate;
			

	
	PendingOp = Op;
   	}
}

/*
	Checks if there is no numbers, if there is no numbers
	then it changes the readout to '0.'. Otherwise it adds
	a decimal place and continues to input numbers. 
*/
function Decimal () {
	var curReadOut = FKeyPad.ReadOut.value;
	if (FlagNewNum) {
		curReadOut = "0.";
		FlagNewNum = false;
   }
	else {
	if (curReadOut.indexOf(".") == -1)
		curReadOut += ".";
   	}
	FKeyPad.ReadOut.value = curReadOut;
}

// Clears the current string of numbers displayed
function ClearEntry () {
	FKeyPad.ReadOut.value = "0";
	FlagNewNum = true;
}

//Clears the total and the pending operator and then clears the display
function Clear () {
	Accumulate = 0;
	PendingOp = "";
	ClearEntry();
}
