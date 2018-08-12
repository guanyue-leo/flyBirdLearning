(function () {
    "use strict";
    var Animal = function (name, age) {
        this.name = name;
        this.age = age;
    };
    Animal.prototype.say = function() {
        console.log(this.name + ' ' + this.age);
    };

    var a = new Animal('橘子', 1);
    a.say();
    // todo
    //寄生组合继承
    // call() apply()
    Animal.prototype.say.call(a);

})();