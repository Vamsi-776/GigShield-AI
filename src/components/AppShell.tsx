import type { ReactNode } from 'react';
import Sidebar from './Sidebar';

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="lg:flex bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <div className="px-4 sm:px-6 lg:px-10 py-6">{children}</div>
      </div>
    </div>
  );
}

