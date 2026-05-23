import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

/**
 * Accepts either a freshly-selected File OR an existing S3 key / URL string
 * (populated when loading an officer in edit mode). Returns a meaningful
 * "required" message when the value is undefined / null / empty.
 */
const fileSchema = (label: string) =>
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
      (v) => !(v instanceof File) || ACCEPTED_IMAGE_TYPES.includes((v as File).type),
      `${label}: only JPG, PNG, or WebP images are allowed`,
    );

const baseOfficerSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  dob: z.string().min(1, "DOB is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  mobile: z.string().min(10, "Mobile number must be 10 digits"),
  address: z.string().min(1, "Address is required"),
  addressState: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  pincode: z.string().min(6, "Pincode must be 6 digits"),

  // ── File fields ──────────────────────────────────────────────────────────────
  profilePicture: z
    .custom<File | string>(
      (v) => !v || v instanceof File || (typeof v === "string" && v.length > 0),
    )
    .optional(),
  aadharFront: fileSchema("Aadhaar Front"),
  aadharBack: fileSchema("Aadhaar Back"),
  panCard: fileSchema("PAN Card"),
});

// ── Regional Officer ─────────────────────────────────────────────────────────
export const officerSchema = baseOfficerSchema;
export const regionalOfficerSchema = baseOfficerSchema;

export type OfficerFormValues = z.infer<typeof officerSchema>;
export type RegionalOfficerFormValues = z.infer<typeof regionalOfficerSchema>;