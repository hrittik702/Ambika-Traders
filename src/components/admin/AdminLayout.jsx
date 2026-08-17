import React, { useState } from 'react';
import { NavLink, Link, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  Inbox,
  Package,
  Wrench,
  Users,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function AdminLayout() {
  const { currentUser, logout } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Overview Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Quotations & Orders', path: '/admin/enquiries', icon: Inbox },
    { label: 'Manage Products', path: '/admin/products', icon: Package },
    { label: 'Manage Services', path: '/admin/services', icon: Wrench },
    { label: 'Admin Accounts', path: '/admin/admins', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-mono-100 font-intern flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:w-64 bg-mono-950 text-mono-0 flex-col justify-between p-6 border-r border-mono-850 shrink-0 sticky top-0 h-screen">
        <div className="space-y-8">
          {/* Brand */}
          <Link to="/admin/dashboard" className="flex flex-col group">
            <span className="font-bold text-lg tracking-tighter text-mono-0 uppercase group-hover:text-mono-300">
              AMBIKA TRADERS
            </span>
            <span className="text-[0.62rem] font-mono tracking-widest text-mono-400 uppercase">
              [ADMIN CONTROL PANEL]
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3.5 py-2.5 rounded-xs text-xs font-medium transition-colors',
                      isActive
                        ? 'bg-mono-0 text-mono-950 font-semibold shadow-subtle'
                        : 'text-mono-400 hover:bg-mono-900 hover:text-mono-0'
                    )
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="pt-6 border-t border-mono-850 space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-mono-800 border border-mono-700 flex items-center justify-center text-mono-0 font-mono text-xs font-bold shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-semibold text-mono-0 block truncate">
                {currentUser?.displayName || 'Admin User'}
              </span>
              <span className="text-[0.68rem] font-mono text-mono-400 block truncate">
                {currentUser?.email}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 text-xs font-mono text-mono-400 hover:text-mono-0 hover:bg-mono-900 rounded-xs transition-colors"
            >
              <span>Live Website Dekhein</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center justify-between px-3 py-2 text-xs font-mono text-red-400 hover:text-red-300 hover:bg-mono-900 rounded-xs transition-colors text-left"
            >
              <span>Sign Out</span>
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Topbar */}
      <div className="md:hidden bg-mono-950 text-mono-0 p-4 flex items-center justify-between border-b border-mono-850 sticky top-0 z-navbar">
        <Link to="/admin/dashboard" className="flex flex-col">
          <span className="font-bold text-base tracking-tight uppercase">
            AMBIKA ADMIN
          </span>
          <span className="text-[0.6rem] font-mono text-mono-400">
            {currentUser?.email}
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-2 text-mono-0 rounded-xs border border-mono-800"
          aria-label="Toggle Navigation"
        >
          {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileNavOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-mobile-menu bg-mono-950 p-6 flex flex-col justify-between">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileNavOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xs text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-mono-0 text-mono-950 font-semibold'
                        : 'text-mono-300 hover:bg-mono-900'
                    )
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-mono-800 flex flex-col gap-3">
            <Link
              to="/"
              onClick={() => setMobileNavOpen(false)}
              className="flex items-center justify-between text-xs font-mono text-mono-400 py-2"
            >
              <span>Live Website Dekhein</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full py-2.5 px-4 bg-red-950/60 border border-red-800 text-red-300 text-xs font-mono rounded-xs text-center"
            >
              Log Out of Admin
            </button>
          </div>
        </div>
      )}

      {/* Main Admin Page Content */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
