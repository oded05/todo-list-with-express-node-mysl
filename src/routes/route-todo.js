const router = require('express').Router();
const { todo } = require('../controllers');

router.get('/todo',todo.getTodoList);

router.get('/todo/:id',todo.getTodoListById);

router.post('/todo/add',todo.addTodoList);

router.put('/todo/edit/:id',todo.editTodoList);

router.delete('/todo/delete/:id',todo.deleteTodoList);

module.exports = router;