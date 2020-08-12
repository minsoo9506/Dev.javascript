- 자바스크립트 데이터 타입
  - 기본타입
    - 숫자, 문자열, 불린값, null, undefined
  - 참조타입
    - 객체, 배열, 함수, 정규표현식

# 3.1 자바스크립트 기본 타입
- `var` 로 모든 변수 선언
- `typeof` 연산자 : 피연산자의 타입을 리턴

## 3.1.1 숫자
- 하나의 숫자형만 존재
  - 모든 숫자를 64비트 부동 소수점 형태로 저장
  - 따라서 정수, 실수 구분 x
  - 나머지 계산이 소수점까지 나온다

## 3.1.2 문자열
- 큰, 작은 따옴표로 생성
- 한 번 정의된 문자열은 수정이 불가 (읽기만 가능)

## 3.1.3 불린값
- `true, false` 
  
## 3.1.4 null과 nudefined
- 두 데이터 타입 모두 '값이 비어있음'을 나타낸다
- undefined
  - 기본적으로 값이 할당되지 않은 변수
  - 변수 자체의 값 또한 undefined
  - 즉, undefined는 타입이자 값을 나타낸다
- null
  - 개발자가 명시적으로 값이 비어있음을 나타내는데 사용
  - null 타입 변수를 `typeof` 로 보면 object 라고 나온다.
  
# 3.2 자바스크립트 참조 타입 (객체 타입)
- JS에서 기본 타입을 제외한 모든 값은 객체
- JS에서 객체
  - '이름 : 값' 형태의 property들을 저장하는 컨테이너
  - 자료구조 Hash와 유사
  - 여러 개의 property들을 포함할 수 있다
    - property들은 기본타입의 값을 포함하거나 다른 객체를 가르킬 수 있다
  - property는 함수로 포함할 수 있으며 이러한 property를 메서드 라고 한다

## 3.2.1 객체 생성
- JS의 객체 개념은 c++, java와 같이 클래스를 정의하고 인스턴스를 생성하는 과정과 다르다
- 클래스라는 개념이 없고 객체 리터럴이나 생성자 함수 등 별도의 생성 방식이 존재
- JS에서 객체 생성 방법
  - 기본 제공 `Object()` 객체 생성자 함수
  - 객체 리터럴
  - 생성자 함수

### 3.2.1.1 `Object()` 생성자 함수 이용

```javascript
var foo = new Object();
foo.name = 'foo';
foo.age = 26;
console.log(typeof foo); // object
console.log(foo); // {name:'foo', age:30}
```

### 3.2.1.2 객체 리터럴 방식 이용
- 중괄호를 이용하여 객체 생성
- property이름은 문자열이나 숫자
- 값은 JS의 값 어떤 것도 가능
  - 함수일 경우 메서드 라고 부름

```javascript
var foo = {
    name : 'song';
    age : 30;
}
```

### 3.2.1.3 생성자 함수 이용
- 함수를 통해 객체 생성
  - 이렇게 객체를 생성하는 함수를 생성자 함수
  - 이는 4장에서 자세히 공부

## 3.2.2 객체 프로퍼티 읽기/쓰기/갱신
- 객체는 새로운 값을 가진 프로퍼티를 생성하고
- 생성된 프로퍼티에 접근하여 해당 값을 읽거나 원하는 값으로 프로퍼티의 값을 갱신 가능
- 프로퍼티 접근 방법
  - 대괄호 표기법
  - 마침표 표기법

```javascript
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
```

## 3.2.3 for in 문, 객체 프로퍼티 출력

```javascript
var foo = {
    name : 'song',
    age : 30
};

var prop;
for (prop in foo) {
    console.log(prop, foo[prop])
}
```

## 3.2.4 객체 프로퍼티 삭제
- `delete` 연산자를 통해 프로퍼티 삭제
  - 단, 객체 자체를 삭제하는 것은 불가

```javascript
var foo = {
    name : 'song',
    age : 30
};

delete foo['name'];
console.log(foo['name']) // undefined
```

# 3.3 참조 타입의 특성
- 아래의 `objA` 변수는 객체 자체를 저장하는 것이 아니라 생성된 객체를 가리키는 참조값을 저장

```javascript
var objA = {
    val = 40
};

objB = objA;
objB.val = 20;

console.log(objB.val); // 20
console.log(objA.val); // 20
```

## 3.3.1 객체 비교
- 기본타입은 값을 비교, 참조타입은 참조값이 같아야 함

```javascript
var a = 10;
var b = 10;
var objA = {value:100};
var objB = {value:100};
var objC = objB;

console.log(a==b); // true
console.log(objA==objB); // false
console.log(objB==objC); // true
```

## 3.3.2 참조에 의한 함수 호출 방식
- 기본타입 : call by value
  - 즉, 함수의 인자로 들어가면 복사된 값이 전달
- 참조타입 : call by reference
  - 인자로 넘긴 객체의 참조값이 그대로 함수 내부로 전달

```javascript
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
```

# 3.4 프로토 타입
- 모든 객체는 자신의 부모 역할을 하는 객체와 연결되어 있다
- 부모 객체 = 프로토타입 (객체) 라 부른다
- 모든 객체는 자신의 프로토타입을 가리키는 [Prototype] 라는 숨겨진 프로퍼티를 갖는다
- 객체 리터럴 방식으로 생성된 객체 : Object.prototype 객체가 프로토타입
  - `console.dir(obj)`로 찍으면 `__proto__` 라는 프로퍼티 존재
- 자신의 프로토타입 객체에 포함된 메서드를 자신의 프로퍼티인 것처럼 상속받아서 사용가능

# 3.5 배열
- C, JAVA의 배열과 같은 기능을 하는 객체지만 크기를 지정하지 않아도 된다
- 어떤 위치에 어느 타입의 데이터를 저장하더라도 에러가 발생하지 않는다

## 3.5.1 배열 리터럴
- 대괄호 사용

```javascript
var colorArr = ['red', 'black'];
console.log(colorArr[0]);
```
## 3.5.2 배열의 요소 생성
```javascript
var emptyArr = []; // 배열 리터럴 로 생성
console.log(emptyArr[0]); // undefined
emptyArr[0] = 100;
emptyArr[3] = 'three';
emptyArr[7] = true;
console.log(emptyArr);
// [100, undefined*2, 'three', undefined*3, true]
console.log(emptyArr.length); // 8
```
## 3.5.3 배열의 `length` 프로퍼티
- 배열 원소의 개수를 나타내지만 실제로 배열에 존재하는 원소 개수와 일치하는 것은 아니다
- 배열 내에 가장 큰 인덱스에 1을 더한 값

```javascript
var arr = [];
console.log(arr.length); // 0
arr[0] = 0;
arr[1] = 1;
arr[100] = 100;
console.log(arr.length); // 101

var arr = [1,2,3];
console.log(arr.length); // 3
arr.length = 5;
console.log(arr); // [1,2,3,undefined*2]
```

### 3.5.3.1 배열 표준 메서드와 `length` 프로퍼티
- `push()` : 배열의 끝에 추가하는 표준 메서드

```javascript
var arr = ['zero','one'];
arr.push('two');
console.log(arr); // ['zero','one','two']
arr.length = 5;
arr.push('final');
console.log(arr);
// ['zero','one','two',undefined,'final']
```
## 3.5.4 배열과 객체
- 배열도 객체지만 차이점 존재
- 배열의 type도 object로 나온다
  - 배열의 경우 프로토타입이 Array.prototype 객체
  - Array.prototype 프로토타입이 Object.prototype

```javascript
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

console.dir(colorArr.__proto__);
console.dir(colorObj.__proto__);
```

## 3.5.5 배열의 프로퍼티 동적 생성
- index가 숫자말고 객체처럼 동적으로 프로퍼티를 추가할 수 있다
- 배열 length 프로퍼티는 가장 큰 index가 변했을 경우만 변경
- `console.dir(arr)` 해서 보면 배열도 객체처럼 'key' : 'value' 형태

```javascript
var arr = ['zero','one'];
console.log(arr.length); // 2

arr.color = 'red';
console.log(arr.length); // 2 (안변함)

console.dir(arr);
```
## 3.5.6 배열의 프로퍼티 열거
```javascript
for (var i=0; i<arr.length; i++){
    console.log(i, arr[i]);
}
```
## 3.5.7 배열 요소 삭제
- `delete` 를 사용하여 삭제하면 
  - 해당 위치에 `undefined` 할당
  - length의 값도 그대로
- 완전히 삭제를 하기 위해서는 `splice()` 배열 메서드 사용
  - `splice(start, deleteCount, item..)`
    - `start` : 배열에서 시작 위치
    - `deleteCount` : start에서 지정한 시작 위치부터 삭제할 요소의 수
    - `item` : 삭제할 위치에 추가할 요소

```javascript
var arr = ['zero','one','two'];
delete arr[1];
console.log(arr); // ['zeor',undefined, 'two']

arr.splice(1,1);
console.log(arr) // ['zero','two']
```

## 3.5.8 `Array()` 생성자 함수
- `Array()` 생성자 함수는 인자 개숫에 따라 동작이 다르다
  - 인자 1개이고 숫자 : 호출된 인자를 length로 갖는 빈 배열 생성
  - 그외의 경우 : 호출된 인자를 요소로 갖는 배열 생성
- `new` 연산자를 같이 써야한다

```javascript
var foo = new Array(3);
console.log(foo); // [undefined,undefined,undefined]
var bar = new Array(1,2,3);
console.log(bar); // [1,2,3]
```

## 3.5.9 유사 배열 객체
- 일반 객체에 length 프로퍼티 추가
  - 유사 배열 객체 (array-like objects)

# 3.6 기본 타입과 표준 메서드
- 기본 타입에서 메서드?
  - 기본값은 메서드 처리 순간에 객체로 변환
  - 각 타입별 표준 메서드 호출
  - 호출이 끝나면 다시 기본값으로 복귀

```javascript
var num = 0.5;
console.log(num.toExponential(1)); // 5.0e-1
console.log('test'.charAt(2)); // 5
```

# 3.7 연산자
## 3.7.1 + 연산자
- 더하기
- 문자열 연결

```javascript
var add1 = 1 + 2;
console.log(add1); // 3
var add2 = 1 + 'string';
console.log(add2) // 1string
```

## 3.7.2 `typeof` 연산자
- `typeof` 연산자 결과
  - 숫자 -> number
  - 문자열 -> string
  - 불린값 -> boolean
  - null -> object
  - undefined -> undefined
  - 객체 -> object
  - 배열 -> object
  - 함수 -> function

## 3.7.3 `==`(동등) 연산자와 `===`(일치) 연산자
- `==` 연산자의 경우 두 피연산자가 타입이 다르므로 같은 타입으로 변환해서 비교
- `===` 는 타입이 다른 경우 변경 x
  - 후자를 쓰는 것 추천
  
```javascript
console.log(1 == '1'); // true
console.log(1 === '1'); // false
```

## 3.7.4 `!!` 연산자
- 피연산자를 불린값으로 변환

```javascript
console.log(!!0); // false
console.log(!!1); // true
console.log(!!'str'); // true
console.log(!!''); // false
console.log(!!true); // true
console.log(!!null); // false
console.log(!!undefined); // false
console.log(!!{}); // true
```