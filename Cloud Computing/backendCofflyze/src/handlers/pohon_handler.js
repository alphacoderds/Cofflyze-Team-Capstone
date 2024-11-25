import db from '../db.js';

// Get all trees
export const getPohon = async (request, h) => {
    try {
        console.log('Fetching all trees...');
        const [result] = await db.query('SELECT * FROM tbl_pohon');
        console.log('Query Result:', result);
        return h.response(result).code(200);
    } catch (error) {
        console.error('Error fetching trees:', error.message, error.stack);
        return h.response({ error: 'Failed to fetch trees', details: error.message }).code(500);
    }
};

// Add a new tree
export const addPohon = async (request, h) => {
    const { labelPohon } = request.payload;
    console.log('Payload received for adding tree:', request.payload);

    if (!labelPohon || typeof labelPohon !== 'string') {
        console.error('Invalid input for labelPohon:', labelPohon);
        return h.response({ error: 'Invalid input for labelPohon' }).code(400);
    }

    try {
        console.log('Inserting new tree into database...');
        await db.query('INSERT INTO tbl_pohon (labelPohon) VALUES (?)', [labelPohon]);

        // Retrieve the newly inserted row using LAST_INSERT_ID()
        const [result] = await db.query('SELECT * FROM tbl_pohon WHERE idPohon = LAST_INSERT_ID()');
        console.log('Insert Result:', result);

        return h.response(result[0]).code(201);
    } catch (error) {
        console.error('Error adding tree:', error.message, error.stack);
        return h.response({ error: 'Failed to add tree', details: error.message }).code(500);
    }
};

// Update tree by ID
export const updatePohon = async (request, h) => {
    const { idPohon } = request.params;
    const { labelPohon } = request.payload;

    console.log('Payload received for updating tree:', request.params, request.payload);

    if (!labelPohon || typeof labelPohon !== 'string') {
        console.error('Invalid input for labelPohon:', labelPohon);
        return h.response({ error: 'Invalid input for labelPohon' }).code(400);
    }

    try {
        console.log(`Updating tree with idPohon=${idPohon}...`);
        const [result] = await db.query(
            'UPDATE tbl_pohon SET labelPohon = ? WHERE idPohon = ?',
            [labelPohon, idPohon]
        );

        if (result.affectedRows === 0) {
            console.error('Tree not found with idPohon:', idPohon);
            return h.response({ error: 'Tree not found' }).code(404);
        }

        // Retrieve the updated row
        const [updatedTree] = await db.query('SELECT * FROM tbl_pohon WHERE idPohon = ?', [idPohon]);
        console.log('Update Result:', updatedTree[0]);
        return h.response({ message: 'Tree updated successfully', tree: updatedTree[0] }).code(200);
    } catch (error) {
        console.error('Error updating tree:', error.message, error.stack);
        return h.response({ error: 'Failed to update tree', details: error.message }).code(500);
    }
};

// Delete tree by ID
export const deletePohon = async (request, h) => {
    const { idPohon } = request.params;

    console.log('Payload received for deleting tree:', request.params);

    try {
        console.log(`Deleting tree with idPohon=${idPohon}...`);
        const [result] = await db.query('DELETE FROM tbl_pohon WHERE idPohon = ?', [idPohon]);

        if (result.affectedRows === 0) {
            console.error('Tree not found with idPohon:', idPohon);
            return h.response({ error: 'Tree not found' }).code(404);
        }

        console.log('Tree deleted successfully:', idPohon);
        return h.response({ message: 'Tree deleted successfully', idPohon }).code(200);
    } catch (error) {
        console.error('Error deleting tree:', error.message, error.stack);
        return h.response({ error: 'Failed to delete tree', details: error.message }).code(500);
    }
};
