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
console.log(me.getName());