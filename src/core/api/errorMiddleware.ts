import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";

/**
 * A central Redux middleware to capture RTK Query / Mutation failures 
 * and display a beautiful Sonner toast to the user.
 */
export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const payload = action.payload as any;
    
    // Attempt to extract the server error message
    let errorMessage =
      payload?.data?.message ||
      payload?.message ||
      payload?.error ||
      "Something went wrong. Please try again.";

    if (
      typeof errorMessage === "string" &&
      (errorMessage.toLowerCase().includes("connecting to the server") ||
        errorMessage.toLowerCase().includes("failed to fetch") ||
        errorMessage.toLowerCase().includes("fetch_error"))
    ) {
      errorMessage = "Something went wrong. Please try again.";
    }

    // Display the error inside a rich Sonner toast
    toast.error(errorMessage);
  }
  return next(action);
};
