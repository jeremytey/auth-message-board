const pool = require('../pool');

async function getAllMessages() {
        const { rows } = await pool.query(`
            SELECT messages.*, users.first_name, users.last_name, users.email, users.created_at AS member_since
            FROM messages
            JOIN users ON messages.author_id = users.id
        `);
        return rows;
    }

async function createMessage(title,body,author_id) {
    const { rows } = await pool.query(
        'INSERT INTO messages (title, body, author_id) VALUES ($1, $2, $3) RETURNING *',
        [title, body, author_id]
    );
    return rows[0];
}

async function deleteMessage(id) {
    const { rows } = await pool.query(
        'DELETE FROM messages WHERE id = $1 RETURNING *',
        [id]
    );
    return rows[0];
}

module.exports = {
    getAllMessages,
    createMessage,
    deleteMessage
};