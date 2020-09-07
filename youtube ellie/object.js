// object
// {key : value} 형태

// 1. literal, properties
const song = {name : 'minsoo', age : 26};
console.log(song.name);
// object 만드는 법
const obj1 = {}; // object literal
const obj2 = new Object(); // object constructor


// JS는 runtime에 타입이 결정
// 따라서 동적으로 수정가능
song.hasJob = false;
// 유지보수가 어려우니 가능하면 이렇게 nono

delete song.hasJob; // 지우기도 가능
console.log(song.hasJob);

// 2. computed properties
console.log(song['age']);
console.log(song.age);
// 둘의 차이?
// 일반적으로 . 을 사용하는게 맞지만
// 아래처럼 어떤 key를 이용할지 모를 때는 [] 사용
function printValue(obj, key){
    console.log(obj[key]);
}
printValue(song, 'age');

// 3. Property value shorthand
// 아래처럼 key와 value의 이름을 같게 한다면
// 줄여서 쓸 수 있다!! 와우...!
function Person(name, age){
    return {
        name,
        age
    };
};
const person1 = Person('minsoo','26');

// 4. constructor function
function Person_con(name, age){
    // this = {}; 이 생략됐다고 생각하면 된다
    this.name = name;
    this.age = age;
    // return this; 가 생략됐다고 생각하면 된다
};
const person2 = new Person_con('minoo', 26);
console.log(person2.name);

// 5. in operator
// key in obj
console.log('name' in Person_con); // true

// 6. for..in vs for..of
for(key in person1){
    console.log(key);
}
// 배열에 of 사용
let array = [1,2,3];
for(value of array){
    console.log(value);
};

// 7. Fun cloning
const user1 = {name : 'minsoo'};
const user2 = user1;
user2.name = 'kim';
console.log(user1); // name : 'kim' 으로 바뀜 -> not good

const user3 = {};
Object.assign(user3, user2);
console.log(user3.name); // kim

// 이렇게 해도 된다
const user4 = Object.assign({}, user2);
console.log(user4.name); // kim