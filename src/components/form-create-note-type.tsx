"use client";
import { FormEvent, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { axios } from "@/lib/axios";
import { useUser } from "@/contexts/user-context";

const FormCreateNoteType = ({ title = "List" }: { title?: string }) => {
  const [typeName, setTypeName] = useState("");
  const [parentId, setParentId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { categories } = useUser(); // Fetch categories from user context
  console.log(categories);
  
  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();

    try {  
      const response = await axios.post("/api/categories", {
        title: typeName,
        parentId: parentId,
      });
      console.log(response);
      setMessage("Category created successfully!");
      setTypeName(""); // Reset the type input
      setParentId(0); // Reset the parent selection
      setError("");
    } catch (error: any) {
      console.error(error);
      setError("Something went wrong while creating the category.");
    }
  };

  return (
    <Card>
      <CardContent>
        <h2 className="text-2xl font-semibold">{title} Form</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-4">
          {/* Parent Category Selector */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Parent {title}</Label>
            <Select
              value={parentId?.toString() || ""}
              onValueChange={(value) => setParentId(parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Parent Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">None</SelectItem>
                {categories.map((category: any) => (
                  <SelectItem value={category.id.toString()} key={category.id}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Type Name Input */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold">{title} Type</Label>
            <Input
              type="text"
              placeholder={`Enter ${title} Type`}
              value={typeName}
              onChange={(e) => {
                setTypeName(e.target.value);
                setMessage(""); // Clear success message on input change
              }}
            />
          </div>

          {/* Messages */}
          {message && <p className="text-green-600">{message}</p>}
          {error && <p className="text-red-600">{error}</p>}

          {/* Submit Button */}
          <Button type="submit" className="mt-4">
            Create
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export { FormCreateNoteType };
