import { useState } from "react";

const CreatePostForm = () => {
  const [post, setPost] = useState({
    title: "",
    content: "",
    postType: "POST", // Default to POST
    userId: "", // This should be dynamically set based on the logged-in user
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess("Post created successfully!");
        setPost({
          title: "",
          content: "",
          postType: "POST",
          userId: "", // Reset userId if necessary
        });
        console.log("Created Post:", data);
      } else {
        const data = await response.json();
        setError(data.error || "Failed to create post.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="w-[400px] bg-gray-50 rounded-xl min-h-fit-content p-8 shadow-lg transition-all delay-200"
    >
      <div>
        <label htmlFor="title" className="block mb-1">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={post.title}
          onChange={handleInputChange}
          placeholder="Enter the title"
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div>
        <label htmlFor="content" className="block mb-1">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          value={post.content}
          onChange={handleInputChange}
          placeholder="Enter the content"
          className="w-full border rounded p-2"
          rows={4}
          required
        />
      </div>

      <label htmlFor="postType" className="block mb-1">
        Post Type
      </label>
      <select
        id="postType"
        name="postType"
        value={post.postType}
        onChange={handleInputChange}
        className="w-full border rounded p-2"
      >
        <option value="POST">Post</option>
        <option value="NOTE">Note</option>
        <option value="Task">Task</option>
      </select>
      <div>
        <label htmlFor="userId" className="block mb-1">
          User ID
        </label>
        <input
          id="userId"
          name="userId"
          type="number"
          value={post.userId}
          onChange={handleInputChange}
          placeholder="Enter user ID"
          className="w-full border rounded p-2"
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}

      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Creating Post..." : "Create Post"}
      </button>
    </form>
  );
};

export default CreatePostForm;