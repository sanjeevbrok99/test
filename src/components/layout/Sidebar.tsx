
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  ActivitySquare,
  AlertTriangle,
  FileText,
  Home,
  ShieldCheck,
  BarChart2,
  Settings,
  BookCheck,
  LogOut,
  Users,
  Shield,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  className?: string;
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isOpen }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
          isActive
            ? 'bg-primary text-primary-foreground'
            : 'hover:bg-muted text-muted-foreground hover:text-foreground',
          !isOpen && 'justify-center py-2.5 px-3'
        )
      }
    >
      {icon}
      {isOpen && <span>{label}</span>}
    </NavLink>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, className }) => {
  const { user, logout } = useAuth();

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-30 flex flex-col bg-sidebar transition-all duration-300 ease-out',
        isOpen ? 'w-64' : 'w-16',
        className
      )}
    >
      <div className={cn('flex h-16 items-center px-4', isOpen ? 'justify-between' : 'justify-center')}>
        {isOpen ? (
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">FraudMonitor</span>
          </div>
        ) : (
          <ShieldCheck className="h-6 w-6 text-primary" />
        )}
      </div>

      <div className="flex-1 overflow-auto py-4 px-3">
        <div className="space-y-2">
          <NavItem to="/dashboard" icon={<Home className="h-5 w-5" />} label="Dashboard" isOpen={isOpen} />
          <NavItem to="/rules" icon={<BookCheck className="h-5 w-5" />} label="Rule Engine" isOpen={isOpen} />
          <NavItem to="/reports" icon={<AlertTriangle className="h-5 w-5" />} label="Fraud Reports" isOpen={isOpen} />
          <NavItem to="/transactions" icon={<ActivitySquare className="h-5 w-5" />} label="Transactions" isOpen={isOpen} />
          <NavItem to="/analytics" icon={<BarChart2 className="h-5 w-5" />} label="Analytics" isOpen={isOpen} />
          <NavItem to="/risk-scoring" icon={<Shield className="h-5 w-5" />} label="Risk Scoring" isOpen={isOpen} />
          <NavItem to="/user-analysis" icon={<Users className="h-5 w-5" />} label="User Analysis" isOpen={isOpen} />
          <NavItem to="/fraud-detection" icon={<ShieldCheck className="h-5 w-5" />} label="Fraud Detection" isOpen={isOpen} />
        </div>
      </div>

      <div className="border-t py-4 px-3">
        <div className="space-y-2">
          <NavItem to="/settings" icon={<Settings className="h-5 w-5" />} label="Settings" isOpen={isOpen} />
          <button
            onClick={logout}
            className={cn(
              'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive',
              !isOpen && 'justify-center py-2.5 px-3'
            )}
          >
            <LogOut className="h-5 w-5" />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
