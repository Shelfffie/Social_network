import axios from "axios";

export const catchErrorHandler = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.log(
      console.log(
        "Server error:",
        error.response ? error.response.data : error.message
      )
    );
  } else {
    console.log("Unknown error:", error);
  }
};
