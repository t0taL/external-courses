function createUser(a, b) {
    var user = {};
    user.name = a;
    user.age = b;
    return user;
};

var arr = [createUser('Vitaly', 26), createUser('Natasha', 26), createUser('Roman', 99), 
            createUser('Mary', 17), createUser('Max', 28), createUser('Nikolay', 23)];

var target = null;

for (var i = 0; i < arr.length; i++) {
    if (arr[i].age === 23) {
        target = arr[i];
        target.name = 'Garry';
        target.age = 25;
        target.salary = 3000;
    };
};

for (var i = 0; i < arr.length; i++) {
    if (arr[i].name === 'Mary') {
        delete arr[i].age;
        arr[i].husband = target;
    };
};
