const pool = require('../pool');

async function getUserByEmail(email) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0];
}

async function getUserById(id) {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return rows[0];
}

async function createUser(first_name, last_name, email, password_hash) {
    const { rows } = await pool.query(
        'INSERT INTO users (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING *',
        [first_name, last_name, email, password_hash]
    );
    return rows[0];
}

async function updateUserRole(id, role) {
    const { rows } = await pool.query(
        'UPDATE users SET role = $1 WHERE id = $2 RETURNING *',
        [role, id]
    );
    return rows[0];
}

module.exports = {
    getUserByEmail,
    getUserById,
    createUser,
    updateUserRole
};