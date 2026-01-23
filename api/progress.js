const { Pool } = require('pg');

let pool;

function getPool() {
  if (!pool) {
    const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
    
    if (!dbUrl) {
      throw new Error('No database URL configured');
    }
    
    pool = new Pool({
      connectionString: dbUrl,
      ssl: dbUrl.includes('localhost') ? undefined : {
        rejectUnauthorized: false
      }
    });
  }
  return pool;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const pool = getPool();
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }

    if (req.method === 'GET') {
      const result = await pool.query(
        'SELECT quest_name, completed FROM quest_progress WHERE user_id = $1',
        [userId]
      );

      const progress = {};
      result.rows.forEach(row => {
        progress[row.quest_name] = row.completed;
      });

      return res.status(200).json(progress);
    }

    if (req.method === 'POST') {
      const { questName, completed } = req.body;

      if (!questName) {
        return res.status(400).json({ error: 'Quest name required' });
      }

      await pool.query(
        `INSERT INTO quest_progress (user_id, quest_name, completed, completed_at)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (user_id, quest_name)
         DO UPDATE SET completed = $3, completed_at = $4`,
        [userId, questName, completed, completed ? new Date() : null]
      );

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Progress error:', error);
    return res.status(500).json({ 
      error: 'Failed to handle progress', 
      details: error.message 
    });
  }
};