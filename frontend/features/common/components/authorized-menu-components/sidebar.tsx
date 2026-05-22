import { InputBasic } from "../input";
import { Search } from "lucide-react";
import AvatarIcon from "../avatar-icon";
import { Button } from "@/components/ui/button";
import ButtonGhostMenu from "../button";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserType } from "@/features/utils/types/user";

export function AppSidebar({ user }: { user: UserType }) {
  return (
    <Sidebar className="flex w-100 border-b-1 border-indigo-300">
      <SidebarHeader className="flex flex-row gap-0 bg-indigo-50 items-center justify-center h-50 pt-20 border-b-1 border-indigo-300">
        <InputBasic
          styles="peer w-80 rounded-tr-none! rounded-br-none! border-none border-r-0 shadow-[-4px_4px_6px_-1px_rgba(0,0,0,0.2)]"
          placeholder="Search"
        />
        <button className="h-11 w-10 bg-white rounded-tr-full rounded-br-full shadow-[4px_4px_10px_-1px_rgba(0,0,0,0.2)] peer-focus-within:ring-indigo-300 peer-focus-within:ring-3">
          <Search className="m-auto hover:text-indigo-600 active:scale-110 transition-all" />
        </button>
      </SidebarHeader>
      <SidebarContent className="bg-indigo-50">
        <SidebarGroup className="flex flex-row gap-5 p-5 border-b-1 border-indigo-300">
          <AvatarIcon img={user?.iconUrl} />
          <div>
            <Button variant="link" className="text-xl p-0">
              <Link href={"/profile"}> Profile</Link>
            </Button>
            <p>@{user?.username}</p>
          </div>
        </SidebarGroup>
        <SidebarMenu className="flex flex-col justify-end gap-5 pt-5">
          <SidebarMenuItem>
            <Link href={"/"}>
              <ButtonGhostMenu text="Home" />{" "}
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <ButtonGhostMenu text="Friends" />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <ButtonGhostMenu text="History" />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <ButtonGhostMenu text="Settings" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
