import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import NotificationItem from '../components/NotificationItem';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.getNotification.url, {
        method: SummaryApi.getNotification.method,
        credentials: 'include',
      });
      const result = await response.json();

      if (result.success) {
        setNotifications(result.notifications);
      } else {
        toast.error(result.message || 'Failed to load notifications.');
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast.error('An error occurred while fetching notifications.');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      const response = await fetch(SummaryApi.markAsRead.url, {
        method: SummaryApi.markAsRead.method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationIds: [id] }),
      });
      const result = await response.json();

      if (result.success) {
        toast.success('Marked as read.');
        setNotifications((prev) =>
          prev.map((notif) => (notif._id === id ? { ...notif, isRead: true } : notif))
        );
      } else {
        toast.error(result.message || 'Failed to mark notification as read.');
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
      toast.error('An error occurred while updating the notification.');
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <div className="border-b border-slate-100 pb-6">
        <h2 className="text-xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-2xl">Notifications</h2>
        <p className="mt-2 max-w-xl text-sm leading-7 text-slate-600">
          Updates about your orders and account. Unread items are highlighted at a glance.
        </p>
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className="h-24 animate-pulse rounded-2xl border border-slate-100 bg-slate-100"
              />
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50/80 px-6 py-14 text-center">
            <p className="text-base font-medium text-slate-800">You are all caught up</p>
            <p className="mt-2 text-sm text-slate-600">New notifications will appear here when something changes.</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {notifications.map((notification) => (
              <li key={notification._id}>
                <NotificationItem notification={notification} markAsRead={markAsRead} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
