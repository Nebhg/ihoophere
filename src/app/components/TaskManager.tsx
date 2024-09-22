'use client';

import { useEffect, useState } from 'react';
import { useSession, useUser } from '@clerk/nextjs';
import { createClient } from '@supabase/supabase-js';
import { UserRole } from '@/src/app/types/globals.d';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Trophy } from "lucide-react";
import TaskCreationForm from './TaskCreationForm';

// Function to check if the user's role matches the required role
function checkUserRole(user: { role: UserRole }, requiredRole: UserRole): boolean {
  return user.role === requiredRole;
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();
  const { session } = useSession();
  const [isCoach, setIsCoach] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);
  const tasksPerPage = 12;

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

  const client = createClerkSupabaseClient();

  useEffect(() => {
    if (!user) return;

    async function loadUserRole() {
      const { data, error } = await client
        .from('users')
        .select('role')
        .eq('clerk_id', user?.id)
        .single();

      if (!error && data) {
        const role = data.role as UserRole;
        setUserRole(role);
        setIsCoach(checkUserRole({ role }, UserRole.Coach));
      }
    }

    async function loadTasks(page: number) {
      setLoading(true);
      const { data, error, count } = await client
        .from('tasks')
        .select('*', { count: 'exact' })
        .range((page - 1) * tasksPerPage, page * tasksPerPage - 1);
      if (!error) {
        setTasks(data);
        setTotalTasks(count || 0);
      }
      setLoading(false);
    }

    (async () => {
      await loadUserRole();
      await loadTasks(currentPage);
    })();
  }, [user, currentPage]);

  const totalPages = Math.ceil(totalTasks / tasksPerPage);

  async function createTask(task: any) {
    await client.from('tasks').insert({
      ...task,
      user_id: user?.id,
    });
    window.location.reload();
  }

  return (
    <div className="container mx-auto p-4 max-h-screen overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading && <p className="text-black dark:text-white">Loading...</p>}
        {!loading && tasks.length > 0 && tasks.map((task: any) => (
          <Card key={task.id} className="overflow-hidden bg-white dark:bg-gray-800">
            <CardHeader className="pb-0">
              <div className="flex items-center space-x-2">
                <div>
                  <h3 className="font-semibold text-black dark:text-white">Task</h3>
                  <h4 className="text-lg font-bold text-black dark:text-white">{task.name}</h4>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-black dark:text-white">{task.description}</p>
              <div className="flex items-center mt-2 text-sm text-gray-600 dark:text-gray-300">
                <Clock className="h-4 w-4 mr-1" />
                <span>{task.ageRange}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start pt-0">
              <div className="flex flex-wrap gap-2 mb-2">
                {task.tags && task.tags.map((tag: string, tagIndex: number) => (
                  <span key={tagIndex} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-between w-full">
                <Button variant="link" className="text-blue-600 p-0">
                  More info
                </Button>
                <Button variant="link" className="text-blue-600 p-0">
                  View schedule
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
        {!loading && tasks.length === 0 && <p className="text-black dark:text-white">No tasks found</p>}
        {isCoach && (
          <Button onClick={() => setIsModalOpen(true)} className="w-full p-2 bg-blue-600 text-white rounded">
            Create Task
          </Button>
        )}
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="link"
          className="text-blue-600 p-0"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index + 1}
              variant="link"
              className={`text-blue-600 p-0 ${currentPage === index + 1 ? 'font-bold' : ''}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
        <Button
          variant="link"
          className="text-blue-600 p-0"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
      {isModalOpen && (
        <TaskCreationForm
          onSubmit={createTask}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}