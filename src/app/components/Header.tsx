import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { ThemeToggle } from '@/src/app/components/ui/ThemeToggle';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default async function Header() {
  const { userId } = auth();

  return (
    <header className="w-full bg-white dark:bg-gray-800 border-b dark:border-gray-700">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-black dark:text-white">I hoop here</h1>
        </div>
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Input type="text" placeholder="Little Britain" className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-700 text-black dark:text-white" />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {userId ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <div className='flex gap-4 items-center'>
              <SignUpButton mode="modal">
                <button className="text-black dark:text-white">Sign up</button>
              </SignUpButton>
              <SignInButton mode="modal">
                <button className="text-black dark:text-white">Sign in</button>
              </SignInButton>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}