/**
 * Courses slice — instructor's own courses + async thunks for CRUD.
 */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { courseApi } from '@/lib/api';

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnailUrl?: string;
  price: number;
  level: string;
  isPublished: boolean;
  totalEnrollments: number;
  averageRating: number;
  categoryId?: string;
  instructorId: string;
  createdAt: string;
  category?: { name: string; slug: string };
  _count?: { enrollments: number };
}

interface CoursesState {
  myCourses: Course[];
  publicCourses: Course[];
  selectedCourse: Course | null;
  loading: boolean;
  creating: boolean;
  updating: boolean;
  deleting: boolean;
  error: string | null;
}

const initialState: CoursesState = {
  myCourses: [],
  publicCourses: [],
  selectedCourse: null,
  loading: false,
  creating: false,
  updating: false,
  deleting: false,
  error: null,
};

// ── Async thunks ──────────────────────────────────────────────────────────────

export const fetchMyCourses = createAsyncThunk(
  'courses/fetchMyCourses',
  async (token: string, { rejectWithValue }) => {
    try {
      return await courseApi.getMyCourses(token);
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchPublicCourses = createAsyncThunk(
  'courses/fetchPublicCourses',
  async (_, { rejectWithValue }) => {
    try {
      return await courseApi.getPublic();
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const createCourse = createAsyncThunk(
  'courses/create',
  async ({ token, data }: { token: string; data: object }, { rejectWithValue }) => {
    try {
      return await courseApi.create(token, data);
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const updateCourse = createAsyncThunk(
  'courses/update',
  async ({ token, id, data }: { token: string; id: string; data: object }, { rejectWithValue }) => {
    try {
      return await courseApi.update(token, id, data);
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const deleteCourse = createAsyncThunk(
  'courses/delete',
  async ({ token, id }: { token: string; id: string }, { rejectWithValue }) => {
    try {
      await courseApi.delete(token, id);
      return id;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const publishCourse = createAsyncThunk(
  'courses/publish',
  async ({ token, id, isPublished }: { token: string; id: string; isPublished: boolean }, { rejectWithValue }) => {
    try {
      return await courseApi.update(token, id, { isPublished });
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const getCourseById = createAsyncThunk(
  'courses/getById',
  async ({ token, id }: { token: string; id: string }, { rejectWithValue }) => {
    try {
      return await courseApi.getById(token, id);
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

// ── Slice ──────────────────────────────────────────────────────────────────────

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setSelectedCourse(state, action: PayloadAction<Course | null>) {
      state.selectedCourse = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    // Optimistic toggle publish
    toggleCoursePublishedOptimistic(state, action: PayloadAction<string>) {
      const c = state.myCourses.find((c) => c.id === action.payload);
      if (c) c.isPublished = !c.isPublished;
    },
  },
  extraReducers: (builder) => {
    // fetchMyCourses
    builder
      .addCase(fetchMyCourses.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchMyCourses.fulfilled, (state, action) => { state.loading = false; state.myCourses = action.payload; })
      .addCase(fetchMyCourses.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });

    // fetchPublicCourses
    builder
      .addCase(fetchPublicCourses.pending, (state) => { state.loading = true; })
      .addCase(fetchPublicCourses.fulfilled, (state, action) => { state.loading = false; state.publicCourses = action.payload; })
      .addCase(fetchPublicCourses.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });

    // createCourse
    builder
      .addCase(createCourse.pending, (state) => { state.creating = true; state.error = null; })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.creating = false;
        state.myCourses.unshift(action.payload);
      })
      .addCase(createCourse.rejected, (state, action) => { state.creating = false; state.error = action.payload as string; });

    // updateCourse
    builder
      .addCase(updateCourse.pending, (state) => { state.updating = true; state.error = null; })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.updating = false;
        const idx = state.myCourses.findIndex((c) => c.id === action.payload.id);
        if (idx !== -1) state.myCourses[idx] = action.payload;
        if (state.selectedCourse?.id === action.payload.id) state.selectedCourse = action.payload;
      })
      .addCase(updateCourse.rejected, (state, action) => { state.updating = false; state.error = action.payload as string; });

    // deleteCourse
    builder
      .addCase(deleteCourse.pending, (state) => { state.deleting = true; })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.deleting = false;
        state.myCourses = state.myCourses.filter((c) => c.id !== action.payload);
      })
      .addCase(deleteCourse.rejected, (state, action) => { state.deleting = false; state.error = action.payload as string; });

    // publishCourse (reuses update logic for myCourses list)
    builder
      .addCase(publishCourse.pending, (state) => { state.updating = true; })
      .addCase(publishCourse.fulfilled, (state, action) => {
        state.updating = false;
        const idx = state.myCourses.findIndex((c) => c.id === action.payload.id);
        if (idx !== -1) state.myCourses[idx] = action.payload;
        if (state.selectedCourse?.id === action.payload.id) state.selectedCourse = action.payload;
      })
      .addCase(publishCourse.rejected, (state, action) => { state.updating = false; state.error = action.payload as string; });

    // getCourseById
    builder
      .addCase(getCourseById.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getCourseById.fulfilled, (state, action) => { state.loading = false; state.selectedCourse = action.payload; })
      .addCase(getCourseById.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
  },
});

export const { setSelectedCourse, clearError, toggleCoursePublishedOptimistic } = coursesSlice.actions;
export default coursesSlice.reducer;
