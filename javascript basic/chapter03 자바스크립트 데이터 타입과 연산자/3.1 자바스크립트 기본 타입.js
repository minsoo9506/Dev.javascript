// var 라는 키워드로만 변수 선언
var intNum = 10;
var singleQuoteStr = 'single quote string'
var boolVar = true;
var emptyVar;
var nullVar = null;

console.log(
    typeof intNum, 
    typeof singleQuoteStr,
    typeof boolVar,
    typeof emptyVar,
    typeof nullVar
);

// 나눗셈
var num = 5 / 2;
console.log(num); // 2.5
console.log(Math.floor(num)); // 2

// 문자열
var str = 'hi';
console.log(str[0], str[1]) // hi
str[0] = H;
console.log(str); // hi : 수정불가

// null 타입 변수 체크
var nullVar = null;
console.log(nullVar == null); // true
console.log(typeof nullVar == null); // false