
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

    const url = new URL(req.url)
    const notificationId = url.pathname.split('/').pop()

    switch (req.method) {
      case 'GET':
        const { data: notifications, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (error) throw error
        return new Response(JSON.stringify(notifications), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })

      case 'PUT':
        if (!notificationId) throw new Error('Notification ID required')
        
        const updates = await req.json()
        const { data: updatedNotification, error: updateError } = await supabase
          .from('notifications')
          .update(updates)
          .eq('id', notificationId)
          .eq('user_id', user.id)
          .select()
          .single()

        if (updateError) throw updateError
        return new Response(JSON.stringify(updatedNotification), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })

      case 'POST':
        // Mark all as read
        const { error: markAllError } = await supabase
          .from('notifications')
          .update({ is_read: true })
          .eq('user_id', user.id)
          .eq('is_read', false)

        if (markAllError) throw markAllError
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
