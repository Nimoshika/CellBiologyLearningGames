var maxScore = 3;
var minScore = -3;
var questionDiv = document.getElementById("question");
var choicesDiv = document.getElementById("choices");

const startButton = document.getElementById("start");
startButton.addEventListener("click", start);
const submitButton = document.getElementById("submit");
submitButton.style.display = "none";
submitButton.addEventListener("click", checkAnswer);

var questions = window.questions;
var questionIndex;

function start() {
  // update buttons
  document.getElementById("start").textContent = "New game";
  startButton.style.display = "none";
  submitButton.style.display = "inline-block";

  score = 0;
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
  } else {
    swal("Incorrect", `${currentQuestion.explanation}`, "warning");
    score --;
  }
  console.log(`Score is now ${score}`);
  
  // TODO: add animation and display for score

  if (score == maxScore || score == minScore) { // terminate game upon reaching a certain score
    endGame();
    return;
  }

  questionIndex = (questionIndex + 1) % questions.length;
  displayQuestion();
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
