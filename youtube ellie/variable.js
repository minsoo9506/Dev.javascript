// 1. Use strict
// added in ES5
'use strict';

// 2. Variable
// let
// added in ES5
// don't use var
let varExample = 'minsoo';

// 3. Constant
// use const whenever possible
const immutable = 7;

// 4. Variable types
// number
// string
const template_literals = `hi I'm ${varExample}`;
// boolean
// null
// undefined
let x;
console.log(typeof x); // undefined
// symbol : create unique indetifiers for objects
const symbol1 = Symbol('id');
const symbol2 = Symbol('id');
console.log(symbol1 === symbol2); // false
const symbol3 = Symbol.for('id');
const symbol4 = Symbol.for('id');
console.log(symbol3 === symbol4); // true
console.log(symbol1.description); // id , 값을 보기 위해서 description
// object
const minsoo = {name : 'songminsoo', age : 26};
minsoo.age = 27;
console.log(minsoo.age); // 27

// 5. dynamic typing : dynamically typed language
let text = 'hello';
text = 1;
console.log(`value : ${text} type : ${typeof text}`); // 1, number
text = '7' + 5;
console.log(`value : ${text} type : ${typeof text}`); // 75, string
text = '8' / '4';
console.log(`value : ${text} type : ${typeof text}`); // 2, number