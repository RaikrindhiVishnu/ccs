export interface ProfileDetails {
  firstName: string;
  lastName: string;
  roleName: string;
  dob: string;
  phone: string;
  email: string;
}

export const MOCK_PROFILE: ProfileDetails = {
  firstName: "Suresh",
  lastName: "Pashyam",
  roleName: "Verification Officer",
  dob: "05/05/1994",
  phone: "+91 887284 2888",
  email: "sureshpashyam@gmail.com",
};
