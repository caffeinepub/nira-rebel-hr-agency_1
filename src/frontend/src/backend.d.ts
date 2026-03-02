import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Job {
    id: bigint;
    salary: bigint;
    description: string;
    isActive: boolean;
    company: string;
    address: string;
    department: string;
    position: string;
    location: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addJob(newJob: Job): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteJob(id: bigint): Promise<void>;
    getAllJobs(): Promise<Array<Job>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDepartments(): Promise<Array<string>>;
    getJobsByDepartment(department: string): Promise<Array<Job>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateJob(id: bigint, updatedJob: Job): Promise<void>;
}
