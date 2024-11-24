import pool from '../db.js';

// Get all information
export const getInformasi = async (request, h) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tbl_informasi');
        return h.response(rows).code(200); // Mengembalikan data tabel langsung
    } catch (error) {
        console.error('Error fetching informasi:', error.message);
        return h.response({ error: 'Failed to fetch informasi' }).code(500);
    }
};

// Add new information
export const addInformasi = async (request, h) => {
    const { namaPenyakit, deskripsi, solusi, artikel } = request.payload;

    try {
        const [result] = await pool.query(
            'INSERT INTO tbl_informasi (namaPenyakit, deskripsi, solusi, artikel) VALUES (?, ?, ?, ?)',
            [namaPenyakit, deskripsi, solusi, artikel]
        );

        const insertId = result.insertId; // ID dari entri yang baru ditambahkan
        const [newInformasi] = await pool.query('SELECT * FROM tbl_informasi WHERE idInformasi = ?', [insertId]);

        return h.response(newInformasi[0]).code(201); // Mengembalikan entri baru
    } catch (error) {
        console.error('Error inserting informasi:', error.message);
        return h.response({ error: 'Failed to add informasi' }).code(500);
    }
};

// Update information by ID
export const updateInformasi = async (request, h) => {
    const { idInformasi } = request.params;
    const { namaPenyakit, deskripsi, solusi, artikel } = request.payload;

    try {
        const [result] = await pool.query(
            'UPDATE tbl_informasi SET namaPenyakit = ?, deskripsi = ?, solusi = ?, artikel = ? WHERE idInformasi = ?',
            [namaPenyakit, deskripsi, solusi, artikel, idInformasi]
        );

        if (result.affectedRows === 0) {
            return h.response({ error: 'Information not found' }).code(404);
        }

        return h.response({ message: 'Information updated successfully' }).code(200);
    } catch (error) {
        console.error('Error updating informasi:', error.message);
        return h.response({ error: 'Failed to update informasi' }).code(500);
    }
};

// Delete information by ID
export const deleteInformasi = async (request, h) => {
    const { idInformasi } = request.params;

    try {
        const [result] = await pool.query('DELETE FROM tbl_informasi WHERE idInformasi = ?', [idInformasi]);

        if (result.affectedRows === 0) {
            return h.response({ error: 'Information not found' }).code(404);
        }

        return h.response({ message: 'Information deleted successfully' }).code(200);
    } catch (error) {
        console.error('Error deleting informasi:', error.message);
        return h.response({ error: 'Failed to delete informasi' }).code(500);
    }
};
