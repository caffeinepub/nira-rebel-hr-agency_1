import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Job } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllJobs() {
  const { actor, isFetching } = useActor();
  return useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllJobs();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    retry: 2,
  });
}

export function useGetJobsByDepartment(department: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Job[]>({
    queryKey: ["jobs", "department", department],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getJobsByDepartment(department);
    },
    enabled: !!actor && !isFetching && !!department,
  });
}

export function useGetDepartments() {
  const { actor, isFetching } = useActor();
  return useQuery<string[]>({
    queryKey: ["departments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDepartments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isCallerAdmin();
      } catch {
        return false;
      }
    },
    enabled: !!actor && !isFetching,
    retry: 1,
  });
}

export function useAddJob() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (job: Job) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addJob(job);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["jobs"] });
      void queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
}

export function useUpdateJob() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, job }: { id: bigint; job: Job }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateJob(id, job);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
}

export function useDeleteJob() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteJob(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
}

export function useSubmitApplication() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (app: import("../backend.d").CandidateApplication) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitApplication(app);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}

export function useGetAllApplications() {
  const { actor, isFetching } = useActor();
  return useQuery<import("../backend.d").CandidateApplication[]>({
    queryKey: ["applications"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllApplications();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    retry: 1,
  });
}

export function useDeleteApplication() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteApplication(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}
