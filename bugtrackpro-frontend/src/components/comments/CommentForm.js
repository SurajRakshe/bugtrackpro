import React, { useState, useEffect } from "react";

const CommentForm = ({ onSubmit, parentId, initialValue = "" }) => {
  const [content, setContent] = useState(initialValue);

  // Optional: If initialValue changes (e.g. for editing), update state
  useEffect(() => {
    setContent(initialValue);
  }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content, parentId);
    setContent(""); // Clear input after submit
  };

  return (
    <form onSubmit={handleSubmit} className="my-2">
      <textarea
        className="w-full p-2 border rounded"
        rows="2"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your comment..."
      />
      <button
        type="submit"
        className="mt-1 px-4 py-1 bg-blue-600 text-white rounded"
      >
        {initialValue ? "Update" : "Post"}
      </button>
    </form>
  );
};

export default CommentForm;
