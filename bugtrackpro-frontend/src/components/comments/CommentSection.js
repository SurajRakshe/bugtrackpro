import React, { useEffect, useState } from "react";
import axios from "axios";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const CommentSection = ({ ticketId, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, [ticketId]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/api/comments/ticket/${ticketId}`);
      setComments(res.data);
    } catch (err) {
      console.error("Failed to load comments", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (content, parentCommentId = null) => {
    try {
      await axios.post("/api/comments", {
        content,
        ticketId,
        authorName: currentUser,
        parentCommentId,
      });
      fetchComments(); // reload all comments
    } catch (err) {
      console.error("Failed to post comment", err);
    }
  };

  const handleEditComment = async (commentId, newContent) => {
    try {
      await axios.put(`/api/comments/${commentId}`, { content: newContent });
      fetchComments(); // refresh after edit
    } catch (err) {
      console.error("Failed to edit comment", err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/api/comments/${commentId}`);
      fetchComments(); // refresh after delete
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };

  const nestComments = (parentId = null) =>
    comments
      .filter((c) => c.parentCommentId === parentId)
      .map((c) => ({
        ...c,
        replies: nestComments(c.id),
      }));

  return (
    <div className="bg-gray-50 p-4 rounded shadow mt-4">
      <h3 className="text-lg font-bold mb-3">💬 Comments</h3>

      {loading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-sm text-gray-500 mt-2">Loading comments...</p>
        </div>
      ) : (
        <>
          <CommentForm onSubmit={handleAddComment} />
          {nestComments().map((c) => (
            <Comment
              key={c.id}
              comment={c}
              replies={c.replies}
              onReply={handleAddComment}
              onEdit={handleEditComment}
              onDelete={handleDeleteComment}
              currentUser={currentUser}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default CommentSection;
