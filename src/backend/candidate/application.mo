import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  public type State = {
    applications : Map.Map<Nat, CandidateApplication>;
    nextId : Nat;
  };

  public type CandidateApplication = {
    id : Nat;
    name : Text;
    age : Text;
    email : Text;
    phone : Text;
    gender : Text; // Male/Female/Other
    experience : Text;
    qualification : Text; // 12th/Graduate/Post Graduate
    college : Text;
    subject : Text; // B.Com/B.Sc/BA/BCA/BBA/MBA/Other
    district : Text;
    state : Text;
    applyingFor : Text; // job position
    preferredLocation : Text;
    resumeBase64 : Text; // base64 string
    resumeFileName : Text;
    submittedAt : Text;
  };

  public func empty() : State {
    {
      applications = Map.empty<Nat, CandidateApplication>();
      nextId = 1;
    };
  };

  public func submitApplication(state : State, app : CandidateApplication) : (Nat, State) {
    let id = state.nextId;
    let newApp : CandidateApplication = { app with id };
    let newApplications = state.applications;
    newApplications.add(id, newApp);
    (id, { state with applications = newApplications; nextId = id + 1 });
  };

  public func getAllApplications(state : State) : [CandidateApplication] {
    state.applications.values().toArray();
  };

  public func deleteApplication(state : State, id : Nat) : State {
    let newApplications = state.applications;
    newApplications.remove(id);
    { state with applications = newApplications };
  };
};
