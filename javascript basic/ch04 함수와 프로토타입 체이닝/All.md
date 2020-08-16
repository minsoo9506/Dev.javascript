# 4.1 함수 정의
- 함수를 생성하는 방법 : 모두 같은 함수를 생성하지만 함수 동작에서 미묘한 차이존재
  - 함수 선언문 function statement
  - 함수 표현식 function expression
  - `Function()` 생성자 함수

## 4.1.1 함수 리터럴
- 함수리터럴은 크게 4부분
```javascript
function add(x,y) {
    return x+y;
}
```
- function 키워드 
- 함수명 
  - 선택사항이라 함수명이 없는 익명 함수도 가능
- 매개변수 리스트
- 함수몸체
  
## 4.1.2 함수 선언문 방식으로 함수 생성하기
- 함수 리터럴 형태와 같지만
  - 반드시 함수명이 정의되어 있어야 한다

```javascript
function add(x,y) {
    return x+y;
}
```

## 4.1.3 함수 표현식 방식으로 함수 생성하기
- 함수리터럴로 함수를 만들고
  - 여기서 생성된 함수를 변수에 할당하여 함수를 생성

```javascript
var add = function (x,y) {
    return x + y;
}; // 함수표현식에서는 세미콜론으로 끝낸다

var plus = add;

console.log(add(3,4)); // 7
console.log(plus(3,4)); // 7
```
- 위에서 `add` 변수를 함수리터럴로 생성한 함수를 참조하는 변수 (함수변수)
  - 함수 이름이 아니다
- 위처럼 이름이 없는 함수를 익명함수(anonynous function)이라고 한다
- 익명함수는 함수변수에 함수 호출 연산자인 `()` 를 붙여서 사용
  
```javascript
var add = function sum(x,y){
    return x + y;
};

console.log(add(3,4));
console.log(sum(3,4)); // error
// sum is not defined
```
- 위와 같이 이름이 포함된 함수표현식 = 기명 함수 표현식 
- `sum()` 함수호출하면 에러
  - 함수표현식에서 사용된 함수 이름이 외부코드에서 접근 불가능
- 함수표현식에서 함수이름은 선택적
  - 하지만 함수이름을 이용하여 재귀호출 가능

```javascript
var fac = funciton factorial(n) {
    reuturn n * factorial(n-1);
};
```

## 4.1.4 `Function()` 생성자 함수를 통한 함수 생성하기
- 함수리터럴 방식도 내부적으로는 `Function()` 생성자함수로 생성
  - 하지만 생성자함수를 자주 사용 x
  - `new` 를 앞에
  
```javascript
var add = new Function('x','y','return x+y');
```

## 4.1.5 함수 호이스팅
- 함수 표현식만을 사용할 것을 권하고 있는데
  - 이유 중의 하나가 함수 호이스팅 (Function Hoisting)
- 함수 선언문으로 정의한 함수의 유효범위가 코드의 맨 처음부터 시작
  - 아래의 경우처럼 잘 된다
  
```javascript
add(2,3); // 5

function add(x,y) {
    return x+y;
}
```
- 하지만 함수 표현식 방식은 그렇지않다
  - 이게 바람직하다

```javascript
add(2,3); // uncaught type error

var add = function(x,y) {
    return x+y;
};

add(2,3) // 5
```
- 이처럼 함수 호이스팅이 발생하는 원인은
  - 변수생성과 초기화 작업이 분리되서 진행되기 때문 (5장)

# 4.2 함수 객체 : 함수도 객체다

## 4.2.1 자바스크립트에서는 함수도 객체다
- 함수의 기본기능인 코드 실행뿐만 아니라
  - 일반 객체처럼 프로퍼티들을 가질 수 있다
- 함수코드는 함수객체의 '[[Code]] 내부 프로퍼티'에 저장

```javascript
function add(x,y) {
    return x+y;
}

add.result = add(3,2);
add.status = 'good';

console.log(add.result); // 5
console.log(add.status); // good
```

## 4.2.2 자바스크립트에서 함수는 값으로 취급된다
- JS 함수는 다음과 같은 동작이 가능
  - 리터럴에 의해 생성
  - 변수나 배열의 요소, 객체의 프로터티 등에 할당 가능
  - 함수의 인자로 전달 가능
  - 함수의 리턴값으로 리턴 가능
  - 동적으로 프로퍼티를 생성 및 할당 가능
- JS에서는 함수를 일급객체(First Class) 라고 부른다

### 4.2.2.1 변수나 프로퍼티의 값으로 할당
```javascript
// 변수에 함수할당
var bar = function () {return 100;};
console.log(bar()); // 100
// 프로퍼티에 함수할당
var obj = {};
obj.baz = function () {return 100;};
console.log(obj.baz()); // 100
```

### 4.2.2.2 함수 인자로 전달
```javascript
var foo = function(func){
    func();
};

var bar = function () {console.log('hi')};
foo(bar);
```

### 4.2.2.3 리턴값으로 활용
```javascript
var foo = function() {
    return function() {
        console.log('this function is return value')
    };
};

var bar = foo();
bar(); // this function is return value
```

## 4.2.3 함수 객체의 기본 프로퍼티
- 일반 객체와는 다르게 추가로
  - 함수 객체만의 표준 프로퍼티 가 정의
- `length`, `prototype` 프로퍼티를 갖는다
- 이외에도 `name,caller,argument,__proto__` 
- 프로토타입 객체 : Function.prototype

### 4.2.3.1 `length` 프로퍼
- 함수객체의 `length` 프로퍼티는
  - 함수를 작성할 때 정의한 인자 개수

### 4.2.3.2 `prototype` 프로퍼티
- JS에서는 함수를 생성할 때
  - 함수 자신
  - 그리고 자신과 연결된 프로토타입 객체를 동시 생성
- 함수객체의 `prototype` 프로퍼티는 
  - 함수가 생성될 때 만들어진다
  - 함수객체와 연결된 프로토타입 객체를 참조
- 프로토타입 객체의 프로퍼티는 `constuctor` 만을 가지며
  - `constructor` 는 생성한 함수를 참조

```javascript
function add(x,y) {
    return x+y;
};

console.log(add.prototype);
// 함수객체와 연결된 프로토타입 객체를 참조
console.log(add.prototype.constructor);
// 생성한 함수를 참조, 여기서는 add 함수
```

# 4.3 함수의 다양한 형태
- 익명함수의 대표적인 용도 : 콜백함수
- 콜백함수
  - 개발자는 함수를 등록하기만 하고 어떤 이벤트가 발생한 경우 시스템에서 호출되는 함수 
  - 특정 함수의 인자로 넘겨서, 코드 내부에서 호출되는 함수

```javascript
// 이벤트 핸들러 예제
// window를 키면 alert
window.onload = function() {
    alert('This is the callback funciton');
};
```

## 4.3.2 즉시 실행 함수 (immediate function)
- 함수를 정의함과 동시에 바로 실행하는 함수
- 함수리터럴을 괄호로 둘러싼다 (이름은 상관없다)
- 그리고 바로 호출 될 수 있도록 괄호를 추가한다
  - 필요한 인자가 있을 경우 이 괄호에 넣는다

```javascript
(function(name){
    console.log('This is immediate : ', name);
})('fod');
```
- JS 라이브러리나 프레임워크 소스들에서 사용된다
- 함수 내부에서 정의된 매개변수와 변수들은 코드 내부에서만 유효
  - 전역 네임스페이스를 더럽히지 않을 수 있다

## 4.3.3 내부 함수 (inner function)
- 함수 내부에 정의된 함수
- 클로저를 생성하거나 (5장에서 자세히)
- 부모 함수 코드에서 외부에서의 접근을 막고 독립적인 헬퍼함수를 구현하는 용도 등 

```javascript
function parent () {
    var a = 100;
    var b = 200;

    function child () {
        var b = 300;
    
        console.log(a);
        console.log(b);
    }
    child();
}

parent();
// 100
// 300
child();
// Uncaught ReferenceError: child is not defined
```
- 내부 함수에서는 자신을 둘러싼 부모 함수의 변수에 접근이 가능
- 내부 함수는 일반적으로 자신이 정의된 부모 함수 내부에서만 호출 가능

```javascript
function parent() {
    var a = 100;

    var child = function() {
        console.log(a);
    };

    return child;
}

var inner = parent();
inner(); // 100
```
- 내부함수를 return 값으로 지정하였다
- `inner` 변수가 `child()` 내부 함수를 참조
- `parent()` 같은 부모함수 스코프의 변수를 참고하는 `inner()`와 같은 함수 : 클로저
  
## 4.3.4 함수를 리턴하는 함수
- 이를 이용하여
  - 함수를 호출함과 동시에 다른 함수로 바꾸거나
  - 자기 자신을 재정의하는 함수를 구현할 수 있다

```javascript
var self = function() {
    console.log('a');
    return function() {
        console.log('b');
    }
}
self = self();
self();
// a
// b
```

# 4.4 함수 호출과 this

## 4.4.1 araguments 객체
- 함수를 호출할 때 함수형식에 맞춰 인자를 넘기지 않더라도 에러가 발생하지 않는다

 ```javascript
function func(arg1, arg2) {
    console.log(arg1, arg2);
}

func();      // undefined undefined
func(1);     // 1, undefined
func(1,2);   // 1, 2
func(1,2,3); // 1, 2
 ```
- arguments 객체
  - 함수를 호출할 때 넘긴 인자들이 배열 형태로 저장된 객체
    - 실제 배열이 아닌 유사 배열 객체
  - `console.dir` 을 통해 살펴보면 argument객체는 3부분
    - 함수를 호출할 때 넘겨진 인자 (배열 형태)
    - length 프로퍼티 : 호출시 넘겨진 인자의 개수
    - callee 프로퍼티 : 현재 실행중인 함수의 참조값 (아래에서는 `add()` 함수)

```javascript
function add(a, b) {
    console.dir(arguments);
    return a+b;
}

console.log(add(1));
console.log(add(1,2));
console.log(add(1,2,3));
```
- 매개변수 개수가 정확하게 정해지지 않은 함수를 구현하거나
- 전달된 인자의 개수에 따라 서로 다른 처리를 해줘야하는 함수 개발에 유용

```javascript
function sum() {
    var result = 0;
    for(var i = 0; i < arguments.length; i++){
        result += arguments[i];
    }
    return result;
}

console.log(sum(1,2,3));
console.log(sum(1,2,3,4,5,6,7));
```
## 4.4.2 호출 패턴과 this 바인딩
- JS에서 함수를 호출할 때
  - 매개변수로 전달되는 인자값에 더해
  - 앞서 설명한 argument 객체 및 this 인자가 함수 내부로 전달
    - this를 이해하기 어려운 이유는 함수 호출 방식에 따라 this가 다른 객체를 참조하기 때문
  
### 4.2.2.1 객체의 메서드 호출할 때 this 바인딩
- 객체의 프로퍼티가 함수 -> 이 함수를 메서드라 한다
  - 메서드를 호출할 때 this는
  - 해당 메서드를 호출한 객체로 바인딩 된다

```javascript
var myObject = {
    name : 'my',
    sayName : function(){
        console.log(this.name);
    }
};

var otherObject = {
    name : 'other'
};

otherObject.sayName = myObject.sayName;

myObject.sayName(); // my
otherObject.sayName(); // other
```

### 4.2.2.2 함수를 호출할 때 this 바인딩
- 함수를 호출하면
  - this는 전역 객체에 바인딩
  - 브라우저에서 JS를 실행하는 경우 전역 객체는 window 객체
- JS의 모든 전역 변수는 실제로는 전역 객체의 프로퍼티

```javascript
var foo = 'global';
console.log(window.foo); // global

var func = function(){
    console.log(this.foo);
};

func(); // global
```
- 이러한 this 바인딩 특성은
  - 내부함수 inner function 을 호출했을 경우에도 그대로 적용
- 아래의 결과는 예상과는 다소 다른 결과가 나온다
  - JS에서 내부함수 호출패턴을 정의해 놓지 않기 때문
  - 내부함수도 결국 함수이므로 이를 호출할때 함수호출로 취급
  - this가 전역객체 window에 바인딩
```javascript
var value = 100;

var myObj = {
    value : 1,
    func1 : function() {
        this.value += 1;
        console.log('func1 called. this.value:'+ this.value);
    
        func2 = function() {
            this.value += 1;
            console.log('func2 called. this.value:'+ this.value);
        
            func3 = function() {
                this.value += 1;
                console.log('func3 called. this.value:'+ this.value);    
            }
            func3();
        }
        func2();
    }
};

myObj.func1();
//  2
// 101
// 102
```
- 내부함수들이 전역변수가 아닌 해당 객체의 값을 바인딩하기 위해서는 this를 다른 변수에 할당
  - 주로 that으로 한다
```javascript
var value = 100;

var myObj = {
    value : 1,
    func1 : function() {
        var that = this;
        this.value += 1;
        console.log('func1 called. this.value:'+ this.value);
    
        func2 = function() {
            that.value += 1;
            console.log('func2 called. this.value:'+ that.value);
        
            func3 = function() {
                that.value += 1;
                console.log('func3 called. this.value:'+ that.value);    
            }
            func3();
        }
        func2();
    }
};

myObj.func1();
// 2
// 2
// 4
```

### 4.4.2.3 생성자 함수를 호출할 때 this 바인딩
- 기존 함수에 `new` 연산자를 붙여서 호출하면 해당 함수는 생성자 함수로 동작
  - 생성자 함수 코드 내부에서 this는 앞에서본 메서드와 함수호출 방식에서의 this 바인딩과는 다르게 동작
- 이를 정확히 이해하기 위해 생성자 함수 호출 동작방식을 알아보자

- [생성자 함수가 동작하는 방식]
  - 1. 빈 객체 생성 및 this 바인딩
    - 생성자 함수 코드가 실행되기 전, 빈 객체 생성
    - 이 객체가 생성자 함수가 새로 생성하는 객체
    - 생성자 함수 코드 내부에서 this는 이 객체를 가르킴
    - 엄밀히 말하면 빈 객체는 아님
    - 부모 객체와 연결되어 있기에 프로퍼티, 메서드 사용가능
    - 생성자 함수가 생성한 객체는 자신을 생성한 생성자함수의 prototype 프로퍼티가 가리키는 객체를 자신의 프로토타입 객체로 설정
  - 2. this를 통한 프로퍼티 생성
    - 함수 코드 내부에서 this를 사용하여
    - 앞에서 생성된 빈 객체에 동적으로 프로퍼티, 메서드 생성가능
  - 3. 생성된 객체 리턴
    - 리턴문이 없을 경우, this로 바인딩된 새로 생성한 객체가 리턴된다
    - 리턴값이 새로 생선한 객체(this)가 아닌 다른 객체를 반환하는 경우, 생성자함수를 호출했다고 하더라도 this가 아닌 해당 객체가 리턴

```javascript
var Person = function (name) {
    this.name = name;
}

var foo = new Person('foofoo');
console.log(foo.name); // foofoo
```

- [객체 리터럴 방식과 생성자 함수를 통한 객체 생성 방식의 차이]
  - 객체 리터럴 방식으로 생성된 객체는 같은 형태의 객체를 재생성 불가
  - JS 객체는 자신을 생성한 생성자 함수의 prototype 프로퍼티가 가리키는 객체를 자신의 프로토타입 객체로 설정
    - 객체 리터럴 : 객체 생성자 함수는 `Object()`
    - 생성자 함수 : 생성자 함수 자체

```javascript
var foo = {
    name: 'foo',
    age: 35,
    gender: 'man'
};
console.dir(foo);

var Person = function (name, age, gender, position) {
    this.name = name;
    this.age = age;
    this.gender = gender;
}

var bar = new Person('bar', 22, 'woman');
console.dir(bar);

var barz = new Person('barz', 25, 'woman');
console.dir(barz);
```

- [생성자 함수를 new를 붙이지 않고 호출할 경우]
  - 오류발생 가능성
    - 일반함수호출과 생성자함수 호출시 this 바인딩 방식이 달라서

```javascript
var Person = function (name, age, gender, position) {
    this.name = name;
    this.age = age;
    this.gender = gender;
}

var qux = Person('qux', 20, 'man');
console.log(qux); // undefined
// 생성자함수 : 별도의 리턴값이 없으면 새로 생성된 객체가 리턴
// 일반함수 : undefined가 리턴

console.log(window.name); // qux
console.log(window.age); // 20
console.log(window.gender); // man
```
- 일반적으로 생성자함수는 처음 대문자

### 4.4.2.4 call과 apply 메서드를 이용한 명시적인 this 바인딩
- JS의 내부적인 this 바인딩이 아닌 특정 객체에 명시적으로 바인딩하게 하는 메서드
  - `apply()`
  - `call()`
- 형태
  - `myfunction.apply(myObject, array)`
    - 함수를 호출하면서 this를 `myObject`로 바인딩
    - `array`는 함수의 인자 배열
  - `myfunction.call(myObject, arr1, arr2..)`
    - 똑같은데 인자를 배열이 아니라 각각 넣는다
  
```javascript
function Person(name, age){
    this.name = name;
    this.age = age;
}

var foo = {}; // 빈 객체
Person.apply(foo, ['foo', 26]);
console.dir(foo);
```
- 이들의 대표적인 용도
  - 유사 배열 객체에서 배열 메서드를 사용하는 경우

```javascript
function myF(){
    console.dir(arguments);
    // arguments.shift(); 이거는 에러발생
    var args = Array.prototype.slice.apply(arguments);
    console.dir(args);
}

myF(1,2,3);
```

## 4.4.3 함수 리턴
- JS 함수는 항상 리턴값을 반환
- return문을 사용하지 않았더라도 아래의 규칙으로 항상 전달
  
### 4.4.3.1 규칙 1) 일반 함수나 메서드는 리턴값을 지정하지 않을 경우, undefined 값이 리턴된다

```javascript
var noReturnFunc = function(){
    console.log('No return!');
}
var result = noReturnFunc();
console.log(result);
// No return!
// undefined
```

### 4.4.3.2 규칙 2) 생성자 함수에서 리턴값을 지정하지 않을 경우 생성된 객체가 리턴된다
- 그래서 일반적으로는 return 지정을 하지 않는다
- 예외적으로
  - 다른 객체 리턴하는 경우
- 생성자 함수의 리턴값으로 넘긴 값이 객체가 아닌 불린, 숫자, 문자열의 경우 : 리턴값 무시

```javascript
function Person(name, age){
    this.name = name;
    this.age = age;

    return {name:'song',age:26};
}

tmp = Person('kim',17);
console.dir(tmp.name); // song
console.dir(tmp.age);  // 26
```

# 4.5 프로토타입 체이닝

## 4.5.1 프로토타입의 두 가지 의미
- JS는 여타 객체지향 프로그래밍 언어와는 다른 **프로토타입 기반의 객체지향 프로그래밍**
- 클래스 개념 x
- 대신 객체리터럴, 생성자 함수로 객체 생성
- 모든 객체는 부모인 프로토타입 객체를 가르키는 참조 링크 형태의 숨겨진 프로퍼티가 있다 : 이런 링크를 implicit prototype link
  - 이러한 링크는 모든 객체의 [[Prototype]] 프로퍼티에 저장
- 여기서 주의
  - 4.2.3.2 prototype 프로퍼티 에서 설명했던 함수 객체의 prototype 프로퍼티와
  - 객체의 숨은 프로퍼티인 [[Prototype]] 링크를 구분해라!

```javascript
function Person(name){
    this.name = name;
}

var foo = new Person('song');
console.dir(Person);
console.dir(foo);
```
- `Person()` 생성자 함수는 `prototype` 프로퍼티로 자신과 링크된 프로토타입 객체(`Peron.prototype`)를 가리킨다.
- 생성된 객체 `foo`는 `Person()` 함수의 프로토타입 객체를 [[Prototype]] 링크로 연결
  - 원래 내부적으로만 사용된다고 명시하고 있지만
  - 크롬에서는 `__proto__` 프로퍼티로 명시적으로 제공
  - 따라서 `__proto__` 와 [[Prototype]] 프로퍼티는 같다고 간주하면 된다
- `Person()` 생성자 함수의 `prototype` 프로퍼티와 `foo` 객체의 `__proto__` 프로퍼티가 같은 프로토타입 객체를 가리키고 있다는 것을 알 수 있다

## 4.5.2 객체 리터럴 방식으로 생성된 객체의 프로토타입 체이닝
- 프로토타입 체이닝
  - 자신의 부모 역할을 하는 프로토타입 객체의 프로퍼티 또한 접근 가능

```javascript
var my = {
    name : 'foo',
    sayName : function(){
        console.log('Name : ' + this.name)
    }
};

console.log(my.hasOwnProperty('name')); // true
```
- `hasOwnProperty()` 메서드는 인자로 넘긴 문자열 이름의 프로터티, 메서드가 있는지 체크하는 JS 표준 API 함수
- 3.2.1 객체 생성에서 설명했듯이 객체 리터럴로 생성한 객체는 Object()라는 내장 생성자 함수로 생성된다
  - Object() 함수도 함수 객체 이므로 prototype이라는 프로퍼티 속성이 있다
  - 따라서 객체 리터럴 형태의 `my` 객체는 Object() 함수의 prototype 프로퍼티가 가리키는 Object.prototype 객체를 자신의 프로토타입 객체로 연결
- JS에서 특정 객체의 프로퍼티, 메서드가 없다면 [[Prototype]] 링크를 따라 자신의 부모 역할을 하는 프로토타입 객체의 포로퍼티를 차례로 찾는다 : 프로토타입 체이닝

## 4.5.3 생성자 함수로 생성된 객체의 프로토타입 체이닝
- 리터럴과 조금 다르다
- 원래 Person.prototype은 constructor 프로퍼티만 있지만
  - Person.prototype 또한 객체이므로 [[Prototype]]이 Object.prototype을 가르키기에 아래처럼 `true`

```javascript
function Person(name, age){
    this.name = name;
    this.age = age;
}

var foo = new Person('foo', 25);

console.log(foo.hasOwnProperty('name')); // ture
```

## 4.5.4 프로토타입 체이닝의 종점
- Object.prototype 객체는 프로토타입 체이팅의 종점
- 모든 JS 객체는 Object.prototype 객체 프로퍼티, 메서드 접근가능

## 4.5.5 기본 데이터 타입 확장
- Object.prototype에 정의된 메서드들은 JS의 모든 객체의 표준 메서드
- 같은 방식으로 숫자, 문자열, 배열 등에서 사용되는 표준메서드들의 경우, Number.prototype, String.prototype, Array.prototype 등에 정의
  - 물론 이들도 Object.prototype을 프로토타입으로 가짐
- JS는 위와 같은 prototype에 사용자가 직접 정의한 메서드들을 추가하는 것을 허용 

```javascript
String.prototype.testMethod = function(){
    console.log('This is test.');
};

var str = 'is this test?';
str.testMethod(); //This is test.
```

## 4.5.6 프로토타입도 자바스크립트 객체다
- 함수가 생성될 때
  - constructor 프로퍼티만 있는 프로토타입 객체도 일반 객체처럼 동적으로 프로퍼티를 추가/삭제 가능

```javascript
var Person = function(name){
    this.name = name;
}
var foo = new Person('foo');
// foo.sayHello();
Person.prototype.sayHello = function(){
    console.log('Hello');
};
foo.sayHello(); // Hello
```

## 4.5.7 프로토타입 메서드와 this 바인딩
- 프로토타입 메서드 내부에서 this를 사용한다면
  - 4.4.2.1 에서와 설명한 this 규칙을 그대로 따른다
- 결국, 그 메서드를 호출한 객체에 바인딩

```javascript
function Person(name){
    this.name = name;
}

Person.prototype.getName = function(){
    return this.name;
};

var foo = new Person('foo');
console.log(foo.getName()); // foo

Person.prototype.name = 'hi';
console.log(Person.prototype.getName()); // hi
```

## 4.5.8 디폴트 프로토타입은 다른 객체로 변경이 가능하다
- 디폴트 프로토타입 객체는 함수가 생성될 떄 같이 생성
  - 함수의 prototype 프로퍼티에 연결
- JS는 디폴트 프로토타입 객체를 다른 일반 객체로 변경하는 것이 가능 (6장에서 더 깊게)
- 생성자 함수의 프로토타입 객체가 변경되면
  - 변경된 시점 이후에 생성된 객체들은 변경된 프로토타입 객체로 연결
  - 반면에 변경 이전에 생성된 객체들은 그대로!

```javascript
function Person(name){
    this.name = name;
}
console.log(Person.prototype.constructor); // Person(name)

var foo = new Person('foo');
console.log(foo.country); // undefined

Person.prototype = {
    country : 'korea'
};
console.log(Person.prototype.constructor); // Object()

var bar = new Person('bar');
console.log(foo.country); // undefined
console.log(bar.country); // korea
```

## 4.5.9 객체의 프로퍼티 읽기나 메서드를 실행할 때만 프로토타입 체이닝이 동작한다
- 당연한 말이다
  - 객체에 있는 프로퍼티 값을 쓰려고 한다면 프로토타입 테이닝이 일어나지 않는다
