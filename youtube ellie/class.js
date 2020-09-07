'use strict';

// class
// ES6에서 도입
// 이전에는 object 이용

// 1. class declaration
class Person {
    constructor(name, age){
        // field
        this.name = name;
        this.age = age;
    }
    speak(){
        console.log(`${this.name}, ${this.age}`);
    }
}

const minsoo = new Person('minsoo', 26);
console.log(minsoo.name); // minsoo
minsoo.speak();  // minsoo, 26

// 2. getter , setter
// 예를 들어, 나이에 음수가 들어오면 안된다
// 이를 컨트롤 할 수 있는게 getter, setter
class User {
    constructor(name, age){
        this.name = name;
        this.age = age; // 이렇게 할당할때 set 함수 호출
    }
    get age(){
        return this._age;
    }
    set age(val){
        if (val< 0)
            throw Error('age can not be negative');
        this._age = val // 여기서 this.age 하면 set함수 계속 불러서 에러
    }
}

// const user1 = new User('minsoo', -1); // 에러 발생
const user2 = new User('minsoo', 26);
console.log(user2.age); // 26 이때 get함수 호출

// 3. Public, Private
// 최근에 추가된 내용
// constructor를 끄지 않고 그냥 쓰면 public
// private은 # 을 붙여야함
class Ex {
    publicField = 2;
    #privateField = 0;
}

const ex1 = new Ex();
console.log(ex1.publicField); // 2
console.log(ex1.privateField); // undefined

// 4. static
// class가 직접 가지고 있는 값!!
// object와 상관없이!!
// static 변수, 함수
class Article{
    static publisher = 'Dream Coding';
    constructor(number) {
        this.ArticleNumber = number;
    }
    static printPublisher(){
        console.log(this.publisher);
    }
}

const sbs = new Article(1);
// sbs.printPublisher(); // 에러
Article.printPublisher(); // Dream Coding

// 5. 상속, 다양성
// - extends 로 상속
// - 함수 오버라이딩
// - 함수 super (c++ 오버로딩이랑 쪼금 다른듯)
class Shape {
    constructor(width, height){
        this.width = width;
        this.height = height;
    }
    draw(){
        console.log('Drawing!');
    }
    getArea(){
        return this.width * this.height;
    }
}

class Triangle extends Shape{
    draw(){
        super.draw();
        console.log('Traingle Drawing!')
    }
    getArea(){
        return (this.width * this.height) / 2;
    }
}

const triangleEx = new Triangle(10,10);
console.log(triangleEx.getArea());
triangleEx.draw(); // 부모 draw, 자식 draw 모두 실행

// 6. instanceOf
console.log(triangleEx instanceof Triangle); // true
console.log(triangleEx instanceof Shape);    // true
console.log(triangleEx instanceof Object);   // true