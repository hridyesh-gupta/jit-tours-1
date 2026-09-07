import React, { useState, useEffect } from 'react';
import { Lock, LogOut, RefreshCw, AlertCircle, Loader2, Inbox } from 'lucide-react';

const TOKEN_KEY = 'jit_admin_token';

export default function AdminPanel() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [notice, setNotice] = useState('');

  const loadEnquiries = async (activeToken) => {
    setLoading(true);
    setLoadError('');
    try {
      const res = await fetch('/api/admin/enquiries', {
        headers: { Authorization: `Bearer ${activeToken}` }
      });
      const data = await res.json();

      if (res.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
        setToken('');
        return;
      }
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to load enquiries.');
      }

      setEnquiries(data.enquiries || []);
      setNotice(data.notice || '');
    } catch (err) {
      setLoadError(err.message || 'Something went wrong loading enquiries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) loadEnquiries(token);
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Login failed.');
      }

      localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
    } catch (err) {
      setLoginError(err.message || 'Login failed.');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken('');
    setEnquiries([]);
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-2xl">
          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-lg font-bold text-white">Admin Login</h1>
            <p className="text-xs text-slate-400">Jit Tours and Travels</p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:border-amber-500 focus:outline-none"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loggingIn}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition text-sm cursor-pointer flex items-center justify-center space-x-2"
          >
            {loggingIn ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Log In</span>}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Customer Enquiries</h1>
            <p className="text-xs text-slate-400">{enquiries.length} total</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => loadEnquiries(token)}
              className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-amber-400 transition cursor-pointer"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center space-x-1.5 text-xs font-bold text-slate-300 transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {notice && (
          <div className="mb-6 p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{notice === 'DATABASE_URL not configured' ? 'No database connected yet — enquiries are only emailed, not saved. Set DATABASE_URL to start seeing them here.' : notice}</span>
          </div>
        )}

        {loadError && (
          <div className="mb-6 p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{loadError}</span>
          </div>
        )}

        {!loading && !loadError && enquiries.length === 0 && (
          <div className="py-16 text-center text-slate-500">
            <Inbox className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No enquiries yet.</p>
          </div>
        )}

        {enquiries.length > 0 && (
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-900 text-slate-400">
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Date</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Name</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Phone</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Email</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Car</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Place</th>
                  <th className="px-4 py-3 font-semibold">Message</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((row) => (
                  <tr key={row.id} className="border-t border-slate-800 hover:bg-slate-900/50">
                    <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                      {new Date(row.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                    </td>
                    <td className="px-4 py-3 text-white font-semibold whitespace-nowrap">{row.full_name}</td>
                    <td className="px-4 py-3 text-slate-300 whitespace-nowrap">
                      <a href={`tel:${row.phone}`} className="hover:text-amber-400">{row.phone}</a>
                    </td>
                    <td className="px-4 py-3 text-slate-300 whitespace-nowrap">
                      <a href={`mailto:${row.email}`} className="hover:text-amber-400">{row.email}</a>
                    </td>
                    <td className="px-4 py-3 text-slate-300 whitespace-nowrap">{row.car_type || '—'}</td>
                    <td className="px-4 py-3 text-slate-300 whitespace-nowrap">{row.place || '—'}</td>
                    <td className="px-4 py-3 text-slate-400 max-w-xs">{row.message || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}
