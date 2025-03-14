import { Home, FileSpreadsheet } from "lucide-react";
import UserAccountNav from "./userAccountNav";
import SignInButton from "./SignInButton";
import { useSession } from "next-auth/react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "about",
    url: "/about",
    icon: FileSpreadsheet,
  },
  {
    title: "calender",
    url: "/calender",
    icon: FileSpreadsheet,
  }
];

export function AppSidebar() {
  const { data: session } = useSession();

  return (
    <Sidebar >
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel className="text-3xl p-4 m-4 px-2">Donezo</SidebarGroupLabel> */}
          <SidebarGroupContent>
            {/* Display UserAccountNav or SignInButton at the top */}
            <div className="p-4">
              {session?.user ? (
                <UserAccountNav user={session.user} />
              ) : (
                <SignInButton text="Sign In" />
              )}
            </div>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
