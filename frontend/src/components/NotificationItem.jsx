import React from 'react';
import { MdMarkEmailRead } from 'react-icons/md';

const NotificationItem = ({ notification, markAsRead }) => {
  const { _id, type, message, isRead, createdAt } = notification;

  return (
    <div
      className={`rounded-2xl border p-5 transition ${
        isRead
          ? 'border-slate-200 bg-white'
          : 'border-slate-950/15 bg-slate-50/90 shadow-[0_8px_30px_rgba(15,23,42,0.06)]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-slate-900">{type}</h3>
            {!isRead ? (
              <span className="rounded-full bg-slate-950 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                New
              </span>
            ) : null}
          </div>
          <p className="mt-2 text-sm leading-7 text-slate-600">{message}</p>
          <p className="mt-3 text-xs text-slate-400">{new Date(createdAt).toLocaleString()}</p>
        </div>
        {!isRead ? (
          <button
            type="button"
            className="shrink-0 rounded-full border border-slate-200 p-2 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
            onClick={() => markAsRead(_id)}
            aria-label="Mark as read"
          >
            <MdMarkEmailRead className="h-5 w-5" />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default NotificationItem;
