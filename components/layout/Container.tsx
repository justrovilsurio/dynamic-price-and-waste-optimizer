'use client';

import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  sidebarOpen?: boolean;
}

export function Container({ children, sidebarOpen = true }: ContainerProps) {
  return (
    <div className={`pt-20 pb-8 px-4 lg:px-8 w-screen lg:w-auto transition-all duration-300 overflow-x-hidden ${
      sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
    }`}>
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}
