
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
    const agentId = url.pathname.split('/').pop()

    switch (req.method) {
      case 'GET':
        if (agentId && agentId !== 'agents') {
          // Get single agent
          const { data: agent, error } = await supabase
            .from('agents')
            .select(`
              *,
              profiles:user_id (username, full_name, avatar_url)
            `)
            .eq('id', agentId)
            .single()

          if (error) throw error
          return new Response(JSON.stringify(agent), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        } else {
          // Get all agents
          const { data: agents, error } = await supabase
            .from('agents')
            .select(`
              *,
              profiles:user_id (username, full_name, avatar_url)
            `)
            .or(`user_id.eq.${user.id},is_public.eq.true`)
            .order('created_at', { ascending: false })

          if (error) throw error
          return new Response(JSON.stringify(agents), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        }

      case 'POST':
        const newAgent = await req.json()
        const { data: agent, error } = await supabase
          .from('agents')
          .insert({
            ...newAgent,
            user_id: user.id
          })
          .select()
          .single()

        if (error) throw error
        return new Response(JSON.stringify(agent), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })

      case 'PUT':
        if (!agentId) throw new Error('Agent ID required')
        
        const updates = await req.json()
        const { data: updatedAgent, error: updateError } = await supabase
          .from('agents')
          .update(updates)
          .eq('id', agentId)
          .eq('user_id', user.id)
          .select()
          .single()

        if (updateError) throw updateError
        return new Response(JSON.stringify(updatedAgent), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })

      case 'DELETE':
        if (!agentId) throw new Error('Agent ID required')
        
        const { error: deleteError } = await supabase
          .from('agents')
          .delete()
          .eq('id', agentId)
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
