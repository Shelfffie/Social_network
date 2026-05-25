export interface UserType {
  _id: string;
  username: string;
  bio: string;
  displayName: string;
  friends: string[];
  iconURL?: string | null;
  createdAt: string;
}
