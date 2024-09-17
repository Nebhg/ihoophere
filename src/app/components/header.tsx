import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';

export default async function Header() {
  const { userId } = auth();

  return (
    <div className='bg-gray-600 text-neutral-100'>
      <div className='container mx-auto flex items-center justify-between py-4'>
        <Link href='/'>Home</Link>
        <div>
          {userId ? (
            <div className='flex gap-4 items-center'>
              <UserButton afterSignOutUrl='/' />
            </div>
          ) : (
            <div className='flex gap-4 items-center'>
              <SignUpButton mode="modal">
                <button className="text-neutral-100">Sign up</button>
              </SignUpButton>
              <SignInButton mode="modal">
                <button className="text-neutral-100">Sign in</button>
              </SignInButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}