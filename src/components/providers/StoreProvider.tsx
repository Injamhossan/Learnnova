'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';

/**
 * Redux StoreProvider — wraps the app with the Redux store.
 * Must be a Client Component because it uses `useRef`.
 */
export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef(store);
  return <Provider store={storeRef.current}>{children}</Provider>;
}
