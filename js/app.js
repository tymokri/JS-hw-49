'use strict';

const dbConfig = {
    key: 'todoList',
};

const config = {
    formSelector: '#todoForm',
    todoContainerSelector: '#todoItems',
};

const todoList = new Controller(
    new Model(dbConfig),
    new View(dbConfig),
    config,
);