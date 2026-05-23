export interface UserType {
  _id: string;
  username: string;
  bio: string;
  displayName: string;
  friends: string[];
  iconUrl?: string | null;
  createdAt: string;
}
