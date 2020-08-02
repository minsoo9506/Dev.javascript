// 3-5 object() 생성자
var foo = new Object();
foo.name = 'foo';
foo.age = 26;
console.log(typeof foo); // object
console.log(foo); // {name:'foo', age:30}

// 3-6 객체 리터럴
var foo = {
    name : 'song',
    age : 30
};

// 3-7 객체 프로퍼티
var foo = {
    name : 'song',
    age : 30
};
    // 읽기 
console.log(foo['name']) // song
console.log(foo.name) // song
console.log(foo.nickname) // undefined
    // 갱신
foo.name = 'kim';
console.log(foo['name']) // kim
    // 동적 생성
foo.weight = 70;
console.log(foo['weight'])

// 3-8 for in 
var foo = {
    name : 'song',
    age : 30
};
var prop;
for (prop in foo) {
    console.log(prop, foo[prop])
}

// delete
var foo = {
    name : 'song',
    age : 30
};

delete foo['name'];
console.log(foo['name']) // undefined
