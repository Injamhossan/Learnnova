/**
 * UI slice — global loading state, toast notifications, sidebar toggle.
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface UiState {
  toasts: Toast[];
  sidebarOpen: boolean;
  globalLoading: boolean;
}

const initialState: UiState = {
  toasts: [],
  sidebarOpen: true,
  globalLoading: false,
};

let toastIdCounter = 0;

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addToast(state, action: PayloadAction<Omit<Toast, 'id'>>) {
      state.toasts.push({ ...action.payload, id: String(++toastIdCounter) });
    },
    removeToast(state, action: PayloadAction<string>) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
    clearToasts(state) {
      state.toasts = [];
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload;
    },
    setGlobalLoading(state, action: PayloadAction<boolean>) {
      state.globalLoading = action.payload;
    },
  },
});

export const { addToast, removeToast, clearToasts, toggleSidebar, setSidebarOpen, setGlobalLoading } = uiSlice.actions;
export default uiSlice.reducer;

// ── Typed helper to dispatch toasts easily ────────────────────────────────
export const toast = {
  success: (title: string, message?: string): Omit<Toast, 'id'> => ({ type: 'success', title, message }),
  error: (title: string, message?: string): Omit<Toast, 'id'> => ({ type: 'error', title, message }),
  info: (title: string, message?: string): Omit<Toast, 'id'> => ({ type: 'info', title, message }),
  warning: (title: string, message?: string): Omit<Toast, 'id'> => ({ type: 'warning', title, message }),
};
