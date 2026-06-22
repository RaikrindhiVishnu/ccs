import { UserRole } from "@/features/auth/types";

export interface MockUser {
  login_id: string;
  password: string;
  role_id: UserRole;
  first_name: string;
  last_name: string;
  id: number;
}

export const MOCK_USERS: MockUser[] = [
  { 
    login_id: "vo1@glc.com", 
    password: "vo1@123", 
    role_id: UserRole.VO1, 
    first_name: "Verification", 
    last_name: "Officer 1", 
    id: 108 
  },
];
