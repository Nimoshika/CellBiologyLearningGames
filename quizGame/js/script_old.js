var maxScore = 3;
var minScore = -3;
var questionDiv = document.getElementById("question");
var choicesDiv = document.getElementById("choices");
var Ruler = document.getElementById("ruler_id");
var Ruler_cell = document.getElementById("ruler_cell_id");

const startButton = document.getElementById("start");
startButton.addEventListener("click", start);
const submitButton = document.getElementById("submit");
submitButton.style.display = "none";
submitButton.addEventListener("click", checkAnswer);
const happyImage1 = document.getElementById("smiley");
happyImage1.style.display = "none";
Ruler.style.display = "none";

var questions = window.questions;
var questionIndex;

var yaySound = new Audio();
yaySound.src = "sound/yay.mp3";

var noSound = new Audio();
noSound.src = "sound/no.mp3";

function start() {
  // update buttons and images
  document.getElementById("start").textContent = "New game";
  startButton.style.display = "none";
  submitButton.style.display = "inline-block";
  happyImage1.style.display = "";
  Ruler.style.display = "";
  score = 0;
  step_size= happyImage1.parentElement.clientWidth * 0.332;
  left = score * step_size;
  happyImage1.style.marginLeft = left + "px" ;

  shuffle(questions);
  questionIndex = 0;

  displayQuestion();
}

function displayQuestion() {
  const choices = [];
  const currentQuestion = questions[questionIndex];

  // Shuffle answer choices without changing order of currentQuestion[choices]
  let choiceIndices = [...Array(currentQuestion.choices.length).keys()];
  shuffle(choiceIndices);

  // Add radio button for each answer choice
  for (let i = 0; i < choiceIndices.length; i++) {
    let choice = choiceIndices[i];
    choices.push(
      `<label>
        <input type="radio" name="question${questionIndex}" value="${choice}">
        ${String.fromCharCode('a'.charCodeAt(0)+i)}.
        ${currentQuestion.choices[choice]}
      </label>`
    );
  }
  
  questionDiv.textContent = `${currentQuestion.question}`;
  choicesDiv.innerHTML = `${choices.join("")}`;
}

// scores current question and then moves onto the next one or ends the game
function checkAnswer() {
  const currentQuestion = questions[questionIndex];
  const correctChoice = currentQuestion["choices"][0];
  const selector = document.querySelector(`input[name=question${questionIndex}]:checked`);
  let userAnswer = "";
  if (selector !== null)
    userAnswer = currentQuestion["choices"][selector.value];

  if (userAnswer === correctChoice) {
    swal("Correct!", `${currentQuestion.explanation}`, "success");
    score ++;
    movePlayerForward();
  } else {
    swal("Incorrect", `${currentQuestion.explanation}`, "warning");
    score --;
    movePlayerBackward();
  }
  console.log(`Score is now ${score}`);
  
  if (score == maxScore || score == minScore) { // terminate game upon reaching a certain score
    endGame();
    return;
  }

  questionIndex = (questionIndex + 1) % questions.length;
  displayQuestion();
}
//animation:move the player 
// var left = 0;
function movePlayerForward(){
  yaySound.play();
  step_size= happyImage1.parentElement.clientWidth * 0.332;
  left = score * step_size;
  console.log(step_size);
  happyImage1.style.marginLeft = left + "px" ;
  console.log(happyImage1.style.marginLeft);
}
function movePlayerBackward(){
  noSound.play();
  step_size= happyImage1.parentElement.clientWidth * 0.322;
  left = score * step_size;
  console.log(window.screen.height);
  happyImage1.style.marginLeft = left + "px" ;
  console.log(happyImage1.style.marginLeft);
}


function endGame() {
  if (score == maxScore) {
    console.log("Game won!");
    // TODO: add win event/animation
  } else {
    console.log("Game lost.");
    // TODO: add lose event/animation
  }

  // update buttons
  startButton.style.display = "inline-block";
  submitButton.style.display = "none";
}

// helper to randomly permute an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
