'use client';
import { signOut } from 'next-auth/react';

export default function DashboardBar({ username }: { username: string }) {
  return (
    <div className="flex w-full justify-between">
      <h2 className="text-sm md:text-xl font-semibold">Welcome, {username}</h2>
      <button
        onClick={() => signOut()}
        className="rounded p-1 md:p-3 text-center bg-[#279af1] text-white ring-[#279af1] hover:bg-[#60656f] hover:text-gray-300 transition-all duration-500"
      >
        SignOut
      </button>
    </div>
  );
}
