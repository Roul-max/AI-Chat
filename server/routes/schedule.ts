import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { supabase } from '../config/database';

const router = express.Router();

// Create scheduled post
router.post('/', authenticateToken, async (req: any, res) => {
  try {
    const { platform, content, mediaUrl, type, scheduledAt } = req.body;
    const userId = req.user.userId;

    const { data: scheduledPost, error } = await supabase
      .from('scheduled_posts')
      .insert([
        {
          user_id: userId,
          platform,
          content,
          media_url: mediaUrl,
          type: type || 'static',
          scheduled_at: scheduledAt,
          status: 'scheduled'
        }
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json({
      message: 'Post scheduled successfully',
      scheduledPost
    });
  } catch (error) {
    console.error('Schedule error:', error);
    res.status(500).json({ error: 'Failed to schedule post' });
  }
});

// Get scheduled posts
router.get('/', authenticateToken, async (req: any, res) => {
  try {
    const userId = req.user.userId;

    const { data: scheduledPosts, error } = await supabase
      .from('scheduled_posts')
      .select('*')
      .eq('user_id', userId)
      .order('scheduled_at', { ascending: true });

    if (error) {
      throw error;
    }

    res.json(scheduledPosts);
  } catch (error) {
    console.error('Get scheduled posts error:', error);
    res.status(500).json({ error: 'Failed to fetch scheduled posts' });
  }
});

// Update scheduled post
router.put('/:id', authenticateToken, async (req: any, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const updates = req.body;

    const { data: updatedPost, error } = await supabase
      .from('scheduled_posts')
      .update(updates)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.json({
      message: 'Post updated successfully',
      updatedPost
    });
  } catch (error) {
    console.error('Update scheduled post error:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// Delete scheduled post
router.delete('/:id', authenticateToken, async (req: any, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const { error } = await supabase
      .from('scheduled_posts')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete scheduled post error:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

export default router;