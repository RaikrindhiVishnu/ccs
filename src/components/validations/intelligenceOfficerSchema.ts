import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const ACCEPTED_DOC_TYPES = ["image/jpeg", "image/png", "image/webp"];

/**
 * Accepts either a freshly-selected File OR an existing S3 key / URL string
 * (populated when loading an officer in edit mode). Returns a meaningful
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

export const intelligenceOfficerSchema = z.object({
  firstName:    z.string().min(1, "First Name is required"),
  lastName:     z.string().min(1, "Last Name is required"),
  dob:          z.string().min(1, "DOB is required"),
  email:        z.string().min(1, "Email is required").email("Invalid email"),
  mobile:       z.string().min(10, "Mobile number must be 10 digits"),
  address:      z.string().min(1, "Address is required"),
  addressState: z.string().min(1, "State is required"),
  city:         z.string().min(1, "City is required"),
  pincode:      z.string().min(6, "Pincode must be 6 digits"),

  // ── File fields ──────────────────────────────────────────────────────────────
  profilePicture: z
    .custom<File | string>(
      (v) => !v || v instanceof File || (typeof v === "string" && v.length > 0),
    )
    .optional(),
  aadharFront:    fileSchema(ACCEPTED_DOC_TYPES, "Aadhaar Front"),
  aadharBack:     fileSchema(ACCEPTED_DOC_TYPES, "Aadhaar Back"),
  panCard:        fileSchema(ACCEPTED_DOC_TYPES, "PAN Card"),
});

export type IntelligenceOfficerFormValues = z.infer<typeof intelligenceOfficerSchema>;