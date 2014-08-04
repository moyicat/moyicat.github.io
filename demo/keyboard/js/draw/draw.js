var drawMode = false;
var lastX;
var lastY;

var canvasOBJ=document.getElementById("eisel");
var canvasCTX=canvasOBJ.getContext("2d");

function switchToDrawingMode(){
	masterMode = "draw";
	// $("#output").html("DRAW"); // Deprecated
	$("#keyboard").css("z-index",-100); // get rid of multitouch
	$("#eisel").css("opacity","1"); // bring eisel display to foreground
	// $("#eisel").css("z-index",100); // bring up eisel
	$("#key").css("display","none"); // Hide Keyboard
	$("#cursor").css("display","none"); // Hide Cursor
	// $("#switch").css("display","inline-block"); // Show switch to typing mode box

	// $("#save_stuff").css("display","inline-block");

	// canvasOBJ.height = $(window).height(); // Deprecated

	// Might want to add these event handlers to a file with other gesture and touch handlers
	document.addEventListener("touchstart", touchStartDraw, false);
	document.addEventListener("touchmove", touchMoveDraw, false);
	document.addEventListener("touchend", touchEndDraw, false);
}

function touchStartDraw(event) {
	event.preventDefault();
	var threshhold = 20;
	if(event.targetTouches[0].pageX < threshhold || event.targetTouches[0].pageX > ($(window).width() - threshhold) || event.targetTouches[0].pageY > ($(window).height() - threshhold))
	{
		return switchToTypingMode();
	}
   	console.log('touchStartDraw');
    drawMode = true;
    lastX = event.targetTouches[0].pageX;
    lastY = event.targetTouches[0].pageY;
    canvasCTX.beginPath();
}

function touchMoveDraw(event) {
	console.log('touchMoveDraw');
	if(drawMode == true)
	{
		// canvasCTX.beginPath();
	    canvasCTX.moveTo(lastX,lastY);
	    lastX = event.targetTouches[0].pageX;
	    lastY = event.targetTouches[0].pageY;
		canvasCTX.lineTo(lastX,lastY);
		canvasCTX.stroke();
	}
}

function touchEndDraw(event) {
	console.log('touchEndDraw');
	drawMode = false;
}

function saveStuff(){

	var img = canvasOBJ.toDataURL("image/png");
	// window.open(img, "toDataURL() image", "width=600, height=200");
	var ajax = new XMLHttpRequest();

	ajax.onreadystatechange = function()
    {
        if(ajax.readyState == 4)
        {
        	var holdArray = maintext.getTextBeforeAndAfterCursor();
			contentBefore = holdArray[0] + currentWord;
			contentAfter = holdArray[1];

            attachment = ajax.responseText;
            	console.log("Saving stuff now");
				// $("#save_stuff").load("src/email_stuff.php");
				var email_address = prompt("Please enter your email","");
				if (email_address!=null && email_address!="")
				{
					$.post("src/email_stuff.php",
					{
					    email: email_address,
					    text: contentBefore + contentAfter,
					    attachment: attachment
					},
					function(data,status){
						if(status == "success"){
							alert('Sent!');
						}else{
							alert('fail...');
						}
						// alert("Data: " + data + "\nStatus: " + status);
					})
				}

        }
    }

	ajax.open("POST",'src/save_drawing.php',false);
	ajax.setRequestHeader('Content-Type', 'application/upload');
	ajax.send(img);  

}


function switchToTypingMode(){
	masterMode = "type";
	$("#keyboard").css("z-index",100); // bring back hammer and multitouch
	$("#eisel").css("z-index",-100); // send eisel to background
	$("#eisel").css("opacity","0"); // Fade eisel to background
	$("#key").css("display","block"); // make keyboard visible
	$("#switch").css("display","none"); // Hide switch to typing block
	$("#cursor").css("display","inline"); // 
	// $("#output").html("TYPE"); // Deprecated
	// $("#output").css("background","silver"); // Deprecated 

	// $("#save_stuff").css("display","none"); // Deprecated
	$("#help").css("display","none");
}