import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { setUserDetails } from '../store/userSlice';

const inputClass =
  'mt-1.5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200';

const AccountProfilePage = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    location: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    setForm({
      fullName: user.fullName || '',
      phone: user.phone || '',
      location:
        user.location && user.location !== 'Not Specified' ? user.location : '',
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(SummaryApi.updateProfile.url, {
        method: SummaryApi.updateProfile.method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          phone: form.phone.trim(),
          location: (form.location || '').trim() || 'Not Specified',
        }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        dispatch(setUserDetails(json.data));
        toast.success(json.message || 'Profile saved');
      } else {
        toast.error(json.message || 'Could not save profile');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;

  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <div className="border-b border-slate-100 pb-6">
        <h2 className="text-xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-2xl">
          Profile &amp; settings
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-7 text-slate-600">
          Keep your details up to date for a smoother checkout and support experience. Your sign-in email comes from
          Google and cannot be changed here.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-start">
        <div className="flex flex-col items-center sm:items-start">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt=""
              className="h-24 w-24 rounded-full border border-slate-200 object-cover shadow-sm"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-2xl font-semibold text-slate-600">
              {(user.fullName || user.email || '?').charAt(0).toUpperCase()}
            </div>
          )}
          <p className="mt-3 text-center text-xs text-slate-500 sm:text-left">
            Profile photo is managed by your Google account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="min-w-0 flex-1 space-y-5">
          <div>
            <label htmlFor="account-email" className="text-sm font-medium text-slate-800">
              Email
            </label>
            <input
              id="account-email"
              type="email"
              value={user.email || ''}
              disabled
              className={`${inputClass} cursor-not-allowed bg-slate-50 text-slate-500`}
            />
          </div>

          <div>
            <label htmlFor="account-name" className="text-sm font-medium text-slate-800">
              Full name
            </label>
            <input
              id="account-name"
              name="fullName"
              type="text"
              value={form.fullName}
              onChange={handleChange}
              autoComplete="name"
              className={inputClass}
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="account-phone" className="text-sm font-medium text-slate-800">
              Phone
            </label>
            <input
              id="account-phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              autoComplete="tel"
              className={inputClass}
              placeholder="For delivery updates"
            />
          </div>

          <div>
            <label htmlFor="account-location" className="text-sm font-medium text-slate-800">
              City / region
            </label>
            <input
              id="account-location"
              name="location"
              type="text"
              value={form.location}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. Lagos"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800 disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountProfilePage;
