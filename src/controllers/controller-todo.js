const bodyParser = require('body-parser');
const { query } = require('express');
const conn = require('../configs/database')

conn.connect((err) => {
    if(err) throw err;
    console.log('mysql Connected...')
})

const getTodoList = (req,res) => {
    let sql = "SELECT * FROM tb_todo";
    let query = conn.query(sql, (err,result) => {
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Internal server error'
            })
        }else {
            return res. status(200).json({
                status: true,
                message: 'All data Todo',
                data: result
            })
        }
    })

    return query;
}

const getTodoListById = (req, res) => {
    let id = req.params.id;
    let sql = "SELECT * FROM tb_todo WHERE todo_id = ?"
    let query = conn.query(sql, [id], (err,result) => {
       if (err) {
        return res.status(500).json({
            status: false,
            message: 'Internal server error'
        })
       } 
       if (result.length <= 0){
        return res.status(404).json({
            status: false,
            message: 'Todo list not found'
        })
       }
       else{
        return res.status(200).json({
            status: true,
            message: 'Detail todo list',
            data: result
        })
       }
    })
    return query;
}

const addTodoList = (req, res) => {
    let data = {
        todo : req.body.todo,
        status : req.body.status,
        dueDate : req.body.dueDate
    }
    let sql = "INSERT INTO tb_todo SET ?"
    let query = conn.query(sql,[data], (err,result) => {
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Internal server error'
            })
        }
        if(!data.todo){
            return res.status(400).json({
                status: false,
                message: 'Error, todo field do not null'
            })
        }
        if(!data.status){
            return res.status(400).json({
                status: false,
                message: 'Error, status field do not null'
            })
        }
        else {
            return res.status(201).json({
                status: true,
                message: 'Insert Data Successfully'
            })
        }
    })
    return query
}

const editTodoList = (req, res) => {
    let id = req.params.id
    let data = {
        todo : req.body.todo,
        status : req.body.status,
        dueDate : req.body.dueDate
    }
    let sql = "UPDATE tb_todo SET ? WHERE todo_id = ?";
    let query = conn.query(sql,[data,id], (err,result) => {
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Internal server error'
            })
        }
        
        if(!data.todo){
            return res.status(400).json({
                status: false,
                message: 'Error, todo field do not null'
            })
        }
        if(!data.status){
            return res.status(400).json({
                status: false,
                message: 'Error, status field do not null'
            })
        }
        else {
            return res.status(201).json({
                status: true,
                message: 'Update Data Successfully'
            })
        }
    })

    return query;
}

const deleteTodoList = (req, res) => {
    let id = req.params.id;
    let sql = "DELETE FROM tb_todo WHERE todo_id = ?"
    conn.query(sql,[id], (err,result) => {
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Internal server error'
            })
        }
        if (result.length <= 1){
        return res.status(404).json({
            status: false,
            message: 'Todo list not found'
        })
        }else {
            return res. status(200).json({
                status: true,
                message: 'Delete Data Successfully',
            })
        }
    })
}

module.exports = {getTodoList, getTodoListById, addTodoList, editTodoList, deleteTodoList}