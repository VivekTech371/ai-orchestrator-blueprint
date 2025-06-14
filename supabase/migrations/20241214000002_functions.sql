
-- Function to increment likes count
CREATE OR REPLACE FUNCTION increment_likes_count(post_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.posts 
  SET likes_count = likes_count + 1 
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to decrement likes count
CREATE OR REPLACE FUNCTION decrement_likes_count(post_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.posts 
  SET likes_count = GREATEST(0, likes_count - 1) 
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment comments count
CREATE OR REPLACE FUNCTION increment_comments_count(post_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.posts 
  SET comments_count = comments_count + 1 
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to decrement comments count
CREATE OR REPLACE FUNCTION decrement_comments_count(post_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.posts 
  SET comments_count = GREATEST(0, comments_count - 1) 
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user stats
CREATE OR REPLACE FUNCTION get_user_stats(user_uuid UUID)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'agents_count', (SELECT COUNT(*) FROM public.agents WHERE user_id = user_uuid),
    'workflows_count', (SELECT COUNT(*) FROM public.workflows WHERE user_id = user_uuid),
    'posts_count', (SELECT COUNT(*) FROM public.posts WHERE user_id = user_uuid),
    'templates_count', (SELECT COUNT(*) FROM public.templates WHERE user_id = user_uuid),
    'total_likes', (SELECT COUNT(*) FROM public.likes l 
                   JOIN public.posts p ON l.likeable_id = p.id 
                   WHERE l.likeable_type = 'post' AND p.user_id = user_uuid)
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create notification
CREATE OR REPLACE FUNCTION create_notification(
  user_uuid UUID,
  notification_type TEXT,
  notification_title TEXT,
  notification_message TEXT DEFAULT NULL,
  notification_data JSON DEFAULT '{}'::JSON
)
RETURNS UUID AS $$
DECLARE
  notification_id UUID;
BEGIN
  INSERT INTO public.notifications (user_id, type, title, message, data)
  VALUES (user_uuid, notification_type, notification_title, notification_message, notification_data)
  RETURNING id INTO notification_id;
  
  RETURN notification_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update comments count when comment is added
CREATE OR REPLACE FUNCTION handle_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    PERFORM increment_comments_count(NEW.post_id);
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    PERFORM decrement_comments_count(OLD.post_id);
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER comments_count_trigger
  AFTER INSERT OR DELETE ON public.comments
  FOR EACH ROW EXECUTE PROCEDURE handle_comment_count();
