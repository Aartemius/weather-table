'use client';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react';
import ContextContainer from '@/context/ContextContainer';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextContainer>
          {children}
        </ContextContainer>
      </body>
    </html>
  )
}
