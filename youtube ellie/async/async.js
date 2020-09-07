// async & await
// promise를 깔끔하게 쓰게 해주는 것!

// 1. async
// 한줄한줄 동기적으로 처리하도록 하면
// 문제가 발생하는 경우 존재
// -> async쓰면 된다!
// -> 저절로 promise로 만들어준다
async function fetchUser(){
    // 10초정도 걸리는 과정..이라고 가정
    return 'minsoo';
}

const user = fetchUser();
user.then(console.log);
console.log(user);

// 2.await
// async가 붙은 함수안에서만 쓸 수 있다
function delay(ms){
    return new Promise(resolve=>setTimeout(resolve, ms));
}

async function getApple(){
    await delay(2000); // await이 delay가 2초지나면 promise만듬
    return 'apple';
}
async function getBanana(){
    await delay(2000); 
    return 'banana';
}
// 병렬처리 해보자
// 이렇게 하면 원해 4초걸리는데
// 2초에 해결!
async function PickFruits(){
    const applePromise = getApple();
    const bananaPromise = getBanana();
    const apple = await applePromise();
    const banana = await bananaPromise();
    return `${apple} + ${banana}`;
}

