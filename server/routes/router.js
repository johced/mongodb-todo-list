const express = require('express');
const route = express.Router();

// *** Import functions ***
const { renderTodo } = require('../controller/controller');
const { createTodo } = require('../controller/controller');
const { updateTodo } = require('../controller/controller');
const { findIdUpdate } = require('../controller/controller');
const { deleteTodo } = require('../controller/controller');

route.get('/', renderTodo);
route.post('/', createTodo);
route.get('/edit/:id', updateTodo);
route.post('/edit/:id', findIdUpdate);
route.get('/remove/:id', deleteTodo);

// *** export ***
module.exports = route;
