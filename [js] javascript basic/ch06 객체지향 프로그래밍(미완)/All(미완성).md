# 6.1 클래스, 생성자, 메서드
- 함수 객체로 기존 객체지향 프로그래밍 언어처럼 클래스, 생성자, 메서드 개념 구현가능

```javascript
function Person(arg){
    this.name = arg;

    this.getName = function(){
        return this.name;
    }

    this.setName = function(value){
        this.name = value;
    }
}

var me = new Person('minsoo');
console.log(me.getName()); // minsoo
```
- 근데 `Person` 여러 개의 객체를 생성하면 각 객체는 공통적인 메서드들을 각자 자기 영역에서 불필요하게 메모리에 올린다
  - 이를 해결하기 위해 아래처럼 함수 객체의 프로토타입 이용!

```javascript
function Person(arg){
    this.name = arg;
}

Person.prototype.getName = function(){
    return this.name;
}

Person.prototype.setName = function(value){
    this.name = value;
}

var me = new Person('minsoo');
console.log(me.getName()); // minsoo
```
```javascript
// 일반화된 버전
Function.prototype.method = function(name, func){
    this.prototype[name] = func;
}

function Person(arg){
    this.name = arg;
}

Person.method('getName', function(){
    return this.name;
});

var me = new Person('minsoo');
console.log(me.getName()); // minsoo
```

# 6.2 상속
- 상속 구현 방식은 크게 두 가지
  - 클래스 기반 전통적인 상속 방식 흉내
  - 클래스 개념 없이 객체의 프로토타입으로 상속 구현

## 6.2.1 프로토타입을 이용한 상속
```javascript
function create_object(o){
    function F(){}
    F.prototype = o;
    return new F();
}

var Person = {
    name : 'minsoo',
    getName : function(){
        return this.name;
    },
    setName : function(arg){
        this.name = arg;
    }
};

var student = create_object(Person);

student.setName('Me');
console.log(student.getName()); // Me
```
- 클래스에 해당하는 생성자 함수를 만들지도 x
- 인스턴스를 따로 생성하지도 x
- 부모 객체 `Person`, 이를 프로토타입 체인으로 참조할 수 있는 자식 객체 `student`를 만들어서 사용
- 자식이 메서드를 확장하기 위해 아래처럼!!
```javascript
function create_object(o){
    function F(){}
    F.prototype = o;
    return new F();
}

var Person = {
    name : 'minsoo',
    getName : function(){
        return this.name;
    },
    setName : function(arg){
        this.name = arg;
    }
};

function extend(obj, prop){
    if(!prop){prop=obj; obj=this;}
    for (var i in prop) obj[i] = prop[i];
    return obj;
}

var student = create_object(Person);
var added = {
    setAge : function(age){
        this.age = age;
    },
    getAge : function(){
        return this.age;
    }
};

extend(student, added);
student.setAge(25);
console.log(student.getAge()); // 25
```

## 6.2.2 클래스 기반의 상속
```javascript
function Person(arg){
    this.name = arg;
}
Function.prototype.method = function(name, func){
    this.prototype[name] = func;
}

Person.method('setName', function(name){
    this.name = name;
})
Person.method('getName', function(){
    return this.name;
})

function Student(arg){
}

function F() {};
F.prototype = Person.prototype;
Student.prototype = new F();
Student.prototype.constructor = Student;

Student.super = Person.prototype;

var me = new Student();
me.setName('Minsoo');
```

# 6.3 캡슐화
- `this` 객체의 프로퍼티로 선언하면 외부에서 `new` 키워드로 생성한 객체로 접근할 수 있다
- 하지만 `var`로 선언된 멤버들은 외부에서는 접근이 불가능
  - 메서드를 이용해서 접근

```javascript
function Person(arg){
    var name = arg ? arg : 'default';

    this.getName = function(){
        return name;
    }
    this.setName = function(){
        name = arg;
    }
}

var me = new Person('minsoo');
console.log(me.getName());
consolg.log(me.name); // undefined
```
- 아래처럼 메서드가 담겨있는 객체를 반환하는 함수도 많이 사용한다고 한다
```javascript
// 예제 6-10
var Person =  function(arg){
    var name = arg ? arg : 'default';
    
    return {
        getName : function(){
            return name;
        },
        setName : function(arg){
            name = arg;
        }
    };
}

var me = new Person('minsoo');
console.log(me.getName());
console.log(me.name); // undefined
```
- 근데 문제는 private 멤버가 객체나 배열이면 얕은 복사로 참조만을 반환!
```javascript
var ArrCreate = function(arg){
    var arr = [1,2,3];

    return {
        getArr : function(){
            return arr;
        }
    }
}

var obj = ArrCreate();
var arr = obj.getArr();
arr.push(5);
console.log(obj.getArr()); // [1,2,3,5]
```
- 위의 예제 6-10을 보면 `Person`을 부모로 하는 프로토타입을 이용한 상속을 구현하기가 용이하지 않다는 것을 알수 있다

```javascript
var Person = function(arg){
    var name = arg ? arg : 'default';

    var Func = function(){}
    Func.prototype = {
        getName : function(){
            return name;
        },
        setName : function(){
            name = arg;
        }
    };
    return Func;
}();

var me = new Person();
console.log(me.getName());
```

# 6.4 객체지향 프로그래밍 응용 예제
## 6.4.1 클래스의 기능을 가진 subClass 함수
### 6.4.1.1 subClass 함수 구조

```javascript
function subClass(obj){
    // 1 자식 클래스 생성
    // 2 생정자 호출
    // 3 프로토타입 체인을 활용한 상속 구현
    // 4 obj를 통해 들어온 변수 및 메서드를 자식 클래스에 추가
    // 5 자식 함수 객체 반환
}
```

### 6.4.1.2 자식 클래스 생성 및 상속
### 6.4.1.3 자식 클래스 확장
### 6.4.1.4 생성자 호출
### 6.4.1.5 subClass 보완
### 6.4.1.6 subClass 활용
### 6.4.1.7 subClass 함수에 클로저 적용

## 6.4.2 subClass 함수와 모듈 패턴을 이용한 객체지향 프로그래밍