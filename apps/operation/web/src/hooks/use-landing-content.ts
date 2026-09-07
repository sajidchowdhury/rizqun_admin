import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api';
import { toast } from '@/lib/toast';
import type {
  LandingContentResponse,
  LandingContentUpdate,
  LandingDataResponse,
  LandingServiceCreateForm,
  LandingServiceResponse,
  LandingServiceUpdateForm,
  LandingTestimonialCreateForm,
  LandingTestimonialResponse,
  LandingTestimonialUpdateForm,
} from '@/types/landing-content';

// Single query key for the whole landing tree. The admin GET returns
// content + services + testimonials in one shot, and every mutation in
// this file touches that combined payload — so a single key + invalidate
// keeps the cache consistent without juggling three separate queries.
const LANDING_KEY = ['landing-content'] as const;

// ─── Admin list (content + ALL services + ALL testimonials) ────────

export function useLandingContentAdmin() {
  return useQuery({
    queryKey: LANDING_KEY,
    queryFn: async () => {
      return await api.get<LandingDataResponse>('/landing-content/admin');
    },
  });
}

// ─── Update singleton content ──────────────────────────────────────

export function useUpdateLandingContent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: LandingContentUpdate) => {
      const data = (await api.put<LandingContentResponse>(
        '/landing-content',
        input,
      )) as LandingContentResponse;
      return data.content;
    },
    onSuccess: (content) => {
      // Optimistic in-place update of the cached `content` slice —
      // services & testimonials are untouched by this mutation.
      queryClient.setQueryData<LandingDataResponse>(LANDING_KEY, (old) =>
        old ? { ...old, content } : old,
      );
      toast.success('Website content saved');
    },
    onError: (error) => toast.apiError(error),
  });
}

// ─── Services CRUD ─────────────────────────────────────────────────

export function useCreateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: LandingServiceCreateForm) => {
      // Backend create schema is `imageUrl: string | undefined` (no null).
      // The form models "no image" as null — convert to undefined so
      // axios omits the field and the backend uses its default.
      const payload = {
        ...input,
        imageUrl: input.imageUrl ?? undefined,
      };
      const data = (await api.post<LandingServiceResponse>(
        '/landing-content/services',
        payload,
      )) as LandingServiceResponse;
      return data.service;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LANDING_KEY });
      toast.success('Service created');
    },
    onError: (error) => toast.apiError(error),
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: LandingServiceUpdateForm & { id: number }) => {
      const data = (await api.patch<LandingServiceResponse>(
        `/landing-content/services/${id}`,
        input,
      )) as LandingServiceResponse;
      return data.service;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LANDING_KEY });
      toast.success('Service updated');
    },
    onError: (error) => toast.apiError(error),
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/landing-content/services/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LANDING_KEY });
      toast.success('Service deleted');
    },
    onError: (error) => toast.apiError(error),
  });
}

// ─── Testimonials CRUD ─────────────────────────────────────────────

export function useCreateTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: LandingTestimonialCreateForm) => {
      const data = (await api.post<LandingTestimonialResponse>(
        '/landing-content/testimonials',
        input,
      )) as LandingTestimonialResponse;
      return data.testimonial;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LANDING_KEY });
      toast.success('Testimonial created');
    },
    onError: (error) => toast.apiError(error),
  });
}

export function useUpdateTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: LandingTestimonialUpdateForm & { id: number }) => {
      const data = (await api.patch<LandingTestimonialResponse>(
        `/landing-content/testimonials/${id}`,
        input,
      )) as LandingTestimonialResponse;
      return data.testimonial;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LANDING_KEY });
      toast.success('Testimonial updated');
    },
    onError: (error) => toast.apiError(error),
  });
}

export function useDeleteTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/landing-content/testimonials/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LANDING_KEY });
      toast.success('Testimonial deleted');
    },
    onError: (error) => toast.apiError(error),
  });
}
