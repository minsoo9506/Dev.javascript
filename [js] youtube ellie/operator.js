// 1. String concatenation
console.log('minsoo' + 'song'); // minsoosong
console.log(`string literal : 1 + 2 = ${1+2}`);

// 2. Numeric operators

// 3. Increment and decrement operators
let c = 1;
const preIncrement = ++c;
const postIncrement = c++;

// 4. Assignment operators
let x = 3;
x += 1; // -=, *=, /=
console.log(x); // 4

// 5. comparison operators
// <, >, <=, >=

// 6. Logical operators
// ||, && , !
// or, and 에서 조건들을 확인할때 앞조건에서 false가 되면 뒷조건 실행 x

// 7. Equality
const stringFive = '5';
const numberFive = 5;
// == : with type conversion
console.log(stringFive == numberFive); // true
// === : no type conversion
console.log(stringFive === numberFive); // false
// object equality by reference
const tmp1 = {name : 'minsoo'};
const tmp2 = {name : 'minsoo'};
const tmp3 = tmp1;
console.log(tmp1 == tmp2); // false
console.log(tmp1 === tmp2); // false
console.log(tmp1 == tmp3); // true
console.log(tmp1 === tmp3); // true

// 8. Conditional operators : if

// 9. Ternary operator : ?
// condition ? value1 : value2

// 10. Switch statement

// 11. Loops
// while, do while