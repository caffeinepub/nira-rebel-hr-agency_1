import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CandidateApplication {
    id: bigint;
    age: string;
    subject: string;
    resumeBase64: string;
    name: string;
    submittedAt: string;
    email: string;
    district: string;
    experience: string;
    state: string;
    preferredLocation: string;
    applyingFor: string;
    gender: string;
    phone: string;
    qualification: string;
    college: string;
    resumeFileName: string;
}
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
    deleteApplication(id: bigint): Promise<void>;
    deleteJob(id: bigint): Promise<void>;
    getAllApplications(): Promise<Array<CandidateApplication>>;
    getAllJobs(): Promise<Array<Job>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDepartments(): Promise<Array<string>>;
    getJobsByDepartment(department: string): Promise<Array<Job>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitApplication(app: CandidateApplication): Promise<bigint>;
    updateJob(id: bigint, updatedJob: Job): Promise<void>;
}
