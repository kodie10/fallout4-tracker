const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Database connection

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Register endpoint
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password required' });
        }

        // Check if user exists
        const userCheck = await pool.query(
            'SELECT id FROM users WHERE username = $1',
            [username]
        );

        if (userCheck.rows.length > 0) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create user
        const result = await pool.query(
            'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username',
            [username, passwordHash]
        );

        res.json({ user: result.rows[0] });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Get user
        const result = await pool.query(
            'SELECT id, username, password_hash FROM users WHERE username = $1',
            [username]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = result.rows[0];

        // Check password
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.json({ user: { id: user.id, username: user.username } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Get user's quest progress
app.get('/api/progress/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const result = await pool.query(
            'SELECT quest_name, completed FROM quest_progress WHERE user_id = $1',
            [userId]
        );

        const progress = {};
        result.rows.forEach(row => {
            progress[row.quest_name] = row.completed;
        });

        res.json(progress);
    } catch (error) {
        console.error('Get progress error:', error);
        res.status(500).json({ error: 'Failed to fetch progress' });
    }
});

// Update quest progress
app.post('/api/progress/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { questName, completed } = req.body;

        await pool.query(
            `INSERT INTO quest_progress (user_id, quest_name, completed, completed_at)
             VALUES ($1, $2, $3, $4)
             ON CONFLICT (user_id, quest_name)
             DO UPDATE SET completed = $3, completed_at = $4`,
            [userId, questName, completed, completed ? new Date() : null]
        );

        res.json({ success: true });
    } catch (error) {
        console.error('Update progress error:', error);
        res.status(500).json({ error: 'Failed to update progress' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});