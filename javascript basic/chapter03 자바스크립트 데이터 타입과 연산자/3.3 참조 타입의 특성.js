// 3-9 동일한 객체를 참조하는 두 변수
var objA = {
    val = 40
};

objB = objA;
objB.val = 20;

console.log(objB.val); // 20
console.log(objA.val); // 20

// 3-10 기본, 참조 타입의 비교 연산
var a = 10;
var b = 10;
var objA = {value:100};
var objB = {value:100};
var objC = objB;

console.log(a==b); // true
console.log(objA==objB); // false
console.log(objB==objC); // true

// 3-11
var a = 10;
var objA = {value:10};

function changeArg(num, obj) {
    num = 200;
    obj.value = 200;

    console.log(num);
    console.log(obj);
}

changeArg(a, objA);
// 200
// {value:200}
console.log(a); // 10
console.log(objA); // 200

// 3-12 객체 생서 및 출력
var foo {
    value : 100,
    name : 'song'
};
console.log(foo.toString());
console.dir(foo);

// 3-13 배열 리터럴을 통한 배열 생성
var colorArr = ['red', 'black'];
console.log(colorArr[0]);

// 3-14 배열 요소의 동적 생성
var emptyArr = [];
console.log(emptyArr[0]); // undefined
emptyArr[0] = 100;
emptyArr[3] = 'three';
emptyArr[7] = true;
console.log(emptyArr);
// [100, undefined*2, 'three', undefined*3, true]
console.log(emptyArr.length); // 8

// 3-15 배열의 length 프로퍼티 변경
var arr = [];
console.log(arr.length); // 0
arr[0] = 0;
arr[1] = 1;
arr[100] = 100;
console.log(arr.length); // 101

// 3-16 배열 length 프로퍼티의 명시적 변경
var arr = [1,2,3];
console.log(arr.length); // 3
arr.length = 5;
console.log(arr); // [1,2,3,undefined*2]

// 3-17 push() 메서드
var arr = ['zero','one'];
arr.push('two');
console.log(arr); // ['zero','one','two']
arr.length = 5;
arr.push('final');
console.log(arr);
// ['zero','one','two',undefined,'final']

// 3-18 배열과 객체의 유사점과 차이점
var colorArr = ['red', 'black'];
console.log(colorArr[0]); // red

var colorObj = {
    '0' : 'red',
    '1' : 'black'
};
console.log(colorObj[0]); // red
// 문자로 안하고 숫자로 해도 문자열로 변환해서 return 해준다

console.log(typeof colorArr); // object
console.log(typeof colorObj); // object

console.log(colorObj.length); // undefined

// 3-20 배열의 동적 프로퍼티 생성
var arr = ['zero','one'];
console.log(arr.length); // 2

arr.color = 'red';
console.log(arr.length); // 2

console.dir(arr);

// 3-21 배열 프로퍼티 열거
for (var i=0; i<arr.length; i++){
    console.log(i, arr[i]);
}

// 3-23
var arr = ['zero','one','two'];
delete arr[1];
console.log(arr); // ['zeor',undefined, 'two']

arr.splice(1,1);
console.log(arr) // ['zero','two']

// 3-24 Array() 생성자
var foo = new Array(3);
console.log(foo); // [undefined,undefined,undefined]
var bar = new Array(1,2,3);
console.log(bar); // [1,2,3]

// 3-25,26 유사 배열 객체의 배열 메서드 호출
var obj = {
    name : 'foo',
    length : 1
};
obj.push(); // error
Array.prototype.push.apply(obj, ['bebe']);
console.log(obj); // {'1':'bebe', name:'foo', length:2}

// 3-27 기본 타입 변수에서의 메서드 호출
var num = 0.5;
console.log(num.toExponential(1)); // 5.0e-1
console.log('test'.charAt(2)); // 5

// 3-29 동등 연산자, 일치 연산자
console.log(1 == '1'); // true
console.log(1 === '1'); // false

// 3-30 !! 연산자
console.log(!!0); // false
console.log(!!1); // true
console.log(!!'str'); // true
console.log(!!''); // false
console.log(!!true); // true
console.log(!!null); // false
console.log(!!undefined); // false
console.log(!!{}); // true