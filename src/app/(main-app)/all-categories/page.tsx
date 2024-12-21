"use client";

import { axios } from "@/lib/axios";
import { Trash, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const deleteCategory = async (id: string) => {
    try {
      const response = await axios.delete(`/api/categories/${id}`);
      console.log("Category deleted:", response.data);
      setCategories((prevCategories) => {
        const updatedCategories = prevCategories.filter(
          (category) => category.id !== id
        );
        return updatedCategories;
      });
    } catch (error) {}
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Recursive function to render categories
  const renderCategories = (categories: any[]) => {
    return (
      <ul className="pl-4 border-l border-gray-300">
        {categories.map((category) => (
          <li key={category.id} className="mb-2">
            <div className="flex  gap-2  items-center text-gray-800 font-medium capitalize">
              <span>
                <Link href={`/all-categories/${category.id}`}>
                  {category.title}
                </Link>
              </span>
              <span>
                <Trash2
                  className=" w-4 h-4 text-white hover:cursor-pointer hover:text-red-600"
                  onClick={() => {
                    deleteCategory(category.id);
                  }}
                />
              </span>
            </div>
            {category.children && category.children.length > 0 && (
              <div className="ml-2 mt-2">
                {renderCategories(category.children)}
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="container mx-auto px-6 py-4">
      <h1 className="text-2xl font-bold mb-6">Category Hierarchy</h1>

      {loading ? (
        <p>Loading categories...</p>
      ) : categories.length > 0 ? (
        <div>{renderCategories(categories)}</div>
      ) : (
        <p>No categories available.</p>
      )}
    </div>
  );
}
