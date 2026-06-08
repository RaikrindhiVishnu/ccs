import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

/**
 * Accepts either a freshly-selected File OR an existing S3 key / URL string
 * (populated when loading an agent in edit mode). Returns a meaningful
 * "required" message when the value is undefined / null / empty.
 */
const fileSchema = (accepted: string[], label: string) =>
  z
    .custom<File | string>(
      (v) => v instanceof File || (typeof v === "string" && v.length > 0),
      { message: `${label} is required` },
    )
    .refine(
      (v) => !(v instanceof File) || v.size <= MAX_FILE_SIZE,
      `${label}: max size is 5 MB`,
    )
    .refine(
      (v) => !(v instanceof File) || accepted.includes((v as File).type),
      `${label}: invalid file type`,
    );

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
  panNumber: z.string().optional(),
  state: z.string().min(1, "State is required"),
  region: z.string().min(1, "Region is required"),
  area: z.string().min(1, "Area is required"),
  bankName: z.string().min(1, "Bank Name is required"),
  accountNumber: z.string().min(1, "Account Number is required"),
  ifscCode: z.string().min(1, "IFSC Code is required"),
  bankBranch: z.string().min(1, "Bank Branch is required"),

  // ── File fields ──────────────────────────────────────────
  profilePicture: fileSchema(ACCEPTED_IMAGE_TYPES, "Profile picture").optional(),
  aadharFront: fileSchema(ACCEPTED_IMAGE_TYPES, "Aadhaar Front").optional(),
  aadharBack: fileSchema(ACCEPTED_IMAGE_TYPES, "Aadhaar Back").optional(),
  panCard: fileSchema(ACCEPTED_IMAGE_TYPES, "PAN Card").optional(),
});

export type AgentFormValues = z.infer<typeof agentSchema>;