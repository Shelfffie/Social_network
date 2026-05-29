import { Button } from "@/components/ui/button";
import AvatarIcon from "../../common/components/avatar-icon";
import { UserType } from "@/features/utils/types/user";
import Link from "next/link";
import WhiteButton from "@/features/common/components/white-indigo-button";

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
        <AvatarIcon sizes={"15"} img={user?.iconURL} />
      </div>
      <div className="flex flex-col flex-1 gap-10 w-70 p-10">
        <div>
          <h2 className="text-xl">{user?.displayName ?? "Showed Name"}</h2>
          <p className="text-indigo-600">@{user?.username ?? "Username"}</p>
          <p>{user?.bio ?? "cha"}</p>
        </div>
        <p>{user?.friends.length ?? "0"} friends</p>
        {isMyProfile ? (
          <Link href={"/profile/edit"}>
            <WhiteButton text="Set up profile" />
          </Link>
        ) : (
          <WhiteButton text="Add Friend" />
        )}
      </div>
      <div className="h-full p-5">
        <p>Joined {joinedAt}</p>
      </div>
    </main>
  );
}
