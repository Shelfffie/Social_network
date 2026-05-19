export interface UserType {
  _id: string;
  username: string;
  displayName: string;
  friends: string[];
  iconUrl?: string | null;
  createdAt: string;
}
