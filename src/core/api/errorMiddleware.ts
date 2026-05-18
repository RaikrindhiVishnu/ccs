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
    const errorMessage =
      payload?.data?.message ||
      payload?.message ||
      payload?.error ||
      "An error occurred while connecting to the server.";

    // Display the error inside a rich Sonner toast
    toast.error(errorMessage);
  }
  return next(action);
};
