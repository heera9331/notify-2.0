'use client'
import { Label } from "@radix-ui/react-label";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SignInForm = () => {
  const [user, setUser] = useState({
    username: "admin",
    password: "admin",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();

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
      const data = response.data;
      const token = data.token;

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", JSON.stringify(token));
      // Redirect to /home after successful login
      router.push("/home");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ error: string }>;
        setError(axiosError.response?.data?.error || "An error occurred");
      } else {
        setError("An unexpected error occurred");
      }
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

export default SignInForm;
