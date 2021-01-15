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