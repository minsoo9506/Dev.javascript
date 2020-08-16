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