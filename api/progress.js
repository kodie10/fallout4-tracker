const { getPool } = require('./_db');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const pool = getPool();

  // Extract userId from URL path
  // URL will be like: /api/progress?userId=1 or /api/progress/1
  const urlParts = req.url.split('/');
  const userId = urlParts[urlParts.length - 1] || req.query.userId;

  if (!userId || userId === 'progress') {
    return res.status(400).json({ error: 'User ID required' });
  }

  try {
    if (req.method === 'GET') {
      // Get user's quest progress
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
      // Update quest progress
      const { questName, completed } = req.body;

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
    res.status(500).json({ error: 'Failed to handle progress' });
  }
};