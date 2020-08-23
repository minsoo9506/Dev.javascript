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
