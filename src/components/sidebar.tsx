// MainSidebar.tsx

"use client";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
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
  TestTube,
  PenTool,
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
import Link from "next/link";
import CategoryList from "./CategoryList";

// Define interfaces for TypeScript
interface Category {
  id: number;
  title: string;
  description: string;
  parentId: number;
  createdAt: string;
  updatedAt: string;
  children?: Category[];
}

interface ApiResponse {
  category: Category;
}

interface CategoryListProps {
  categories: Category[];
}

// Menu items.
const items = [
  { title: "Home", url: "/home", icon: Home },
  { title: "All Categories", url: "/all-categories", icon: Inbox },
  { title: "Tasks", url: "/tasks", icon: Inbox },
  { title: "Notes", url: "/notes", icon: Notebook },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "Search", url: "#", icon: Search },
  { title: "Settings", url: "#", icon: Settings },
  { title: "Test", url: "/test", icon: PenTool },
  { title: "Logout", url: "/auth", icon: LogOutIcon },
];

const MainSidebar = () => {
  const { categories } = useUser();

  return (
    <SidebarProvider>
      <Sidebar side="left" className="relative border-none p-4 rounded gap-0 bg-white">
        <SidebarContent className="min-h-fit">
          {/* Application Group */}
          <SidebarGroup>
            <Link href="/" className="flex items-center">
              <SidebarGroupLabel>
                <span className="text-2xl font-semibold font-mono">Notify</span>
              </SidebarGroupLabel>
            </Link>
            <SidebarGroupAction>
              <Dialog>
                <DialogTrigger className="bg-gray-800 add-new-category flex items-center gap-2 text-white rounded-md">
                  <Plus />
                </DialogTrigger>
                <DialogContent>
                  <FormCreateNoteType title="Category" mode="view" />
                </DialogContent>
              </Dialog>
            </SidebarGroupAction>
          </SidebarGroup>

          {/* Main Menu Accordion */}
          <Accordion type="multiple" className="w-full ">
            <AccordionItem value="main">
              <AccordionTrigger className="flex items-center gap-2 cursor-pointer bg-gray-100 rounded-md w-full p-2">
                <Notebook className="w-4 h-4"/>
                Main
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/accordion:rotate-180 w-5 h-5" />
              </AccordionTrigger>
              <AccordionContent>
                <SidebarMenu className="mt-2 space-y-2">
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          className="flex items-center gap-2 text-gray-700 hover:text-blue-500"
                        >
                          <item.icon className="w-5 h-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Dynamic Category List */}
          <CategoryList categories={categories} />
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};

export default MainSidebar;
