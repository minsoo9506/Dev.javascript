'use strict';

// 1. function declaration
// hoisting존재
function printHello(){
    console.log('Hello');
}
printHello();

// 2. parameters

// 3. default parameter (added in ES6)
function showMessage(message, from='you'){
    console.log(`from : ${from} message ${message}`);
}

// 4. rest parameters (added in ES6)
// 인자들이 배열로 전달된다
function printAll(...args){
    for (let i = 0; i < args.length ; i++){
        console.log(args[i]);
    }
}
printAll('dream','coding','ellie'); 

// 5. local scope
// 함수 내부에 있는 변수 : 지역변수 -> 밖에서는 접근 불가
// 전역변수는 어디서나 접근 가능

// 6. return a value

// 7. early return
// 현업스킬
function upgradeUser(user){
    if (user.point <= 10){
        return;
    }
    // long upgrade logic
}

// first-class function

// 1. function expression
const print = function(){
    console.log('print');
}

print();
anotherPrint() = print();

// 2. callback
// 아래에서 printY, printN 같은 함수
function Quiz(answer, printY, printN){
    if (answer === 'love you'){
        printY();
    } else {
        printN();
    }
}

// Arrow function
// always anonymous
const simple = () => console.log('simple!');
const add = (a,b) => a + b; // 우옹 return도 없어도 되는구만

// function(a,b){return a+b;}
// (a,b) => a+b;