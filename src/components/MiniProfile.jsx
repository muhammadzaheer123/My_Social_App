"use client";
import React from 'react';
import { useUser ,UserButton } from '@clerk/nextjs';

export default function MiniProfile() {
  const { user } = useUser();

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex items-center p-4 shadow-md rounded-lg w-72 gap-4">
        <UserButton />
    
      <div className="">
        <h2 className="text-sm font-semibold">{user.firstName} {user.lastName}</h2>
        <p className="text-[11px] text-gray-600">{user.emailAddresses[0].emailAddress}</p>
      </div>
    </div>
  );
}