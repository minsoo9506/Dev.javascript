# 5.1 실행 컨텍스트 개념
- 실행 컨텍스트
  - 실행 가능한 코드를 형상화하고 구분하는 추상적인 개념
  - 실행 가능한 JS 코드 블록이 실행되는 환경
    - 대부분의 코드 블록은 함수
  - 이 컨텍스트 안에 실행에 필요한 여러 가지 정보를 담고 있다
- 실행 컨텍스트가 형성되는 경우
  - 전역 코드
  - eval() 함수로 실행되는 코드
  - 함수 안의 코드를 실행할 경우
- 대부분 함수로 실행 컨텍스트를 만든다
- 그리고 이 코드 블록 안에 변수, 객체, 실행 가능한 코드가 들어있다
- 이 코드가 실행되면 실행 컨텍스트가 생성되고
- 실행 컨텍스트는 스택 안에 하나씩 쌓인다 
- 제일 위에 위치하는 실행 컨텍스트가 현재 실행되고 있는 컨텍스트

```javascript
console.log('This is global');
function Excontext1(){
    console.log('This is Ex1');
}
function Excontext2(){
    console.log('This is Ex2');
}
Excontext2();
```

# 5.2 실행 컨텍스트 생성 과정
- 이번에 공부할 것
  - 활성 객체와 변수 객체
  - 스코프 체인
- 아래의 코드를 예제로 진행

```javascript
function exectue(param1, param2){
    var a = 1, b = 2;
    function func(){
        return a + b;
    }
    return param1 + param2 + func();
}

exectue(3,4);
```
## 5.2.1 활성 객체 생성
- 실행 컨텍스트가 생성되면 JS 엔진에서 여러 정보를 담을 객체를 생성
  - 이를 활성 객체 라고 한다
- 사용자는 접근 x

## 5.2.2 arguments 객체 생성
- 다음 단계로 arguments 객체를 생성
- 앞의 활성 객체는 arguments 프로퍼티로 이 arguments 객체를 참조
- 
## 5.2.3 스코프 정보 생성
- 현재 컨텍스트의 유효 범위를 나타내는 스코프 정보를 생성
- 스코프 정보는 실행 컨텍스트 안에서 연결 리스트와 유사한 형식으로 만들어진다
  - 현재 컨텍스트에서 특정 변수에 접근해야 할 경우, 이 리스트 활용
  - 이 리스트를 스코프 체인 이라고 하는데 [[scope]] 프로퍼티로 참조된다

## 5.2.4 변수 생성
- 실행 컨텍스트 내부에서 사용되는 지역 변수를 생성한다
  - ECMAScript에서는 변수 객체를 언급하는데 이는 활성 객체와 같은 객체이므로 혼동 x
- 변수 객체 안에서 호출된 함수 인자는 각각의 프로터피가 만들어지고 그 값이 할당
  - 값이 넘겨지지 않으면 undefined 할당
- `execute()` 함수 안에 정의된 변수 `a,b`와 함수 `func`이 생성
  - 여기서 변수, 내부함수를 단지 메모리에 생성(instantiation)할뿐 초기화(initialization)는 각 변수, 함수에 해당하는 표현식이 실행되야 이루어진다

## 5.2.5 this 바인딩
- 마지막 단계에서는 this 키워드를 사용하는 값이 할당
- this가 참고하는 객체가 없으면 전역 객체 참조
  
## 5.2.3 코드 실행
- 참고
  - 전역 실행 컨텍스트는 일반적인 실행 컨텍스트와는 약간 다르다
  - arguments객체가 없으며
  - 전역 객체 하나만을 포함하는 스코프 체인이 있다
  - 변수 객체가 곧 전역 객체이다
    - 전역적으로 선언된 함수와 변수가 전역 객체의 프로터피가 된다
    - 전역 실행 컨텍스트 역시, this를 전역 객체의 참조로 사용

# 5.3 스코프 체인
- `for(){}, if{}` 와 같은 구문은 유효 범위가 없다
- 오직 함수만이 유효 범위의 한 단위가 된다
- 이 유효 범위를 나타내는 스코프가 [[scope]] 프로퍼티로 각 함수 객체 내에서 연결 리스트 형식으로 관리
  - 이를 스코프 체인 이라고 한다
- 각각의 함수는 [[scope]] 프로퍼티로 자신이 생성된 실행 컨텍스트의 스코프 체인을 참조한다. 함수 실행 순간 실행 컨텍스트가 만들어지고, 이 실행 컨텍스트는 실행된 함수의 [[scope]] 프로퍼티를 기반으로 새로운 스코프 체인을 만든다.

## 5.3.1 전역 실행 컨텍스트의 스코프 체인
```javascript
var var1 = 1;
var var2 = 2;
console.log(var1);
console.log(var2);
```
- 위의 코드를 실행하면
  - 전역 실행 컨텍스트가 생성되고 변수 객체가 만들어진다
  - 변수 객체의 스코프 체인은? 참조할 상위 컨텍스트가 없으므로 자기자신이 된다
  - 그 후 변수, this

## 5.3.2 함수를 호출한 경우 생성되는 실행 컨텍스트의 스코프 체인
```javascript
var var1 = 1;
var var2 = 2;
function func(){
    var var1 = 10;
    var var2 = 20;
    console.log(var1);
    console.log(var2);
}
func();
console.log(var1); // 1
console.log(var1); // 2
```
- 전역 실행 컨텍스트가 만들어지고 `func()` 를 실행하면 func 실행 컨텍스트가 만들어진다
- func 컨텍스트의 스코프 체인은 실행된 함수의 [[scope]] 프로퍼티를 복사한 후, 현재 생성된 변수 객체를 복사한 스코프 체인을 맨 앞에 추가

# 5.4 클로저
## 5.4.1 클로저의 개념
```javascript
function outerFunc(){
    var x = 10;
    var innerFunc = function() {
        console.log(x);
    }
    return innerFunc;
}

var Func = outerFunc();
Func(); // 10
```
- `innerFunc()`의 [[scope]]는 `outerFunc()` 변수 객체와 전역 객체를 가진다
- 근데 위에서 `innerFunc()`은 `outerFunc()`의 실행이 끝난 후 실행된다 (return이면 `outerFunc()`이 끝나는 것이니까)
  - 그래도 `innerFunc()`의 스코프체인은 변수 `x`를 참조한다! 살아있다!
- 이것이 클로저라는 개념
  - 생명 주기가 끝난 외부 함수의 변수를 참조하는 함수 : 클로저
  - 그리고 클로저로 참조되는 외부 변수를 자유변수 free variable 이라고 한다

```javascript
// 또 다른 예시
function outerFunc(arg1, arg2){
    var local = 8;
    function innerFunc(innerArg){
        console.log((arg1+arg2)/(innerArg+local));
    }
    return innerFunc;
}

var exam1 = outerFunc(2,5);
exam1(2);
```
- `outerFunc()`이 실행되면서 생성되는 변수 객체가 스코프체인에 들어가게 되고
- 이 스코프 체인은 `innerFunc()`의 스코프체인으로 참조
- `outerFunc()`이 종료되어도 여전히 `innerFunc()`의 [[scope]]으로 참조되어 가비지 컬렉션의 대상이 되지 않는다

## 5.4.2 클로저의 활용
### 5.4.2.1 특정 함수에 사용자가 정의한 객체의 메서드 연결하기

```javascript
function HelloFunc(){
    this.greeting = 'hello';
}
HelloFunc.prototype.call = function(func){
    func ? func(this.greeting) : this.func(this.greeting);
}

var userFunc = function(greeting){
    console.log(greeting);
};

var objHello = new HelloFunc();
objHello.func = userFunc;
objHello.call(); // hello
```

### 5.4.2.2 함수의 캡슐화
```javascript
var buffAr = [
    'I am ',
    '',
    '. I live in ',
    '' 
];

function getCompleteStr(name, city){
    buffAr[1] = name;
    buffAr[3] = city;

    return buffAr.join('');
}

var str = getCompleteStr('minsoo','Seoul');
console.log(str);
```
- 위와 같이 하면 문제가 있다
  - 전역변수를 사용하여 외부에 노출!
- 이를 해결하기 위해 아래와 같이 해본다

```javascript
var getCompleteStr = (function(){
    var buffAr = [
        'I am ',
        '',
        '. I live in ',
        '' 
    ];
    return (function(name, city){
        buffAr[1] = name;
        buffAr[3] = city;
    
        return buffAr.join('');
    });
})();

var str = getCompleteStr('minsoo', 'Seoul');
console.log(str);
```

### 5.4.2.3 `setTimeout()`에 지정되는 함수의 사용자 정의
- `setTimeout()`
  - 첫번째 인자 : 함수 객체
  - 두번째 인자 : 해당 시간 간격으로 함수 실행
- 근데 인자로 받는 함수 객체에 인자를 넣고 싶으면? 클로저!

```javascript
function callLater(obj, a, b){
    return (function(){
        obj['sum'] = a + b;
        console.log(obj['sum']);
    });
}

var sumObj = {
    sum : 0
}

var func = callLater(sumObj, 1, 2);
setTimeout(func, 50);
```

## 5.4.3 클로저를 활용할 때 주의사항

### 5.4.3.1 클로저의 프로퍼티값이 쓰기 가능하므로 그 값이 여러 번 호출로 항상 변할 수 있음에 유의해야 한다
```javascript
function outerFunc(argNum){
    var num = argNum;
    return function(x){
        num += x;
        console.log('num : ' + num);
    }
}

var exam = outerFunc(40);
exam(5); // num : 45
exam(10); // num : 55
```
- `num`값이 계속 변화

### 5.4.3.2 하나의 클로저가 여러 함수 객체의 스코프 체인에 들어가 있는 경우도 있다
```javascript
function outerFunc(){
    var x = 0;
    return {
        func1 : function(){console.log(++x);},
        func2 : function(){console.log(-x);}
    };
}

var exam = outerFunc();
exam.func1(); // 1
exam.func2(); // -1
```
- 각 함수가 호출될 때마다 `x` 값 변화

### 5.4.3.3 루프 안에서 클로저를 활용할 때는 주의하자
- for 문으로 1,2,3을 출력하는 함수를 만들고자 한다
- 아래와 같이 하면 4,4,4가 나온다
```javascript
function countSeconds(howMany){
    for (var i=1; i<=howMany; i++){
            setTimeout(function(){
                console.log(i);
            }, i*1000);
        }
}

countSeconds(3);
```


- 이렇게 해야된다
```javascript
function countSeconds(howMany){
    for (var i=1; i<=howMany; i++){
        (function(currentI){
            setTimeout(function(){
                console.log(currentI);
            }, currentI*1000);
        })(i);
    }
}

countSeconds(3);
```
