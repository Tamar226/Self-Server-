const mysql = require('mysql2');

var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    // port: process.env.PORT
});

async function getAllComments() {
    const [allComments] = await con.promise().query('SELECT * FROM comments');
    console.log(allComments);
    return allComments;
}

async function getCommentById(commentId) {
    try {
        const [comment] = await con.promise().query('SELECT * FROM comments WHERE id = ?', [commentId]);
        if (comment.length === 0) {
            throw new Error(`Comment with ID ${commentId} not found`);
        }
        return comment[0];
    } catch (error) {
        throw error;
    }
}

async function addComment(newComment) {
    try {
        const result = await con.promise().query(`INSERT INTO comments (postId, name,email,body) VALUES ('${newComment.postId}', '${newComment.name}','${newComment.email}','${newComment.body}')`);
        if (result.insertId > 0) {
            return prepareResult(false, 0, result.insertId)
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
      if (result.affectedRows > 0) {
        return prepareResult(false, result.affectedRows, 0)
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
        if (result.affectedRows > 0) {
            return prepareResult(false, result.affectedRows, 0)

        } else {
            return prepareResult(true, 0, 0);
        }
    } catch (error) {
        throw error;
    }
}
function prepareResult(hasError, affectedRows, insertId) {
    const resultdata = {
        hasError: true,
        affectedRows: 0,
        insertId: -1
    }
    return resultdata;
}
module.exports={getAllComments,getCommentById,addComment,updateComment,deleteComment}