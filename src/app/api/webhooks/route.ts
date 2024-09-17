import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createClerkSupabaseClientSsr } from '@/lib/client'

// Define types for Clerk user data
interface ClerkUser {
  id: string;
  email_addresses: Array<{
    id: string;
    email_address: string;
  }>;
  primary_email_address_id: string;
  first_name: string | null;
  last_name: string | null;
}

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')
  const client = createClerkSupabaseClientSsr();

  // Initialize Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data
  const eventType = evt.type
  console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
  console.log('Webhook body:', body)

  switch (eventType) {
    case 'user.created':
      return handleUserCreated(supabase, evt.data as ClerkUser)
    case 'user.updated':
      return handleUserUpdated(supabase, evt.data as ClerkUser)
    case 'user.deleted':
      return handleUserDeleted(supabase, id as string)
    default:
      return new Response('', { status: 200 })
  }
}

async function handleUserCreated(supabase: SupabaseClient, userData: ClerkUser): Promise<Response> {
  const { id, email_addresses, first_name, last_name } = userData
  const primaryEmail = email_addresses.find(email => email.id === userData.primary_email_address_id)

  try {
    const { data, error } = await supabase
      .from('users')
      .insert({
        clerkid: id,
        email: primaryEmail?.email_address,
        first_name: first_name || null,
        last_name: last_name || null,
      })
      .single()

    if (error) throw error
    return new Response('User created successfully', { status: 200 })
  } catch (error) {
    console.error('Error creating user:', error)
    return new Response('Error creating user', { status: 500 })
  }
}

async function handleUserUpdated(supabase: SupabaseClient, userData: ClerkUser): Promise<Response> {
  const { id, email_addresses, first_name, last_name } = userData
  const primaryEmail = email_addresses.find(email => email.id === userData.primary_email_address_id)

  try {
    const { data, error } = await supabase
      .from('users')
      .update({
        email: primaryEmail?.email_address,
        first_name: first_name || null,
        last_name: last_name || null,
      })
      .eq('clerk_id', id)

    if (error) throw error
    return new Response('User updated successfully', { status: 200 })
  } catch (error) {
    console.error('Error updating user:', error)
    return new Response('Error updating user', { status: 500 })
  }
}

async function handleUserDeleted(supabase: SupabaseClient, clerkId: string): Promise<Response> {
  try {
    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('clerk_id', clerkId)

    if (error) throw error
    return new Response('User deleted successfully', { status: 200 })
  } catch (error) {
    console.error('Error deleting user:', error)
    return new Response('Error deleting user', { status: 500 })
  }
}