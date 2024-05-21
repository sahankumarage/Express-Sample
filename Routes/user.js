const Router = require('express');
const db = require('../database');

const router = Router();

router.post('/createUser', async (req, res) => {
    const { name, email, age } = req.body;
    if (name && email && age) {
        try {
            // Use parameterized queries to prevent SQL injection
            await db.promise().query(`INSERT INTO users (name, email, age) VALUES (?, ?, ?)`, [name, email, age],);
            res.status(200).json({
                message: 'User Created'
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'Database error',
                error: err,
            });
        }
    } else {
        res.status(400).json({
            message: 'Invalid input'
        });
    }
});

router.get('/getUsers', async (req, res) => {
    try {
        const [rows] = await db.promise().query(`SELECT * FROM users`);
        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(200).json({
                message: 'No users found'
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Database error',
            error: err
        });
    }
});

router.put('/updateUser/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;

    // Check if the required fields are provided
    if (name || email || age) {
        try {
            // Create the base query and values array
            let query = 'UPDATE users SET';
            const values = [];
            if (name) {
                query += ' name = ?';
                values.push(name);
            }
            if (email) {
                if (values.length) query += ',';
                query += ' email = ?';
                values.push(email);
            }
            if (age) {
                if (values.length) query += ',';
                query += ' age = ?';
                values.push(age);
            }
            query += ' WHERE user_id = ?';
            values.push(id);

            // Execute the update query
            const [result] = await db.promise().query(query, values);
            
            if (result.affectedRows === 0) {
                res.status(404).json({
                    message: 'User not found'
                });
            } else {
                res.status(200).json({
                    message: 'User updated successfully'
                });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'Database error',
                error: err
            });
        }
    } else {
        res.status(400).json({
            message: 'No fields to update'
        });
    }
});

router.delete('/deleteUser/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.promise().query('DELETE FROM users WHERE user_id = ?', [id]);
        
        if (result.affectedRows === 0) {
            res.status(200).json({
                message: 'User not found'
            });
        } else {
            res.status(200).json({
                message: 'User deleted successfully'
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Database error',
            error: err
        });
    }
});

module.exports = router;
