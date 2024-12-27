let boxes = document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset-btn");
let newGamebtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turnX=true; //playerX,playerO
let count =0; //to track draw 

let arr=["apple","banana","litchi"];
//2D Array
let arr2=[["apple","litchi"],["potato","mushroom"],["pants","trousers"]];

const winPatterns =[ // these are winning patterns
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () =>{
    let turnX=true;
    count =0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) =>{
    box.addEventListener("click",() =>{
        if(turnX){ //playerX
            box.innerText="X";
            box.style.fontcolor="red";
            turnX=false;
        }else{ //playerO
            box.innerText = "O";
            turnX=true;
        }
        box.disabled =true; // to prevent change of value when clicked again
        count++;
        let isWinner = checkWinner();
        if(count ===9 && !isWinner){
            gameDraw();
        }
    });
} );
const gameDraw=()=>{
    msg.innerText=`Game was Drawn`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const showWinner=(winner)=>{
    msg.innerText=`Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner=() =>{
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText; // to print the winning pattern
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val !="" && pos2Val != "" && pos3Val !=""){ // position should not be empty
            if(pos1Val === pos2Val && pos2Val ===pos3Val){
                showWinner(pos1Val);//show winner function
            }
        }
    }
};

newGamebtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
