import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { taskId, userId } = await req.json();
  console.log('Received request:', { taskId, userId });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    // Fetch the current task
    console.log('Fetching task data for taskId:', taskId);
    const { data: currentTask, error: fetchError } = await supabase
      .from('tasks')
      .select('attendees, spaces_left')
      .eq('id', taskId)
      .single();

    console.log('Task query result:', { currentTask, fetchError });

    if (fetchError) throw fetchError;
    if (!currentTask) throw new Error('Task not found');

    // Check if user is already signed up
    if (currentTask.attendees && currentTask.attendees.includes(userId)) {
      return NextResponse.json({ error: 'User already signed up for this task' }, { status: 400 });
    }

    // Check if there are spaces left
    if (currentTask.spaces_left <= 0) {
      return NextResponse.json({ error: 'No spaces left for this task' }, { status: 400 });
    }

    // Prepare the new attendees array
    const newAttendees = currentTask.attendees ? [...currentTask.attendees, userId] : [userId];

    // Update the task
    const { data, error } = await supabase
      .from('tasks')
      .update({
        attendees: newAttendees,
        spaces_left: currentTask.spaces_left - 1
      })
      .eq('id', taskId)
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in task signup:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Failed to sign up for task', details: errorMessage }, { status: 500 });
  }
}
