import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import SummaryApi from '../common';
import { PiPackageBold, PiUserCircleBold, PiBellBold } from 'react-icons/pi';

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
    isActive
      ? 'bg-slate-950 text-white shadow-[0_10px_24px_rgba(15,23,42,0.18)]'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
  }`;

const AccountLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(SummaryApi.current_user.url, {
          method: SummaryApi.current_user.method,
          credentials: 'include',
        });
        const json = await res.json();
        if (cancelled) return;
        if (json.success && json.data) {
          dispatch(setUserDetails(json.data));
          setReady(true);
        } else {
          navigate('/login', { replace: true, state: { from: location.pathname } });
        }
      } catch {
        if (!cancelled) navigate('/login', { replace: true, state: { from: location.pathname } });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [dispatch, navigate, location.pathname]);

  if (!ready) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <p className="text-sm font-medium text-slate-500">Loading your account…</p>
      </div>
    );
  }

  return (
    <div className="mt-0 bg-white pb-12 pt-0 sm:mt-6 sm:px-8 lg:mt-2 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="px-4 pb-6 pt-6 sm:px-0 sm:pt-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Account</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-3xl">My account</h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
            Manage your profile, review orders, and read store notifications in one place.
          </p>
        </div>

        <div className="flex flex-col gap-8 px-4 pb-8 sm:px-0 lg:flex-row lg:items-start">
          <aside className="w-full shrink-0 lg:sticky lg:top-28 lg:w-64">
            <nav className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-[linear-gradient(135deg,_rgba(255,255,255,0.96),_rgba(248,250,252,0.95)_45%,_rgba(241,245,249,0.98))] p-3 shadow-[0_20px_80px_rgba(15,23,42,0.06)]">
              <p className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Menu
              </p>
              <div className="flex flex-col gap-1">
                <NavLink to="/account" end className={navLinkClass}>
                  <PiUserCircleBold className="h-5 w-5 shrink-0 opacity-90" aria-hidden />
                  Profile &amp; settings
                </NavLink>
                <NavLink to="/account/orders" className={navLinkClass}>
                  <PiPackageBold className="h-5 w-5 shrink-0 opacity-90" aria-hidden />
                  My orders
                </NavLink>
                <NavLink to="/account/notifications" className={navLinkClass}>
                  <PiBellBold className="h-5 w-5 shrink-0 opacity-90" aria-hidden />
                  Notifications
                </NavLink>
              </div>
            </nav>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="overflow-hidden rounded-[36px] border border-slate-200/80 bg-white shadow-[0_30px_120px_rgba(15,23,42,0.06)]">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
