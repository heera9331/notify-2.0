"use client";
import { Suspense } from "react";
import Loader from "@/app/loader";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";
import {
  Plus,
  Notebook,
  ChevronDown,
  Home,
  Calendar,
  Inbox,
  Search,
  Settings,
  LogOutIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { FormCreateNoteType } from "./form-create-note-type";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useUser } from "@/contexts/user-context";
import Image from "next/image";
import Link from "next/link";

// Menu items.
const items = [
  { title: "Home", url: "/home", icon: Home },
  { title: "Tasks", url: "/tasks", icon: Inbox },
  { title: "Notes", url: "/notes", icon: Notebook },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "Search", url: "#", icon: Search },
  { title: "Settings", url: "#", icon: Settings },
  { title: "Logout", url: "/auth", icon: LogOutIcon },
];

const MainSidebar = () => {
  const { categories } = useUser();
  console.log(categories);

  return (
    <SidebarProvider className="">
      <Sidebar side="left" className="relative border-none p-4 rounded">
        <SidebarContent className="overflow-hidden ">
          {/* Application Group */}
          <SidebarGroup>
            <Link href={"/"} className="">
              <SidebarGroupLabel className="">
                <span className="text-2xl font-semibold font-mono">Notify</span>
              </SidebarGroupLabel>
            </Link>
            <SidebarGroupAction>
              <Dialog>
                <DialogTrigger className="">
                  <Plus /> <span className="sr-only">Add Project</span>
                </DialogTrigger>
                <DialogContent>
                  <FormCreateNoteType />
                </DialogContent>
              </Dialog>
            </SidebarGroupAction>
          </SidebarGroup>

          {/* Main Collapsible Group */}
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup className="px-2 py-0">
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="flex items-center gap-2 cursor-pointer bg-gray-200 rounded-md w-full p-2">
                  <Notebook />
                  Main
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

          {/* Categories Collapsible */}
          <Suspense fallback={<Loader />}>
            {categories.map((category: any) => (
              <Collapsible key={category.id} className="group/collapsible p-0">
                <SidebarGroup className="px-2 py-0">
                  <CollapsibleTrigger className="bg-gray-200 rounded-md w-full flex items-center py-1 px-2">
                    <span>{category.title}</span>
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180 w-5 h-5" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <SidebarMenu className="ml-4">
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <a
                            href="#"
                            className="flex items-center gap-2 text-gray-700 hover:text-blue-500"
                          >
                            Item 1
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <a
                            href="#"
                            className="flex items-center gap-2 text-gray-700 hover:text-blue-500"
                          >
                            Item 2
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            ))}
          </Suspense>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};

export default MainSidebar;
