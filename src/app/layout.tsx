import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import type { Metadata } from "next";
import "./globals.css";
import {
  Home,
  Inbox,
  Calendar,
  Search,
  Settings,
  Plus,
  ChevronDown,
  Notebook,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";
import Main from "@/components/main";

export const metadata: Metadata = {
  title: "Notify Home",
  description: "Designed and developed by Heera Singh",
};

// Menu items.
const items = [
  { title: "Home", url: "/home", icon: Home },
  { title: "Tasks", url: "/tasks", icon: Inbox },
  { title: "Notes", url: "/notes", icon: Notebook },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "Search", url: "#", icon: Search },
  { title: "Settings", url: "#", icon: Settings },
  { title: "Logout", url: "/", icon: Settings },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <Sidebar className="border-none w-64  bg-gray-50   min-h-fit-content  p-4 rounded shadow hover:shadow-lg transition-shadow delay-200">
            <SidebarContent>
              {/* Application Group */}
              <SidebarGroup>
                <SidebarGroupLabel>Application</SidebarGroupLabel>
                <SidebarGroupAction>
                  <Plus /> <span className="sr-only">Add Project</span>
                </SidebarGroupAction>
                <SidebarGroupContent />
              </SidebarGroup>

              {/* Collapsible Group */}
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarGroup>
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger className="flex items-center gap-2 cursor-pointer">
                      <Notebook />
                      New List
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    <SidebarMenu className="mt-2 space-y-2">
                      {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <a
                              href={item.url}
                              className="flex items-center gap-2 text-gray-700 hover:text-blue-500"
                            >
                              <item.icon className="w-5 h-5" />
                              <span>{item.title}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
        <Main>{children}</Main>
        <footer className="text-center text-gray-500">
          This is the layout page after the children
        </footer>
      </body>
    </html>
  );
}
