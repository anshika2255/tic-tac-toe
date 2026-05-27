let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let gameOver = false;   // ✅ FIX ADDED

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Reset game
const resetGame = () => {
    turnO = true;
    gameOver = false;   // ✅ reset flag
    enableBoxes();
    msgContainer.classList.add("hide");
};

// Click handling
boxes.forEach((box) => {
    box.addEventListener("click", () => {

        if (gameOver) return;   // ✅ stop after win

        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;
        checkWinner();
    });
});

// Disable all boxes
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Enable all boxes
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// Show winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    gameOver = true;   // ✅ stop game
};

// Check winner
const checkWinner = () => {
    for (let pattern of winPatterns) {

        let pos1Val = boxes[pattern[0]].textContent.trim();
        let pos2Val = boxes[pattern[1]].textContent.trim();
        let pos3Val = boxes[pattern[2]].textContent.trim();

        console.log(pos1Val, pos2Val, pos3Val); // DEBUG

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("WINNER FOUND:", pos1Val);
                showWinner(pos1Val);
                return;
            }
        }
    }
};
            
// Buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);