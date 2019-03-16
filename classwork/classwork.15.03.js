var userProto = {
    changeName: function(name) {
        this.name = name;
    },
    changeAge: function(age) {
        this.age = age;
    },
    getName: function() {
        return this.name;
    },
    getAge: function() {
        return this.age;
    },
};

var workerProto = {
    promote: function(jobTitle, salary) {
        this.jobTitle = jobTitle;
        this.salary = salary;
    },
    getJobTitle: function() {
        return this.jobTitle;
    },
    getSalary: function() {
        return this.salary;
    },
};

var proto = Object.assign({}, userProto, workerProto);

var person1 = Object.create(proto);
var person2 = Object.create(proto);
var person3 = Object.create(proto);
var person4 = Object.create(proto);

person1.changeName('Mary');
person2.changeAge(30);
person3.promote('Senior Developer', 100500);
