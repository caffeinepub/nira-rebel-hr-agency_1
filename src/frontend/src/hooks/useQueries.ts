import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Job } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllJobs() {
  const { actor, isFetching } = useActor();
  return useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllJobs();
    },
    enabled: !!actor && !isFetching,
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
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
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
