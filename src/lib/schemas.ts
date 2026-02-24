/**
 * Zod validation schemas for all forms in Learnova.
 * Single source of truth for form validation rules.
 */
import { z } from 'zod';

// ─────────────────────────────────────────────────────────────────────────────
// Auth schemas
// ─────────────────────────────────────────────────────────────────────────────
export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters').max(80),
    email: z.string().min(1, 'Email is required').email('Enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    role: z.enum(['STUDENT', 'INSTRUCTOR']),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });
export type RegisterInput = z.infer<typeof registerSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// Course schemas
// ─────────────────────────────────────────────────────────────────────────────
export const courseBasicSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(120, 'Title is too long (max 120 chars)'),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(2000, 'Description is too long'),
  categoryId: z.string().min(1, 'Please select a category'),
  price: z
    .string()
    .refine((v) => !isNaN(Number(v)) && Number(v) >= 0, 'Price must be 0 or more')
    .transform(Number),
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'ALL']),
});
export type CourseBasicInput = z.infer<typeof courseBasicSchema>;

export const courseThumbnailSchema = z.object({
  thumbnailUrl: z
    .string()
    .url('Enter a valid URL')
    .optional()
    .or(z.literal('')),
  whatYouWillLearn: z
    .string()
    .min(10, 'Add at least one learning outcome (min 10 chars)')
    .max(1000)
    .optional()
    .or(z.literal('')),
  requirements: z
    .string()
    .max(1000)
    .optional()
    .or(z.literal('')),
});
export type CourseThumbnailInput = z.infer<typeof courseThumbnailSchema>;

// Combined (used by Redux state)
export const fullCourseSchema = courseBasicSchema.merge(courseThumbnailSchema);
export type FullCourseInput = z.infer<typeof fullCourseSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// Section / Lesson schemas
// ─────────────────────────────────────────────────────────────────────────────
export const sectionSchema = z.object({
  title: z.string().min(2, 'Section title required').max(100),
  order: z.number().int().min(0).optional(),
});
export type SectionInput = z.infer<typeof sectionSchema>;

export const lessonSchema = z.object({
  title: z.string().min(2, 'Lesson title required').max(100),
  description: z.string().max(2000).optional().or(z.literal('')),
  videoUrl: z.string().url('Enter a valid video URL').optional().or(z.literal('')),
  videoDurationSeconds: z.number().int().min(0).optional().default(0),
  isPreview: z.boolean().optional().default(false),
  orderIndex: z.number().int().min(0).optional(),
});
export type LessonInput = z.infer<typeof lessonSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// Category schema
// ─────────────────────────────────────────────────────────────────────────────
export const categorySchema = z.object({
  name: z.string().min(2, 'Category name required').max(60),
  description: z.string().max(300).optional().or(z.literal('')),
});
export type CategoryInput = z.infer<typeof categorySchema>;
