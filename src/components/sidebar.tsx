"use client";

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
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { FormCreateNoteType } from "./form-create-note-type";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Menu items.
const items = [
  { title: "Home", url: "/home", icon: Home },
  { title: "Tasks", url: "/tasks", icon: Inbox },
  { title: "Notes", url: "/notes", icon: Notebook },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "Search", url: "#", icon: Search },
  { title: "Settings", url: "#", icon: Settings },
  { title: "Logout", url: "/auth", icon: Settings },
];

const MainSidebar = () => {
  return (
    <SidebarProvider>
      <Sidebar
        side="left"
        className="relative border-none  bg-gray-50   min-h-fit-content  p-4 rounded shadow hover:shadow-lg transition-shadow delay-200"
      >
        <SidebarContent>
          {/* Application Group */}
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupAction>
              <Dialog>
                <DialogTrigger>
                  <Plus /> <span className="sr-only">Add Project</span>
                </DialogTrigger>
                <DialogContent>
                  <FormCreateNoteType />
                </DialogContent>
              </Dialog>
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
  );
};

export default MainSidebar;
