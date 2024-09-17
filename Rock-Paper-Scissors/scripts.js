console.log("Hello, World!");
const choices = ["rock", "paper", "scissors"];
let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
    
    return choices[Math.floor(Math.random() * choices.length)];
}

function getHumanChoice() {
    let choice = prompt("Choose rock, paper, or scissors");

    return choice.toLowerCase();
}

function playRound(humanChoice, computerChoice) {

    if (humanChoice === computerChoice) {
        return "It's a tie!";

    } else if ((humanChoice === "rock" && computerChoice === "scissors") || (humanChoice === "paper" && computerChoice === "rock") || (humanChoice === "scissors" && computerChoice === "paper")) {

        humanScore++;
        return "You win! " + humanChoice + " beats " + computerChoice;
    } else {
        computerScore++;
        return "You lose! " + computerChoice + " beats " + humanChoice;
    }

}

const rockButton = document.querySelector("#btn-rock");
const paperButton = document.querySelector("#btn-paper");
const scissorsButton = document.querySelector("#btn-scissors");
const resetButton = document.querySelector("#btn-reset");
const resultPara = document.querySelector("#results");
const scoreCard = document.querySelector("#score");

rockButton.addEventListener("click",(e)=>{
    const result = playRound("rock", getComputerChoice());
    resultPara.innerHTML = result+"<br>" + resultPara.innerHTML;
    scoreCard.textContent = `Your score: ${humanScore} Computer score: ${computerScore}`;
});
paperButton.addEventListener("click",(e)=>{
    const result = playRound("paper", getComputerChoice());
    resultPara.innerHTML = result+"<br>" + resultPara.innerHTML;
    scoreCard.textContent = `Your score: ${humanScore} Computer score: ${computerScore}`;
});
scissorsButton.addEventListener("click",(e)=>{
    const result = playRound("scissors", getComputerChoice());
    resultPara.innerHTML = result+"<br>" + resultPara.innerHTML;
    scoreCard.textContent = `Your score: ${humanScore} Computer score: ${computerScore}`;
});

resetButton.addEventListener("click", (e)=>{
    humanScore = 0;
    computerScore = 0;
    scoreCard.textContent = "";
    resultPara.textContent = "";
});
// function playGame() {

//     for (let i = 0; i < 5; i++) {
//         const humanChoice = getHumanChoice();
//         const computerChoice = getComputerChoice();
//         const result = playRound(humanChoice, computerChoice);
//         alert(result);
//     }

//     alert("Your score: " + humanScore + " Computer score: " + computerScore);
// }

//playGame();