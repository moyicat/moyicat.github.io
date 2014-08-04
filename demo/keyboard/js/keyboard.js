
/********************
Define Key Variables
*********************/

// Objects
var keyStrokeLog = Array(); // An array of keystroke objects to track a users keyboard input interaction
var mykeyboard; // The keyboard object

// Global Variable
var currentWord = "";
var shiftKey = 0;
var loading = 1;

// Modes
var masterMode = 'type';
var typeMode = 'type'; // **DEPRECATED
var moveMode = 'off'; // **DEPRECATED

// Counters
var touchCounter = 0; // Accounts for the number of fingers touching the screen at any point in time

// Constants
var keyboardOffset; // location of keyboard on screen (currently only formatted for iPads)
var configureString = 'The quick brown fox jumps over the lazy dog'; // sentence that cover all letters **DEPRECATED


/********************
Fundamental Functions
*********************/

$(document).ready(function(){
	// Start in typing mode
	// switchToTypingMode(); // ACTUALLY START IN HELP MODE

	// Make sure user is orienting tablet in landscape mode
	$(document).bind('orientationchange', function(e){
		checkOrientation();
	})
	checkOrientation();

	// Setup keyboard response calls
	$('#keyboard').bind('touchstart', function(e){
		touchStart(e.originalEvent);
	})
	$('#keyboard').bind('touchmove', function(e){
		touchMove(e.originalEvent);
	})
	$('#keyboard').bind('touchend', function(e){
		touchEnd(e.originalEvent);
	})

	$('#help').bind('touchstart', function(e){
		e.originalEvent.preventDefault();
		switchToTypingMode();
	})


	$('#saveButton').bind('touchstart', function(e){
		saveStuff();
	})
	$('#helpButton').bind('touchstart', function(e){
		$("#help").css("display","inline-block");
	})
	$('#clearButton').bind('touchstart', function(e){
		clearAll();
	})

	// window.ondevicemotion = function(event) {
	// 	if(event.acceleration == undefined && loading == 1){
	// 		alert("You are using an iPad 1");
	// 		loading = 0;
	// 	}
	// }

	// Setup mouseclick response calls...for debugging on the computer
	$('#keyboard').mousedown(function(e){
		// alert('down');
	})
	$('#keyboard').mousemove(function(e){
		// alert('move');
	})
	$('#keyboard').mouseup(function(e){
		// alert('up');
	})
})

function checkOrientation(){
	if($(window).width() < $(window).height()){
		alert('Please rotate to landscape mode');
	} else{
		keyboardOffset = $('#key').position().top - 191; // Probably a better way to get this offset, but this will work for both "in browser view" as well as "app view"
		mykeyboard = new keyboard();
	}
	canvasOBJ.height = $(window).height();
}

function clearAll(){
	// Clear all drawings
	if(masterMode == "draw"){
		canvasCTX.clearRect(0, 0, canvasOBJ.width, canvasOBJ.height);
	}
	// Clear all text
	if(masterMode == "type"){
		delete maintext;
		maintext = new text();
		maintext.newParagraph();
		currentWord = "";
		// Reset scrolling lines to 0
		$("#content")[0].style.marginTop = 0;
	}

	displayText();
}

function textScrollAdjust(up_or_down){
	if($("#content").html().split("<br>").length < 8 && up_or_down == "down"){
		return;
	}
	if($("#content").html().split("<br>").length < 7 && up_or_down == "up"){
		return;
	}
	var scrollAmt;
	if(up_or_down == "up"){
		scrollAmt = -20;
	} else if(up_or_down == "down") {
		scrollAmt = 20;
	}
	if($("#content")[0].style.marginTop == "" & up_or_down == "up"){
		$("#content")[0].style.marginTop = scrollAmt;
	}else{
		$("#content")[0].style.marginTop = (parseInt($("#content")[0].style.marginTop.replace("px","")) + scrollAmt) + "px";
	}
}

/***************
Touch Functions
1. touchStart(event)
2. touchMove(event)
3. touchEnd(event)
***************/

function touchStart(event) {
    event.preventDefault();

    touchCounter = event.targetTouches.length;

    if(masterMode == 'type'){
    	typing(event.targetTouches[touchCounter-1].pageX,event.targetTouches[touchCounter-1].pageY,touchCounter);
    } else{

    }
}

function touchMove(event) {
    event.preventDefault();
}


function touchEnd(event) {
    event.preventDefault();
    if(shiftKey > 0 && event.targetTouches.length == 0){
		shiftKey = 0;
	}
}


/***************
Typing Function
--> For simply capturing inputs
***************/

function typing(posX,posY,count){
	var letterToInput = mykeyboard.getNearestKeys(posX,posY);

	// Save the keystroke in the log
	if(mykeyboard.spacebar.inregion(posX,posY)){
		keyStrokeLog[keyStrokeLog.length] = new keystroke(posX,posY,'space',count);
	} else{
		keyStrokeLog[keyStrokeLog.length] = new keystroke(posX,posY,letterToInput[0].letter,count);
	}


	if(letterToInput[0].letter == ' ' || mykeyboard.spacebar.inregion(posX,posY)){
		// if($('#current_word').html() == ''){
		// 	// Add period on double tap of space bar
		// 	var $content = $('#content_before_cursor').html();
		// 	if($content.substring($content.length-2,$content.length-1) != '.'){
		// 		$('#content_before_cursor').html($content.substring(0,$content.length-1)+'. ')
		// 	}
		// } else{
			if(!maintext.checkForEmpty()){
				if(maintext.previousWord() == " " && currentWord == ""){
					maintext.removeWord();
					maintext.addWord('.');
					maintext.addWord(' ');
					displayText();
					return;
				}
			}
			newWord(' ');
		// }
		// return;
	}
	else if(mykeyboard.shiftR.inregion(posX,posY) || mykeyboard.shiftL.inregion(posX,posY)){
		shiftKey = count;
	}
	else if(letterToInput[0].letter == 'delete'){
		undoLast();
		return;
	}
	else if(letterToInput[0].letter == 'return'){
		// letterToInput[0].letter = '<br>';
		// Scroll top
		textScrollAdjust("up");
		newWord('<br>');
		// maintext.newParagraph();
		// return;
	}
	else if(letterToInput[0].letter == 'comma'){
		if(shiftKey > 0){
			newWord('!');
		} else {
			newWord(',');
		}
		// return;
	}
	else if(letterToInput[0].letter == 'period'){
		if(shiftKey > 0){
			newWord('?');
		} else {
			newWord('.');
		}
		// return;
	}
	else{
		var number_of_possibilities = 3;
		keySpatial[letterToInput[0].letter] = new Array();
		for (var key_ii = 0; key_ii < number_of_possibilities; key_ii++) {
			if(letterToInput[key_ii].letter.length == 1){
				keySpatial[letterToInput[0].letter].push(letterToInput[key_ii].letter);
			}
		};

		if(shiftKey > 0){
			currentWord += letterToInput[0].letter.toUpperCase();
		} else {
			currentWord += letterToInput[0].letter;
		}
	}

	displayText();
}

// MAKE THIS DRY
function undoLast(){
	if(currentWord == ""){
		if(maintext.checkForEmpty()){
			return;
		}
		previousWord = maintext.removeWord();
		console.log(previousWord);
		if(previousWord[0].letters == " "){
			if(maintext.previousWord() == "."){
				displayText();
				return;
			}
			wordObj = maintext.removeWord();
			currentWord = wordObj[0].letters;
			console.log(previousWord);
		} else if(previousWord[0].letters == "<br>"){
			textScrollAdjust("down");
			wordObj = maintext.removeWord();
			currentWord = wordObj[0].letters;
			console.log(previousWord);
		} else{
			currentWord = previousWord[0].letters.substring(0,previousWord[0].letters.length - 1);
		}
	} else {
		currentWord = currentWord.substring(0,currentWord.length - 1);
	}
	displayText();
	return;
}

function newWord(space_break){
	if(currentWord == "")
	{
		maintext.addWord(space_break);
		return;
	}
	// var $theWord = $('#current_word').html();
	if(typeof(dictionary[currentWord.toLowerCase()]) == "undefined"){
		// NOT FOUND
		if(currentWord[currentWord.length-1] == "s" && typeof(dictionary[currentWord.toLowerCase().substring(0,currentWord.length-1)]) != "undefined"){

		}
		else{
			currentWord = correctWord(currentWord); // CHECK WORD AND AUTOCORRECT
		}
	} else {
		// FOUND
		if(dictionary[currentWord.toLowerCase()] != 1){
			currentWord = dictionary[currentWord.toLowerCase()];
		}
	}

	// Add word to "text" obj
	maintext.addWord(currentWord);
	maintext.addWord(space_break);
	currentWord = "";

	// $("#current_word").append(space_break); // add space to current word
	// $('#content_before_cursor').append($("#current_word").html()) // add current word to content
	// $('#current_word').html(''); // set current word to ''
}

function displayText(){
	var holdArray = maintext.getTextBeforeAndAfterCursor();
	contentBefore = holdArray[0] + currentWord;
	contentAfter = holdArray[1];
	$("#content").html("<span id='content_before_cursor'>" + contentBefore + "</span>" +
		"<span id='cursor' class='blink'>|</span>" + 
		"<span id='content_after_cursor'>" + contentAfter + "</span>");
	if($("#content").height() - -($("#content")[0].style.marginTop.replace("px","")) > 140){
		textScrollAdjust("up");
	} else if($("#content").height() - -($("#content")[0].style.marginTop.replace("px","")) == 140){

	} else if($("#content").html().split("<br>").length*20 != $("#content").height() - -($("#content")[0].style.marginTop.replace("px",""))){
		textScrollAdjust("down");
	}
}


/***************
Keystroke Object
--> For use with the keyStrokeLog array
***************/

function keystroke(posX,posY,letter,count){
	this.positionX = posX;
	this.positionY = posY;
	this.originalLetter = letter;
	this.correctedLetter = null;
	this.count = count;
	var dateNow = new Date();
	this.millisecondSet = dateNow.getTime();

	function setCorrectedLetter(new_letter){
		this.correctedLetter = new_letter;
	}
}


/***************
Keyboard Object
--> For defining the keyboard and interacting with it
***************/

function keyboard(){

	/*****************
	KEY and SPECIALKEY
	Object declaration
	*****************/

	// Letter Objects
	this.letter_a = new key('a',60,430);
	this.letter_b = new key('b',510,530);
	this.letter_c = new key('c',310,530);
	this.letter_d = new key('d',260,430);
	this.letter_e = new key('e',230,330);
	this.letter_f = new key('f',360,430);
	this.letter_g = new key('g',460,430);
	this.letter_h = new key('h',560,430);
	this.letter_i = new key('i',740,330);
	this.letter_j = new key('j',660,430);
	this.letter_k = new key('k',760,430);
	this.letter_l = new key('l',860,430);
	this.letter_m = new key('m',710,530);
	this.letter_n = new key('n',610,530);
	this.letter_o = new key('o',840,330);
	this.letter_p = new key('p',940,330);
	this.letter_q = new key('q',40,330);
	this.letter_r = new key('r',340,330);
	this.letter_s = new key('s',160,430);
	this.letter_t = new key('t',440,330);
	this.letter_u = new key('u',640,330);
	this.letter_v = new key('v',410,530);
	this.letter_w = new key('w',140,330);
	this.letter_x = new key('x',210,530);
	this.letter_y = new key('y',540,330);
	this.letter_z = new key('z',110,530);
	this.letter_comma = new key('comma',810,530);
	this.letter_period = new key('period',910,530);
	this.letter_space = new key(' ',530,630);
	this.letter_delete = new key('delete',950,230);
	this.letter_return = new key('return',980,430); // consider making x 960, I made it a little large to make it less likely to accidentally tap

	// Special Keys
	this.spacebar = new specialkey(' ',0,580,1024,660);
	this.shiftR = new specialkey('shift',940,480,1024,580);
	this.shiftL = new specialkey('shift',0,480,40,580);


	function key(letter,posX,posY){
		// The object "key" has a character (letter), and a center position (posX,posY)
		this.positionX = new Array();
		this.positionY = new Array();
		this.positionXset = posX;
		this.positionYset = posY + keyboardOffset;
		this.count = 0; // Number of times key has been pressed
		this.lowerCase = letter.toLowerCase();
		this.upperCase = letter.toUpperCase();
	}

	function specialkey(symbol,posTLX,posTLY,posBRX,posBRY){
		// The object "specialkey" has a symbol (symbol), and a rectangular region that defines it (posTLX,posTLY,posBRX,posBRY) - (Top Left X & Y, Bottom Right X & Y)
		this.TLpositionX = posTLX;
		this.TLpositionY = posTLY;
		this.BRpositionX = posBRX;
		this.BRpositionY = posBRY;
		this.count = 0; // Number of times key has been pressed

		this.inregion = inregion; // Checks whether a point is in the specialkey's region

		function inregion(posX,posY){
			if(posX > this.TLpositionX & posX < this.BRpositionX & posY > (this.TLpositionY+keyboardOffset) & posY < (this.BRpositionY+keyboardOffset)){
				return 1;
			}
			else{
				return 0;
			}

		}
	}

	/*****************
	KEYBOARD methods
	*****************/

	// Keyboard Methods
	this.getKey = getKey; // Takes a char and returns a "key" object
	this.addKey = addKey; // **DEPRECATED
	this.viewPosition = viewPosition; // **DEPRECATED
	this.getNearestKeys = getNearestKeys; // Takes a position and returns a sorted array of the closest "key" objects
	// NOT SURE IF THIS SHOULD BE PART OF THE KEYBOARD OBJ
	// this.typing = typing;
	// this.undoLast = undoLast;


	function getKey(key_in){
		switch(key_in.toLowerCase())
		{
		case 'a':
			return this.letter_a;
		case 'b':
			return this.letter_b;
		case 'c':
			return this.letter_c;
		case 'd':
			return this.letter_d;
		case 'e':
			return this.letter_e;
		case 'f':
			return this.letter_f;
		case 'g':
			return this.letter_g;
		case 'h':
			return this.letter_h;
		case 'i':
			return this.letter_i;
		case 'j':
			return this.letter_j;
		case 'k':
			return this.letter_k;
		case 'l':
			return this.letter_l;
		case 'm':
			return this.letter_m;
		case 'n':
			return this.letter_n;
		case 'o':
			return this.letter_o;
		case 'p':
			return this.letter_p;
		case 'q':
			return this.letter_q;
		case 'r':
			return this.letter_r;
		case 's':
			return this.letter_s;
		case 't':
			return this.letter_t;
		case 'u':
			return this.letter_u;
		case 'v':
			return this.letter_v;
		case 'w':
			return this.letter_w;
		case 'x':
			return this.letter_x;
		case 'y':
			return this.letter_y;
		case 'z':
			return this.letter_z;
		case ' ':
			return this.letter_space;
		case 'comma':
			return this.letter_comma;
		case 'period':
			return this.letter_period;
		case 'delete':
			return this.letter_delete;
		case 'return':
			return this.letter_return;
		default:
			return this.letter_space;
		}
	}

	// **DEPRECATED
	function addKey(key_in,posX,posY){
		var keyObj = this.getKey(key_in);
		keyObj.positionX[keyObj.count] = posX;
		keyObj.positionY[keyObj.count] = posY;
		keyObj.count++;
		return;
	}

	// **DEPRECATED
	function viewPosition(){
		var currentLetterObj;
		document.getElementById('buttons').innerHTML = '';
		for (var letter_ii = 0; letter_ii < 27; letter_ii++) {
			currentLetterObj = this.getKey(Object.keys(this)[letter_ii].split('_')[1]);
			document.getElementById('buttons').innerHTML += '<div id="button_'+letter_ii+'" class="key"><br>'+currentLetterObj.upperCase+'</div>';
			currentLetterObj.positionXset = average(currentLetterObj.positionX);
			currentLetterObj.positionYset = average(currentLetterObj.positionY);
			$('#button_'+letter_ii).css('top',currentLetterObj.positionYset - $('#button_'+letter_ii).height()/2);
			$('#button_'+letter_ii).css('left',currentLetterObj.positionXset - $('#button_'+letter_ii).width()/2);
		};
	}

	function getNearestKeys(posX,posY){
		var letterToInput = Array();
		var currentLetterObj;
		// 26 letters + SPACE + DELETE + RETURN + COMMA + PERIOD
		for (var letter_ii = 0; letter_ii < 31; letter_ii++) {
			currentLetterObj = this.getKey(Object.keys(this)[letter_ii].split('_')[1]);
			letterToInput[letter_ii] = {};
			letterToInput[letter_ii]['letter'] = currentLetterObj.lowerCase;
			letterToInput[letter_ii]['distance'] = distance(currentLetterObj.positionXset,currentLetterObj.positionYset,posX,posY);
		};
		letterToInput.sort(function(a,b){return a.distance-b.distance});
		return letterToInput;
	}
}



/********************
Calculation functions
1. average(numArray)
	computes the average of a list of numbers in an array
2. distance(x1,y1,x2,y2)
	computes the distance between two points in Euclidean distance
*********************/

function average(numArray){
	var numSum = 0;
	for (var i = 0; i < numArray.length; i++) {
		numSum += numArray[i];
	};
	if(numArray.length == 0)
	{
		return 0;
	}
	return numSum/(numArray.length);
}

function distance(x1,y1,x2,y2){
	return Math.sqrt( Math.pow(x1-x2,2) + Math.pow(y1-y2,2) );
}



/********************
Deprecated Functions
 - All deprecated functions and variables are marked with a "**DEPRECATED" tag
*********************/

// **DEPRECATED
function switchMode(){
	if(typeMode == 'configure'){
		typeMode = 'type';
		$('#typeMode').html('type');
	}
	else if(typeMode == 'type'){
		typeMode = 'configure';
		$('#typeMode').html('configure');
	}
	else{
		typeMode = 'type';
		$('#typeMode').html('type');
	}
}

// **DEPRECATED
function moveKeyMode(){
	if(moveMode == 'off'){
		moveMode = 'on';
		$('#moveMode').html('Move on');
		typeMode = 'other';
		// Increase key z-index
		$('.key').css('z-index', 5);
		$('.key').bind('touchstart', function(e){
			e.preventDefault();
			$(this).css('background', 'lightblue');
		});
		$('.key').bind('touchmove', function(e){
			e.preventDefault();
			$(this).offset({ top: (e.originalEvent.targetTouches[0].pageY - $(this).height()/2), left: (e.originalEvent.targetTouches[0].pageX - $(this).width()/2)});
			mykeyboard.getKey($(this).html().replace('<br>','')).positionXset = e.originalEvent.targetTouches[0].pageX;
			mykeyboard.getKey($(this).html().replace('<br>','')).positionYset = e.originalEvent.targetTouches[0].pageY;
		});
		$('.key').bind('touchend', function(e){
			e.preventDefault();
			$(this).css('background', 'silver');
			// alert(mykeyboard.getKey($(this).html().replace('<br>','')).positionYset)
		});
	}
	else if(moveMode == 'on'){
		moveMode = 'off';
		$('#moveMode').html('Move off');
		typeMode = 'type';
		$('.key').css('z-index', -1);
	}
}

// **DEPRECATED
function highlightNewCharacter(key_number) {
	$('span:nth-child('+(key_number+1)+')').addClass('highlightText');
	$('span:nth-child('+key_number+')').removeClass('highlightText');
}