//랜덤번호 지정
//유저가 번호를 입력한다. go라는 버튼을 누름
// 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다.
// 랜덤번호가 < 유저번호 down!!!
// 랜덤번호가 > 유저번호 up !!
// reset을 누르면 게임이 리셋된다.
// 5번의 기회를 다쓰면 게임이 끝난다. (더이상 추측 불가, 버튼이  disable)
// 유저가 1~100 범위 밖에 숫자를 입려하면 알려준다. 기회를 깍지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면 알려준다, 기회를 깍지 않는다.

let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("rest_button");
let chanceArea = document.getElementById("chance-area");
let chances = 5;
let gameOver = false;
let history = [];

console.log(playButton);

// 함수도 매개변수처럼 넘길 수 있다.
// addEventListener : 이벤트 이름, 이벤트 발생 시 실행함수
// click focus mouseover 등등
// play 함수를 실행하겠다라는 의미
// 변수로서 넘기고 ()는 넣어주지 않는다. 함수도 변수처럼 넘길 수 있다.
playButton.addEventListener("click", play);

resetButton.addEventListener("click", reset);

userInput.addEventListener("focus", function(){
    userInput.value = "";
})

function pickRandomNum (){
    computerNum = Math.floor(Math.random()*100)+1;
    console.log("번호",computerNum)
}

function play(){

    let userValue = userInput.value;
    
    // 유효성 검사
    if(userValue<1 || userValue>100){
        resultArea.textContent = "1과 100사이 숫자를 입력해주세요";
        return;
    }

    if(history.includes(userValue)){
        resultArea.textContent = "이미 입력한 숫자입니다 다른 숫자를 입력하세요";
        return;
    }
    chances --;
    // 백틱 : 동적 정적인 것을 같이 사용할때 사용
    chanceArea.textContent = `남은기회 :${chances}번`;
    console.log("chances : ",chances);

    console.log(userValue);
    if(userValue < computerNum){
        resultArea.textContent = "UP!!";
        
    }else if(userValue > computerNum){
        resultArea.textContent = "DOWN!!";
        
    }else{
        resultArea.textContent = "맞췄습니다!!";
        gameOver = true;
    }

    // 동일한 숫자를 넣었는제 확인
    history.push(userValue);

    console.log(history)

    if(chances < 1){
        gameOver = true;
    }

    if(gameOver == true){
        playButton.disabled = true;
    }
}

function reset(){
    // user input창이 깨끗하게 정리되고
    userInput.value = "";
    //새로운 번호가 생성
    pickRandomNum();
    
    resultArea.textContent = "결과값이 여기 나옵니다."
}

pickRandomNum();