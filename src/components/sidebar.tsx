"use client";
import { Suspense, useEffect, useState } from "react";
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
  { title: "All Categories", url: "/all-categories", icon: Inbox },
  { title: "Tasks", url: "/tasks", icon: Inbox },
  { title: "Notes", url: "/notes", icon: Notebook },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "Search", url: "#", icon: Search },
  { title: "Settings", url: "#", icon: Settings },
  { title: "Logout", url: "/auth", icon: LogOutIcon },
];

const MainSidebar = () => {
  const { categories } = useUser();

  return (
    <SidebarProvider className="">
      <Sidebar side="left" className="relative border-none p-4 rounded">
        <SidebarContent className="min-h-fit">
          {/* Application Group */}
          <SidebarGroup>
            <Link href={"/"} className="">
              <SidebarGroupLabel className="">
                <span className="text-2xl font-semibold font-mono">Notify</span>
              </SidebarGroupLabel>
            </Link>
            <SidebarGroupAction>
              <Dialog>
                <DialogTrigger className="add-new-category">
                  <Plus /> <span className="sr-only">Add Project</span>
                </DialogTrigger>
                <DialogContent>
                  <FormCreateNoteType title={"Category"} mode="view" />
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
          {/* dynamic */}
          <CategoryList categories={categories} />
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};

function CategoryList({ categories }: { categories: any[] }) {
  const [subcategories, setSubcategories] = useState<{ [key: number]: any[] }>(
    {}
  );
  const [loading, setLoading] = useState<{ [key: number]: boolean }>({});

  const fetchSubcategories = async (parentId: number) => {
    if (subcategories[parentId]) return; // Prevent fetching again

    try {
      setLoading((prev) => ({ ...prev, [parentId]: true }));
      const res = await fetch(`/api/categories/${parentId}`);
      const data = await res.json();

      setSubcategories((prev) => ({ ...prev, [parentId]: data.categories }));
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    } finally {
      setLoading((prev) => ({ ...prev, [parentId]: false }));
    }
  };

  return (
    <div>
      {categories.map((category) => (
        <Collapsible key={category.id} className="group/collapsible p-0 mt-2">
          <SidebarGroup className="px-2 py-0">
            <CollapsibleTrigger
              className="bg-gray-200 rounded-md w-full flex items-center py-1 px-2"
              onClick={() => fetchSubcategories(category.id)}
            >
              <Link
                href={`/all-categories/${category.id}`}
                className="flex w-full gap-2"
              >
                <span>{category.title}</span>
              </Link>
              <ChevronDown
                className={`ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180 w-5 h-5`}
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="mt-2">
              {loading[category.id] ? (
                <p className="ml-4 text-sm text-gray-500">Loading...</p>
              ) : (
                <SidebarMenu className="ml-4">
                  {subcategories[category.id]?.length > 0 ? (
                    subcategories[category.id].map((subcat) => (
                      <SidebarMenuItem key={subcat.id}>
                        <SidebarMenuButton asChild>
                          <Link
                            href={`/all-categories/${subcat.id}`}
                            className="flex items-center gap-2 text-gray-700 hover:text-blue-500"
                          >
                            {subcat.title}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No subcategories</p>
                  )}
                </SidebarMenu>
              )}
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      ))}
    </div>
  );
}

export default MainSidebar;
