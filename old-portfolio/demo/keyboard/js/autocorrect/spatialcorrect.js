/* TO DO LIST

1. ADD CHECK FOR PLURAL WORDS
2. Build out dictionary a bit more
3. consider adding in addition and deletion cuts and edits for autocorrection

*/

var goodWords = Array();

function correctWord(wrongWord){
	goodWords = Array();
	wrongWord = wrongWord.toLowerCase();
	// Search for all alternatives
	// if(wrongWord.length <= 10){
	if(wrongWord.length <= 100){
		edit1(wrongWord);
		if(wrongWord.length <= 8){
			printAlternateLetters(wrongWord,0,keySpatial[wrongWord[0]])
		}
	}
	else{
		// Word too big to be corrected
		return wrongWord + '*';
	}

	if(goodWords.length == 0){
		// Not in dictionary
		// return wrongWord + '**';
		return wrongWord;
	}

	// Calculate best match among good words
	for (var good_word_ii = 0; good_word_ii < goodWords.length; good_word_ii++) {
		goodWords[good_word_ii] = {name:goodWords[good_word_ii],switchCount:0};
		for (var good_letter_ii = 0; good_letter_ii < goodWords[good_word_ii].name.length; good_letter_ii++) {
			if(goodWords[good_word_ii].name[good_letter_ii] != wrongWord[good_letter_ii]){
				goodWords[good_word_ii].switchCount++;
			}
			if(wrongWord.length != goodWords[good_word_ii].name.length){
				goodWords[good_word_ii].switchCount++;
			}
		};
	};

	goodWords.sort(function(a,b){return a.switchCount - b.switchCount})

	if(dictionary[goodWords[0].name] != 1){
		goodWords[0].name = dictionary[goodWords[0].name];
	}

	return goodWords[0].name;
}

/*
ALL POSSIBLE COMBINATION AUTOCORRECT
*/

function printAlternateLetters(original_word,letter_to_change,array_of_possible_letters){
	// Search through all possible alternatives in relative area and add good words to array goodWords
	for (var possible_letters_i = 0; possible_letters_i < array_of_possible_letters.length; possible_letters_i++){
		if(letter_to_change < original_word.length-1){
			printAlternateLetters(original_word.substring(0,letter_to_change) + array_of_possible_letters[possible_letters_i] + original_word.substring(letter_to_change+1,original_word.length),letter_to_change+1,keySpatial[original_word[letter_to_change+1]]);
		}
		else{
			if(typeof(dictionary[original_word.substring(0,letter_to_change) + array_of_possible_letters[possible_letters_i] + original_word.substring(letter_to_change+1,original_word.length)]) != "undefined"){
				// GOOD WORD FOUND
				goodWords.push(original_word.substring(0,letter_to_change) + array_of_possible_letters[possible_letters_i] + original_word.substring(letter_to_change+1,original_word.length));
			}
		}
	};
}

/*
Autocorrect with edits
*/

function edit1(word){
	deletes(word);
	transposes(word);
	replaces1(word);
	inserts(word);
	// goodWords.push(original_word.substring(0,letter_to_change) + array_of_possible_letters[possible_letters_i] + original_word.substring(letter_to_change+1,original_word.length));
}

var alphabet = "abcdefghijklmnopqrstuvwxyz";

function inserts(word){
	var splitArray = splits(word);
	for (var i = 0; i < word.length; i++) {
		for (var alpha_i = 0; alpha_i < alphabet.length; alpha_i++) {
			checkGoodWord(splitArray[0][i] + 
				alphabet[alpha_i] + 
				splitArray[1][i]);
		};
	};
	// console.log(word + "*") // maybe don't include this append to end case
}

function replaces1(word){
	var splitArray = splits(word);
	for (var i = 0; i < word.length; i++) {
		for (var keys = 0; keys < keySpatial[splitArray[1][i][0]].length; keys++) {
			checkGoodWord(splitArray[0][i] + 
				keySpatial[splitArray[1][i][0]][keys] + 
				splitArray[1][i].substring(1,splitArray[1][i].length)
				);
		};
	};
}

// function replaces2(word){
// 	var splitArray = splits(word);
// 	for (var i = 0; i < word.length; i++) {
// 		for (var keys = 0; keys < keySpatial[splitArray[1][i][0]].length; keys++) {
// 			console.log(splitArray[0][i] + 
// 				keySpatial[splitArray[1][i][0]][keys] + 
// 				splitArray[1][i].substring(1,splitArray[1][i].length)
// 				);
// 		};
// 	};
// }

function transposes(word){
	var splitArray = splits(word);
	for (var i = 0; i < word.length - 1; i++) {
		checkGoodWord(splitArray[0][i] + 
			splitArray[1][i][1] + 
			splitArray[1][i][0] + 
			splitArray[1][i].substring(2,splitArray[1][i].length)
			);
	};
}

function deletes(word){
	var splitArray = splits(word);
	for (var i = 0; i < word.length; i++) {
		checkGoodWord(splitArray[0][i] + splitArray[1][i].substring(1,splitArray[1][i].length));
	};
}

function splits(word){
	var splitArray1 = Array();
	var splitArray2 = Array();
	for (var i = 0; i < word.length; i++) {
		splitArray1.push(word.substring(0,i));
		splitArray2.push(word.substring(i,word.length));
	};
	return [splitArray1,splitArray2];
}

function checkGoodWord(word){
	if(typeof(dictionary[word]) != "undefined"){
		// GOOD WORD FOUND
		goodWords.push(word);
	}
}

