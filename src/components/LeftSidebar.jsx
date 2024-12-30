import React from 'react'
import {
  ClerkProvider,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

export default function LeftSidebar() {
  return (
    <>
     <ClerkProvider>
          <SignedOut>
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
    </ClerkProvider>
     </>
  )
}