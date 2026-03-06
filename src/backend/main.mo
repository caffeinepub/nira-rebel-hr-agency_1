import Map "mo:core/Map";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import CandidateApp "candidate/application";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";



actor {
  // Initialize the access control state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  var candidateAppState = CandidateApp.empty();

  public type Job = {
    id : Nat;
    department : Text;
    company : Text;
    position : Text;
    salary : Nat;
    address : Text;
    location : Text;
    description : Text;
    isActive : Bool;
  };

  public type UserProfile = {
    name : Text;
  };

  module Job {
    public func compare(job1 : Job, job2 : Job) : Order.Order {
      Nat.compare(job1.id, job2.id);
    };
  };

  var nextJobId = 1;
  let jobs = Map.empty<Nat, Job>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  let initialJobs = List.fromArray<Job>([
    {
      id = 1;
      department = "Banking";
      company = "SBI Bank";
      position = "Teller";
      salary = 35000;
      address = "SBI Branch 1, Delhi";
      location = "Delhi";
      description = "Counter and Cash Management, System Handling, System Management, Close Vending Machines";
      isActive = true;
    },
    {
      id = 2;
      department = "Banking";
      company = "PNB Bank";
      position = "Cashier";
      salary = 32000;
      address = "PNB Central Branch, Delhi";
      location = "Delhi";
      description = "Deposit, Withdrawal, Loans, System Handling, System Management, ATM Reconciliation..";
      isActive = true;
    },
    {
      id = 3;
      department = "Cash Management";
      company = "Hitachi";
      position = "Vault Manager";
      salary = 45000;
      address = "Hitachi Regional Office, Delhi";
      location = "Delhi";
      description = "Triangle balancing, Daybook maintenance, Cash deposit, Bank liaison for clients, Cross-check and reconciliation, Adherence to RBI guidelines, Business targets achievement.";
      isActive = true;
    },
    {
      id = 4;
      department = "E-Commerce/Logistics";
      company = "Blinkit";
      position = "Warehousing Officer";
      salary = 25000;
      address = "Warehouse 2, Delhi";
      location = "Delhi";
      description = "Inventory use, Inventory system, Material logistics, Inward/outward record maintenance.";
      isActive = true;
    },
    {
      id = 5;
      department = "E-Commerce/Logistics";
      company = "Zepto";
      position = "Procurement";
      salary = 27000;
      address = "Procurement Center, Delhi";
      location = "Delhi";
      description = "Logistics, Warehousing, System operations, Vendor management, Delivery management, Procurement.";
      isActive = true;
    },
    {
      id = 6;
      department = "Metro Department";
      company = "Metro Express";
      position = "Accountant";
      salary = 30000;
      address = "Metro Office, Delhi";
      location = "Delhi";
      description = "Deposit of tender, JV management, Record keeping, Counter deposit management, Travel allowance/expenses management.";
      isActive = true;
    },
    {
      id = 7;
      department = "Banking";
      company = "Axis Bank";
      position = "Operations Manager";
      salary = 40000;
      address = "Axis Branch, Delhi";
      location = "Delhi";
      description = "Collateral, Mortgage balancing, Reconciliation, Gold loan management, Locker management, Fixed deposit management, Safe custody, Service desk operations.";
      isActive = true;
    },
  ]);

  for (job in initialJobs.values()) {
    jobs.add(job.id, job);
    nextJobId := nextJobId + 1;
  };

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Job Management - Public Read Access (no authorization needed)
  public query ({ caller }) func getAllJobs() : async [Job] {
    jobs.values().toArray().sort();
  };

  public query ({ caller }) func getJobsByDepartment(department : Text) : async [Job] {
    jobs.values().toArray().filter(
      func(job : Job) : Bool { job.department == department }
    ).sort();
  };

  public query ({ caller }) func getDepartments() : async [Text] {
    let departments = jobs.values().toArray().map(func(job : Job) : Text { job.department });
    let uniqueDepartments = Map.empty<Text, ()>();

    for (department in departments.values()) {
      uniqueDepartments.add(department, ());
    };

    uniqueDepartments.keys().toArray();
  };

  // Job Management - Admin Only Operations
  public shared ({ caller }) func addJob(newJob : Job) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    let jobToAdd : Job = {
      newJob with
      id = nextJobId;
    };

    jobs.add(nextJobId, jobToAdd);
    nextJobId += 1;
  };

  public shared ({ caller }) func updateJob(id : Nat, updatedJob : Job) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    if (not jobs.containsKey(id)) {
      Runtime.trap("Job not found. Cannot update non-existent record. Job id " # id.toText());
    };

    jobs.add(
      id,
      { updatedJob with id },
    );
  };

  public shared ({ caller }) func deleteJob(id : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    if (not jobs.containsKey(id)) {
      Runtime.trap("Job not found, id: " # id.toText());
    };
    jobs.remove(id);
  };

  // Candidate Application Management - delegate to module
  public query ({ caller }) func getAllApplications() : async [CandidateApp.CandidateApplication] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    CandidateApp.getAllApplications(candidateAppState);
  };

  public shared ({ caller }) func submitApplication(app : CandidateApp.CandidateApplication) : async Nat {
    let (newId, newState) = CandidateApp.submitApplication(candidateAppState, app);
    candidateAppState := newState;
    newId;
  };

  public shared ({ caller }) func deleteApplication(id : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    candidateAppState := CandidateApp.deleteApplication(candidateAppState, id);
  };
};
