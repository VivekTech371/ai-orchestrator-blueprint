
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
    const templateId = url.pathname.split('/').pop()

    switch (req.method) {
      case 'GET':
        if (templateId && templateId !== 'templates') {
          // Get single template
          const { data: template, error } = await supabase
            .from('templates')
            .select(`
              *,
              profiles:user_id (username, full_name, avatar_url)
            `)
            .eq('id', templateId)
            .single()

          if (error) throw error
          return new Response(JSON.stringify(template), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        } else {
          // Get all templates
          const query = supabase
            .from('templates')
            .select(`
              *,
              profiles:user_id (username, full_name, avatar_url)
            `)
            .eq('is_public', true)
            .order('created_at', { ascending: false })

          const { data: templates, error } = await query

          if (error) throw error
          return new Response(JSON.stringify(templates), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        }

      case 'POST':
        if (!user) throw new Error('Unauthorized')
        
        const newTemplate = await req.json()
        const { data: template, error } = await supabase
          .from('templates')
          .insert({
            ...newTemplate,
            user_id: user.id
          })
          .select()
          .single()

        if (error) throw error
        return new Response(JSON.stringify(template), {
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
