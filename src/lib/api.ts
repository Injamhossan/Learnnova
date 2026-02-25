/**
 * Centralized API client for Learnova frontend.
 * All backend calls go through this module.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  token?: string;
  signal?: AbortSignal;
};

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function request<T>(endpoint: string, opts: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, token, signal } = opts;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    signal,
    cache: 'no-store',
  });

  if (!res.ok) {
    let message = `API error ${res.status}`;
    try {
      const err = await res.json();
      message = err.message || message;
    } catch {}
    throw new ApiError(res.status, message);
  }

  // Some DELETE routes return no body
  const text = await res.text();
  return text ? JSON.parse(text) : ({} as T);
}

// ─────────────────────────────────────────────────────────────────────────────
// Admin endpoints
// ─────────────────────────────────────────────────────────────────────────────
export const adminApi = {
  getStats: (token: string, days = 10) =>
    request<any>(`/api/admin/stats?days=${days}`, { token }),

  getUsers: (token: string, params: { page?: number; limit?: number; search?: string; role?: string } = {}) => {
    const q = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== '').map(([k, v]) => [k, String(v)]))
    );
    return request<any>(`/api/admin/users?${q}`, { token });
  },

  toggleUser: (token: string, id: string) =>
    request<any>(`/api/admin/users/${id}/toggle`, { method: 'PATCH', token }),

  updateUserRole: (token: string, id: string, role: string) =>
    request<any>(`/api/admin/users/${id}/role`, { method: 'PATCH', body: { role }, token }),

  deleteUser: (token: string, id: string) =>
    request<any>(`/api/admin/users/${id}`, { method: 'DELETE', token }),

  getCategories: (token: string) =>
    request<any[]>('/api/admin/categories', { token }),

  createCategory: (token: string, data: { name: string; description?: string }) =>
    request<any>('/api/admin/categories', { method: 'POST', body: data, token }),

  getCourses: (token: string, params: { page?: number; search?: string } = {}) => {
    const q = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== '').map(([k, v]) => [k, String(v)]))
    );
    return request<any>(`/api/admin/courses?${q}`, { token });
  },

  toggleCourse: (token: string, id: string) =>
    request<any>(`/api/admin/courses/${id}/toggle`, { method: 'PATCH', token }),
};

// ─────────────────────────────────────────────────────────────────────────────
// Course endpoints
// ─────────────────────────────────────────────────────────────────────────────
export const courseApi = {
  getPublic: (params: { limit?: number; search?: string; category?: string; sort?: string; cursor?: string } = {}) => {
    const q = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== '').map(([k, v]) => [k, String(v)]))
    );
    return request<any>(`/api/courses?${q}`);
  },

  getCourseDetail: (idOrSlug: string) =>
    request<any>(`/api/courses/${idOrSlug}`),

  getMyCourses: (token: string) =>
    request<any[]>('/api/courses/my-courses', { token }),

  create: (token: string, data: object) =>
    request<any>('/api/courses', { method: 'POST', body: data, token }),

  update: (token: string, id: string, data: object) =>
    request<any>(`/api/courses/${id}`, { method: 'PUT', body: data, token }),

  delete: (token: string, id: string) =>
    request<any>(`/api/courses/${id}`, { method: 'DELETE', token }),

  getById: (token: string, id: string) =>
    request<any>(`/api/courses/${id}`, { token }),

  getInstructorStats: (token: string) =>
    request<any>('/api/courses/instructor/stats', { token }),

  // Sections
  addSection: (token: string, courseId: string, data: object) =>
    request<any>(`/api/courses/${courseId}/sections`, { method: 'POST', body: data, token }),

  updateSection: (token: string, id: string, data: object) =>
    request<any>(`/api/courses/sections/${id}`, { method: 'PUT', body: data, token }),

  deleteSection: (token: string, id: string) =>
    request<any>(`/api/courses/sections/${id}`, { method: 'DELETE', token }),

  // Lessons
  addLesson: (token: string, sectionId: string, data: object) =>
    request<any>(`/api/courses/sections/${sectionId}/lessons`, { method: 'POST', body: data, token }),

  updateLesson: (token: string, id: string, data: object) =>
    request<any>(`/api/courses/lessons/${id}`, { method: 'PUT', body: data, token }),

  deleteLesson: (token: string, id: string) =>
    request<any>(`/api/courses/lessons/${id}`, { method: 'DELETE', token }),

  // Student endpoints
  enroll: (token: string, courseId: string) =>
    request<any>(`/api/students/enroll/${courseId}`, { method: 'POST', token }),

  dropCourse: (token: string, courseId: string) =>
    request<any>(`/api/students/enroll/${courseId}`, { method: 'DELETE', token }),

  getMyEnrollments: (token: string) =>
    request<any>('/api/students/enrollments', { token }),

  getMyCertificates: (token: string) =>
    request<any>('/api/students/certificates', { token }),

  getDashboardStats: (token: string) =>
    request<any>('/api/students/stats', { token }),

  getCategories: () =>
    request<any[]>('/api/courses/categories'),
};

// ─────────────────────────────────────────────────────────────────────────────
// Auth endpoints
// ─────────────────────────────────────────────────────────────────────────────
export const authApi = {
  login: (data: { email: string; password: string }) =>
    request<any>('/api/auth/login', { method: 'POST', body: data }),

  register: (data: { fullName: string; email: string; password: string; role: string }) =>
    request<any>('/api/auth/register', { method: 'POST', body: data }),

  requestVerification: (token: string) =>
    request<any>('/api/auth/request-verification', { method: 'POST', token }),

  verifyEmail: (data: { email: string; code: string }) =>
    request<any>('/api/auth/verify-email', { method: 'POST', body: data }),
};

// ─────────────────────────────────────────────────────────────────────────────
// User / profile endpoints
// ─────────────────────────────────────────────────────────────────────────────
export const userApi = {
  getMyProfile: (token: string) =>
    request<any>('/api/users/me', { token }),

  updateMyProfile: (token: string, data: { fullName?: string; bio?: string; phone?: string; avatarUrl?: string }) =>
    request<any>('/api/users/me', { method: 'PATCH', body: data, token }),

  updateInstructorProfile: (token: string, data: {
    headline?: string; description?: string; expertise?: string[];
    websiteUrl?: string; linkedinUrl?: string; twitterUrl?: string;
  }) =>
    request<any>('/api/users/me/instructor', { method: 'PATCH', body: data, token }),

  changePassword: (token: string, data: { currentPassword: string; newPassword: string }) =>
    request<any>('/api/users/me/change-password', { method: 'POST', body: data, token }),

  getWishlist: (token: string) =>
    request<any>('/api/students/wishlist', { token }),

  addToWishlist: (token: string, courseId: string) =>
    request<any>(`/api/students/wishlist/${courseId}`, { method: 'POST', token }),

  removeFromWishlist: (token: string, courseId: string) =>
    request<any>(`/api/students/wishlist/${courseId}`, { method: 'DELETE', token }),
};

// ─────────────────────────────────────────────────────────────────────────────
// Payment endpoints
// ─────────────────────────────────────────────────────────────────────────────
export const paymentApi = {
  checkout: (token: string, data: { courseId: string; paymentMethod?: string }) =>
    request<any>('/api/payments/checkout', { method: 'POST', body: data, token }),

  getHistory: (token: string) =>
    request<any[]>('/api/payments/history', { token }),

  getInstructorEarnings: (token: string) =>
    request<any>('/api/payments/instructor/earnings', { token }),
};

