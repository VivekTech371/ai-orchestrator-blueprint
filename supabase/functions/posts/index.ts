
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    const authHeader = req.headers.get('Authorization')
    let user = null
    
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '')
      const { data: { user: authUser } } = await supabase.auth.getUser(token)
      user = authUser
    }

    const url = new URL(req.url)
    const postId = url.pathname.split('/').pop()

    switch (req.method) {
      case 'GET':
        if (postId && postId !== 'posts') {
          // Get single post
          const { data: post, error } = await supabase
            .from('posts')
            .select(`
              *,
              profiles:user_id (username, full_name, avatar_url),
              comments:comments (
                id,
                content,
                created_at,
                profiles:user_id (username, full_name, avatar_url)
              )
            `)
            .eq('id', postId)
            .single()

          if (error) throw error

          // Increment view count
          await supabase
            .from('posts')
            .update({ views_count: (post.views_count || 0) + 1 })
            .eq('id', postId)

          return new Response(JSON.stringify(post), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        } else {
          // Get all posts
          const { data: posts, error } = await supabase
            .from('posts')
            .select(`
              *,
              profiles:user_id (username, full_name, avatar_url)
            `)
            .eq('is_published', true)
            .order('created_at', { ascending: false })

          if (error) throw error
          return new Response(JSON.stringify(posts), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        }

      case 'POST':
        if (!user) throw new Error('Unauthorized')
        
        const newPost = await req.json()
        const { data: post, error } = await supabase
          .from('posts')
          .insert({
            ...newPost,
            user_id: user.id
          })
          .select()
          .single()

        if (error) throw error
        return new Response(JSON.stringify(post), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })

      case 'PUT':
        if (!user || !postId) throw new Error('Unauthorized or missing post ID')
        
        const updates = await req.json()
        const { data: updatedPost, error: updateError } = await supabase
          .from('posts')
          .update(updates)
          .eq('id', postId)
          .eq('user_id', user.id)
          .select()
          .single()

        if (updateError) throw updateError
        return new Response(JSON.stringify(updatedPost), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })

      case 'DELETE':
        if (!user || !postId) throw new Error('Unauthorized or missing post ID')
        
        const { error: deleteError } = await supabase
          .from('posts')
          .delete()
          .eq('id', postId)
          .eq('user_id', user.id)

        if (deleteError) throw deleteError
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })

      default:
        throw new Error('Method not allowed')
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
