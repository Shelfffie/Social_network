import axios from "axios";

export const catchErrorHandler = (error: unknown) => {
  let errorMessage: string;
  if (axios.isAxiosError(error)) {
    console.log(
      console.log(
        "Server error:",
        error.response ? error.response.data : error.message
      )
    );
    errorMessage = error.response
      ? error.response.data.message[0]
      : error.message;
  } else {
    console.log("Unknown error:", error);
    errorMessage = "Unknown error";
  }
  return errorMessage;
};
