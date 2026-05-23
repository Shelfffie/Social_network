import { UserType } from "@/features/utils/types/user";
import { EditInputValuesType } from "./edit-types";

export const getChangedFields = (
  input: EditInputValuesType,
  original: UserType
) => {
  const changes: EditInputValuesType = {};

  if (input.displayName !== original.displayName)
    changes.displayName = input.displayName;
  if (input.username !== original.username) changes.username = input.username;
  if (input.bio !== original.bio) changes.bio = input.bio;
  if (input.icon !== null) changes.icon = input.icon;

  return changes;
};
