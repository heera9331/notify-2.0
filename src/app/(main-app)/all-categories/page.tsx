"use client";

import { useState, useEffect } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { axios } from "@/lib/axios";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

const ItemTypes = {
  CATEGORY: "CATEGORY",
};

function CategoryItem({ category, onDrop, onDelete, onEdit }: any) {
  const [, ref] = useDrop({
    accept: ItemTypes.CATEGORY,
    drop: (draggedItem: any) => {
      if (draggedItem.id !== category.id) {
        onDrop(draggedItem.id, category.id); // Set the dragged item's parentId to the current item's id
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CATEGORY,
    item: { id: category.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <li
      ref={(node) => drag(ref(node))}
      className={`p-2 border rounded-md mb-2 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-800">{category.title}</span>
        <div className="flex gap-2">
          <Trash2
            className="w-4 h-4 hover:cursor-pointer text-red-600"
            onClick={() => onDelete(category.id)}
          />
          <Edit
            className="w-4 h-4 hover:cursor-pointer"
            onClick={() => onEdit(category.id)}
          />
        </div>
      </div>
      {category.children && category.children.length > 0 && (
        <ul className="pl-4 border-l border-gray-300 mt-2">
          {category.children.map((child: any) => (
            <CategoryItem
              key={child.id}
              category={child}
              onDrop={onDrop}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleDrop = async (draggedId: number, newParentId: number) => {
    try {
      let category = categories.filter((category) => category.id === draggedId);
      if (category.length) {
        category = category[0];
      }

      console.log(category);

      const response = await axios.put(`/api/categories/${draggedId}`, {
        ...category,
        parentId: newParentId,
      });
      toast.success("Category updated successfully!");

      // Update the hierarchy in the frontend
      const fetchCategories = async () => {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      };
      fetchCategories();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update category");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/categories/${id}`);
      setCategories((prev) => prev.filter((category) => category.id !== id));
      toast.success("Category deleted successfully");
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  const handleEdit = (id: number) => {
    // Implement edit functionality
    console.log("Edit category", id);
  };

  const renderCategories = (categories: any[]) => {
    return (
      <ul>
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            onDrop={handleDrop}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </ul>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto px-6 py-4">
        <h1 className="text-2xl font-bold mb-6">Category Hierarchy</h1>
        {loading ? (
          <p>Loading categories...</p>
        ) : categories.length > 0 ? (
          renderCategories(categories)
        ) : (
          <p>No categories available.</p>
        )}
      </div>
    </DndProvider>
  );
}
