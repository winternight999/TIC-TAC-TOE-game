let boxes = document.querySelectorAll('.box');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let msg2 = document.querySelector('.msg2');
let container = document.querySelector('.container');
let newgame = document.querySelector('#newgame');
let resetgame = document.querySelector('#resetgame')

let turnO = true;
let lastWinner = "O";
let winnerFound = false; 

container.classList.remove("hide");
const winningPatterns = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("box was clicked");
    if (turnO) {
      box.innerText = "O"
      turnO = false;
    }else {
      box.innerText = "X"
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
    checkDraw();
  })
}); 
 
// check winner function
const checkWinner = () => {
  for(let pattern of winningPatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;
    
    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        console.log("winner",pos1val);
        showWinner(pos1val);
      };
    }
  }
};

// winner show krne ke liye 
const showWinner = (winner) => {
  winnerFound = true;
  lastWinner = winner;
   
  msg.innerText =`congratulation's ${winner} you won the game`;
  msgContainer.classList.remove("hide");
  container.classList.add("hide");
};
 
// draw match check krne ke 
const checkDraw = () => {
  console.log("function checked")
  let filledBox =0;
  
  boxes.forEach((box, index) => {
    if(box.innerText !== "") {
      filledBox++;
    }
  });
 console.log("filledBox = ", filledBox)
 console.log("winnerFound = ", winnerFound)
  
  if(filledBox === 9 && winnerFound === false) {
    console.log("game draw checked")
    msg2.classList.remove("hide")
  }
};

// const checkDraw = () => {
//   console.log("checkDraw FUNCTION CALLED ✔️");

//   let filledBox = 0;

//   boxes.forEach((box, index) => {
//     // console.log(`Box ${index}: "${box.innerText}"`);
//     if (box.innerText !== "") {
//       filledBox++;
//     }
//   });

//   // console.log("Filled Boxes = ", filledBox);
//   // console.log("winnerFound = ", winnerFound);

//   if (filledBox === 9 && winnerFound === false) {
//     // console.log("DRAW DETECTED ✔️ SHOWING DRAW MESSAGE");
//     msg2.classList.remove("hide");
//     // container.classList.add("hide");
//   }
// };

   
  // reset button game reset krne ke liye
const reset = () => {
  turnO = !turnO;
  
  boxes.forEach((box) => {
    box.innerText = "" ;
    box.disabled = false;
    msg2.classList.add("hide");
  })
};

// new game start krne ke liye
newgame.addEventListener("click", () => {
  if (lastWinner === "X") {
    turnO = true;
  }else {
  turnO = false;
  }
  msgContainer.classList.add("hide");
  container.classList.remove("hide");
  reset();
});

// reset function apply kiya addEventListener se 
resetgame.addEventListener("click", reset);