// // Assignment Link: https://education.launchcode.org/js-independent-track/assignments/scrabble-scorer.html 
// //

// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   userWord = input.question("Let's play some scrabble! Enter a word to score: ");
  //  console.log(oldScrabbleScorer(userWord))
  // console.log(simpleScore(userWord))
  return userWord
};


//SCORING FUNCTIONS//

let simpleScore = function(word){
  return word.length
  };


let vowelBonusScore = function(word){
  word = word.toLowerCase();
  let vowelArray = ["a","e","i","o",'u']
  let vowelScore = 0
  let consonantScore = 0
  for (let i = 0; i < word.length; i++){
    if (vowelArray.includes(word[i])){
      vowelScore += 3
    } else if (vowelArray.includes(word[i]) === false){
      consonantScore += 1
    }
  } return vowelScore + consonantScore
};



////SOOOOO Stuck on Transform!  The function as-is returns the right score but wrong lettercase in the newPoints object.  Adding .toLowerCase() corrects the lettercase in the object, but breaks the scoring function.  Whyyyyy??




function transform(oldPointStructure) {
  let newPoints = {};
  for (pointValue in oldPointStructure){
    for (let i = 0; i < oldPointStructure[pointValue].length; i++){
      let upperLetter = oldPointStructure[pointValue][i];

      newPoints[upperLetter.toLowerCase()] = Number(pointValue);
    }
  }

  return newPoints;
} 



let newPointStructure = transform(oldPointStructure)


let scrabbleScore = function(word) {
  word = word.toLowerCase();
  let scrabbleLetterPoints = 0;
  for (let i = 0; i < word.length; i++){
    for (letter in newPointStructure){
      if (letter === word[i]){
        scrabbleLetterPoints += Number(newPointStructure[letter]);
      }
    }
  } 
  return scrabbleLetterPoints;
}


//Scoring Objects//

let simpleScoreObject = {
  name: "Simple Score",
  description: "Each letter is worth 1 point",
  scoringFunction: simpleScore

};

let bonusVowelObject = {
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scoringFunction: vowelBonusScore
};

let scrabbleScoreObject = {
  name: "Scrabble",
  description: "The traditional scoring algorithm",
  scoringFunction: scrabbleScore
};


const scoringAlgorithms = [simpleScoreObject, bonusVowelObject, scrabbleScoreObject];

function scorerPrompt() {
 console.log(`Which scoring algorithm would you like to use?\n`)
  for (let i = 0; i < scoringAlgorithms.length; i ++){
    console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}\n`)
  }
   
  let userScorer = input.question(`Enter 0, 1, or 2: `)
  while (userScorer < 0 || userScorer > 2){
     userScorer = input.question(`Invalid entry.  Please enter a number between 0-2: `)
  } return console.log(`Score for '${userWord}': ${scoringAlgorithms[userScorer].scoringFunction(userWord)}`)
}




function runProgram() {
   initialPrompt();
   scorerPrompt(initialPrompt);
   console.log(newPointStructure)

   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};