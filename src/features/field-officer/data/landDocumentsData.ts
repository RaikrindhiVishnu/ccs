export const documentTabs = [
  { name: "Land Document", verified: true },
  { name: "Pattadhar Passbook", verified: true },
  { name: "Link Document", verified: true },
  { name: "Kasara Pahani & Proceeding Copies", verified: true },
  { name: "Revenue Record", verified: true },
  { name: "Lease Agreement", verified: true },
  { name: "Death Certificate", verified: true },
  { name: "Partition Deed", verified: true },
  { name: "Encumbrance Certificate", verified: true },
  { name: "Land Coordinates", verified: true },
  { name: "Owner KYC Video", verified: true },
];

export const documentsTabs = documentTabs.map(t => t.name);

export const timelineData = [
  {
    id: 1,
    date: "Jan 14",
    time: "8:00 PM",
    comment: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, consectetur adipiscing elit, sed do eiusmod.",
    files: ["File_name.pdf", "File_name_1.pdf"],
    updatedBy: "Phani Krishna",
    issueBy: "Sravan Kumar",
    issueComment: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
  },
  {
    id: 2,
    date: "Jan 15",
    time: "9:00 PM",
    comment: "Issue mentioned by Sravan Kumar",
    files: ["Issue.pdf"],
    updatedBy: "Sravan Kumar",
    issueBy: "",
    issueComment: "",
  },
];
