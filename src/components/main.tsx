"use client";
import { UserProvider } from "@/contexts/user-context";
const Main = ({ children }) => {
  return (
    <main className="ml-64">
      <UserProvider>{children}</UserProvider>
    </main>
  );
};
export default Main;
