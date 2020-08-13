function Person(name){
    this.name = name;
}

var foo = new Person('song');
console.dir(Person);
console.dir(foo);
console.dir(Person.prototype);