import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-24 px-4">{children}</main>
      <Footer />
    </div>
  );
};
