import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { supabase } from '../config/database';

const router = express.Router();

// Connect Twitter account
router.post('/twitter', authenticateToken, async (req: any, res) => {
  try {
    const userId = req.user.userId;
    const { accessToken, accessTokenSecret } = req.body;

    const { error } = await supabase
      .from('users')
      .update({
        connected_accounts: {
          twitter: {
            accessToken,
            accessTokenSecret,
            connected: true
          }
        }
      })
      .eq('id', userId);

    if (error) {
      throw error;
    }

    res.json({ message: 'Twitter account connected successfully' });
  } catch (error) {
    console.error('Twitter connection error:', error);
    res.status(500).json({ error: 'Failed to connect Twitter account' });
  }
});

// Connect LinkedIn account
router.post('/linkedin', authenticateToken, async (req: any, res) => {
  try {
    const userId = req.user.userId;
    const { accessToken } = req.body;

    const { error } = await supabase
      .from('users')
      .update({
        connected_accounts: {
          linkedin: {
            accessToken,
            connected: true
          }
        }
      })
      .eq('id', userId);

    if (error) {
      throw error;
    }

    res.json({ message: 'LinkedIn account connected successfully' });
  } catch (error) {
    console.error('LinkedIn connection error:', error);
    res.status(500).json({ error: 'Failed to connect LinkedIn account' });
  }
});

// Connect Instagram account
router.post('/instagram', authenticateToken, async (req: any, res) => {
  try {
    const userId = req.user.userId;
    const { accessToken } = req.body;

    const { error } = await supabase
      .from('users')
      .update({
        connected_accounts: {
          instagram: {
            accessToken,
            connected: true
          }
        }
      })
      .eq('id', userId);

    if (error) {
      throw error;
    }

    res.json({ message: 'Instagram account connected successfully' });
  } catch (error) {
    console.error('Instagram connection error:', error);
    res.status(500).json({ error: 'Failed to connect Instagram account' });
  }
});

export default router;