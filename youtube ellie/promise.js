'use strict';

// promise
// Js에 내장되어있는 object
// 비동기적인 경우 사용!!


// 1. Producer
// promise 만들기
// callback함수 2개 필요
// 만들어지는 순간에 doing something 나옴
// -> when promise is created, the executor runs automatically
// 그렇다면 사용자가 버튼을 누른 뒤에 실행해야 하는 경우 유의

const promise = new Promise((resolve, reject)=>{
    // doing some heavy work (network, read files)
    console.log('doing something');
    setTimeout(()=>{
        resolve('minsoo');
        // reject(new Error('no network'));
    }, 2000);
});

// 위의 promise는 무언가 진행된 뒤에
// 잘 진행 된다면 resolve함수에 'minsoo' 전달

// 2. consumers
// promise 사용하기

// value에 resolve를 통해 minsoo 전달
// minsoo 나옴
// 위의 reject하면 no network
promise
    .then(value=>{
    console.log(value);
    })
    .catch(error=>{
        console.log(error);
    })
    .finally(()=>{console.log('done')});
    // finally는 성공실패 상관없이 실행

// 3. promise chaining
// then은 값을 전달해도 되고 다른 promise를 전달해도 된다
const fetchNumber = new Promise((resolve, reject)=>{
    setTimeout(()=>resolve(1), 1000);
});

fetchNumber
.then(num=>num*2)  
.then(num=>num*3)
.then(num=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>resolve(num-1), 1000);
    });
})
.then(num=>console.log(num)); // 5

// 4. 오류를 잘 처리 하자
const getHen = () =>
    new Promise((resolve, reject)=>{
        setTimeout(()=>resolve('닭'),1000);
});

const getEgg = hen =>
    new Promise((resolve, reject)=>{
        setTimeout(()=>reject(new Error('error! 달걀없음')),1000);
});

const cook = egg =>
    new Promise((resolve, reject)=>{
        setTimeout(()=>resolve('요리'),1000);
});

// 이렇게 값을 받아오는 경우 아래처럼 생략해서 가능
// 해당 부분 위에 catch하면 된다
getHen()
.then(getEgg)
.catch(error=>{
    return '메추리알';
})
.then(cook)
.then(console.log)
.catch(console.log);