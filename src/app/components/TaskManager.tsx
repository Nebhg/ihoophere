'use client';

// Import necessary hooks and functions from React, Clerk, Supabase, and Next.js
import { useEffect, useState } from 'react';
import { useSession, useUser } from '@clerk/nextjs';
import { createClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { UserRole } from '@/src/app/types/globals.d';

// Function to check if the user's role matches the required role
function checkUserRole(user: { role: UserRole }, requiredRole: UserRole): boolean {
  return user.role === requiredRole;
}

export default function TaskManager() {
  // State variables to manage tasks, loading state, task name, and user role
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const { user } = useUser();
  const { session } = useSession();
  const [isCoach, setIsCoach] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null); // New state for user role

  // Function to create a Supabase client with Clerk authentication
  function createClerkSupabaseClient() {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_KEY!,
      {
        global: {
          fetch: async (url, options = {}) => {
            const clerkToken = await session?.getToken({
              template: 'supabase',
            });

            const headers = new Headers(options?.headers);
            headers.set('Authorization', `Bearer ${clerkToken}`);

            return fetch(url, {
              ...options,
              headers,
            });
          },
        },
      },
    );
  }

  // Create a Supabase client instance
  const client = createClerkSupabaseClient();

  // useEffect hook to load tasks and user role when the user is available
  useEffect(() => {
    if (!user) return;

    console.log('User:', user); // Log user data
    console.log('User ID:', user?.id); // Log user ID with optional chaining

    // Function to load user role from the Supabase database
    async function loadUserRole() {
      const { data, error } = await client
        .from('users')
        .select('role')
        .eq('clerk_id', user?.id) // Use Clerk user ID directly with optional chaining
        .single();

      console.log('User role data:', data); // Log role data
      console.log('User role error:', error); // Log role error

      if (!error && data) {
        const role = data.role as UserRole;
        setUserRole(role); // Set the user role
        setIsCoach(checkUserRole({ role }, UserRole.Coach));
      }
    }

    // Function to load tasks from the Supabase database
    async function loadTasks() {
      setLoading(true);
      const { data, error } = await client.from('tasks').select();
      console.log('Tasks data:', data); // Log tasks data
      console.log('Tasks error:', error); // Log tasks error
      if (!error) setTasks(data);
      setLoading(false);
    }

    // Load user role and tasks
    (async () => {
      await loadUserRole();
      await loadTasks();
    })();
  }, [user]);

  // Function to create a new task
  async function createTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await client.from('tasks').insert({
      name,
    });
    window.location.reload();
  }

  return (
    <div>
      <h1>Tasks</h1>

      {/* Display user role */}
      {userRole && <p>Your role: {UserRole[userRole]}</p>}

      {/* Display loading message */}
      {loading && <p>Loading...</p>}

      {/* Display tasks if available */}
      {!loading && tasks.length > 0 && tasks.map((task: any) => <p key={task.id}>{task.name}</p>)}

      {/* Display message if no tasks are found */}
      {!loading && tasks.length === 0 && <p>No tasks found</p>}

      {/* Display form to add new tasks if the user is a coach */}
      {isCoach && (
        <form onSubmit={createTask}>
          <input
            autoFocus
            type="text"
            name="name"
            placeholder="Enter new task"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <button type="submit">Add</button>
        </form>
      )}
    </div>
  );
}