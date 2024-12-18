"use client";

import "@/app/globals.css";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";

export default function AuthPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-center min-h-screen gap-16">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Tabs
          defaultValue="signin"
          className="w-[400px] bg-gray-50 rounded-xl min-h-fit-content p-8 shadow-lg transition-all delay-200"
        >
          <TabsList className="flex gap-2 mb-4 rounded-lg">
            <TabsTrigger
              value="signin"
              className="p-2 rounded-lg data-[state=active]:bg-gray-100 "
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="p-2 rounded-lg data-[state=active]:bg-gray-100 "
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          {/* Sign In Form */}
          <TabsContent value="signin" className="space-y-4">
            <SignInForm />
          </TabsContent>

          {/* Sign Up Form */}
          <TabsContent value="signup" className="space-y-4">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
