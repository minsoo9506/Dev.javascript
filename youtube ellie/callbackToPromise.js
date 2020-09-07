class UserStorage{
    loginUser(id, password){
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                if (id==='minsoo' && password=='dream'){
                    resolve(id);
                }else{
                    reject(new Error('not found'));
                }
            }, 1000);
        });
    }
    getRoles(user){
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                if(user=='minsoo'){
                    resolve({name:'minsoo',role:'admin'});
                }else{
                    reject(new Error('no access'));
                }
            },1000);
        });
    }
}

const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');

userStorage
.loginUser(id, password)
.then(userStorage.getRoles)
.then(user=>alert(`Hello ${user.name}, ${user.role}`))
.catch(console.log);