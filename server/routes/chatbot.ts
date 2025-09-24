import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { supabase } from '../config/database';

const router = express.Router();

router.post('/', authenticateToken, async (req: any, res) => {
  try {
    const { prompt, context, platform } = req.body;
    const userId = req.user.userId;

    // Validate input
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Mock AI response (replace with OpenAI API or other AI service)
    const mockResponse = {
      text: `Generated content for ${platform || 'social media'}: ${prompt} - This is a professional, engaging post that will capture your audience's attention! 🚀`,
      mediaUrl: null,
      type: 'text'
    };

    // Attempt to store draft in Supabase
    const { data: draft, error } = await supabase
      .from('content_drafts')
      .insert([
        {
          user_id: userId,
          content: mockResponse.text,
          media_url: mockResponse.mediaUrl,
          platform: platform || 'general',
          prompt,
          context
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: 'Failed to save draft' });
    }

    // Return the draft
    res.json({
      message: 'Content generated successfully',
      draft: {
        content: draft.content,
        media_url: draft.media_url,
        platform: draft.platform,
        prompt: draft.prompt
      }
    });

  } catch (error: any) {
    console.error('Chatbot unexpected error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

export default router;
