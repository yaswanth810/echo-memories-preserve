import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ThemeToggle } from './ThemeToggle';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ThemeToggle />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
