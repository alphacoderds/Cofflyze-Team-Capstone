import pool from '../db.js';

// Get all users
export const getUsers = async (request, h) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tbl_user');
        return h.response(rows).code(200);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        return h.response({ error: 'Failed to retrieve users' }).code(500);
    }
};

// Add a new user
export const addUser = async (request, h) => {
    const { namaLengkap, fotoProfile, nomorHp, alamat, tokenFirebase } = request.payload;

    // Validasi input wajib
    if (!namaLengkap || !nomorHp || !alamat) {
        return h.response({ error: 'Missing required fields: namaLengkap, nomorHp, or alamat' }).code(400);
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO tbl_user (namaLengkap, fotoProfile, nomorHp, alamat, tokenFirebase) VALUES (?, ?, ?, ?, ?)',
            [namaLengkap, fotoProfile || null, nomorHp, alamat, tokenFirebase || null]
        );
        const userId = result.insertId;

        // Fetch the newly added user
        const [newUser] = await pool.query('SELECT * FROM tbl_user WHERE idUser = ?', [userId]);

        return h.response(newUser[0]).code(201);
    } catch (error) {
        console.error('Error adding user:', error.message);
        return h.response({ error: 'Failed to add user' }).code(500);
    }
};

// Update user by ID
export const updateUser = async (request, h) => {
    const { idUser } = request.params;
    const { namaLengkap, fotoProfile, nomorHp, alamat, tokenFirebase } = request.payload;

    // Validasi input
    if (!namaLengkap || !nomorHp || !alamat) {
        return h.response({ error: 'Missing required fields: namaLengkap, nomorHp, or alamat' }).code(400);
    }

    try {
        const [result] = await pool.query(
            'UPDATE tbl_user SET namaLengkap = ?, fotoProfile = ?, nomorHp = ?, alamat = ?, tokenFirebase = ? WHERE idUser = ?',
            [namaLengkap, fotoProfile || null, nomorHp, alamat, tokenFirebase || null, idUser]
        );

        if (result.affectedRows === 0) {
            return h.response({ error: 'User not found' }).code(404);
        }

        // Fetch the updated user
        const [updatedUser] = await pool.query('SELECT * FROM tbl_user WHERE idUser = ?', [idUser]);

        return h.response({ message: 'User updated successfully', user: updatedUser[0] }).code(200);
    } catch (error) {
        console.error('Error updating user:', error.message);
        return h.response({ error: 'Failed to update user' }).code(500);
    }
};

// Delete user by ID
export const deleteUser = async (request, h) => {
    const { idUser } = request.params;

    try {
        const [result] = await pool.query('DELETE FROM tbl_user WHERE idUser = ?', [idUser]);

        if (result.affectedRows === 0) {
            return h.response({ error: 'User not found' }).code(404);
        }

        return h.response({ message: 'User deleted successfully' }).code(200);
    } catch (error) {
        console.error('Error deleting user:', error.message);
        return h.response({ error: 'Failed to delete user' }).code(500);
    }
};
