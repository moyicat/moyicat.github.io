/***************
| Text Object
|
| - text (has an array of...)
|	- paragraphs[] (has an Array of...)
|		- sentences[] (has an Array of...)
|			- words[]
|
***************/

var maintext = new text();
maintext.newParagraph();

// // var mytext = new text();
// // maintext.newParagraph();
// maintext.addWordToEnd('Hello');
// maintext.addWordToEnd('World');
// maintext.addWordToEnd('my');
// // maintext.newSentence();
// maintext.addWordToEnd('name');
// maintext.addWordToEnd('is');
// maintext.addWordToEnd('Alex');
// maintext.addWordToEnd('Wilson');
// // maintext.wordPosition = 2;
// // maintext.addWord('BOOOM');
// maintext.newParagraph();
// maintext.addWordToEnd('this');
// maintext.addWordToEnd('is');
// maintext.addWordToEnd('another');
// maintext.addWordToEnd('paragraph');
// maintext.addWordToEnd('and');
// maintext.addWordToEnd('my')
// maintext.addWordToEnd('mame');
// maintext.addWordToEnd('is');
// maintext.addWordToEnd('still');
// maintext.addWordToEnd('Alex');
// maintext.addWordToEnd('Wilson');

function text(){
	this.paragraphPosition = -1; // -1 indicates no paragraphs exist
	this.sentencePosition = -1; // -1 indicates no sentences exist
	this.wordPosition = -1; // -1 indicates no words exist
	this.paragraphs = Array();

	// Adding new elements to text
	this.newParagraph = newParagraph;
	this.newSentence = newSentence;
	this.addWord = addWord; // Add a word at the current position
	this.addWordToEnd = addWordToEnd; // Add a word to the end
	this.addLetterToWord = addLetterToWord;
	this.replaceWord = replaceWord;

	// Removing elements from text
	this.removeWord = removeWord;

	// Displaying the text
	this.currentWord = currentWord;
	this.previousWord = previousWord;
	this.printText = printText;
	this.printStructure = printStructure;
	this.returnStructure = returnStructure;
	this.getTextBeforeAndAfterCursor = getTextBeforeAndAfterCursor;
	this.printPosition = printPosition;

	// Error Checks
	this.checkForEmpty = checkForEmpty;

	/***************
	ADDING ELEMENTS
	***************/

	function newParagraph(){
		this.paragraphPosition++; // Starts at -1, so first paragraph is at 0
		this.paragraphs.splice(this.paragraphPosition,0,new paragraph()); // insert or append new paragraph
		this.sentencePosition = 0;
		this.paragraphs[this.paragraphPosition].sentences.splice(this.sentencePosition,0,new sentence());
		this.addWord("");
		this.wordPosition = 0;
	}

	function newSentence(){
		this.sentencePosition++;
		this.wordPosition = 0;
		this.paragraphs[this.paragraphPosition].sentences.splice(this.sentencePosition,0,new sentence());
	}

	function addWord(wordString){
		this.paragraphs[this.paragraphPosition].sentences[this.sentencePosition].words.splice(this.wordPosition,0,new word(wordString,0));
		this.wordPosition++;
	}

	function addWordToEnd(wordString){
		this.paragraphs[this.paragraphs.length - 1].sentences[this.paragraphs[this.paragraphs.length - 1].sentences.length - 1].newWord(wordString);
		this.wordPosition++;
	}

	function addLetterToWord(letter){
		this.paragraphs[this.paragraphPosition].sentences[this.sentencePosition].words[this.wordPosition].addLetter(letter);
	}

	function replaceWord(word){
		// this.paragraphs[this.paragraphPosition].sentences[this.sentencePosition].words[this.wordPosition].correctedWord = word;
		this.paragraphs[this.paragraphPosition].sentences[this.sentencePosition].words[this.wordPosition].letters = word;
	}

	/***************
	REMOVING ELEMENTS
	***************/

	function removeWord(){
		this.wordPosition--;
		holdWord = this.paragraphs[this.paragraphPosition].sentences[this.sentencePosition].words.splice([this.wordPosition],1);
		// if(this.wordPosition == 0){
		// 	if(this.sentencePosition == 0){
		// 		this.paragraphPosition--;
		// 		this.sentencePosition = this.paragraphs[this.paragraphPosition].sentences.length - 1;
		// 		this.wordPosition = this.paragraphs[this.paragraphPosition].sentences[sentencePosition].words.length;
		// 	} else {
		// 		this.sentencePosition--;
		// 	}
		// }
		return holdWord;
	}

	/***************
	DISPLAYING ELEMENTS
	***************/

	function currentWord(){
		return this.paragraphs[this.paragraphPosition].sentences[this.sentencePosition].words[this.wordPosition].letters;
	}

	function previousWord(){
		if(this.wordPosition > 1) {
			return this.paragraphs[this.paragraphPosition].sentences[this.sentencePosition].words[this.wordPosition-1].letters;
		}
		else return "ERROR";
	}

	function printText(div_id){
		for (var paragraph_i = 0; paragraph_i < this.paragraphs.length; paragraph_i++) {
			for (var sentence_i = 0; sentence_i < this.paragraphs[paragraph_i].sentences.length; sentence_i++) {
				for (var word_i = 0; word_i < this.paragraphs[paragraph_i].sentences[sentence_i].words.length-1; word_i++) {
					$("#"+div_id).append(this.paragraphs[paragraph_i].sentences[sentence_i].words[word_i].letters);
					$("#"+div_id).append(' ');
				}
				$("#"+div_id).append(this.paragraphs[paragraph_i].sentences[sentence_i].words[word_i].letters);
				$("#"+div_id).append('.');
			}
			$("#"+div_id).append('<br>');
		}
	}

	function printStructure(div_id){
		for (var paragraph_i = 0; paragraph_i < this.paragraphs.length; paragraph_i++) {
			// Add paragraph marker
			$("#"+div_id).append("&para "+(paragraph_i+1)+"<br>");
			for (var sentence_i = 0; sentence_i < this.paragraphs[paragraph_i].sentences.length; sentence_i++) {
				// Add tab to all sentences
				$("#"+div_id).append("<span class='tab'>&nbsp&nbsp&nbsp&nbsp</span>");
				for (var word_i = 0; word_i < this.paragraphs[paragraph_i].sentences[sentence_i].words.length-1; word_i++) {
					$("#"+div_id).append(this.paragraphs[paragraph_i].sentences[sentence_i].words[word_i].letters);
					$("#"+div_id).append(" ");
				}
				$("#"+div_id).append(this.paragraphs[paragraph_i].sentences[sentence_i].words[word_i].letters);
				$("#"+div_id).append("<br>");
			}
			$("#"+div_id).append("<br>");
		}
	}

	// Used mainly for debugging "text" obj
	function returnStructure(){
		var returnStructureString = '';
		for (var paragraph_i = 0; paragraph_i < this.paragraphs.length; paragraph_i++) {
			// Add paragraph marker
			// returnStructureString += "Paragraph "+(paragraph_i+1)+"\n";
			for (var sentence_i = 0; sentence_i < this.paragraphs[paragraph_i].sentences.length; sentence_i++) {
				// Add tab to all sentences
				// returnStructureString += "\n";
				// returnStructureString += "<br>";
				for (var word_i = 0; word_i < this.paragraphs[paragraph_i].sentences[sentence_i].words.length-1; word_i++) {
					returnStructureString += this.paragraphs[paragraph_i].sentences[sentence_i].words[word_i].letters;
					returnStructureString += " ";
				}
				returnStructureString += this.paragraphs[paragraph_i].sentences[sentence_i].words[word_i].letters;
			}
			returnStructureString += "\n";
			// returnStructureString += "<br>";
		}
		return returnStructureString;
	}

	function getTextBeforeAndAfterCursor(){
		var textBeforeCursor = "";
		var textAfterCursor = "";
		var textHold = "";
		for (var paragraph_i = 0; paragraph_i < this.paragraphs.length; paragraph_i++) {
			for (var sentence_i = 0; sentence_i < this.paragraphs[paragraph_i].sentences.length; sentence_i++) {
				for (var word_i = 0; word_i < this.paragraphs[paragraph_i].sentences[sentence_i].words.length; word_i++) {
					if(word_i == 0){
						textHold += capitalizeFirstLetter(this.paragraphs[paragraph_i].sentences[sentence_i].words[word_i].letters)
					} else	{
						textHold += this.paragraphs[paragraph_i].sentences[sentence_i].words[word_i].letters;
					}
					if(paragraph_i == this.paragraphPosition && sentence_i == this.sentencePosition && word_i == this.wordPosition){
						textBeforeCursor = textHold;
						textHold = "";
					}
				}
				// textHold += this.paragraphs[paragraph_i].sentences[sentence_i].words[word_i].letters;
			}
			// textHold += "\n";
		}
		textAfterCursor = textHold;
		return [textBeforeCursor,textAfterCursor];
	}

	function printPosition(){
		return "Paragraph: " + this.paragraphPosition + ", Sentence: " + this.sentencePosition + ", Word: " + this.wordPosition; 
	}

	/***************
	ERROR CHECKS
	***************/

	function checkForEmpty(){
		if(this.paragraphPosition <= 0 & this.sentencePosition <= 0 & this.wordPosition <= 0){
			return 1; // EMPTY TEXT OBJ
		} else{
			return 0;
		}
	}

}

function paragraph(){
	this.sentences = Array();
	this.newSentence = newSentence;

	function newSentence(){
		this.sentences[this.sentences.length] = new sentence();
	}
}

function sentence(){
	this.words = Array();
	this.newWord = newWord;

	function newWord(wordString){
		this.words[this.words.length] = new word(wordString);
	}
}

function word(wordString,amIchar){
	this.originalWord = wordString;
	this.correctedWord = null;
	this.letters = wordString;
	this.capitalized = 0;
	this.amIaChar = amIchar;

	this.addLetter = addLetter;
	this.removeLetter = removeLetter;

	function addLetter(letter){
		this.letters += letter;
	}

	function removeLetter(){
		this.letters = this.letters.substring(0,this.letters.length - 1);
	}
}

function capitalizeFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}


// var mytext = new text();
// mytext.newParagraph();
// mytext.addWordToEnd('Hello');
// mytext.addWordToEnd('World');
// mytext.addWordToEnd('my');
// mytext.newSentence();
// mytext.addWordToEnd('name');
// mytext.addWordToEnd('is');
// mytext.addWordToEnd('Alex');
// mytext.addWordToEnd('Wilson');
// mytext.wordPosition = 2;
// mytext.addWord('BOOOM');
// mytext.newParagraph();
// mytext.addWordToEnd('this');
// mytext.addWordToEnd('is');
// mytext.addWordToEnd('another');
// mytext.addWordToEnd('paragraph');
// mytext.addWordToEnd('and');
// mytext.addWordToEnd('my')
// mytext.addWordToEnd('mame');
// mytext.addWordToEnd('is');
// mytext.addWordToEnd('still');
// mytext.addWordToEnd('Alex');
// mytext.addWordToEnd('Wilson');
// mytext.printStructure();

// function specialCharacter(symbol){
// 	this.originalWord = null;
// 	this.correctedWord = null;
// 	this.letters = wordString;
// 	this.capitalized = 0;
// }