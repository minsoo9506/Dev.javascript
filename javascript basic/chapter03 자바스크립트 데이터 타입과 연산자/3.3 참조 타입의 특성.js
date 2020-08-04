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