import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase, Plus, Search } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import type { Job } from "../backend.d";
import { useGetAllJobs } from "../hooks/useQueries";
import { useAddJob, useDeleteJob, useUpdateJob } from "../hooks/useQueries";
import ApplyNowModal from "./ApplyNowModal";
import DeleteJobDialog from "./DeleteJobDialog";
import JobCard from "./JobCard";
import JobFormModal from "./JobFormModal";

// Static fallback jobs shown when backend is unavailable
const FALLBACK_JOBS: Job[] = [
  {
    id: BigInt(1),
    position: "Floor Coordinator",
    company: "SBI Bank",
    department: "SBI Bank",
    location: "Delhi",
    address: "SBI Branch, Delhi",
    salary: BigInt(17500),
    description:
      "Manage bank floor operations, assist customers, coordinate with tellers.",
    isActive: true,
  },
  {
    id: BigInt(2),
    position: "Floor Coordinator Team Leader",
    company: "SBI Bank",
    department: "SBI Bank",
    location: "Delhi",
    address: "SBI Branch, Delhi",
    salary: BigInt(24000),
    description: "Lead a team of floor coordinators at SBI Bank branch.",
    isActive: true,
  },
  {
    id: BigInt(3),
    position: "ATM Executive Operator",
    company: "SBI Bank",
    department: "SBI Bank",
    location: "Pan India",
    address: "Pan India",
    salary: BigInt(15000),
    description:
      "Operate and maintain ATM machines, cash loading, basic troubleshooting.",
    isActive: true,
  },
  {
    id: BigInt(4),
    position: "Credit Card Opening",
    company: "SBI Bank",
    department: "SBI Bank",
    location: "Delhi, Gurugram",
    address: "Delhi / Gurugram",
    salary: BigInt(18500),
    description:
      "Help customers open new credit card accounts, documentation, verification.",
    isActive: true,
  },
  {
    id: BigInt(5),
    position: "Sales Manager",
    company: "SBI Bank",
    department: "SBI Bank",
    location: "Delhi",
    address: "SBI Branch, Delhi",
    salary: BigInt(32500),
    description:
      "Lead sales team, achieve targets, manage client relationships.",
    isActive: true,
  },
  {
    id: BigInt(6),
    position: "Branch Relationship Executive",
    company: "SBI Bank",
    department: "SBI Bank",
    location: "Delhi, Gurugram",
    address: "Delhi / Gurugram",
    salary: BigInt(23000),
    description: "Maintain client relationships, cross-sell banking products.",
    isActive: true,
  },
  {
    id: BigInt(7),
    position: "Credit Card Opening",
    company: "PNB Bank",
    department: "PNB Bank",
    location: "Delhi, Pan India",
    address: "Delhi / Pan India",
    salary: BigInt(17000),
    description: "Process new credit card applications, KYC documentation.",
    isActive: true,
  },
  {
    id: BigInt(8),
    position: "Sales Manager",
    company: "PNB Bank",
    department: "PNB Bank",
    location: "Delhi, Sonipat",
    address: "Delhi / Sonipat",
    salary: BigInt(31500),
    description: "Drive sales targets for PNB banking products.",
    isActive: true,
  },
  {
    id: BigInt(9),
    position: "Branch Relationship Executive",
    company: "PNB Bank",
    department: "PNB Bank",
    location: "Delhi",
    address: "PNB Branch, Delhi",
    salary: BigInt(20500),
    description: "Build and manage customer relationships at PNB branch.",
    isActive: true,
  },
  {
    id: BigInt(10),
    position: "Branch Relationship Manager",
    company: "PNB Bank",
    department: "PNB Bank",
    location: "Delhi, Gurugram",
    address: "Delhi / Gurugram",
    salary: BigInt(37500),
    description: "Senior role managing key branch client relationships.",
    isActive: true,
  },
  {
    id: BigInt(11),
    position: "Clerk",
    company: "PNB Bank",
    department: "PNB Bank",
    location: "Delhi",
    address: "PNB Branch, Delhi",
    salary: BigInt(15500),
    description:
      "Handle daily banking transactions, data entry, customer service.",
    isActive: true,
  },
  {
    id: BigInt(12),
    position: "ATM Operator",
    company: "Hitachi Cash Management",
    department: "Hitachi Cash Management",
    location: "Pan India",
    address: "Pan India",
    salary: BigInt(14000),
    description: "Load and manage cash in ATM machines, daily reporting.",
    isActive: true,
  },
  {
    id: BigInt(13),
    position: "TOM Operator",
    company: "Hitachi Cash Management",
    department: "Hitachi Cash Management",
    location: "Delhi, UP",
    address: "Delhi / Uttar Pradesh",
    salary: BigInt(15500),
    description:
      "Operate TOM (Teller Operation Machine) and handle cash management.",
    isActive: true,
  },
  {
    id: BigInt(14),
    position: "MST",
    company: "Hitachi Cash Management",
    department: "Hitachi Cash Management",
    location: "Delhi",
    address: "Hitachi Office, Delhi",
    salary: BigInt(17000),
    description:
      "Mobile Service Technician for ATM and cash management machines.",
    isActive: true,
  },
  {
    id: BigInt(15),
    position: "Cash Sorter",
    company: "Hitachi Cash Management",
    department: "Hitachi Cash Management",
    location: "Delhi",
    address: "Hitachi Office, Delhi",
    salary: BigInt(13000),
    description: "Sort and count cash for ATM replenishment operations.",
    isActive: true,
  },
  {
    id: BigInt(16),
    position: "Reporter",
    company: "Hitachi Cash Management",
    department: "Hitachi Cash Management",
    location: "Delhi, Pan India",
    address: "Pan India",
    salary: BigInt(14000),
    description: "Daily reporting of ATM status, cash levels, and operations.",
    isActive: true,
  },
  {
    id: BigInt(17),
    position: "Team Leader",
    company: "Hitachi Cash Management",
    department: "Hitachi Cash Management",
    location: "Delhi",
    address: "Hitachi Office, Delhi",
    salary: BigInt(24000),
    description: "Lead ATM operations team, manage scheduling and targets.",
    isActive: true,
  },
  {
    id: BigInt(18),
    position: "Picker",
    company: "Blinkit / Zepto / Swiggy / Flipkart / Amazon",
    department: "E-Commerce / Logistics",
    location: "Delhi, Gurugram",
    address: "Delhi / Gurugram Warehouse",
    salary: BigInt(14000),
    description: "Pick items from warehouse shelves for order fulfillment.",
    isActive: true,
  },
  {
    id: BigInt(19),
    position: "Packer",
    company: "Blinkit / Zepto / Swiggy / Flipkart / Amazon",
    department: "E-Commerce / Logistics",
    location: "Delhi, Gurugram",
    address: "Delhi / Gurugram Warehouse",
    salary: BigInt(14000),
    description: "Pack orders safely for delivery, quality checking.",
    isActive: true,
  },
  {
    id: BigInt(20),
    position: "Inventory Associate",
    company: "Blinkit / Zepto / Swiggy / Flipkart / Amazon",
    department: "E-Commerce / Logistics",
    location: "Delhi",
    address: "Delhi Warehouse",
    salary: BigInt(15000),
    description: "Manage warehouse inventory, stock counting, system updates.",
    isActive: true,
  },
  {
    id: BigInt(21),
    position: "Loader",
    company: "Blinkit / Zepto / Swiggy / Flipkart / Amazon",
    department: "E-Commerce / Logistics",
    location: "Delhi, Noida",
    address: "Delhi / Noida Warehouse",
    salary: BigInt(13000),
    description: "Load and unload goods at warehouse, physical work.",
    isActive: true,
  },
  {
    id: BigInt(22),
    position: "TOM Operator",
    company: "Metro Department",
    department: "Metro Department",
    location: "Delhi Metro",
    address: "Delhi Metro Station",
    salary: BigInt(17000),
    description: "Operate token machines at metro stations.",
    isActive: true,
  },
  {
    id: BigInt(23),
    position: "Metro Delivery",
    company: "Metro Department",
    department: "Metro Department",
    location: "Delhi",
    address: "Delhi Metro Network",
    salary: BigInt(14000),
    description: "Handle deliveries and logistics within metro network.",
    isActive: true,
  },
  {
    id: BigInt(24),
    position: "Customer Service",
    company: "Metro Department",
    department: "Metro Department",
    location: "Delhi Metro",
    address: "Delhi Metro Station",
    salary: BigInt(15500),
    description: "Assist metro passengers, provide information and support.",
    isActive: true,
  },
  {
    id: BigInt(25),
    position: "Security Guard",
    company: "Metro Department",
    department: "Metro Department",
    location: "Delhi Metro",
    address: "Delhi Metro Station",
    salary: BigInt(14000),
    description: "Ensure security and safety at metro stations.",
    isActive: true,
  },
  {
    id: BigInt(26),
    position: "Housekeeping",
    company: "Metro Department",
    department: "Metro Department",
    location: "Delhi Metro",
    address: "Delhi Metro Station",
    salary: BigInt(12000),
    description: "Maintain cleanliness at metro stations and premises.",
    isActive: true,
  },
  {
    id: BigInt(27),
    position: "Housekeeping Team Leader",
    company: "Metro Department",
    department: "Metro Department",
    location: "Delhi Metro",
    address: "Delhi Metro Station",
    salary: BigInt(16000),
    description: "Lead housekeeping staff at metro stations.",
    isActive: true,
  },
  {
    id: BigInt(28),
    position: "Cashier",
    company: "Axis Bank",
    department: "Axis Bank",
    location: "Delhi, Gurugram",
    address: "Axis Bank Branch, Delhi",
    salary: BigInt(18500),
    description: "Current Account Savings Account opening and management.",
    isActive: true,
  },
  {
    id: BigInt(29),
    position: "Loan Department",
    company: "Axis Bank",
    department: "Axis Bank",
    location: "Delhi",
    address: "Axis Bank Branch, Delhi",
    salary: BigInt(26000),
    description: "Process loan applications, documentation, customer service.",
    isActive: true,
  },
  {
    id: BigInt(30),
    position: "Account Opener",
    company: "Axis Bank",
    department: "Axis Bank",
    location: "Delhi, Pan India",
    address: "Pan India",
    salary: BigInt(17000),
    description: "Open new bank accounts, KYC verification, documentation.",
    isActive: true,
  },
  {
    id: BigInt(31),
    position: "Operations Manager",
    company: "Axis Bank",
    department: "Axis Bank",
    location: "Delhi",
    address: "Axis Bank Branch, Delhi",
    salary: BigInt(45000),
    description: "Manage daily branch operations, staff supervision.",
    isActive: true,
  },
  {
    id: BigInt(32),
    position: "Branch Manager",
    company: "Axis Bank",
    department: "Axis Bank",
    location: "Delhi, Gurugram",
    address: "Delhi / Gurugram",
    salary: BigInt(65000),
    description: "Head entire branch operations, business development.",
    isActive: true,
  },
  {
    id: BigInt(33),
    position: "Brand Relationship Manager",
    company: "Axis Bank",
    department: "Axis Bank",
    location: "Delhi",
    address: "Axis Bank Branch, Delhi",
    salary: BigInt(37500),
    description: "Manage key client relationships and business partnerships.",
    isActive: true,
  },
  {
    id: BigInt(34),
    position: "Clerk",
    company: "Axis Bank",
    department: "Axis Bank",
    location: "Delhi",
    address: "Axis Bank Branch, Delhi",
    salary: BigInt(15500),
    description:
      "Handle daily banking transactions, data entry, customer service.",
    isActive: true,
  },
  // Bank of Baroda
  {
    id: BigInt(35),
    position: "BOB Credit Card Sales",
    company: "Bank of Baroda",
    department: "Bank of Baroda",
    location: "Gurugram, Faridabad, Palwal, Manesar, Noida Sector-65",
    address: "Interview Location: Gurugram | Job: Noida Sector-65",
    salary: BigInt(23500),
    description:
      "URGENT BULK HIRING | Branch Setting Job | No Daily Reporting | Male & Female Both Welcome\n\nJob Role: Credit Card Sales in Branch\nInterview Date: 06-03-2026 (Friday)\nInterview Location: Gurugram\nJob Location: Gurugram, Faridabad, Palwal, Manesar, Noida Sector-65\n\nSalary: ₹21,000–₹26,000 CTC + ₹15,000–₹22,000 In-Hand + PF + ESI + Incentives\nQualification: 12th Pass or Graduate\nExperience: Minimum 6 months in Credit Card or Loan Sales\n\nFree Job Placement | Branch Sitting Job\nTo Apply: WhatsApp resume to 9031863042",
    isActive: true,
  },
  // Ranchi Local Jobs
  {
    id: BigInt(36),
    position: "Safai Karamchari (Housekeeping) - Female",
    company: "Office, Lalpur Ranchi",
    department: "Ranchi Local",
    location: "Lalpur, Ranchi",
    address: "Lalpur, Ranchi, Jharkhand",
    salary: BigInt(8000),
    description:
      "ऑफिस में साफ सफाई का काम | सुबह 10 बजे से शाम 6 बजे तक ड्यूटी | संडे छुट्टी\n\nSalary: ₹8,000 (starting) | Freshers can apply | Only female candidates\n\nअधिक जानकारी के लिए संपर्क करें",
    isActive: true,
  },
  {
    id: BigInt(37),
    position: "Computer Operator (Fresher)",
    company: "Office, Lalpur Chowk Ranchi",
    department: "Ranchi Local",
    location: "Lalpur Chowk, Ranchi",
    address: "Lalpur Chowk, Ranchi, Jharkhand",
    salary: BigInt(10000),
    description:
      "Requirement of 1 Fresher Computer Operator\n\nSalary: ₹9,000 - ₹11,000 | Timing: 10 hrs (Sunday off)\nSkills Required: Tally, Excel\nFreshers (Girls & Boys) can apply\n\nContact for more information",
    isActive: true,
  },
  {
    id: BigInt(38),
    position: "Female Receptionist - Gym",
    company: "Gym, Harmu Ranchi",
    department: "Ranchi Local",
    location: "Harmu, Ranchi",
    address: "Harmu, Ranchi, Jharkhand",
    salary: BigInt(9500),
    description:
      "Requirement of 1 Female Receptionist in a Gym\n\nSalary: ₹9,000 - ₹10,000 | Timing: 7 hrs (6am to 3pm) | Week off\nExperienced & Fresher both can apply\nMust have good communication skills with basic computer knowledge\n\nContact for more information",
    isActive: true,
  },
  {
    id: BigInt(39),
    position: "Chinese Cook",
    company: "Restaurant, Ranchi",
    department: "Ranchi Local",
    location: "Ranchi, Jharkhand",
    address: "Ranchi, Jharkhand",
    salary: BigInt(17000),
    description:
      "रांची में चाइनीज कुक की आवश्यकता है\n\nSalary: ₹16,000 - ₹18,000 | रहने खाने की सुविधा मुफ्त में\n\nअधिक जानकारी के लिए संपर्क करें",
    isActive: true,
  },
  {
    id: BigInt(40),
    position: "Fast Food Cook",
    company: "Food Stall / Restaurant, Ranchi",
    department: "Ranchi Local",
    location: "Ranchi, Jharkhand",
    address: "Ranchi, Jharkhand",
    salary: BigInt(20000),
    description:
      "रांची में फास्ट फूड कुक की आवश्यकता है\nSpecialization: छोले भटूरे, समोसा, और अन्य फास्ट फूड\n\nSalary: ₹20,000 तक\n\nअधिक जानकारी के लिए संपर्क करें",
    isActive: true,
  },
  {
    id: BigInt(41),
    position: "House Helper - Female",
    company: "Private Home, Bariatu Ranchi",
    department: "Ranchi Local",
    location: "Bariatu, Ranchi",
    address: "Bariatu, Ranchi, Jharkhand",
    salary: BigInt(11000),
    description:
      "बरियातू, रांची में एक घर में घर का छोटा बड़ा काम में मदद करने के लिए एक लड़की की जरूरत है\n\nSalary: ₹10,000 - ₹12,000 (starting) | रहने खाने की सुविधा मुफ्त में\n\nअधिक जानकारी के लिए संपर्क करें",
    isActive: true,
  },
  {
    id: BigInt(42),
    position: "Shop Girl Staff - Female",
    company: "Dukaan, Sujata Chowk Ranchi",
    department: "Ranchi Local",
    location: "Sujata Chowk, Ranchi",
    address: "Sujata Chowk, Ranchi, Jharkhand",
    salary: BigInt(7500),
    description:
      "सुजाता चौक, रांची में एक दुकान में लड़की स्टाफ की जरूरत है\n\nSalary: ₹7,000 - ₹8,000 (starting) | Timing: 10am to 7pm (Sunday off)\nFreshers can apply\n\nअधिक जानकारी के लिए संपर्क करें",
    isActive: true,
  },
  {
    id: BigInt(43),
    position: "Money Collection Executive",
    company: "Office, Upper Bazar Ranchi",
    department: "Ranchi Local",
    location: "Upper Bazar, Ranchi",
    address: "Upper Bazar, Ranchi, Jharkhand",
    salary: BigInt(14000),
    description:
      "Requirement of 1 Person for Money Collection (Non Target Work)\n\nSalary: ₹13,000 - ₹15,000 + Fuel Expenses | Timing: 9 hrs (Sunday off)\nMust have Motorcycle | Freshers can apply\n\nContact for more information",
    isActive: true,
  },
  {
    id: BigInt(44),
    position: "Male Accountant",
    company: "Office, Kadru Ranchi",
    department: "Ranchi Local",
    location: "Kadru, Ranchi",
    address: "Kadru, Ranchi, Jharkhand",
    salary: BigInt(15500),
    description:
      "Requirement of 1 Male Accountant\n\nSalary: ₹13,000 - ₹18,000 + Lodging Facilities (as per interview)\nTiming: 10 hrs (Sunday off)\nKnowledge in Tally & Excel required\n\nContact for more information",
    isActive: true,
  },
  // NEW RANCHI LOCAL JOBS
  {
    id: BigInt(45),
    position: "Bakery Shop Manager",
    company: "Bakery Shop, Kishorganj Ranchi",
    department: "Ranchi Local",
    location: "Kishorganj, Ranchi",
    address: "Kishorganj, Ranchi, Jharkhand",
    salary: BigInt(18000),
    description:
      "Requirement of 1 Manager for a Bakery Shop\n\nSalary: ₹18,000 (starting) | Timing: 10 hrs (1pm - 11pm) | Week off\nMinimum Age: Above 25 years\nExperience in Management line required\nBasic computer knowledge required\n\nContact for more information",
    isActive: true,
  },
  {
    id: BigInt(46),
    position: "Female Cashier - TVS Service Centre",
    company: "TVS Service Centre, Tipudana Ranchi",
    department: "Ranchi Local",
    location: "Tipudana, Ranchi",
    address: "Tipudana, Ranchi, Jharkhand",
    salary: BigInt(8500),
    description:
      "Requirement of 1 Female Cashier for a TVS Service Centre\n\nSalary: ₹8,000 - ₹9,000 (starting) | Timing: 10 hrs | Week off\nComputer knowledge required\nFreshers also can apply\n\nContact for more information",
    isActive: true,
  },
  {
    id: BigInt(47),
    position: "Service Advisor - TVS (Koderma)",
    company: "TVS Service Centre, Koderma",
    department: "Jharkhand Jobs",
    location: "Koderma, Jharkhand",
    address: "Koderma, Jharkhand",
    salary: BigInt(10500),
    description:
      "कोडरमा, झारखंड में TVS के सर्विस सेंटर में Service Advisor की जरूरत है\n\nSalary: ₹10,000 - ₹11,000 + PF/ESI | Duty: 10 hours\nFreshers can apply\n\nअधिक जानकारी के लिए संपर्क करें",
    isActive: true,
  },
  {
    id: BigInt(48),
    position: "Service Advisor - TVS (Tipudana)",
    company: "TVS Service Centre, Tipudana Ranchi",
    department: "Ranchi Local",
    location: "Tipudana, Ranchi",
    address: "Tipudana, Ranchi, Jharkhand",
    salary: BigInt(11500),
    description:
      "Requirement of 1 Service Advisor for a TVS Service Center\n\nSalary: ₹10,000 - ₹13,000 CTC (including PF & ESI) | Duty: 9-10 hrs | Sunday off\nFreshers can apply | Candidates interested in mechanical line can also apply\n\nContact for more information",
    isActive: true,
  },
  {
    id: BigInt(49),
    position: "Technician - TVS (Hatia)",
    company: "TVS Service Centre, Hatia Ranchi",
    department: "Ranchi Local",
    location: "Hatia, Ranchi",
    address: "Hatia, Ranchi, Jharkhand",
    salary: BigInt(9500),
    description:
      "हटिया, रांची में TVS Service Centre में Technician की जरूरत है\n\nSalary: ₹9,000 - ₹10,000 + रहने की सुविधा | Duty: 10 hours\nFreshers & Experienced both can apply\n\nअधिक जानकारी के लिए संपर्क करें",
    isActive: true,
  },
  {
    id: BigInt(50),
    position: "Female Computer Operator",
    company: "Office, Ratu Road Ranchi",
    department: "Ranchi Local",
    location: "Ratu Road, Ranchi",
    address: "Ratu Road, Ranchi, Jharkhand",
    salary: BigInt(21500),
    description:
      "Requirement of 1 Female Computer Operator\n\nSalary: ₹20,000 - ₹23,000 | Timing: 8 hrs | Sunday off\nGood knowledge in Tally, Excel & English speaking skills required\n\nContact for more information",
    isActive: true,
  },
  {
    id: BigInt(51),
    position: "Salesboy - Sanitary Showroom",
    company: "Sanitary Showroom, Upper Bazar Ranchi",
    department: "Ranchi Local",
    location: "Upper Bazar, Ranchi",
    address: "Upper Bazar, Ranchi, Jharkhand",
    salary: BigInt(12000),
    description:
      "Requirement of 2 Salesboys for a Sanitary Showroom\n\nSalary: ₹12,000 (starting) | Timing: 10 hrs | Sunday off\nFreshers & Experienced both can apply\n\nContact for more information",
    isActive: true,
  },
  {
    id: BigInt(52),
    position: "Helper - Showroom",
    company: "Showroom, Upper Bazar Ranchi",
    department: "Ranchi Local",
    location: "Upper Bazar, Ranchi",
    address: "Upper Bazar, Ranchi, Jharkhand",
    salary: BigInt(11000),
    description:
      "अप्पर बाजार, रांची में एक शोरूम में 2 Helper की जरूरत है\n\nकाम: सामान निकालना और रखना | Timing: सुबह 10 बजे से रात 8 बजे तक (10 hours) | संडे छुट्टी\nSalary: ₹11,000 (starting)\nFreshers can apply\n\nअधिक जानकारी के लिए संपर्क करें",
    isActive: true,
  },
  {
    id: BigInt(53),
    position: "Salesboy - Showroom (Kokar)",
    company: "Showroom, Kokar Ranchi",
    department: "Ranchi Local",
    location: "Kokar, Ranchi",
    address: "Kokar, Ranchi, Jharkhand",
    salary: BigInt(12500),
    description:
      "Requirement of 1 Salesboy for a Showroom in Kokar, Ranchi\n\nSalary: ₹10,000 - ₹15,000 (as per interview) | Timing: 10 hrs (10:30am - 8:30pm) | Sunday off\nFreshers & Experienced both can apply\n\nContact for more information",
    isActive: true,
  },
  {
    id: BigInt(54),
    position: "Boy Staff - Showroom (Kokar)",
    company: "Showroom, Kokar Ranchi",
    department: "Ranchi Local",
    location: "Kokar, Ranchi",
    address: "Kokar, Ranchi, Jharkhand",
    salary: BigInt(9000),
    description:
      "कोकर, रांची में एक शोरूम में एक लड़का Staff की जरूरत है\n\nSalary: ₹9,000 + Bonus (starting) | Timing: 10:30am - 8:30pm | संडे छुट्टी\nदुकान में छोटा बड़ा काम करना है\n\nअधिक जानकारी के लिए संपर्क करें",
    isActive: true,
  },
  {
    id: BigInt(55),
    position: "Accountant (Male/Female)",
    company: "Office, Kokar Ranchi",
    department: "Ranchi Local",
    location: "Kokar, Ranchi",
    address: "Kokar, Ranchi, Jharkhand",
    salary: BigInt(13000),
    description:
      "Requirement of 1 Accountant in Kokar, Ranchi\n\nSalary: ₹12,000 - ₹14,000 | Timing: 9 hrs | Sunday off\nFreshers or Experienced both can apply\nMale & Female both can apply\n\nContact for more information",
    isActive: true,
  },
  {
    id: BigInt(56),
    position: "Hotel Receptionist",
    company: "Hotel, Booty More Ranchi",
    department: "Ranchi Local",
    location: "Booty More, Ranchi",
    address: "Booty More, Ranchi, Jharkhand",
    salary: BigInt(13500),
    description:
      "Requirement of 1 Receptionist in a Hotel\n\nSalary: ₹12,000 - ₹15,000 + Living & Food Free | Experienced candidate apply\nGood computer knowledge required\n\nContact for more information",
    isActive: true,
  },
  {
    id: BigInt(57),
    position: "Room Service Boy - Hotel",
    company: "Hotel, Station Road & Booty More Ranchi",
    department: "Ranchi Local",
    location: "Station Road / Booty More, Ranchi",
    address: "Station Road & Booty More, Ranchi, Jharkhand",
    salary: BigInt(9000),
    description:
      "Requirement of 3 Room Service Boys for a Hotel\n\nSalary: ₹8,000 - ₹10,000 + Rehna Khana Free\nFreshers can apply\n\nContact for more information",
    isActive: true,
  },
  {
    id: BigInt(58),
    position: "General Manager (GM) - Hotel",
    company: "Hotel, Banaras UP",
    department: "Other Jobs",
    location: "Banaras, Uttar Pradesh",
    address: "Banaras, Uttar Pradesh",
    salary: BigInt(17500),
    description:
      "Requirement of 1 General Manager (GM) for a Hotel in Banaras, Uttar Pradesh\n\nSalary: ₹15,000 - ₹20,000 (as per interview) | Duty: 12 hrs\nMust have computer knowledge & management skills\n\nContact for more information",
    isActive: true,
  },
  {
    id: BigInt(59),
    position: "Housekeeping Boy - Hotel",
    company: "Hotel, Banaras UP",
    department: "Other Jobs",
    location: "Banaras, Uttar Pradesh",
    address: "Banaras, Uttar Pradesh",
    salary: BigInt(11000),
    description:
      "बनारस, उत्तर प्रदेश में एक होटल में Housekeeping के लिए 2 लड़कों की तत्काल आवश्यकता है\n\nSalary: ₹10,000 - ₹12,000 + रहने खाने की सुविधा मुफ्त | Duty: 12 hours\n\nअधिक जानकारी के लिए संपर्क करें",
    isActive: true,
  },
  {
    id: BigInt(60),
    position: "Cake Shop Staff (Boys)",
    company: "Cake Shop, Ratu Road Ranchi",
    department: "Ranchi Local",
    location: "Ratu Road, Ranchi",
    address: "Ratu Road, Ranchi, Jharkhand",
    salary: BigInt(9000),
    description:
      "रातु रोड, रांची में एक केक दुकान के लिए 2 लड़का Staff की जरूरत है\n\nSalary: ₹9,000 (starting) + रहने खाने की सुविधा बिल्कुल मुफ्त | Duty: 12 hours\nFreshers can apply\n\nअधिक जानकारी के लिए संपर्क करें",
    isActive: true,
  },
  {
    id: BigInt(61),
    position: "Computer Hardware Technician",
    company: "Computer Shop, Main Road Ranchi",
    department: "Ranchi Local",
    location: "Main Road, Ranchi",
    address: "Main Road, Ranchi, Jharkhand",
    salary: BigInt(18000),
    description:
      "Requirement of 1 Computer Hardware Technician for a Computer Shop\n\nSalary: ₹16,000 - ₹20,000 (as per knowledge) | Duty: 10 hrs | Sunday off\n\nContact for more information",
    isActive: true,
  },
  // Government & National Jobs
  {
    id: BigInt(62),
    position: "Customs Inspector",
    company: "Mumbai Customs Department",
    department: "Government Jobs",
    location: "Mumbai, Kolkata, Chennai",
    address: "Mumbai Maharashtra / Kolkata West Bengal / Chennai Tamil Nadu",
    salary: BigInt(74000),
    description:
      "MUMBAI CUSTOMS RECRUITMENT | मुंबई कस्टम्स विभाग\n\nDesignation: Customs Inspector\nEducation: Graduation\nAge Limit: 18 to 30 years\n\nSalary: Basic Pay ₹44,900 | Gross: ₹70,000 - ₹80,000 per month | In-Hand: ₹59,000 - ₹70,000\nPay Level: Level 7 (7th CPC)\n\nDocument verification, medical examination and physical test of selected candidates\nOnly interested candidates contact",
    isActive: true,
  },
  {
    id: BigInt(63),
    position: "RPF Constable / Sub-Inspector",
    company: "Railway Protection Force (RPF)",
    department: "Government Jobs",
    location: "Pan India",
    address: "Pan India",
    salary: BigInt(45000),
    description:
      "रेलवे सुरक्षा बल | RPF Constable and Sub-Inspector (SI) Recruitment 2025\n\nDesignation: Sub-Inspectors and Constables\nEducation: SI - Graduation | Constable - 10th Pass\nAge Limit: Constables 18-28 | Sub-Inspectors 20-28\n\nSalary:\nConstables: ₹37,420 - ₹44,460\nSub-Inspectors: ₹43,000 - ₹52,000\n\nBenefits: Transport Allowance, HRA, Night Duty Allowance, Overtime, Gratuity, Pension, Ration Allowance, PF, Educational Assistance, Medical Facilities\n\nOnly interested candidates contact",
    isActive: true,
  },
  {
    id: BigInt(64),
    position: "PNB Clerk",
    company: "Punjab National Bank (PNB)",
    department: "Government Jobs",
    location: "Hyderabad, Delhi, Punjab, Chennai, Kolkata, UP, Chhattisgarh",
    address: "Multiple Locations Pan India",
    salary: BigInt(33000),
    description:
      "Punjab National Bank Requirement (PNB) | पंजाब नेशनल बैंक भर्ती\n\nPost: Clerk\nQualification: Any Graduate Degree\nAge Limit: Maximum 35 years\n\nSalary: ₹32,729 - ₹34,002 per month\n\nJob Locations: Hyderabad, Vijayawada, Chennai, Visakhapatnam, Delhi, Punjab, Chhattisgarh, West Bengal, Uttar Pradesh\n\nOnly Interested Candidates and Vendor Contact",
    isActive: true,
  },
  {
    id: BigInt(65),
    position: "Forest Guard / Ranger",
    company: "Maharashtra Forest Department",
    department: "Government Jobs",
    location: "All Maharashtra",
    address: "Maharashtra",
    salary: BigInt(37000),
    description:
      "MAHARASHTRA FOREST DEPARTMENT | महाराष्ट्र वन विभाग\n\nPost: Forest Guard Ranger\nQualification: 12th Pass\nAge: 18 to 27 years\n\nSalary: ₹18,000 - ₹56,900 per month\nJob Location: All Maharashtra\n\nOnly interested candidates welcome",
    isActive: true,
  },
  {
    id: BigInt(66),
    position: "GNM / B.Sc Nursing",
    company: "Railway Hospital, Gorakhpur UP",
    department: "Government Jobs",
    location: "Gorakhpur, Uttar Pradesh",
    address: "Railway Hospital, Gorakhpur, Uttar Pradesh",
    salary: BigInt(71000),
    description:
      "गोरखपुर उत्तर प्रदेश रेलवे हॉस्पिटल भर्ती\n\nPost: GNM / B.Sc Nursing\nSeats: 13\nExperience: 3 Years Required\n\nSalary: ₹80,000 CTC | In-Hand: ₹71,000\n\nOnly Interested Candidate & Vendor Contact",
    isActive: true,
  },
  {
    id: BigInt(67),
    position: "Electrical Engineer / Trainee Engineer",
    company: "NTPC (National Thermal Power Corporation)",
    department: "Government Jobs",
    location: "Tandva, Hazaribagh, Jharkhand",
    address: "NTPC Tandva, Hazaribagh, Jharkhand",
    salary: BigInt(37500),
    description:
      "National Thermal Power Corporation (NTPC) - Tandva, Hazaribagh\n\nPost 1: Electrical Engineer (Maintenance) | Qualification: Diploma EEE branch & 2020 pass out\nPost 2: Trainee Engineer (Maintenance) | Qualification: Diploma / B.Tech 2020 pass out\n\nSalary: ₹35,000 - ₹40,000 + All Company Facilities\nPermanent Job (60 years) | Medical and Interview ongoing\nFreshers & Experienced both can apply\n\nOnly interested Candidate and Vendor welcome",
    isActive: true,
  },
  {
    id: BigInt(68),
    position: "Postal Assistant / Postman / MTS",
    company: "India Post Office",
    department: "Government Jobs",
    location: "Pan India",
    address: "Pan India - Multiple States",
    salary: BigInt(30000),
    description:
      "INDIA POST OFFICE RECRUITMENT | डाक विभाग भर्ती\n\nPosts & Qualifications:\n- MTS: 10th Standard Pass\n- Postman / Mail Guard: 12th Pass + Local Language Knowledge\n- Postal & Sorting Assistant: Graduation + Computer Knowledge\n\nSalary:\n- Postal Assistant: Level 4 (₹25,500 - ₹81,100)\n- Sorting Assistant: Same as above\n- Postman / Mail Guard: Level 3 (₹21,700 - ₹69,100)\n- MTS: Level 1 (₹18,000 - ₹56,900)\n\nJob Locations: Andhra Pradesh, Assam, Bihar, Chhattisgarh, Delhi, Gujarat, Haryana, HP, J&K, Jharkhand, Karnataka, Kerala, MP, Maharashtra, Odisha, Punjab, Rajasthan, Tamil Nadu, Telangana, UP, Uttarakhand, West Bengal\n\nOnly interested candidates contact",
    isActive: true,
  },
  // Jharkhand Jobs
  {
    id: BigInt(69),
    position: "Jharkhand Jobs - Misc (Ranchi/Jharkhand)",
    company: "Various Companies, Jharkhand",
    department: "Jharkhand Jobs",
    location: "Ranchi / Jharkhand",
    address: "Jharkhand",
    salary: BigInt(10000),
    description:
      "Multiple vacancies available across Ranchi and Jharkhand in various sectors. Contact for details.",
    isActive: true,
  },
];

const DEPARTMENT_FILTERS = [
  "All",
  "Ranchi Local",
  "Government Jobs",
  "Jharkhand Jobs",
  "Other Jobs",
  "Bank of Baroda",
  "SBI Bank",
  "PNB Bank",
  "Axis Bank",
  "Hitachi Cash Management",
  "E-Commerce / Logistics",
  "Metro Department",
];

interface JobsSectionProps {
  isAdmin: boolean;
  onApplyJob?: (jobTitle: string) => void;
}

export default function JobsSection({ isAdmin, onApplyJob }: JobsSectionProps) {
  const { data: backendJobs, isLoading, isError } = useGetAllJobs();
  // Use backend jobs when available, fallback to static list on error or empty
  const jobs =
    !isError && backendJobs && backendJobs.length > 0
      ? backendJobs
      : FALLBACK_JOBS;
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Add/Edit modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editJob, setEditJob] = useState<Job | null>(null);

  // Delete dialog
  const [deleteJob, setDeleteJob] = useState<Job | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Apply Now Modal
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applyJobTitle, setApplyJobTitle] = useState("");

  const addMutation = useAddJob();
  const updateMutation = useUpdateJob();
  const deleteMutation = useDeleteJob();

  const filteredJobs = useMemo(() => {
    if (!jobs) return [];
    let filtered =
      activeFilter === "All"
        ? jobs
        : jobs.filter((j) => j.department === activeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (j) =>
          j.position.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q) ||
          j.department.toLowerCase().includes(q),
      );
    }
    return filtered;
  }, [jobs, activeFilter, search]);

  const handleAddOrEdit = async (
    jobData: Omit<Job, "id"> & { id?: bigint },
  ) => {
    try {
      if (editJob && jobData.id !== undefined) {
        await updateMutation.mutateAsync({
          id: jobData.id,
          job: jobData as Job,
        });
        toast.success("Job updated successfully!");
      } else {
        const newJob: Job = {
          ...jobData,
          id: BigInt(Date.now()),
          isActive: true,
        };
        await addMutation.mutateAsync(newJob);
        toast.success("Job added successfully!");
      }
      setModalOpen(false);
      setEditJob(null);
    } catch {
      toast.error("Failed to save job. Please try again.");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteJob) return;
    try {
      await deleteMutation.mutateAsync(deleteJob.id);
      toast.success("Job deleted successfully!");
      setDeleteOpen(false);
      setDeleteJob(null);
    } catch {
      toast.error("Failed to delete job. Please try again.");
    }
  };

  const openEdit = (job: Job) => {
    setEditJob(job);
    setModalOpen(true);
  };

  const openDelete = (job: Job) => {
    setDeleteJob(job);
    setDeleteOpen(true);
  };

  const handleApply = (job: Job) => {
    const title = `${job.position} - ${job.company}`;
    setApplyJobTitle(title);
    setApplyModalOpen(true);
    if (onApplyJob) onApplyJob(title);
  };

  const isSubmitting = addMutation.isPending || updateMutation.isPending;

  return (
    <section
      id="jobs"
      className="py-16 md:py-20"
      style={{ backgroundColor: "oklch(0.97 0.005 240)" }}
    >
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div
              className="h-px flex-1 max-w-16"
              style={{
                background:
                  "linear-gradient(90deg, transparent, oklch(0.78 0.16 75))",
              }}
            />
            <Briefcase
              className="w-5 h-5"
              style={{ color: "oklch(0.78 0.16 75)" }}
            />
            <div
              className="h-px flex-1 max-w-16"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.78 0.16 75), transparent)",
              }}
            />
          </div>
          <h2
            className="font-display font-bold text-2xl md:text-4xl mb-3"
            style={{ color: "oklch(0.18 0.06 255)" }}
          >
            Current Job Openings
          </h2>
          <p
            className="text-sm md:text-base max-w-lg mx-auto"
            style={{ color: "oklch(0.5 0.02 240)" }}
          >
            Explore opportunities across top companies. Click "Apply Now" to
            submit your application directly.
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-xs">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: "oklch(0.6 0.02 240)" }}
            />
            <Input
              data-ocid="jobs.search.input"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          {isAdmin && (
            <Button
              data-ocid="jobs.add.button"
              onClick={() => {
                setEditJob(null);
                setModalOpen(true);
              }}
              className="flex items-center gap-2 font-semibold"
              style={{
                backgroundColor: "oklch(0.18 0.06 255)",
                color: "oklch(0.99 0 0)",
              }}
            >
              <Plus className="w-4 h-4" />
              Add New Job
            </Button>
          )}
        </div>

        {/* Department filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {DEPARTMENT_FILTERS.map((dept) => (
            <button
              type="button"
              key={dept}
              data-ocid="jobs.filter.tab"
              onClick={() => setActiveFilter(dept)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={
                activeFilter === dept
                  ? {
                      backgroundColor: "oklch(0.18 0.06 255)",
                      color: "oklch(0.99 0 0)",
                      boxShadow: "0 2px 8px oklch(0.18 0.06 255 / 0.3)",
                    }
                  : {
                      backgroundColor: "oklch(0.94 0.01 240)",
                      color: "oklch(0.4 0.04 240)",
                      border: "1px solid oklch(0.88 0.01 240)",
                    }
              }
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Loading state */}
        {isLoading && (
          <div
            data-ocid="jobs.loading_state"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
              <div key={i} className="bg-card rounded-lg border p-5 space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-2/3" />
                <Skeleton className="h-8 w-full mt-4" />
              </div>
            ))}
          </div>
        )}

        {/* Jobs grid */}
        {!isLoading && filteredJobs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredJobs.map((job, idx) => (
              <JobCard
                key={job.id.toString()}
                job={job}
                index={idx}
                isAdmin={isAdmin}
                onEdit={openEdit}
                onDelete={openDelete}
                onApply={handleApply}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && filteredJobs.length === 0 && (
          <div data-ocid="jobs.empty_state" className="text-center py-20">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "oklch(0.78 0.16 75 / 0.1)" }}
            >
              <Briefcase
                className="w-8 h-8"
                style={{ color: "oklch(0.78 0.16 75)" }}
              />
            </div>
            <h3
              className="font-display font-bold text-lg mb-2"
              style={{ color: "oklch(0.18 0.06 255)" }}
            >
              No Jobs Found
            </h3>
            <p
              className="text-sm mb-4"
              style={{ color: "oklch(0.5 0.02 240)" }}
            >
              {search
                ? "Try a different search term or filter."
                : "No job openings in this category yet."}
            </p>
            {search && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSearch("")}
                style={{
                  borderColor: "oklch(0.78 0.16 75)",
                  color: "oklch(0.55 0.16 65)",
                }}
              >
                Clear Search
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <JobFormModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditJob(null);
        }}
        onSubmit={handleAddOrEdit}
        initialData={editJob}
        isLoading={isSubmitting}
        mode={editJob ? "edit" : "add"}
      />

      {/* Delete Dialog */}
      <DeleteJobDialog
        job={deleteJob}
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
          setDeleteJob(null);
        }}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteMutation.isPending}
      />

      {/* Apply Now Modal */}
      <ApplyNowModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        jobTitle={applyJobTitle}
      />
    </section>
  );
}
