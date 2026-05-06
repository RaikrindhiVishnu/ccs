export type UserRole = {
  id: string;
  name: string;
  role: "Regional Officer" | "Intelligence Officer" | "Field Officer" | "Agent";
  roleId: string;
  contact?: string;
  avatar: string;
  children?: UserRole[];
};

export const MOCK_ROLE_DATA: UserRole[] = [
  {
    id: "1",
    name: "Ram Verma",
    role: "Regional Officer",
    roleId: "AG00049",
    contact: "+91 982-902-5254",
    avatar: "https://i.pravatar.cc/150?u=ram",
    children: [
      {
        id: "FO1",
        name: "Satish Kumar",
        role: "Field Officer",
        roleId: "FO0113",
        avatar: "https://i.pravatar.cc/150?u=satish",
        children: [
          {
            id: "AG1",
            name: "Satish Kumar",
            role: "Agent",
            roleId: "AG0113",
            avatar: "https://i.pravatar.cc/150?u=ag1",
          },
          {
            id: "AG2",
            name: "Ram Verma",
            role: "Agent",
            roleId: "AG0113",
            avatar: "https://i.pravatar.cc/150?u=ag2",
          },
          {
            id: "AG3",
            name: "Satish Kumar",
            role: "Agent",
            roleId: "AG0113",
            avatar: "https://i.pravatar.cc/150?u=ag3",
          },
          {
            id: "AG4",
            name: "Ram Verma",
            role: "Agent",
            roleId: "AG0113",
            avatar: "https://i.pravatar.cc/150?u=ag4",
          },
        ],
      },
      {
        id: "FO2",
        name: "Ram Verma",
        role: "Field Officer",
        roleId: "FO0113",
        avatar: "https://i.pravatar.cc/150?u=ram2",
        children: [
          {
            id: "AG5",
            name: "Agent 5",
            role: "Agent",
            roleId: "AG0113",
            avatar: "https://i.pravatar.cc/150?u=ag5",
          },
        ],
      },
      {
        id: "FO3",
        name: "Satish Kumar",
        role: "Field Officer",
        roleId: "FO0113",
        avatar: "https://i.pravatar.cc/150?u=satish3",
      },
      {
        id: "FO4",
        name: "Ram Verma",
        role: "Field Officer",
        roleId: "FO0113",
        avatar: "https://i.pravatar.cc/150?u=ram4",
      },
    ],
  },
  {
    id: "2",
    name: "Ram Verma",
    role: "Intelligence Officer",
    roleId: "AG00049",
    contact: "+91 982-902-5254",
    avatar: "https://i.pravatar.cc/150?u=intel",
    children: [], // IO might not have FO/Agents in this view
  },
];
