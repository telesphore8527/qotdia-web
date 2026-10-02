import { useCallback, useEffect, useState } from 'react';

const SYNC_TAG = 'daily-quote';
const MIN_INTERVAL_MS = 12 * 60 * 60 * 1000;

export function isReminderSupported() {
  return (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'Notification' in window &&
    'PeriodicSyncManager' in window
  );
}

function getInitialStatus() {
  if (!isReminderSupported()) return 'unsupported';
  if (Notification.permission === 'denied') return 'blocked';
  return 'off';
}

/**
 * status :
 *  - 'unsupported' : naviagators without service worker or periodic sync support
 *  - 'blocked'     : notifications denied by the user
 *  - 'off'         : reminders disabled
 *  - 'on'          : reminders enabled
 */
export function useDailyReminder() {
  const [status, setStatus] = useState(getInitialStatus);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isReminderSupported() || Notification.permission !== 'granted') return;

    let cancelled = false;
    navigator.serviceWorker.ready
      .then((reg) => reg.periodicSync.getTags())
      .then((tags) => {
        if (!cancelled && tags.includes(SYNC_TAG)) setStatus('on');
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  const enable = useCallback(async () => {
    setError(null);
    if (!isReminderSupported()) return false;

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      setStatus(permission === 'denied' ? 'blocked' : 'off');
      return false;
    }

    try {
      const reg = await navigator.serviceWorker.ready;

      const perm = await navigator.permissions.query({
        name: 'periodic-background-sync',
      });
      if (perm.state !== 'granted') {
        setError('Install the app on your device to enable reminders.');
        setStatus('off');
        return false;
      }

      await reg.periodicSync.register(SYNC_TAG, {
        minInterval: MIN_INTERVAL_MS,
      });
      setStatus('on');
      return true;
    } catch (e) {
      setError(e?.message || 'Unable to enable reminders.');
      setStatus('off');
      return false;
    }
  }, []);

  const disable = useCallback(async () => {
    setError(null);
    try {
      const reg = await navigator.serviceWorker.ready;
      await reg.periodicSync.unregister(SYNC_TAG);
    } finally {
      setStatus('off');
    }
  }, []);

  return { status, error, enable, disable };
}