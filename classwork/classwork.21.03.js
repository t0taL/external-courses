function User(name, age) {
    this.name = name;
    this.age = age;
    this.getName = function() {
        return this.name;
    };
    this.getAge = function() {
        return this.age;
    };
    this.changeName = function(name) {
        this.name = name;
    };
    this.changeAge = function(age) {
        this.age = age;
    };
};

function Employee(jobTitle, salary) {
    this.jobTitle = jobTitle;
    this.salary = salary;
    this.fired = false;
    this.getJobTitle = function() {
        return this.jobTitle;
    };
    this.getSalary = function() {
        return this.salary;
    };
    this.promote = function(jobTitle, salary) {
        this.jobTitle = jobTitle;
        this.salary = salary;
    };
    this.isFired = function() {
        return (this.fired === true) ? true : false;
    };
    this.setFired = function() {
        this.fired = true;
    };
};

var users = [new User('Vitaly', 25), new User('John', 20), new User('Mary', 18),
             new User('Kate', 30), new User('Max', 28), new User('Rob', 44)];

var workers = [new Employee('Director', 80000), new Employee('JavaScript Developer', 50000),
                new Employee('JavaScript Developer', 50000), new Employee('C++ Developer', 65000),
                new Employee('Web Designer', 40000), new Employee('Senior Developer', 70000)];

var target = null;
// Ищем 'Mary'
users.some(function(val) {
    if (val.name === 'Mary') {
        target = val;
        console.log(val);
    };
});
// Ищем молодых
var young = users.filter(function(val) {
    return val.age < 30;
});
console.log(young);
// Свадьба 'John'а и 'Mary'
users.some(function(val) {
    if (val.name === 'John') {
        val.married = target;
    };
});
// Средняя зарплата
var allSalary = 0,
numWorkers = 0;
workers.forEach(function(val) {
    allSalary += val.salary;
    numWorkers++;
});
var midSalary = Math.round(allSalary/numWorkers);
console.log(midSalary);
// Список должностей
var jobTitles = {};
workers.forEach(function(val) {
    jobTitles[val.jobTitle] = null;
});
for (key in jobTitles) {
    console.log(key);
};
// Максимальная и мимнимальная зарплаты
var salaries = workers.sort(function(val1, val2) {
    return val2.salary - val1.salary;
});
var min = salaries[0].salary,
max = salaries[salaries.length-1].salary;
console.log('Минимальная зарплата: ' + min);
console.log('Максимальная зарплата: ' + max);
// Обезвреживаем врага
workers.some(function(val) {
    if (val.jobTitle === 'Director') {
        val.setFired();
    };
});
console.log(workers);
console.log(users);