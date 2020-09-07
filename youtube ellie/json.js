// JSON

// 1. Object to JSON
let json = JSON.stringify(true);
console.log(json); // true

json = JSON.stringify(['apple','banana']);
console.log(json);

const rabbit = {
    name: 'tori',
    color: 'white',
    size: null,
    birthDate: new Date(),
    jump: ()=>{
        console.log(`{this.name} can jump!`);
    }
};
// jump는 안 나온다
// JSON은 모든 언어에서 공통적으로 쓰이는 데이터 타입이기에
// 특정 언어에 있는 특징은 안나온다고 보면 된다
json = JSON.stringify(rabbit);
console.log(json);

json = JSON.stringify(rabbit, ['name']);  // name만 나온다
console.log(json);
// 더 세밀하게 통제하고 싶을 때 아래처럼 callback함수 사용
json = JSON.stringify(rabbit, (key, value)=>{
    console.log(`key : {key}, value : {value}`);
    return key === 'name' ? 'minsoo' : value;
});
console.log(json);

// 2. JSON to Object
console.clear();
json = JSON.stringify(rabbit);
const obj  = JSON.parse(json);

const obj_ = JSON.parse(json, (key, value)=>{
    return key === 'birthDate' ? new Date(value) : value;
});

console.log(obj_);

// 사이트
// JSON diff
// JSON Parser
// JSON Valdidator