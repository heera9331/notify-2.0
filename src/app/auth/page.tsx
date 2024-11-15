"use client";

import "@/app/globals.css";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";

import { ChangeEvent, FormEvent, useState } from "react";

const SignUpForm = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      className="flex flex-col gap-4"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
    >
      <div>
        <Label htmlFor="name" className="block mb-1">
          Name
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your name"
          className="w-full"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label htmlFor="signup-email" className="block mb-1">
          Email
        </Label>
        <Input
          id="signup-email"
          type="email"
          placeholder="Enter your email"
          className="w-full"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label htmlFor="signup-password" className="block mb-1">
          Password
        </Label>
        <Input
          id="signup-password"
          type="password"
          placeholder="Create a password"
          className="w-full"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label htmlFor="confirm-password" className="block mb-1">
          Confirm Password
        </Label>
        <Input
          id="confirm-password"
          type="password"
          placeholder="Confirm your password"
          className="w-full"
          onChange={handleInputChange}
        />
      </div>
      <Button variant={"default"} className="w-full mt-4">
        Sign Up
      </Button>
    </form>
  );
};

const SignInForm = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("/api/auth/signin", user);
      setSuccess("Login successful!");
      console.log("User signed in:", response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      method="post"
      className="flex flex-col gap-4"
    >
      <div>
        <Label htmlFor="username" className="block mb-1">
          Username
        </Label>
        <Input
          id="username"
          type="text"
          placeholder="Enter username"
          className="w-full"
          value={user.username}
          onChange={handleInputChange}
          name="username"
        />
      </div>

      <div>
        <Label htmlFor="password" className="block mb-1">
          Password
        </Label>
        <Input
          name="password"
          value={user.password}
          id="password"
          type="password"
          placeholder="Enter your password"
          className="w-full"
          onChange={handleInputChange}
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <Button type="submit" disabled={loading} className="w-full mt-4">
        {loading ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  );
};

export default function AuthPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Tabs
          defaultValue="signin"
          className="w-[400px] bg-gray-50 rounded-xl min-h-[500px] p-8 shadow-lg"
        >
          <TabsList className="flex gap-2 mb-4 border rounded-lg">
            <TabsTrigger value="signin" className="p-2 rounded-lg">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" className="p-2 rounded-lg">
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
