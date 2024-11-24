import pool from '../db.js';

// Get all detections
export const getDeteksi = async (request, h) => {
    try {
        const result = await pool.query('SELECT * FROM tbl_deteksi');
        return h.response(result.rows).code(200);
    } catch (error) {
        console.error(error);
        return h.response({ error: 'Failed to fetch detections' }).code(500);
    }
};

// Add a new detection
export const addDeteksi = async (request, h) => {
    try {
        const { gambar, akurasi, tanggal, idPohon, idInformasi, idUser } = request.payload;
        const result = await pool.query(
            'INSERT INTO tbl_deteksi (gambar, akurasi, tanggal, idPohon, idInformasi, idUser) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [gambar, akurasi, tanggal, idPohon, idInformasi, idUser]
        );
        return h.response(result.rows[0]).code(201);
    } catch (error) {
        console.error(error);
        return h.response({ error: 'Failed to add detection' }).code(500);
    }
};

// Update detection by ID
export const updateDeteksi = async (request, h) => {
    try {
        const { idDeteksi } = request.params;
        const { gambar, akurasi, tanggal, idPohon, idInformasi, idUser } = request.payload;
        const result = await pool.query(
            'UPDATE tbl_deteksi SET gambar = $1, akurasi = $2, tanggal = $3, idPohon = $4, idInformasi = $5, idUser = $6 WHERE idDeteksi = $7 RETURNING *',
            [gambar, akurasi, tanggal, idPohon, idInformasi, idUser, idDeteksi]
        );

        if (result.rowCount === 0) {
            return h.response({ error: 'Detection not found' }).code(404);
        }

        return h.response(result.rows[0]).code(200);
    } catch (error) {
        console.error(error);
        return h.response({ error: 'Failed to update detection' }).code(500);
    }
};

// Delete detection by ID
export const deleteDeteksi = async (request, h) => {
    try {
        const { idDeteksi } = request.params;
        const result = await pool.query('DELETE FROM tbl_deteksi WHERE idDeteksi = $1 RETURNING *', [idDeteksi]);

        if (result.rowCount === 0) {
            return h.response({ error: 'Detection not found' }).code(404);
        }

        return h.response({ message: 'Detection deleted successfully' }).code(200);
    } catch (error) {
        console.error(error);
        return h.response({ error: 'Failed to delete detection' }).code(500);
    }
};
