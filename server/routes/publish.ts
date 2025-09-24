import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { supabase } from '../config/database';

const router = express.Router();

// Publish post immediately
router.post('/:id', authenticateToken, async (req: any, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Get the scheduled post
    const { data: post, error: fetchError } = await supabase
      .from('scheduled_posts')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (fetchError || !post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Here you would implement the actual social media posting logic
    // For now, we'll just update the status to 'published'
    const { data: publishedPost, error: updateError } = await supabase
      .from('scheduled_posts')
      .update({
        status: 'published',
        published_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    res.json({
      message: 'Post published successfully',
      publishedPost
    });
  } catch (error) {
    console.error('Publish error:', error);
    res.status(500).json({ error: 'Failed to publish post' });
  }
});

export default router;