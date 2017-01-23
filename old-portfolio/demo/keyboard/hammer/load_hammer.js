var hammer = new Hammer(document.getElementById("keyboard"));
var dragCounter;
var quickDelete;

hammer.ondragstart = function(ev) { 
	// $("#output").prepend(ev.distance+"<br>");
	masterMode = "scroll";
	dragCounter = 0;
	// $("#output").prepend("ondragstart<br>") 
	if(ev.count == 1){
		// One finger drag action
		$("#output").css("background","red");
	} else if(ev.count == 2){
		// Only undo the events in the last 50 ms?
		// undoLast();

		// Two finger drag action
		$("#output").css("background","green");
	}
};
hammer.ondrag = function(ev) { 
	if(masterMode != "scroll"){
		return;
	}

	dragCounter++;
	if(dragCounter == 4){ // CHANGE TOLERANCE OF dragCounter
		undoLast();
	}
	if(ev.count == 1){
		// One finger drag action
		$("#output").css("background","red");
		// scrollAround(ev);
	} else if(ev.count == 2){
		// Only undo the events in the last 50 ms?
		// undoLast();

		// Two finger drag action
		$("#output").css("background","green");
		$("#output").html("<br>SCROLL MODE");
		// scrollAround(ev);
	}
};
hammer.ondragend = function(ev) { 
	// $("#output").prepend(ev.distance+"<br>");
	// $("#output").prepend("ondragend<br>") 
	$("#output").css("background","grey"); 
};
hammer.onswipe = function(ev) { 
	// $("#output").prepend(ev.distance+"<br>");
	// $("#output").html("onswipe<br>");
	console.log("SWIPE" + dragCounter)

	// console.log(ev);
	// A swipe off the screen gets rid of the keyboard and turns the screen into drawing mode
	if(dragCounter > 3){ // Consider making this smaller
		if(ev.position.x < 100 || ev.position.x > (1024-100) || ev.position.y > ($(window).height()-100)){
			console.log("Switch to drawing mode here...PLACEHOLDER");
			switchToDrawingMode();
		}
	}
};

hammer.ontap = function(ev) { 
	// $("#output").prepend(ev.distance+"<br>");
	// $("#output").prepend("ontap<br>") 
};
hammer.ondoubletap = function(ev) { 
	// $("#output").prepend(ev.distance+"<br>");
	// $("#output").prepend("ondoubletap<br>") 
};
hammer.onhold = function(ev) { 
	$("#output").css("background","blue");
	$("#output").html("<br>HOLD MODE");
	var nearbyKeys = mykeyboard.getNearestKeys(ev.position[0].x,ev.position[0].y)
	if(nearbyKeys[0].letter == "delete"){
		quickDelete = setInterval(function(){
			undoLast();
		},50);
	}
};

hammer.ontransformstart = function(ev) { 
	// $("#output").prepend(ev.distance+"<br>");
	// $("#output").prepend("ontransformstart<br>") 
};
hammer.ontransform = function(ev) { 
	// $("#output").prepend(ev.distance+"<br>");
	// $("#output").prepend("ontransform<br>") 
};
hammer.ontransformend = function(ev) { 
	// $("#output").prepend(ev.distance+"<br>");
	// $("#output").prepend("ontransformend<br>") 
};

hammer.onrelease = function(ev) { 
	if(masterMode == "draw"){
		return;
	}

	masterMode = "type";
	// $("#output").prepend("onrelease<br>") 
	$("#output").html("");
	$("#output").css("background","silver"); 
	clearTimeout(quickDelete);
};

function scrollAround(event){
	console.log(Object.keys(event));
	console.log(event.direction);
	if(event.direction == "left"){
		maintext.wordPosition--;
	} else if(event.direction == "right"){
		maintext.wordPosition++;
	}
	displayText();
}