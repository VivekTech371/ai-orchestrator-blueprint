
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

    const { workflowId, input } = await req.json()

    // Get workflow
    const { data: workflow, error: workflowError } = await supabase
      .from('workflows')
      .select('*')
      .eq('id', workflowId)
      .eq('user_id', user.id)
      .single()

    if (workflowError) throw workflowError

    if (workflow.status !== 'active') {
      throw new Error('Workflow is not active')
    }

    // Execute workflow steps
    let result = input || {}
    
    for (const step of workflow.steps) {
      switch (step.type) {
        case 'agent':
          // Execute agent step
          const { data: agent } = await supabase
            .from('agents')
            .select('*')
            .eq('id', step.config.agentId)
            .single()

          if (agent) {
            // Simulate AI processing
            result = {
              ...result,
              [`step_${step.id}`]: `Processed by ${agent.name}: ${JSON.stringify(result)}`
            }
          }
          break

        case 'condition':
          // Evaluate condition
          const condition = step.config.condition
          const conditionMet = evaluateCondition(result, condition)
          result.conditionMet = conditionMet
          break

        case 'delay':
          // Add delay (in real implementation, use a queue system)
          await new Promise(resolve => setTimeout(resolve, step.config.duration || 1000))
          break

        case 'webhook':
          // Call webhook
          try {
            const webhookResponse = await fetch(step.config.url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(result)
            })
            result.webhookResponse = await webhookResponse.json()
          } catch (error) {
            result.webhookError = error.message
          }
          break

        case 'email':
          // Send email (mock implementation)
          result.emailSent = {
            to: step.config.to,
            subject: step.config.subject,
            body: step.config.body,
            timestamp: new Date().toISOString()
          }
          break
      }
    }

    // Log execution
    await supabase
      .from('usage_analytics')
      .insert({
        user_id: user.id,
        event_type: 'workflow_execution',
        event_data: {
          workflow_id: workflowId,
          input,
          result,
          steps_executed: workflow.steps.length
        }
      })

    return new Response(JSON.stringify({ success: true, result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})

function evaluateCondition(data: any, condition: any): boolean {
  // Simple condition evaluation
  const { field, operator, value } = condition
  const fieldValue = data[field]

  switch (operator) {
    case 'equals':
      return fieldValue === value
    case 'not_equals':
      return fieldValue !== value
    case 'greater_than':
      return fieldValue > value
    case 'less_than':
      return fieldValue < value
    case 'contains':
      return String(fieldValue).includes(value)
    default:
      return false
  }
}
