import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const ACCEPTED_DOC_TYPES = ["image/jpeg", "image/png", "application/pdf"];

const fileSchema = (accepted: string[], label: string) =>
  z
    .instanceof(File, { message: `${label} is required` })
    .refine((f) => f.size <= MAX_FILE_SIZE, `${label}: max size is 5MB`)
    .refine((f) => accepted.includes(f.type), `${label}: invalid file type`);

export const agentSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  dob: z.string().min(1, "DOB is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  phone: z.string().min(10, "Mobile number must be 10 digits"),
  address: z.string().min(1, "Address is required"),
  addressState: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  pincode: z.string().min(6, "Pincode must be 6 digits"),
  panNumber: z.string().min(1, "PAN Number is required"),
  state: z.string().min(1, "State is required"),
  district: z.string().min(1, "District is required"),
  mandal: z.string().min(1, "Mandal is required"),
  bankName: z.string().min(1, "Bank Name is required"),
  accountNumber: z.string().min(1, "Account Number is required"),
  ifscCode: z.string().min(1, "IFSC Code is required"),
  bankBranch: z.string().min(1, "Bank Branch is required"),

  // ── File fields ──────────────────────────────────────────
  profilePicture: fileSchema(ACCEPTED_IMAGE_TYPES, "Profile picture").optional(),
  aadharFront: fileSchema(ACCEPTED_DOC_TYPES, "Aadhar Front").optional(),
  aadharBack: fileSchema(ACCEPTED_DOC_TYPES, "Aadhar Back").optional(),
  panCard: fileSchema(ACCEPTED_DOC_TYPES, "PAN Card").optional(),
});

export type AgentFormValues = z.infer<typeof agentSchema>;