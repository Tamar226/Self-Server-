const mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "T50226",
    database: "mydb"
});

async function getAllComments() {
    const result = await con.promise().query('SELECT * FROM comments');
    return prepareResults(false,0,0,result);
}

async function getCommentById(commentId) {
    try {
        const result = await con.promise().query('SELECT * FROM comments WHERE id = ?', [commentId]);
        if (result.length === 0) {
            throw new Error(`Comment with ID ${commentId} not found`);
        }
        return prepareResult(false, 0, 0, result);
    } catch (error) {
        throw error;
    }
}

async function addComment(newComment) {
    try {
        const result = await con.promise().query(`INSERT INTO comments (postId, name,email,body) VALUES ('${newComment.postId}', '${newComment.name}','${newComment.email}','${newComment.body}')`);
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

async function updateComment(commentId, updatedCommentData) {
    try {
        const result = await con.promise().query('UPDATE comments SET ? WHERE id = ?', [updatedCommentData, commentId]);
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

async function deleteComment(commentId) {
    try {
        const result = await con.promise().query('DELETE FROM comments WHERE id = ?', commentId);
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
    getAllComments,
    getCommentById,
    addComment,
    updateComment,
    deleteComment
}