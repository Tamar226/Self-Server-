const mysql = require('mysql2');


var con = mysql.createConnection({
    // host: process.env.MYSQL_HOST,
    // user: process.env.MYSQL_USER,
    // password: process.env.MYSQL_PASSWORD,
    // database: process.env.MYSQL_DATABASE,
    // port: process.env.PORT
    host: "localhost",
    user: "root",
    password: "T50226",
    database: "mydb"
});

async function getAllTodos() {
    const result = await con.promise().query('SELECT * FROM todos');
    return prepareResults(false,0,0,result);
}

async function getTodoById(todoId) {
    try {
        console.log('hiiii');
        console.log(todoId);
        const result = await con.promise().query('SELECT * FROM todos WHERE id = ?', [todoId]);
        if (result.length === 0) {
            throw new Error(`Todo with ID ${todoId} not found`);
        }
        return prepareResult(false,0,0,result[0]);
    } catch (error) {
        throw error;
    }
}

async function addTodo(newTodo) {
    try {
        const result = await con.promise().query(`INSERT INTO todos (userID, title,completed) VALUES ('${newTodo.userId}', '${newTodo.title}','${newTodo.completed}')`);
        if (result[0].insertId > 0) {
            return prepareResult(false, 0, result[0].insertId)
        }
        else {
            return prepareResult(true, 0, 0);
        }
    } catch (error) {
        throw error;
    }
}

async function updateTodo(todoId, updatedTodoData) {
    try {
        const result = await con.promise().query('UPDATE todos SET ? WHERE id = ?', [updatedTodoData, todoId]);
        if (result[0].affectedRows > 0) {
            return prepareResult(false, result[0].affectedRows, 0)
        }
        else {
            return prepareResult(true, 0, 0);
        }
 
    } catch (error) {
        throw error;
    }
}

async function deleteTodo(todoId) {
    try {
        const result = await con.promise().query('DELETE FROM todos WHERE id = ?', todoId);
        if (result[0].affectedRows > 0) {
            return prepareResult(false, result[0].affectedRows, 0)

        } else {
            return prepareResult(true, 0, 0);
        }
    } catch (error) {
        throw error;
    }
}
function prepareResult(hasErrorT = true, affectedRowsT = 0, insertIdT = -1, dataT = null) {
    const resultdata = {
        hasError: hasErrorT,
        affectedRows: affectedRowsT,
        insertId: insertIdT,
        data: dataT
    }
    return resultdata;
}
module.exports = {
    getAllTodos,
    getTodoById,
    addTodo,
    updateTodo,
    deleteTodo
};