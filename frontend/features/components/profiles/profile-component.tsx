import { Button } from "@/components/ui/button";
import AvatarIcon from "../avatar-icon";

export default function ProfileComponent({
  user,
  isMyProfile,
}: {
  user: UserType;
  isMyProfile: boolean;
}) {
  const createdAt = new Date(user?.createdAt);
  const joinedAt = createdAt.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <main className="flex flex-row items-center pt-5 h-80 w-full bg-indigo-50">
      <div className="ml-5">
        <AvatarIcon sizes={"15"} />
      </div>
      <div className="flex flex-col flex-1 gap-10 w-70 p-10">
        <div>
          <h2 className="text-xl">{user?.displayName ?? "Showed Name"}</h2>
          <p className="text-indigo-600">{user?.username ?? "@Username"}</p>
        </div>
        <p>{user?.friends.length ?? "0"} friends</p>
        {isMyProfile ? (
          <Button className="bg-white border-1 border-indigo-600 w-30 text-black hover:bg-indigo-300 transition-all">
            Set up profile
          </Button>
        ) : (
          <Button className="bg-white border-1 border-indigo-600 w-30 text-black hover:bg-indigo-300 transition-all">
            Add Friend
          </Button>
        )}
      </div>
      <div className="h-full p-5">
        <p>Joined {joinedAt}</p>
      </div>
    </main>
  );
}
