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