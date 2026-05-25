"use client";

import React, { useState } from "react";
import { EditInputValuesType } from "../utils/edit-types";
import { UserType } from "@/features/utils/types/user";
import { getChangedFields } from "../utils/get-changes-fields";
import { SaveEditDataFunction } from "../actions/save-edit-data";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function useEditProfile(
  user: UserType,
  setUser: React.Dispatch<React.SetStateAction<UserType>>
) {
  const [inputValues, setInputValues] = useState<EditInputValuesType>({
    icon: null,
    displayName: user.displayName,
    username: user.username,
    bio: user.bio,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const fileInput = e.target as HTMLInputElement;
      if (fileInput.files && fileInput.files[0]) {
        setInputValues((prev) => ({ ...prev, [name]: fileInput.files![0] }));
      }
    } else {
      setInputValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const submit = async (
    e: React.SubmitEvent<HTMLFormElement>
  ): Promise<boolean> => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const changesValues = getChangedFields(inputValues, user);

    if (Object.keys(changesValues).length === 0) {
      console.log("No changes");
      return true;
    }

    try {
      const result = await SaveEditDataFunction(changesValues);
      if (result?.success) {
        console.log(result.data);
        setUser(result.data);
        return true;
      } else {
        setError(result?.message || "Щось пішло не так");
        return false;
      }
    } catch (error) {
      console.error(error);
      setError("Connection error");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    inputValues,
    isLoading,
    error,
    inputHandler,
    submit,
  };
}
