// JS는 synchronous
// 정해진 순서에 맞게 코드 실행되는 것
// excute the code block in order after hoisting

// 이렇게 하면 1 3 2 이렇게 나온다
// 이런게 비동기적인 실행방법
console.log(1);
setTimeout(function(){
    console.log(2);
}, 1000);
console.log(3);


// synchronous callback
function printImmediately(print){
    print();
}
printImmediately(()=>console.log('hello'));

// asnchronous callback
function printWithDelay(print, time){
    setTimeout(print, time);
}
printWithDelay(()=>console.log('async hello'), 1000);


// 콜백지옥체험
// 너무 복잡하다 다음시간에!! promise!!
class UserStorage{
    loginUser(id, password, onSuccess, onError){
        setTimeout(()=>{
            if(id==='minsoo' && password==='dream'){
                onSuccess(id);
            }else{
                onError(new Error('not found'));
            }
        },2000);
    }
    getRoles(user, onSuccess, onError){
        setTimeout(()=>{
            if(user=='minsoo'){
                onSuccess({name:'minsoo',role:'admin'});
            }else{
                onError(new Error('no access'));
            }
        },1000);
    }
}

const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');
userStorage.loginUser(
    id, 
    password, 
    user=>{
        userStorage.getRoles(
            user, 
            userWithRole=>{
                alert(`Hello ${userWithRole.name}, ${userWithRole.role}`);
            },
            error=>{
                console.log(error);
            }
            )
    },
    error=>{
        console.log(error);
    }
);