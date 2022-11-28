'use strict';

// запис даних в об'єкт, далі передаємо дані в наш todoList
const dbConfig = {
    key: 'todoList',
};

const config = {
    formSelector: '#todoForm',
    todoContainerSelector: '#todoItems',
};

// const model = new Model();
// const view = new View();
// const todoList = new Controller(model, view);
// нижче запис більш коректний

// основний робочий механіз, що запускає програму - Controller
// передаємо аргументи, щоб Controller знав про Model і View
const todoList = new Controller(
    new Model(dbConfig),
    new View(),
    config,
);