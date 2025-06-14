
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

    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data: { user } } = await supabase.auth.getUser(token)

    if (!user) {
      throw new Error('Unauthorized')
    }

    const { likeable_type, likeable_id } = await req.json()

    switch (req.method) {
      case 'POST':
        // Toggle like
        const { data: existingLike } = await supabase
          .from('likes')
          .select('id')
          .eq('user_id', user.id)
          .eq('likeable_type', likeable_type)
          .eq('likeable_id', likeable_id)
          .single()

        if (existingLike) {
          // Unlike
          const { error: deleteError } = await supabase
            .from('likes')
            .delete()
            .eq('id', existingLike.id)

          if (deleteError) throw deleteError

          // Update count
          if (likeable_type === 'post') {
            await supabase.rpc('decrement_likes_count', { post_id: likeable_id })
          }

          return new Response(JSON.stringify({ liked: false }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        } else {
          // Like
          const { error: insertError } = await supabase
            .from('likes')
            .insert({
              user_id: user.id,
              likeable_type,
              likeable_id
            })

          if (insertError) throw insertError

          // Update count
          if (likeable_type === 'post') {
            await supabase.rpc('increment_likes_count', { post_id: likeable_id })
          }

          return new Response(JSON.stringify({ liked: true }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        }

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
